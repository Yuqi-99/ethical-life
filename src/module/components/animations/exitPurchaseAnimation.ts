import gsap from 'gsap';
import type { RefObject } from 'react';

export const exitPurchaseAnimation = (
	tl: gsap.core.Timeline,
	containerRef: RefObject<HTMLElement>
) => {
	// exit white gradient background animation, change bg color
	tl.to(
		'#purchase-suggestion-section',
		{
			backgroundColor: '#f6f8ff',
			opacity: 1,
			duration: 3,
			ease: 'ease',
		},
		'shrink+=34'
	);

	tl.to(
		containerRef.current,
		{ backgroundColor: '#f6f8ff', opacity: 1, duration: 2, ease: 'none' },
		'shrink+=34'
	);

	// exit text animation
	const lines = gsap.utils.toArray<HTMLElement>('.purchase-suggestion-line');

	lines.forEach((line) => {
		const words = line.querySelectorAll('span');
		tl.to(
			words,
			{
				opacity: 0,
				stagger: { each: 0.1, from: 'start' },
				duration: 1,
				ease: 'none',
			},
			'shrink+=32.5'
		);
	});

	// exit grass deco animation
	tl.to(
		'#grass-deco',
		{
			autoAlpha: 0,
			y: '100vh',
			duration: 5, // Slightly longer for flow
			ease: 'power2.out',
		},
		'shrink+=34'
	);

	// exit card slide-in animation
	tl.to(
		'#purchase-card',
		{
			y: '-20vh',
			opacity: 0,
			scale: 0.5,
			duration: 3,
			ease: 'ease',
		},
		'shrink+=34'
	);
};
