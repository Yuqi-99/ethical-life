import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '../utils/cn';

interface AnimatedNavProps {
	items: React.ReactNode[];
	itemWidth?: string;
	left?: boolean;
}

export const AnimatedNav = ({ items, itemWidth = 'w-20', left = false }: AnimatedNavProps) => {
	const navRef = useRef<HTMLDivElement>(null);
	const bgRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const nav = navRef.current;
		const bg = bgRef.current;
		if (!nav || !bg) return;

		const navItems = Array.from(nav.querySelectorAll<HTMLDivElement>('.nav-item'));

		const showBg = (item: HTMLElement) => {
			const itemRect = item.getBoundingClientRect();
			const navRect = nav.getBoundingClientRect();

			gsap.to(bg, {
				x: itemRect.left - navRect.left,
				width: itemRect.width,
				scaleX: 1.08,
				opacity: 1,
				duration: 0.45,
				ease: 'expo.out',
				overwrite: 'auto',
				onComplete: () => {
					gsap.to(bg, {
						scaleX: 1,
						duration: 0.25,
						ease: 'power3.out',
					});
				},
			});
		};

		navItems.forEach((item) => {
			item.addEventListener('mouseenter', () => {
				showBg(item);
			});

			item.addEventListener('mouseleave', () => {});
		});

		nav.addEventListener('mouseleave', () => {
			gsap.to(bg, {
				opacity: 0,
				duration: 0.3,
				ease: 'power2.out',
			});
		});
	}, []);

	return (
		<div
			ref={navRef}
			className={cn(
				'relative flex h-fit justify-between rounded-full border border-solid border-gray-100 bg-white p-2 uppercase',
				left ? 'justify-self-start' : 'justify-self-end'
			)}
		>
			<div
				ref={bgRef}
				className='pointer-events-none absolute top-1/2 left-0 h-8 -translate-y-1/2 rounded-full bg-gray-100 opacity-0'
			/>

			{items.map((content, index) => (
				<div
					key={index}
					className={cn(
						'nav-item relative h-6 w-20 cursor-pointer perspective-midrange',
						itemWidth
					)}
				>
					<span className='absolute inset-0 flex items-center justify-center text-sm font-medium'>
						{content}
					</span>
				</div>
			))}
		</div>
	);
};
