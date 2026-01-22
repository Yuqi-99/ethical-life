import { useGSAP } from '@gsap/react';
import { useDidUpdate, useViewportSize } from '@mantine/hooks';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { loadImagesAndDrawFirstFrame } from '../utils/loadImagesAndDrawFirstFrame';
import { updateCanvasImage } from '../utils/updateCanvasImage';
import { AnimatedEthicalLifeLogo } from './AnimatedEthicalLifeLogo';
import { FloatingStars } from './FloatingStars';
gsap.registerPlugin(ScrollTrigger, useGSAP);

const ImageSequenceSection = () => {
	const header = useRef<HTMLElement>(null);
	const canvas = useRef<HTMLCanvasElement>(null);
	const viewportSize = useViewportSize();
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
				end: '+=300',
				// end: 'bottom 20%', // ✨ Duration of the animation
				pin: true, // ✨ Pin the entire section
				invalidateOnRefresh: true, // ✨ 这个配置让 ScrollTrigger 自动处理 resize
				onUpdate: ({ progress }) => {
					const nextFrame = Math.floor(progress * loadedImages.length);
					const nextImage = loadedImages[nextFrame];
					if (!nextImage) return;
					updateCanvasImage(context, canvas.current!, nextImage);
				},
			});
		},
		{
			dependencies: [loadedImages],
			scope: header,
		}
	);

	// ✨ Subtitle timeline 动画
	const exp = gsap.timeline();
	exp.to('.subtitle', {
		scale: 0.4, // 缩小到 40%
		opacity: 0, // 完全透明
		y: 0,
		ease: 'power2.inOut',
		scrollTrigger: {
			start: 'top top',
			end: '+=200', // 在前 200px 滚动内完成
			scrub: 1.5, // 平滑跟随滚动
		},
	});

	useDidUpdate(() => {
		const handleViewportResize = () => {
			if (viewportSize.width === 0 || viewportSize.height === 0 || !loadedImages) return;
			if (!canvas.current || !header.current) return;

			// ✨ Get the latest container dimensions
			const containerWidth = header.current.clientWidth;
			const containerHeight = header.current.clientHeight;

			// ✨ Update canvas resolution instantly to match its size
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
	}, [viewportSize]);

	return (
		<section ref={header} className='relative h-screen w-full overflow-hidden'>
			<div id='animation-wrapper' className='absolute inset-0 z-10'>
				<canvas ref={canvas} className='block h-full w-full' />
			</div>
		</section>
	);
};

export const ImageSequencePage = () => {
	return (
		<div className='relative flex min-h-screen w-full flex-col items-center'>
			{/* 背景亮光 */}
			<div className='radial-gradient pointer-events-none fixed inset-0 z-0 flex items-center justify-center'></div>
			{/* 标题 */}
			<div className='z-10 container mt-28 flex flex-col items-center px-4'>
				<AnimatedEthicalLifeLogo className='w-full' />
			</div>
			{/* 动画瓶子 */}
			<div className='absolute inset-0 top-0 z-10 w-full max-w-360'>
				<ImageSequenceSection />
			</div>

			{/* Subtitle */}
			<div className='subtitle fixed bottom-8 text-center text-3xl font-semibold'>
				<p>Pharmacist and Nutritionist</p>
				<p>Formulated.</p>
			</div>

			<FloatingStars />
		</div>
	);
};
