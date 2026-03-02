import gsap from 'gsap';
import type { RefObject } from 'react';

export const initHashtagAnimation = (tl: gsap.core.Timeline) => {
	const lines = gsap.utils.toArray<HTMLElement>('.hashtag-line');

	lines.forEach((line) => {
		const words = line.querySelectorAll('span');
		tl.fromTo(
			words,
			{ opacity: 0 },
			{
				opacity: 1,
				stagger: 0.1,
				duration: 0.5,
				ease: 'none',
			},
			'shrink+=11'
		);
	});
};

export const exitHashtagAnimation = (tl: gsap.core.Timeline) => {
	tl.to(
		'#hasgtag-section',
		{ opacity: 0, scale: 0.8, duration: 0.5, ease: 'none' },
		'shrink+=11.7'
	);
};

export const addExitBackgroundAnimation = (
	tl: gsap.core.Timeline,
	containerRef: RefObject<HTMLElement>
) => {
	tl.to(
		containerRef.current,
		{ backgroundColor: '#DDF244', opacity: 0.8, duration: 1.5, ease: 'none' },
		'shrink+=11.7'
	);
};
