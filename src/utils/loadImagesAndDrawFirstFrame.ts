import { updateCanvasImage } from './updateCanvasImage';

export const loadImagesAndDrawFirstFrame = async ({
	canvas,
	imageSrcs,
	isMobile,
	onProgress,
	minCriticalFrames = 30, // Default to 30 frames for immediate display
}: {
	canvas: HTMLCanvasElement;
	imageSrcs: string[];
	isMobile: boolean;
	onProgress?: () => void;
	minCriticalFrames?: number;
}): Promise<HTMLImageElement[]> => {
	const images: HTMLImageElement[] = [];
	let loadedCount = 0;
	let resolved = false;
	// 桌面端通常瓶子不需要占满全屏，可以设小一点；移动端可以设大一点
	const currentScale = isMobile ? 0.9 : 1;

	return new Promise<HTMLImageElement[]>((resolve, reject) => {
		const onImageLoad = async (index: number, img: HTMLImageElement) => {
			// Draw the first frame ASAP
			if (index === 0) {
				const context = canvas.getContext('2d', { alpha: true });
				if (!context) return;
				updateCanvasImage(context, canvas, img, currentScale);
			}

			loadedCount++;
			onProgress?.();

			// Resolve if we have reached the minimum critical frames
			// or if we have loaded all frames (in case minCriticalFrames > total)
			const isCriticalReady = loadedCount >= Math.min(minCriticalFrames, imageSrcs.length);
			if (isCriticalReady && !resolved) {
				resolved = true;
				resolve(images);
			}
		};

		const retries: { [imgIndex: number]: number } = {};
		const maxRetries = 3;

		const onImageError = (i: number, img: HTMLImageElement) => {
			if (retries[i] < maxRetries) {
				console.warn(`Image ${i} failed to load. Retrying... ${retries[i]}`);
				img.src = `${imageSrcs[i]}?r=${retries[i]}`;
				retries[i]++;
			} else {
				onProgress?.();
				reject();
			}
		};

		for (let i = 0; i < imageSrcs.length; i++) {
			const img = new Image();
			img.src = imageSrcs[i];
			img.addEventListener('load', () => onImageLoad(i, img));
			img.addEventListener('error', () => onImageError(i, img));
			images.push(img);
		}
	});
};
