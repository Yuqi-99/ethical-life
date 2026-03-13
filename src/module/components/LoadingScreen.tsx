import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLoading } from '../../context/LoadingContext';

export const LoadingScreen: React.FC = () => {
	const { progress, isLoading } = useLoading();
	const screenRef = useRef<HTMLDivElement>(null);
	const bottleRef = useRef<HTMLImageElement>(null);
	const textCircleRef = useRef<HTMLImageElement>(null);
	const textCircleRef2 = useRef<HTMLImageElement>(null);
	const textCircleRef3 = useRef<HTMLImageElement>(null);

	// 旋转动画（一直跑）
	useEffect(() => {
		gsap.fromTo(
			bottleRef.current,
			{ opacity: 0, scale: 0.5 },
			{ opacity: 1, scale: 1, duration: 0.5, ease: 'none' }
		);

		// 初始隐藏所有圆圈
		gsap.set([textCircleRef.current, textCircleRef2.current, textCircleRef3.current], {
			opacity: 0,
			scale: 0.8,
		});

		gsap.to(textCircleRef.current, { rotation: 360, duration: 15, repeat: -1, ease: 'none' });
		gsap.to(textCircleRef2.current, { rotation: 360, duration: 15, repeat: -1, ease: 'none' });
		gsap.to(textCircleRef3.current, { rotation: 360, duration: 15, repeat: -1, ease: 'none' });
	}, []);

	// ✨ 根据 progress 控制圆圈出现
	useEffect(() => {
		// 第一圈：progress >= 33 出现
		if (progress >= 15) {
			gsap.to(textCircleRef.current, {
				opacity: 1,
				scale: 1,
				duration: 1,
				ease: 'back.out(1.7)',
			});
		}
		// 第二圈：progress >= 66 出现
		if (progress >= 35) {
			gsap.to(textCircleRef2.current, {
				opacity: 1,
				scale: 1,
				duration: 1,
				ease: 'back.out(1.7)',
			});
		}
		// 第三圈：progress >= 100 出现
		if (progress >= 65) {
			gsap.to(textCircleRef3.current, {
				opacity: 1,
				scale: 1,
				duration: 1,
				ease: 'back.out(1.7)',
			});
		}
	}, [progress]);

	// ✨ loading 结束：整个 screen 放大消失
	useEffect(() => {
		if (!isLoading) {
			gsap.to(screenRef.current, {
				scale: 3, // 放大
				opacity: 0.9, // 同时淡出
				duration: 0.8,
				ease: 'power2.in',
				onComplete: () => {
					if (screenRef.current) {
						screenRef.current.style.display = 'none';
					}
				},
			});
		}
	}, [isLoading]);

	return (
		<div
			ref={screenRef}
			className='z-loading fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-[#DDF244]'
		>
			{/* Logo at Top */}
			<div className='absolute top-12 flex w-full justify-center px-4'>
				<img
					src='/images/assets/ethical-life-title.svg'
					alt='Ethical Life'
					className='h-8 md:h-10'
				/>
			</div>

			{/* Center Content */}
			<div className='relative flex h-90 w-[90%] items-center justify-center md:h-112.5 lg:w-2/3'>
				{/* Rotating Circular Text */}
				<div className='pointer-events-none absolute h-full w-full'>
					<img
						ref={textCircleRef}
						src='/images/assets/text-curve-1.svg'
						alt=''
						className='absolute h-full w-full'
					/>
					<img
						ref={textCircleRef2}
						src='/images/assets/text-curve-2.svg'
						alt=''
						className='absolute h-full w-full'
					/>
					<img
						ref={textCircleRef3}
						src='/images/assets/text-curve-3.svg'
						alt=''
						className='absolute h-full w-full'
					/>
				</div>

				{/* Bottle */}
				<img
					ref={bottleRef}
					src='/images/s1_frames/S1_00166.webp'
					alt='Product Bottle'
					className='z-10 max-w-150'
				/>

				{/* Progress */}
				<div className='absolute inset-0 hidden items-center justify-between sm:flex'>
					<span className='text-blue-main mr-2 text-sm font-bold sm:mr-0 md:text-xl'>LOADING</span>
					<span className='text-blue-main text-sm font-bold md:text-xl'>{progress}%</span>
				</div>
			</div>
			<div className='absolute bottom-6 mx-16 flex items-center justify-between sm:hidden'>
				<span className='text-blue-main mr-2 text-sm font-bold sm:mr-0 md:text-xl'>LOADING</span>
				<span className='text-blue-main text-sm font-bold md:text-xl'>{progress}%</span>
			</div>
		</div>
	);
};
