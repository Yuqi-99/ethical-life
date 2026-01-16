import { useGSAP } from '@gsap/react';
import { useDebouncedValue, useDidUpdate, useViewportSize } from '@mantine/hooks';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
gsap.registerPlugin(ScrollTrigger, useGSAP);

const ImageSequenceHeader = () => {
	const header = useRef<HTMLElement>(null);
	const canvas = useRef<HTMLCanvasElement>(null);
	const viewportSize = useViewportSize();
	const [debouncedViewportSize] = useDebouncedValue(viewportSize, 500);
	const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>();

	useEffect(() => {
		if (!canvas.current) {
			console.log('❌ No canvas');
			return;
		}

		if (viewportSize.width === 0 || viewportSize.height === 0) {
			console.log('❌ Viewport size is 0');
			return;
		}

		if (loadedImages) {
			console.log('⚠️ Images already loaded');
			return;
		}

		console.log('✨ All conditions passed, starting setup...');

		const intialSetup = async () => {
			console.log('🚀 Starting image load...');

			// ✨ Target the container's dimensions instead of the full viewport
			// This prevents the canvas from overflowing the max-width layout
			const containerWidth = header.current?.clientWidth ?? viewportSize.width;
			const containerHeight = header.current?.clientHeight ?? viewportSize.height;

			canvas.current!.width = containerWidth;
			canvas.current!.height = containerHeight;

			// 🎯 Frames start
			const startFrame = 160;
			// 🎯 Total frames include
			const totalFrames = 259;
			// 🎯 数字位数 (5位数)
			const digitCount = 5;

			const imageSrcs: string[] = Array.from({ length: totalFrames }, (_, i) => {
				const frameNumber = (startFrame + i).toString().padStart(digitCount, '0');
				return `/images/s1_frames/S1_${frameNumber}.webp`;
			});

			const images = await loadImagesAndDrawFirstFrame({
				canvas: canvas.current!,
				imageSrcs: imageSrcs,
			});

			setLoadedImages(images);
		};

		intialSetup();
	}, [viewportSize, loadedImages]);

	useGSAP(
		() => {
			if (!canvas.current || !loadedImages) {
				console.log('❌ Missing canvas or images for GSAP');
				return;
			}

			const context = canvas.current.getContext('2d', { alpha: true });
			if (!context) {
				console.log('❌ No canvas context');
				return;
			}

			console.log('✅ Setting up GSAP animations...');

			// ScrollTrigger for updating image sequence frames
			ScrollTrigger.create({
				id: 'image-sequence',
				trigger: header.current,
				start: 'top top', // ✨ Start when the section hits the top
				end: '+=2000', // ✨ Duration of the animation
				pin: true, // ✨ Pin the entire section
				// ✨ 这个配置让 ScrollTrigger 自动处理 resize
				invalidateOnRefresh: true,
				onUpdate: ({ progress }) => {
					const nextFrame = Math.floor(progress * loadedImages.length);
					const nextImage = loadedImages[nextFrame];
					if (!nextImage) return;
					updateCanvasImage(context, canvas.current!, nextImage);
				},
			});

			// Animations
			// Animate content in
			// gsap
			// 	.timeline({
			// 		delay: 0.2,
			// 	})
			// 	.to(canvas.current, { opacity: 1, duration: 0.8 })
			// 	.to(canvas.current, { scale: 1, duration: 0.9, ease: 'power2.inOut' })
			// 	.fromTo(
			// 		'#heading',
			// 		{ opacity: 0, scale: 0.8 },
			// 		{ opacity: 1, scale: 1, duration: 0.7, ease: 'power2.inOut' },
			// 		'-=0.7'
			// 	);
			// // Scroll controlled animations for headings
			// gsap
			// 	.timeline({
			// 		defaults: {
			// 			ease: 'none',
			// 		},
			// 		scrollTrigger: { trigger: header.current, start: 0, end: 'bottom top', scrub: true },
			// 	})
			// 	.to('#heading', {
			// 		keyframes: [{ scale: 1.1 }, { scale: 1.15, opacity: 0 }],
			// 		duration: 0.5,
			// 	})
			// 	.to(
			// 		'h2',
			// 		{
			// 			keyframes: [
			// 				{ scale: 0.9, opacity: 1, duration: 0.2 },
			// 				{ scale: 1, opacity: 0, duration: 0.1 },
			// 			],
			// 		},
			// 		'+=0.05'
			// 	);
		},
		{
			dependencies: [loadedImages],
			scope: header,
		}
	);

	useDidUpdate(() => {
		const handleViewportResize = () => {
			if (!debouncedViewportSize.width || !debouncedViewportSize.height || !loadedImages) return;
			if (!canvas.current || !header.current) return;

			const containerWidth = header.current.clientWidth;
			const containerHeight = header.current.clientHeight;

			// Update canvas resolution to match container
			canvas.current.width = containerWidth;
			canvas.current.height = containerHeight;

			const context = canvas.current.getContext('2d', { alpha: true });
			if (!context) return;
			const progress = ScrollTrigger.getById('image-sequence')?.progress ?? 0;
			const nextFrame = Math.floor(progress * loadedImages.length);
			const nextImage = loadedImages[nextFrame];
			if (!nextImage) return;

			updateCanvasImage(context, canvas.current, nextImage);

			// ✨ Refresh ScrollTrigger for new positions
			ScrollTrigger.refresh();
		};
		handleViewportResize();
	}, [debouncedViewportSize]);

	return (
		<section ref={header} className='relative h-screen w-full overflow-hidden'>
			<div id='animation-wrapper' className='absolute inset-0 z-10'>
				<canvas ref={canvas} className='block h-full w-full' />
			</div>
		</section>
	);
};

const loadImagesAndDrawFirstFrame = async ({
	canvas,
	imageSrcs,
}: {
	canvas: HTMLCanvasElement;
	imageSrcs: string[];
}): Promise<HTMLImageElement[]> => {
	const images: HTMLImageElement[] = [];
	let loadedCount = 0;

	return new Promise<HTMLImageElement[]>((resolve, reject) => {
		const onImageLoad = (index: number, img: HTMLImageElement) => {
			// Draw the first frame ASAP
			if (index === 0) {
				const context = canvas.getContext('2d', { alpha: true });
				if (!context) return;
				updateCanvasImage(context, canvas, img);
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

const updateCanvasImage = (
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

export const ImageSequencePage = () => {
	return (
		<div className='relative flex w-full flex-col items-center'>
			{/* 背景亮光 */}
			<div className='radial-gradient pointer-events-none fixed inset-0 z-0 flex items-center justify-center'></div>
			{/* 标题 */}
			<div className='z-10 container mt-24 flex flex-col items-center px-4'>
				<img
					src='/images/assets/ethical-life-title.svg'
					alt='ethical-life'
					className='h-auto w-full'
				/>
			</div>
			{/* 动画瓶子 */}
			<div className='absolute inset-0 top-0 z-10 w-full max-w-360'>
				<ImageSequenceHeader />
			</div>
		</div>
	);
};
