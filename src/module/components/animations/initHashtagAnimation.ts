import gsap from 'gsap';

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
