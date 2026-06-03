// api/generate.js
// Responses API 방식: 메인 모델(gpt-5.4)이 공간사진+자재텍스처를 "이해"한 뒤
// image_generation 도구로 시안 생성 → ChatGPT 앱과 유사한 방식

import { readFile } from 'fs/promises';
import path from 'path';

export const config = {
  api: { bodyParser: { sizeLimit: '12mb' } },
  maxDuration: 180,
};

async function loadSwatchDataURL(modelCode) {
  if (!modelCode || !/^[A-Za-z0-9\-]+$/.test(modelCode)) return null;
  for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
    try {
      const p = path.join(process.cwd(), 'public', 'swatches', `${modelCode}.${ext}`);
      const buf = await readFile(p);
      const mime = ext === 'jpg' ? 'jpeg' : ext;
      return `data:image/${mime};base64,${buf.toString('base64')}`;
    } catch (_) {}
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST만 허용됩니다' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY 환경변수가 설정되지 않았습니다.' });
  }

  try {
    const { image, prompt, size, modelCode } = req.body || {};
    if (!image || !prompt) return res.status(400).json({ error: '이미지와 프롬프트가 필요합니다' });

    // 입력 content 구성: 텍스트 지시 + 공간사진 + (있으면) 자재 텍스처
    const content = [
      { type: 'input_text', text: prompt },
      { type: 'input_image', image_url: image },
    ];
    const swatch = await loadSwatchDataURL(modelCode);
    if (swatch) {
      content.push({ type: 'input_text', text: '아래 이미지가 적용할 실제 자재 텍스처입니다. 이 무늬·색·결을 그대로 사용하세요:' });
      content.push({ type: 'input_image', image_url: swatch });
    }

    const body = {
      model: 'gpt-5.4',
      input: [{ role: 'user', content }],
      tools: [{
        type: 'image_generation',
        size: size || '1024x1024',
        quality: 'high',
      }],
      tool_choice: { type: 'image_generation' },
    };

    const r = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!r.ok) {
      const errText = await r.text();
      console.error('OpenAI error:', errText);
      return res.status(r.status).json({ error: 'AI 생성 실패', detail: errText.slice(0, 500) });
    }

    const data = await r.json();
    // image_generation_call 결과에서 b64 추출
    let b64 = null;
    if (Array.isArray(data.output)) {
      for (const item of data.output) {
        if (item.type === 'image_generation_call' && item.result) { b64 = item.result; break; }
      }
    }
    if (!b64) {
      console.error('결과 파싱 실패:', JSON.stringify(data).slice(0, 500));
      return res.status(500).json({ error: '결과 이미지를 받지 못했습니다' });
    }

    return res.status(200).json({ image: `data:image/png;base64,${b64}`, swatchUsed: !!swatch });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: '서버 오류', detail: String(e).slice(0, 300) });
  }
}
