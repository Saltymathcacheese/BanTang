/**
 * 半糖主义 PWA — 客户端本地抠图服务
 * 使用 @imgly/background-removal，所有处理在浏览器本地完成
 * 图片不会上传到任何服务器
 */
import { removeBackground } from '@imgly/background-removal';

/**
 * 传入用户拍照的 Image File，返回透明背景的 PNG Base64 data URL
 * @param file - 用户拍照/选择的图片文件
 * @returns Base64 编码的 PNG 图片（透明背景）
 */
export async function removeBackgroundFromFile(file: File): Promise<string> {
  const imageBlob: Blob = await removeBackground(file, {
    model: 'isnet_quint8',   // 40MB 量化模型，速度最快，移动端优先
    device: 'gpu',           // WebGPU > WebGL > CPU 自动降级
    output: {
      format: 'image/png',
      type: 'foreground',    // 只输出前景（透明背景）
    },
  });

  return blobToBase64(imageBlob);
}

/**
 * 将 Blob 转换为 Base64 data URL
 */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
