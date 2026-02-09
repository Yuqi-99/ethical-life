import { updateCanvasImage } from './updateCanvasImage';

export const loadImagesAndDrawFirstFrame = async ({
	canvas,
	imageSrcs,
	isMobile,
}: {
	canvas: HTMLCanvasElement;
	imageSrcs: string[];
	isMobile: boolean;
}): Promise<HTMLImageElement[]> => {
	const images: HTMLImageElement[] = [];
	let loadedCount = 0;
	// 桌面端通常瓶子不需要占满全屏，可以设小一点；移动端可以设大一点
	const currentScale = isMobile ? 0.9 : 1;

	return new Promise<HTMLImageElement[]>((resolve, reject) => {
		const onImageLoad = (index: number, img: HTMLImageElement) => {
			// Draw the first frame ASAP
			if (index === 0) {
				const context = canvas.getContext('2d', { alpha: true });
				if (!context) return;
				updateCanvasImage(context, canvas, img, currentScale);
			}
			loadedCount++;
			const hasLoadedAll = loadedCount === imageSrcs.length - 1;
			if (hasLoadedAll) resolve(images);
		};

		const retries: { [imgIndex: number]: number } = {};
		const maxRetries = 3;

		const onImageError = (i: number, img: HTMLImageElement) => {
			// Try reloading this image a couple of times. If it fails then reject.
			if (retries[i] < maxRetries) {
				console.warn(`Image ${i} failed to load. Retrying... ${retries[i]}`);
				img.src = `${imageSrcs[i]}?r=${retries[i]}`;
				retries[i]++;
			} else {
				reject();
			}
		};

		for (let i = 0; i < imageSrcs.length - 1; i++) {
			const img = new Image();
			img.src = imageSrcs[i];
			img.addEventListener('load', () => onImageLoad(i, img));
			img.addEventListener('error', () => onImageError(i, img));
			images.push(img);
		}
	});
};
