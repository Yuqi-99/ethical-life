import gsap from 'gsap';
import type { RefObject } from 'react';
import { updateCanvasImage } from '../../../utils/updateCanvasImage';

export const initPurchaseSuggestionAnimation = (
	tl: gsap.core.Timeline,
	loadedImages: HTMLImageElement[] | undefined,
	frameProxy: RefObject<{ frame: number }>,
	lastFrameDrawn: RefObject<number>,
	canvasRef: RefObject<HTMLCanvasElement | null>,
	currentScale: number,
	isDesktop: boolean
) => {
	tl.fromTo(
		'#purchase-suggestion-section',
		{
			visibility: 'hidden',
			y: '100vh',
		},
		{
			visibility: 'visible',
			y: 0,
			opacity: 1,
			duration: 7,
			ease: 'ease',
		},
		isDesktop ? 'shrink+=22' : 'shrink+=24'
	);

	// white gradient background animation
	tl.fromTo(
		'#purchase-suggestion-gradient',
		{
			y: '100vh',
			opacity: 1,
		},
		{
			y: 0,
			opacity: 1,
			duration: 7,
			ease: 'ease',
		},
		isDesktop ? 'shrink+=22' : 'shrink+=24'
	);

	// text animation
	const lines = gsap.utils.toArray<HTMLElement>('.purchase-suggestion-line');

	lines.forEach((line) => {
		const words = line.querySelectorAll('span');
		tl.fromTo(
			words,
			{ opacity: 0 },
			{
				opacity: 0.1,
				stagger: { each: 0.1, from: 'start' },
				duration: isDesktop ? 1 : 0,
				ease: 'none',
			},
			'shrink+=23'
		);
	});

	// grass deco animation
	if (isDesktop) {
		tl.fromTo(
			'#grass-deco',
			{
				autoAlpha: 0,
				y: '100vh',
			},
			{
				autoAlpha: 1,
				y: 0,
				duration: 3,
				ease: 'power2.out',
			},
			'shrink+=23'
		);
	}

	// Add bottle fade-in after grass appearance
	tl.fromTo(
		'#purchase-bottle-wrapper',
		{ visibility: 'hidden' },
		{ visibility: 'visible', duration: isDesktop ? 1.5 : 0, ease: 'power2.out' },
		'shrink+=23'
	);

	// Add bottle rotation animation to the main timeline
	if (loadedImages && canvasRef.current && frameProxy.current) {
		const context = canvasRef.current.getContext('2d', { alpha: true });
		if (context) {
			tl.fromTo(
				frameProxy.current,
				{ frame: 0 },
				{
					frame: loadedImages.length - 1,
					duration: isDesktop ? 14 : 0, // Increased duration for smoother rotation
					ease: 'none',
					onUpdate: () => {
						const nextFrame = Math.floor(frameProxy.current.frame);
						if (nextFrame === lastFrameDrawn.current) return;
						lastFrameDrawn.current = nextFrame;
						const nextImage = loadedImages[nextFrame];
						if (nextImage) {
							updateCanvasImage(context, canvasRef.current!, nextImage, currentScale);
						}
					},
				},
				'shrink+=23.5'
			);
		}
	}

	// purchase card slide-in animation
	if (isDesktop) {
		tl.fromTo(
			'#purchase-card',
			{
				x: '100vw',
				rotation: 35,
				visibility: 'hidden',
			},
			{
				x: 0,
				visibility: 'visible',
				rotation: 0,
				duration: 5,
				ease: 'ease',
			},
			'shrink+=25'
		);
	} else {
		// ✨ Mobile explicit entry
		tl.fromTo(
			'#purchase-card',
			{
				y: 100,
				opacity: 0,
				visibility: 'hidden',
			},
			{
				y: 0,
				opacity: 1,
				visibility: 'visible',
				duration: 3,
				ease: 'none',
			},
			'shrink+=25'
		);
	}
};
