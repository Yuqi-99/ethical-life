import gsap from 'gsap';
import type { RefObject } from 'react';

export const exitPurchaseAnimation = (
	tl: gsap.core.Timeline,
	containerRef: RefObject<HTMLElement>,
	isDesktop: boolean
) => {
	// exit white gradient background animation, change bg color
	tl.to(
		'#purchase-suggestion-gradient',
		{
			// y: 0,
			backgroundColor: '#F0F4FC',
			opacity: 1,
			duration: 3,
			ease: 'ease',
		},
		isDesktop ? 'shrink+=34' : 'shrink+=30'
	);

	tl.to(
		containerRef.current,
		{ backgroundColor: '#F0F4FC', opacity: 1, duration: 2, ease: 'none' },
		isDesktop ? 'shrink+=34' : 'shrink+=30'
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
			isDesktop ? 'shrink+=32.5' : 'shrink+=28.5'
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
		isDesktop ? 'shrink+=36' : 'shrink+=30'
	);

	// exit card slide-in animation
	tl.to(
		'#purchase-card',
		{
			y: '-50vh',
			opacity: 0,
			scale: 0.8,
			duration: 3,
			ease: 'ease',
		},
		'shrink+=36'
	);

	// Move bottle to bottom center and fix it there
	tl.to(
		'#purchase-bottle-wrapper',
		{
			position: 'fixed',
			left: '50%',
			xPercent: -50,
			top: 'auto',
			bottom: 0,
			scale: 1.2,
			yPercent: 25,
			duration: 5,
			ease: 'power2.inOut',
		},
		'shrink+=34'
	);
};
