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
					end: '+=1200',
					// end: 'bottom bottom', // 滚到容器底部才结束
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
					opacity: 0.3,
					y: 0,
					duration: 0.3,
				},
				'shrink'
			);

			// --- 动画步骤 3: 背景色切换 ---
			tl.to(
				containerRef.current,
				{
					keyframes: {
						'0%': { backgroundColor: '#FEFCE8', opacity: 0.2 },
						'100%': { backgroundColor: '#DDF244', opacity: 1 },
					},
					duration: 3,
					ease: 'none',
				},
				'shrink'
			);

			// 3. Reveal text
			// 在 useGSAP 中修改文字动画逻辑：
			const lines = gsap.utils.toArray<HTMLElement>('.highlight-line');

			lines.forEach((line) => {
				const words = line.querySelectorAll('span');

				tl.fromTo(
					words,
					{ opacity: 0 }, // 初始：完全透明
					{
						opacity: 1, // 终止：完全不透明
						stagger: {
							each: 0.1, // 每个词的间隔，调小一点更流畅
							from: 'start', // 从左到右
						},
						duration: 1,
						ease: 'none',
					},
					'shrink' // ✨ 和瓶子缩小同一时间开始
				);
			});

			// 4. 图片展开动画
			const cards = gsap.utils.toArray<HTMLElement>('.card-image');

			cards.forEach((card) => {
				tl.fromTo(
					card,
					{
						width: 0,
						opacity: 0,
					},
					{
						width: 150,
						opacity: 1,
						// 让图片可以靠近字一点
						marginLeft: '-18px',
						marginRight: '-18px',
						duration: 0.4,
						ease: 'power2.out',
					},
					`shrink+=5` // 等所有的字都出现后在跑这个图片animation
				);
			});
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
				<div className='h-screen w-full' />

				{/* ✨ 占位撑高，控制整体滚动距离 */}
				<div className='h-screen w-full' />
			</div>

			{/* ✨ 文字层：fixed 固定在屏幕中间 */}
			<div className='pointer-events-none fixed inset-0 z-30 flex items-center justify-center px-6 text-center'>
				<div className='max-w-5xl'>
					<p className='highlight-line inline text-2xl font-bold md:text-3xl lg:text-5xl'>
						{/* 第一段 */}
						{'Our gummy supplements'.split(' ').map((word, i) => (
							<span key={`a-${i}`} className='mr-3 inline-block opacity-0'>
								{word}
							</span>
						))}

						{/* ✨ 图片1：人物图，插在 supplements 后面 */}
						<span
							className='card-image hidden overflow-hidden rounded-2xl align-middle md:inline-block'
							style={{
								marginTop: '-18px',
								marginBottom: '-18px',
								height: '85px',
								width: '0px',
								opacity: 0,
								verticalAlign: 'middle',
								position: 'relative',
								zIndex: -1,
							}}
						>
							<img
								src='/images/text-im-1-300x179.jpg'
								className='h-full w-full object-cover'
								alt=''
							/>
						</span>

						{/* 第二段 */}
						{'are Pharmacist/Nutritionist formulated, 100% vegan, cruelty free, gelatin free, pectin based, non GMO,'
							.split(' ')
							.map((word, i) => (
								<span key={`b-${i}`} className='mr-3 inline-block opacity-0'>
									{word}
								</span>
							))}

						{/* ✨ 图片2：风景图，插在 non GMO, 后面 */}
						<span
							className='card-image hidden overflow-hidden rounded-2xl align-middle md:inline-block'
							style={{
								marginTop: '-18px',
								marginBottom: '-18px',
								height: '85px',
								width: '0px',
								opacity: 0,
								verticalAlign: 'middle',
								position: 'relative',
								zIndex: -1,
							}}
						>
							<img
								src='/images/text-im-2-300x172.png'
								className='h-full w-full object-cover'
								alt=''
							/>
						</span>

						{/* 第三段*/}
						{'free from any artificial colors or flavors, manufactured in a GMP & FDA registered facility in US, packaged in recycled bottles.'
							.split(' ')
							.map((word, i) => (
								<span key={`c-${i}`} className='mr-3 inline-block opacity-0'>
									{word}
								</span>
							))}
					</p>
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
