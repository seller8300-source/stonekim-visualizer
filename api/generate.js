// api/generate.js
// Vercel 서버리스 함수: 공간사진 + 마스크 + 자재정보 → GPT 이미지 편집 → 시안 반환
// 형의 OpenAI API 키는 Vercel 환경변수(OPENAI_API_KEY)에 저장 → 코드/화면에 노출 안 됨

export const config = {
  api: { bodyParser: { sizeLimit: '12mb' } },
  maxDuration: 120,
};

// data URL("data:image/png;base64,....") → Buffer
function dataURLToBuffer(dataURL) {
  const base64 = dataURL.split(',')[1];
  return Buffer.from(base64, 'base64');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST만 허용됩니다' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY 환경변수가 설정되지 않았습니다. Vercel 설정에서 키를 넣어주세요.' });
  }

  try {
    const { image, mask, prompt, size } = req.body || {};
    if (!image || !prompt) {
      return res.status(400).json({ error: '이미지와 프롬프트가 필요합니다' });
    }

    // multipart/form-data 구성 (OpenAI images/edits 엔드포인트 규격)
    const form = new FormData();
    form.append('model', 'gpt-image-1.5');           // 최신 편집 모델
    form.append('prompt', prompt);
    form.append('input_fidelity', 'high');           // 원본 공간 구조 최대 보존
    form.append('size', size || '1024x1024');
    form.append('n', '1');

    // 원본 이미지
    const imgBuf = dataURLToBuffer(image);
    form.append('image', new Blob([imgBuf], { type: 'image/png' }), 'space.png');

    // 마스크 (있을 때만 — 투명 영역 = 편집 영역)
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
      console.error('OpenAI 오류:', errText);
      return res.status(r.status).json({ error: 'AI 생성 실패', detail: errText.slice(0, 500) });
    }

    const data = await r.json();
    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) {
      return res.status(500).json({ error: '결과 이미지를 받지 못했습니다' });
    }

    return res.status(200).json({ image: `data:image/png;base64,${b64}` });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: '서버 오류', detail: String(e).slice(0, 300) });
  }
}
