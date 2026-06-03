// api/generate.js
// 공간사진 + 자재텍스처(2장) + 마스크 → GPT 이미지 편집 → 시안 반환
// 자재 텍스처는 public/swatches/{모델코드}.jpg 를 서버에서 읽어 함께 전송

import { readFile } from 'fs/promises';
import path from 'path';

export const config = {
  api: { bodyParser: { sizeLimit: '12mb' } },
  maxDuration: 120,
};

function dataURLToBuffer(dataURL) {
  const base64 = dataURL.split(',')[1];
  return Buffer.from(base64, 'base64');
}

async function loadSwatch(modelCode) {
  if (!modelCode) return null;
  if (!/^[A-Za-z0-9\-]+$/.test(modelCode)) return null;
  const candidates = ['jpg', 'jpeg', 'png', 'webp'];
  for (const ext of candidates) {
    try {
      const p = path.join(process.cwd(), 'public', 'swatches', `${modelCode}.${ext}`);
      const buf = await readFile(p);
      return { buf, ext: ext === 'jpg' ? 'jpeg' : ext };
    } catch (_) {}
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST만 허용됩니다' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY 환경변수가 설정되지 않았습니다. Vercel 설정에서 키를 넣어주세요.' });
  }

  try {
    const { image, mask, prompt, size, modelCode } = req.body || {};
    if (!image || !prompt) return res.status(400).json({ error: '이미지와 프롬프트가 필요합니다' });

    const form = new FormData();
    form.append('model', 'gpt-image-2');
    form.append('prompt', prompt);
    form.append('input_fidelity', 'high');
    form.append('quality', 'medium');
    form.append('size', size || '1024x1024');
    form.append('n', '1');

    const imgBuf = dataURLToBuffer(image);
    form.append('image[]', new Blob([imgBuf], { type: 'image/png' }), 'space.png');

    const swatch = await loadSwatch(modelCode);
    let swatchAttached = false;
    if (swatch) {
      form.append('image[]', new Blob([swatch.buf], { type: `image/${swatch.ext}` }), `swatch.${swatch.ext}`);
      swatchAttached = true;
    }

    if (mask) {
      const maskBuf = dataURLToBuffer(mask);
      form.append('mask', new Blob([maskBuf], { type: 'image/png' }), 'mask.png');
    }

    const r = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}` },
      body: form,
    });

    if (!r.ok) {
      const errText = await r.text();
      console.error('OpenAI error:', errText);
      return res.status(r.status).json({ error: 'AI 생성 실패', detail: errText.slice(0, 500) });
    }

    const data = await r.json();
    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) return res.status(500).json({ error: '결과 이미지를 받지 못했습니다' });

    return res.status(200).json({ image: `data:image/png;base64,${b64}`, swatchUsed: swatchAttached });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: '서버 오류', detail: String(e).slice(0, 300) });
  }
}
