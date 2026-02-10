import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { loadImagesAndDrawFirstFrame } from '../utils/loadImagesAndDrawFirstFrame';
import { updateCanvasImage } from '../utils/updateCanvasImage';
import { AnimatedEthicalLifeLogo } from './AnimatedEthicalLifeLogo';
import { FloatingStars } from './FloatingStars';
import { useMediaQuery } from '../utils/useMediaQuery';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const ImageSequenceSection = () => {
	const isMobile = useMediaQuery('(max-width: 768px)');
	const containerRef = useRef<HTMLElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>();
	const currentScale = isMobile ? 0.9 : 1;

	// ✨ Use a ref to track the current frame index across re-renders and resize events
	const frameProxy = useRef({ frame: 0 });

	// 1. 初始化加载图片
	useEffect(() => {
		if (!canvasRef.current || loadedImages) return;

		const initialSetup = async () => {
			// 设置 Canvas 原始分辨率 (16:9)
			canvasRef.current!.width = 1920;
			canvasRef.current!.height = 1080;

			const startFrame = 160;
			const totalFrames = 259;
			const imageSrcs = Array.from({ length: totalFrames }, (_, i) => {
				const frameNumber = (startFrame + i).toString().padStart(5, '0');
				return `/images/s1_frames/S1_${frameNumber}.webp`;
			});

			const images = await loadImagesAndDrawFirstFrame({
				canvas: canvasRef.current!,
				imageSrcs,
				isMobile: isMobile,
			});
			setLoadedImages(images);
		};

		initialSetup();
	}, [loadedImages]);

	// 2. GSAP 核心动画
	useGSAP(
		() => {
			if (!loadedImages || !containerRef.current || !canvasRef.current) return;

			const context = canvasRef.current.getContext('2d', { alpha: true });
			if (!context) return;

			// 创建主时间轴
			const tl = gsap.timeline({
				scrollTrigger: {
					id: 'image-sequence',
					trigger: containerRef.current, // 以整个长容器为触发器
					start: 'top top',
					end: 'bottom bottom', // 滚到容器底部才结束
					scrub: 1.5,
					invalidateOnRefresh: true,
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
							updateCanvasImage(context, canvasRef.current!, nextImage, currentScale);
						}
					},
				},
				0
			);

			// 2. Shrink + Opacity + Background Color
			// 我们创建一个 'shrink' 标签来对齐多个动作
			tl.add('shrink');

			// --- 动画步骤 2: 瓶子缩小并变淡 (当文字出现时) ---
			// 使用 'label' 或者相对位置，比如在序列帧播放到 60% 的时候开始缩小
			tl.to(
				'#animation-wrapper',
				{
					scale: 0.7,
					opacity: 0.4,
					y: 0,
					duration: 1,
				},
				'shrink'
			);

			// --- 动画步骤 3: 背景色切换 ---
			tl.to(
				containerRef.current,
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
		{ dependencies: [loadedImages] }
	);

	return (
		<section ref={containerRef} className='relative w-full'>
			{/* ✨ 粘性层 (Sticky Layer)
         它会固定在视口，不随页面滚动，直到父容器被滚完。
      */}
			<div className='pointer-events-none sticky top-0 z-10 h-screen w-full overflow-hidden'>
				<div
					id='animation-wrapper'
					className='flex h-full w-full items-center justify-center transition-transform'
				>
					<canvas ref={canvasRef} className='h-full w-full object-cover' />
				</div>
			</div>

			{/* ✨ 内容层 (Content Layer)
         这里是真正撑开高度的地方。
      */}
			<div className='relative z-20 w-full'>
				{/* 第一屏留白：让用户先看序列帧动画 */}
				<div className='h-screen w-full' />

				{/* 文字内容：这部分会向上滚动，盖在或伴随 Canvas 出现 */}
				<div className='flex flex-col items-center px-6 text-center'>
					<div className='max-w-4xl space-y-24'>
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
										Born from a vision to revolutionize wellness, we bridge the gap between science
										and nature.
									</p>
									<p>
										Our commitment to ethics drives everything we do, from sustainable sourcing to
										clinical validation.
									</p>
									<p className='text-3xl font-bold sm:text-5xl'>Pure. Potent. Ethical.</p>
								</div>
							</div>

							{/* 底部留白，确保动画能完整执行完 */}
							{/* <div className='h-[20vh]' /> */}
						</div>
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
