import gsap from 'gsap';

export const addCardImageAnimation = (tl: gsap.core.Timeline) => {
	const cards = gsap.utils.toArray<HTMLElement>('.card-image');

	cards.forEach((card) => {
		tl.fromTo(
			card,
			{ width: 0, opacity: 0 },
			{
				width: 150,
				opacity: 1,
				marginLeft: '-18px',
				marginRight: '-18px',
				duration: 0.5,
				ease: 'power2.out',
			},
			'shrink+=4.5'
		);
	});
};
