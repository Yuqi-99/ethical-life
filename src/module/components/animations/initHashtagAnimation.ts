import gsap from 'gsap';
import type { RefObject } from 'react';

export const initHashtagAnimation = (tl: gsap.core.Timeline, isMobile: boolean) => {
	const lines = gsap.utils.toArray<HTMLElement>('.hashtag-line');

	lines.forEach((line) => {
		const words = line.querySelectorAll('span');
		tl.fromTo(
			words,
			{ opacity: 0 },
			{
				opacity: 1,
				stagger: 0.1,
				duration: 3,
				ease: 'none',
			},
			isMobile ? 'shrink+=14' : 'shrink+=13'
		);
	});
};

export const exitHashtagAnimation = (tl: gsap.core.Timeline, isMobile: boolean) => {
	tl.to(
		'#hasgtag-section',
		{ opacity: 0, scale: 0.8, duration: 0.5, ease: 'none' },
		isMobile ? 'shrink+=18' : 'shrink+=17'
	);
};

export const addExitBackgroundAnimation = (
	tl: gsap.core.Timeline,
	containerRef: RefObject<HTMLElement>,
	isMobile: boolean
) => {
	tl.to(
		containerRef.current,
		{ backgroundColor: '#DDF244', opacity: 0.8, duration: 3, ease: 'none' },
		isMobile ? 'shrink+=17' : 'shrink+=16'
	);
};
