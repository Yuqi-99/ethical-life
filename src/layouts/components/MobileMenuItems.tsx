import gsap from 'gsap';
import { useRef } from 'react';

type TMobilemenuItem = {
	label: string;
	link?: string;
	isSocial?: boolean;
};

export const MobileMenuItem = ({ label, link, isSocial = false }: TMobilemenuItem) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const isAnimating = useRef(false); // 锁，防止快速划过导致动画乱套

	const onMouseEnter = () => {
		// 如果动画正在进行，则不触发新的
		if (isAnimating.current) return;

		const chars = containerRef.current?.querySelectorAll('.char-wrapper');
		if (!chars || chars.length === 0) return;

		isAnimating.current = true;

		// 创建一个时间轴来处理这组动画
		const tl = gsap.timeline({
			onComplete: () => {
				// 重点：动画结束后，瞬间把所有字母复位到 0，不带任何动画
				// 因为第一层和第二层长得一样，用户看不出它们换位了
				const allChars = containerRef.current!.querySelectorAll('.first, .second');
				gsap.set(allChars, { yPercent: 0 });
				isAnimating.current = false;
			},
		});

		chars.forEach((charContainer, i) => {
			const first = charContainer.querySelector('.first');
			const second = charContainer.querySelector('.second');

			tl.to(
				[first, second],
				{
					yPercent: -100,
					duration: 0.5,
					ease: 'power3.inOut',
				},
				i * 0.05 // 逐字交错的时间偏移
			);
		});
	};

	return (
		<div
			ref={containerRef}
			onMouseEnter={onMouseEnter}
			className='mobile-menu-item relative cursor-pointer overflow-hidden py-3'
		>
			<div className='flex'>
				{label.split('').map((char, i) => (
					<>
						{!isSocial && (
							<span key={i} className='char-wrapper relative block h-10 overflow-hidden'>
								{/* 第一排文字 */}
								<span className='first block text-4xl leading-none font-medium'>
									{char === ' ' ? '\u00A0' : char}
								</span>

								{/* 第二排文字：绝对定位在第一排的正下方 (100%) */}
								<span className='second absolute top-0 left-0 block translate-y-full text-4xl leading-none font-medium'>
									{char === ' ' ? '\u00A0' : char}
								</span>
							</span>
						)}

						{isSocial && (
							<a
								target='_blank'
								href={link}
								key={i}
								className='char-wrapper relative block h-3.5 overflow-hidden'
							>
								{/* 第一排文字 */}
								<span className='first block text-sm leading-none font-medium uppercase'>
									{char === ' ' ? '\u00A0' : char}
								</span>

								{/* 第二排文字：绝对定位在第一排的正下方 (100%) */}
								<span className='second absolute top-0 left-0 block translate-y-full text-sm leading-none font-medium uppercase'>
									{char === ' ' ? '\u00A0' : char}
								</span>
							</a>
						)}
					</>
				))}
			</div>
		</div>
	);
};
