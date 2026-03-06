import gsap from 'gsap';
import type { RefObject } from 'react';
import { updateCanvasImage } from '../../../utils/updateCanvasImage';

export const initPurchaseSuggestionAnimation = (
	tl: gsap.core.Timeline,
	loadedImages: HTMLImageElement[] | undefined,
	frameProxy: RefObject<{ frame: number }>,
	lastFrameDrawn: RefObject<number>,
	canvasRef: RefObject<HTMLCanvasElement | null>,
	currentScale: number
) => {
	// white gradient background animation
	tl.fromTo(
		'#purchase-suggestion-section',
		{
			y: '100vh',
		},
		{
			y: -80,
			duration: 3,
			ease: 'ease',
		},
		'shrink+=22'
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
				duration: 1,
				ease: 'none',
			},
			'shrink+=23'
		);
	});

	// grass deco animation
	tl.fromTo(
		'#grass-deco',
		{
			autoAlpha: 0,
			y: 100,
		},
		{
			autoAlpha: 1,
			y: 0,
			duration: 3, // Slightly longer for flow
			ease: 'power2.out',
		},
		'shrink+=23'
	);

	// Add bottle fade-in after grass appearance
	tl.fromTo(
		'#purchase-bottle-wrapper',
		// visibility:hidden
		{ visibility: 'hidden' },
		// visibility:visible
		{ visibility: 'visible', duration: 1.5, ease: 'power2.out' },
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
					duration: 10, // Increased duration for smoother rotation
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
};
