import { useGSAP } from '@gsap/react';
import { useDidUpdate, useViewportSize } from '@mantine/hooks';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { loadImagesAndDrawFirstFrame } from '../utils/loadImagesAndDrawFirstFrame';
import { updateCanvasImage } from '../utils/updateCanvasImage';
import { AnimatedEthicalLifeLogo } from './AnimatedEthicalLifeLogo';
import { FloatingStars } from './FloatingStars';
import { useMediaQuery } from '../utils/useMediaQuery';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ImageSequenceSection = () => {
	const isMobile = useMediaQuery('(max-width: 768px)');
	const header = useRef<HTMLElement>(null);
	const canvas = useRef<HTMLCanvasElement>(null);
	const viewportSize = useViewportSize();
	const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>();
	const currentScale = isMobile ? 0.9 : 1;
	// ✨ Use a ref to track the current frame index across re-renders and resize events
	const frameProxy = useRef({ frame: 0 });

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

			// ✨ Set a fixed internal resolution to match the source images
			// This prevents distortion during window resizing, as CSS handles the scaling via object-fit
			canvas.current!.width = 1920;
			canvas.current!.height = 1080;

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
				isMobile: isMobile,
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

			const tl = gsap.timeline({
				scrollTrigger: {
					id: 'image-sequence',
					trigger: header.current,
					start: 'top top', // ✨ Start when the section hits the top
					end: '+=800', // ✨ Duration of the animation // ✨ Extended duration for sequence + shrink + text
					pin: true, // ✨ Pin the entire section
					invalidateOnRefresh: true, // ✨ 这个配置让 ScrollTrigger 自动处理 resize
					scrub: 1.5,
				},
			});

			// 0. 先处理 Subtitle 的消失 (在序列帧开始的同时或之前)
			tl.to('.subtitle', {
				scale: 0.4, // 缩小到 40%
				opacity: 0, // 完全透明
				y: 0,
				ease: 'expo.inOut',
				scrollTrigger: {
					start: 'top top',
					end: '+=200', // 在前 200px 滚动内完成
					scrub: 1, // 平滑跟随滚动
				},
			});

			// 1. Image sequence animation
			tl.to(
				frameProxy.current,
				{
					frame: loadedImages.length - 1,
					duration: 2,
					ease: 'none',
					onUpdate: () => {
						const nextFrame = Math.floor(frameProxy.current.frame);
						const nextImage = loadedImages[nextFrame];
						if (nextImage) {
							updateCanvasImage(context, canvas.current!, nextImage, currentScale);
						}
					},
				},
				0 // 0 表示和 subtitle 同时开始
			);

			// 2. Shrink + Opacity + Background Color
			// 我们创建一个 'shrink' 标签来对齐多个动作
			tl.add('shrink');

			// 2. Shrink sequence and change background color
			tl.to(
				'#animation-wrapper',
				{
					scale: 0.7,
					opacity: 0.4,
					y: 0,
					duration: 1,
					// ease: 'power2.inOut',
				},
				'shrink'
			);

			tl.to(
				header.current,
				{
					keyframes: {
						'0%': { backgroundColor: '#FEFCE8', opacity: 0.2 }, // tailwind yellow-50 (淡黄)
						'100%': { backgroundColor: '#DDF244', opacity: 1 }, // 你的目标亮黄
					},
					duration: 1,
					ease: 'none',
				},
				'shrink'
			);

			// 3. Reveal text
			tl.fromTo(
				'.text-reveal-section',
				{ opacity: 0, y: 100 },
				{ opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
				'shrink'
			);

			// Sequential text reveal for better effect
			tl.fromTo(
				'.text-reveal-content p',
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, stagger: 0.3, duration: 0.8 },
				'shrink+=0.2'
			);
		},
		{
			dependencies: [loadedImages],
			// scope: header,
		}
	);

	useDidUpdate(() => {
		const handleViewportResize = () => {
			if (viewportSize.width === 0 || viewportSize.height === 0 || !loadedImages) return;
			if (!canvas.current || !header.current) return;

			const context = canvas.current.getContext('2d', { alpha: true });
			if (!context) return;

			const st = ScrollTrigger.getById('image-sequence');
			if (st) {
				// Refresh ScrollTrigger and GSAP timelines
				ScrollTrigger.refresh();
			}

			// ✨ Immediately redraw the current frame to prevent flickering after canvas clear
			const currentFrame = Math.floor(frameProxy.current.frame);
			const currentImage = loadedImages[currentFrame];
			if (currentImage) {
				updateCanvasImage(context, canvas.current, currentImage, currentScale);
			}
		};
		handleViewportResize();
	}, [viewportSize]);

	return (
		<section ref={header} className='relative h-screen w-full overflow-hidden'>
			{/* Canvas Container */}
			<div
				id='animation-wrapper'
				className='absolute inset-0 z-10 flex items-center justify-center'
			>
				{/* <canvas ref={canvas} className='flex h-full w-full' style={{ objectFit: 'cover' }} /> */}
				<canvas 
  ref={canvas} 
  className='h-full w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' 
  style={{ objectFit: 'cover' }} 
/>
			</div>

			{/* Text Reveal Section */}
			<div className='text-reveal-section pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center opacity-0'>
				<div className='text-reveal-content flex max-w-4xl flex-col items-center gap-6'>
					<h2 className='text-4xl font-bold text-gray-900 sm:text-7xl'>Ethical Life</h2>
					<div className='space-y-4 text-lg font-medium text-gray-800 sm:text-2xl'>
						<p>
							We believe in total transparency. Every ingredient is carefully selected for its
							purity and efficacy.
						</p>
						<p>
							Born from a vision to revolutionize wellness, we bridge the gap between science and
							nature.
						</p>
						<p>
							Our commitment to ethics drives everything we do, from sustainable sourcing to
							clinical validation.
						</p>
						<p className='text-3xl font-bold sm:text-5xl'>Pure. Potent. Ethical.</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export const HomeSection = () => {
	return (
		<>
			{/* 背景亮光 */}
			<div className='radial-gradient pointer-events-none fixed inset-0 z-0 flex items-center justify-center'></div>
			{/* 标题 */}
			<div className='fixed z-10 container mt-28 flex flex-col items-center px-4'>
				<AnimatedEthicalLifeLogo className='w-full' />
			</div>
			{/* 动画瓶子 */}
			<div className='absolute inset-0 top-0 z-10 w-full max-w-360'>
				<ImageSequenceSection />
			</div>

			{/* Subtitle */}
			<div className='subtitle fixed bottom-8 text-center text-xl font-semibold sm:text-3xl'>
				<p>Pharmacist and Nutritionist</p>
				<p>Formulated.</p>
			</div>

			<FloatingStars />
		</>
	);
};
