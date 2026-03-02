import gsap from 'gsap';

export const addTextRevealAnimation = (tl: gsap.core.Timeline) => {
	const lines = gsap.utils.toArray<HTMLElement>('.highlight-line');

	lines.forEach((line) => {
		const words = line.querySelectorAll('span');
		tl.fromTo(
			words,
			{ opacity: 0 },
			{
				opacity: 1,
				stagger: { each: 0.1, from: 'start' },
				duration: 1,
				ease: 'none',
			},
			'shrink'
		);
	});
};
