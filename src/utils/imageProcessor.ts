/**
 * 半糖主义 PWA — 客户端本地抠图服务
 * 使用 @imgly/background-removal，所有处理在浏览器本地完成。
 * 自带 8 秒超时 & 优雅降级：AI 失败时自动绘制「拍立得白边」效果。
 */
import { removeBackground } from '@imgly/background-removal';

/** AI 抠图最长等待时间 (ms) */
const AI_TIMEOUT_MS = 8_000;

/**
 * 主入口 — 尝试 AI 抠图，失败后自动降级为拍立得风格裁剪
 * @param file 用户选择的图片文件
 * @returns Base64 data URL
 */
export async function removeBackgroundFromFile(file: File): Promise<string> {
  try {
    const result = await Promise.race([
      removeBackground(file, {
        model: 'isnet_quint8',
        device: 'gpu',
        output: { format: 'image/png' },
      }),
      timeout(AI_TIMEOUT_MS),
    ]);
    return blobToBase64(result as Blob);
  } catch (err) {
    console.warn('[imageProcessor] AI 抠图失败，切入拍立得降级模式:', err);
    return fallbackPolaroid(file);
  }
}

/**
 * 兜底方案：Canvas 居中裁剪为正方形 + 拍立得白边
 */
async function fallbackPolaroid(file: File): Promise<string> {
  const img = await fileToImage(file);
  const canvas = document.createElement('canvas');

  // 拍立得白边尺寸：每边 20px，内边距（圆角区）8px
  const border = 20;
  const innerPad = 8;
  const side = Math.min(img.width, img.height);
  const polaroidSize = side + border * 2;

  canvas.width = polaroidSize;
  canvas.height = polaroidSize;

  const ctx = canvas.getContext('2d')!;

  // 1) 纯白背景（拍立得相纸）
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, polaroidSize, polaroidSize);

  // 2) 浅灰阴影偏移（微立体感）
  ctx.fillStyle = '#e8e8e8';
  roundRect(ctx, border + 2, border + 2, side, side, 4);
  ctx.fill();

  // 3) 居中裁剪原图为正方形
  const sx = (img.width - side) / 2;
  const sy = (img.height - side) / 2;
  ctx.save();
  ctx.beginPath();
  roundRect(ctx, border, border, side, side, 4);
  ctx.clip();
  ctx.drawImage(img, sx, sy, side, side, border, border, side, side);
  ctx.restore();

  // 4) 右下角加点装饰文字（极淡水印）
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  ctx.font = `${Math.round(side * 0.035)}px sans-serif`;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillText('半糖主义', polaroidSize - border - 6, polaroidSize - border - 4);

  return canvas.toDataURL('image/jpeg', 0.92);
}

/* ---------- 工具函数 ---------- */

function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`AI 抠图超时 (${ms}ms)`)), ms)
  );
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function fileToImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('图片加载失败')); };
    img.src = url;
  });
}

/** Canvas 圆角矩形辅助 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
