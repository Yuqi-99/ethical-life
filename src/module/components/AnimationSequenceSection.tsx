import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { loadImagesAndDrawFirstFrame } from '../../utils/loadImagesAndDrawFirstFrame';
import { updateCanvasImage } from '../../utils/updateCanvasImage';
import { useMediaQuery } from '../../utils/useMediaQuery';
import { AnimatedEthicalLifeLogo } from './AnimatedEthicalLifeLogo';
import { addCardImageAnimation } from './animations/addCardImageAnimation';
import { addExitAnimation } from './animations/addExitAnimation';
import { addTextRevealAnimation } from './animations/addTextRevealAnimation';
import { exitPurchaseAnimation } from './animations/exitPurchaseAnimation';
import { exitSecondDescriptionAnimation } from './animations/exitSecondDescriptionAnimation';
import {
	addExitBackgroundAnimation,
	exitHashtagAnimation,
	initHashtagAnimation,
} from './animations/initHashtagAnimation';
import { initPurchaseSuggestionAnimation } from './animations/initPurchaseSuggestionAnimation';
import { initSecondDescriptionAnimation } from './animations/initSecondDescriptionAnimation';
import { exitVoicesAnimation, initVoicesAnimation } from './animations/initVoicesAnimation';
import { initVoicesCardsAnimation } from './animations/initVoicesCardsAnimation';
import { initVoicesFloatingStarsAnimation } from './animations/initVoicesFloatingStarsAnimation';
import { DescriptionSection } from './DescriptionSection';
import { FloatingStars } from './FloatingStars';
import { HashtagSection } from './HashtagSection';
import { PurchaseSuggestionSection } from './PurchaseSuggestionSection';
import { SecondDescriptionSection } from './SecondDescriptionSection';
import { VoiceOfEthicalLife } from './VoiceOfEthicalLife';
import { Footer } from './Footer';
import { initFooterAnimation } from './animations/InitFooterAnimation';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const AnimationSequenceSection = () => {
	const isMobile = useMediaQuery('(max-width: 768px)');
	const isDesktop = useMediaQuery('(min-width: 1024px)');
	const containerRef = useRef<HTMLElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvasRef2 = useRef<HTMLCanvasElement>(null);
	const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>();
	const [loadedImages2, setLoadedImages2] = useState<HTMLImageElement[]>();
	const currentScale = isMobile ? 0.9 : 1;

	// ✨ Use a ref to track the current frame index across re-renders and resize events
	const frameProxy = useRef({ frame: 0 });
	const frameProxy2 = useRef({ frame: 0 });
	const lastFrameDrawn1 = useRef(-1);
	const lastFrameDrawn2 = useRef(-1);

	// 1. 初始化加载图片 (Section 1)
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
	}, [loadedImages, isMobile]);

	// 1.1 初始化加载图片 (Purchase Suggestion Section) 最后瓶子的图片
	useEffect(() => {
		if (!canvasRef2.current || loadedImages2) return;

		const initialSetup = async () => {
			canvasRef2.current!.width = 1920;
			canvasRef2.current!.height = 1080;

			const startFrame = 49;
			const totalFrames = 422; // 470 - 49 + 1
			const imageSrcs = Array.from({ length: totalFrames }, (_, i) => {
				const frameNumber = (startFrame + i).toString().padStart(5, '0');
				return `/images/s2_frames/S2_${frameNumber}.webp`;
			});

			const images = await loadImagesAndDrawFirstFrame({
				canvas: canvasRef2.current!,
				imageSrcs,
				isMobile: isMobile,
			});
			setLoadedImages2(images);
		};

		initialSetup();
	}, [loadedImages2, isMobile]);

	// 2. GSAP 核心动画
	useGSAP(
		() => {
			if (!loadedImages || !loadedImages2 || !containerRef.current || !canvasRef.current) return;

			const context = canvasRef.current.getContext('2d', { alpha: true });
			if (!context) return;

			// 创建主时间轴
			const tl = gsap.timeline({
				scrollTrigger: {
					id: 'image-sequence',
					trigger: containerRef.current, // 以整个长容器为触发器
					start: 'top top',
					// end: '+=3800',
					end: 'bottom bottom', // 滚到容器底部才结束
					scrub: 2.5,
					invalidateOnRefresh: true,
				},
			});

			// 0. 先处理 Subtitle 的消失 (在序列帧开始的同时或之前)
			gsap.fromTo(
				'.subtitle',
				{ scale: 1, opacity: 1 },
				{
					scale: 0.4, // 缩小到 40%
					opacity: 0, // 完全透明
					y: 0,
					ease: 'expo.inOut',
					scrollTrigger: {
						trigger: containerRef.current,
						start: 'top top',
						end: '+=300', // 在前 600px 滚动内完成
						scrub: 2, // 平滑跟随滚动
						invalidateOnRefresh: true,
					},
				}
			);

			// 1. Image sequence animation
			tl.fromTo(
				frameProxy.current,
				{ frame: 0 },
				{
					frame: loadedImages.length - 1,
					duration: 3,
					ease: 'none',
					onUpdate: () => {
						const nextFrame = Math.floor(frameProxy.current.frame);
						if (nextFrame === lastFrameDrawn1.current) return;
						lastFrameDrawn1.current = nextFrame;

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
			tl.fromTo(
				'#animation-wrapper',
				{ scale: 1, opacity: 1 },
				{
					scale: 0.7,
					opacity: 0.3,
					y: 0,
					duration: 0.3,
				},
				'shrink'
			);

			// --- 动画步骤 3: 背景色切换（浅到深） ---
			tl.fromTo(
				containerRef.current,
				{ backgroundColor: 'transparent' },
				{
					backgroundColor: '#DDF244',
					duration: 3,
					ease: 'none',
				},
				'shrink'
			);

			// 3. Reveal text
			// 在 useGSAP 中修改文字动画逻辑：
			addTextRevealAnimation(tl);

			// 4. 图片展开动画
			addCardImageAnimation(tl);

			// 5. 瓶子, 文字和图片缩小动画
			// 6. 背景再次变换（深到浅）
			addExitAnimation(tl, containerRef as RefObject<HTMLElement>);

			// 7. 产品评论（voices section）
			initVoicesAnimation(tl);
			// 8. 产品评论（voices section）星星飘起
			initVoicesFloatingStarsAnimation(tl, isMobile);
			// 9. 产品评论（voices section）卡片弧线出现
			initVoicesCardsAnimation(tl);
			// 10. 产品评论（voices section）文字逐渐消失
			exitVoicesAnimation(tl);

			// 11. Hashtag section
			initHashtagAnimation(tl, isMobile);
			exitHashtagAnimation(tl, isMobile);
			addExitBackgroundAnimation(tl, containerRef as RefObject<HTMLElement>, isMobile);

			// 12. Second description section (description出现 + 背景变换)
			initSecondDescriptionAnimation(tl, isMobile, isDesktop);
			exitSecondDescriptionAnimation(tl, containerRef as RefObject<HTMLElement>, isDesktop);

			// 13. Puchase suggestion section
			initPurchaseSuggestionAnimation(
				tl,
				loadedImages2,
				frameProxy2,
				lastFrameDrawn2,
				canvasRef2,
				currentScale,
				isDesktop
			);
			exitPurchaseAnimation(tl, containerRef as RefObject<HTMLElement>, isDesktop);

			// 14. Footer section
			initFooterAnimation(tl, isDesktop);

			// ✨ 手动同步初始状态，防止中途刷新时图片停留在第一帧
			const syncInitialFrame = () => {
				if (tl.scrollTrigger) {
					tl.scrollTrigger.refresh(); // 强制重新计算进度
					const currentProgress = tl.scrollTrigger.progress;

					// Sync Bottle 1 (Master Timeline Progress 0 to 1)
					// Handle frame calculation based on timeline progress
					// We iterate through children to find the specific frameProxy animations if needed,
					// but since it starts at 0, master progress is okay for Bottle 1.
					frameProxy.current.frame = currentProgress * (loadedImages.length - 1);
					const syncFrame = Math.floor(frameProxy.current.frame);
					const syncImage = loadedImages[syncFrame];
					if (syncImage) {
						updateCanvasImage(context, canvasRef.current!, syncImage, currentScale);
					}

					// Sync Bottle 2
					if (loadedImages2 && canvasRef2.current) {
						const context2 = canvasRef2.current.getContext('2d', { alpha: true });
						if (context2) {
							// For Bottle 2, we need to find its progress in the timeline.
							// However, a simple way is to seek(tl.duration() * currentProgress)
							// and then update the canvas from the updated frameProxy.

							// Seek to current progress to update all frame proxies in the timeline
							tl.progress(currentProgress);

							const syncFrame2 = Math.floor(frameProxy2.current.frame);
							const syncImage2 = loadedImages2[syncFrame2];
							if (syncImage2) {
								updateCanvasImage(context2, canvasRef2.current!, syncImage2, currentScale);
							}
						}
					}
				}
			};

			// 1. 立即同步
			syncInitialFrame();
		},
		{ dependencies: [loadedImages, loadedImages2] }
	);

	return (
		<section ref={containerRef} className='relative w-full'>
			{/* 第一个section（瓶子） */}
			{/* ✨ 粘性层 (Sticky Layer)
         它会固定在视口，不随页面滚动，直到父容器被滚完。
      */}
			<div className='pointer-events-none sticky top-0 z-10 h-screen w-full overflow-hidden'>
				<div
					id='animation-wrapper'
					className='flex h-full w-full items-center justify-center transition-transform'
				>
					<canvas ref={canvasRef} className='h-full w-full object-cover will-change-transform' />
				</div>
			</div>

			{/* 第二个section（文字） */}
			{/* ✨ 文字层：fixed 固定在屏幕中间 */}
			<DescriptionSection />

			{/* 第三个section（产品评论） */}
			<VoiceOfEthicalLife />

			{/* 第四个section (Hashtag) */}
			<HashtagSection />

			{/* 第五个section (第二个decription描述) */}
			<SecondDescriptionSection />

			{/* 第六个section (purchase plan) */}
			<PurchaseSuggestionSection canvasRef={canvasRef2} />

			{isDesktop && <Footer />}

			{/* ✨ 扩产for scroll */}
			<div className='pointer-events-none relative z-20 w-full'>
				<div className='h-screen w-full' />
				<div className='h-screen w-full' />
				<div className='h-screen w-full' />
				<div className='h-screen w-full' />
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
			<div className='relative w-full max-w-360'>
				<AnimationSequenceSection />
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
