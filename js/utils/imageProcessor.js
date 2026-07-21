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
 * @param {File} file 用户选择的图片文件
 * @returns {Promise<string>} Base64 data URL
 */
export async function removeBackgroundFromFile(file) {
  try {
    const result = await Promise.race([
      removeBackground(file, {
        model: 'isnet_quint8',
        device: 'gpu',
        output: { format: 'image/png' },
      }),
      timeout(AI_TIMEOUT_MS),
    ]);
    return blobToBase64(result);
  } catch (err) {
    console.warn('[imageProcessor] AI 抠图失败，切入拍立得降级模式:', err);
    return fallbackPolaroid(file);
  }
}

/**
 * 兜底方案：Canvas 居中裁剪为正方形 + 拍立得白边
 * @param {File} file
 * @returns {Promise<string>}
 */
async function fallbackPolaroid(file) {
  const img = await fileToImage(file);
  const canvas = document.createElement('canvas');

  const border = 20;
  const side = Math.min(img.width, img.height);
  const polaroidSize = side + border * 2;

  canvas.width = polaroidSize;
  canvas.height = polaroidSize;

  const ctx = canvas.getContext('2d');

  // 1) 纯白背景
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, polaroidSize, polaroidSize);

  // 2) 浅灰阴影偏移
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

  // 4) 右下角装饰文字
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  ctx.font = Math.round(side * 0.035) + 'px sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillText('半糖主义', polaroidSize - border - 6, polaroidSize - border - 4);

  return canvas.toDataURL('image/jpeg', 0.92);
}

/* ---------- 工具函数 ---------- */

function timeout(ms) {
  return new Promise(function(_, reject) {
    setTimeout(function() { reject(new Error('AI 抠图超时 (' + ms + 'ms)')); }, ms);
  });
}

function blobToBase64(blob) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.onloadend = function() { resolve(reader.result); };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function fileToImage(file) {
  return new Promise(function(resolve, reject) {
    var url = URL.createObjectURL(file);
    var img = new Image();
    img.onload = function() { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = function() { URL.revokeObjectURL(url); reject(new Error('图片加载失败')); };
    img.src = url;
  });
}

function roundRect(ctx, x, y, w, h, r) {
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
