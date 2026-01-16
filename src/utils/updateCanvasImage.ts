export const updateCanvasImage = (
	renderingContext: CanvasRenderingContext2D,
	canvas: HTMLCanvasElement,
	image: HTMLImageElement
) => {
	if (!renderingContext || !canvas || !image) throw new Error('Unable to update canvas');

	// ✨ 动态计算缩放，确保在各种窗口尺寸下都能完美居中铺满
	const intrinsicWidth = 1920;
	const intrinsicHeight = 1080;

	// 使用 Math.max 实现 "Cover" 逻辑
	const scale = Math.max(canvas.width / intrinsicWidth, canvas.height / intrinsicHeight);

	const drawWidth = intrinsicWidth * scale;
	const drawHeight = intrinsicHeight * scale;

	// 计算居中偏移
	const offsetX = (canvas.width - drawWidth) / 2;
	const offsetY = (canvas.height - drawHeight) / 2;

	renderingContext.clearRect(0, 0, canvas.width, canvas.height);
	renderingContext.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
};
