import { toPng } from 'html-to-image';

const pad = value => String(value).padStart(2, '0');

export function createPostcardFilename(date = new Date()) {
  const timestamp = [
    date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate()), '-',
    pad(date.getHours()), pad(date.getMinutes()), pad(date.getSeconds()),
  ].join('');
  return `yoojin-postcard-${timestamp}.png`;
}

export async function downloadPostcard(node) {
  if (!node) throw new Error('저장할 엽서를 찾지 못했습니다.');
  const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 2, backgroundColor: '#faf3e4' });
  const link = document.createElement('a');
  link.download = createPostcardFilename();
  link.href = dataUrl;
  link.click();
  return link.download;
}
