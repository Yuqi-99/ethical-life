import gsap from 'gsap';

export const initFooterAnimation = (tl: gsap.core.Timeline, isDesktop: boolean) => {
	if (isDesktop) {
		tl.fromTo(
			'#footer',
			{ visibility: 'hidden' },
			{
				visibility: 'visible',
				// opacity: 1,
				duration: 3,
				ease: 'none',
			},
			'shrink+=38'
		);
	}

	tl.fromTo(
		'.bottom-radial-gradient',
		{ visibility: 'hidden', opacity: 0 },
		{
			visibility: isDesktop ? 'visible' : 'hidden',
			opacity: 1,
			duration: 3,
			ease: 'none',
		},
		'shrink+=38'
	);

	// mobile radial animation
	tl.fromTo(
		'.bottom-radial-gradient-2',
		{ visibility: 'hidden', opacity: 0 },
		{
			visibility: isDesktop ? 'hidden' : 'visible',
			opacity: 1,
			duration: 3,
			ease: 'none',
		},
		'shrink+=36'
	);

	if (isDesktop) {
		const chars = gsap.utils.toArray<HTMLElement>('.footerpathAnim');

		gsap.set(chars, { y: 100, opacity: 0 });
		gsap.set('.footer-text', { y: 100, opacity: 0 });

		tl.fromTo(
			chars,
			{ y: 100, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 2,
				ease: 'power3.inOut',
				stagger: {
					each: 0.1, // ✨ 每个字母间隔 0.05，从左到右依次出现
					from: 'start',
				},
			},
			'shrink+=37'
		);

		tl.fromTo(
			'.footer-text',
			{ y: 100, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 2,
				ease: 'power3.inOut',
				stagger: {
					each: 0.1, // ✨ 每个字母间隔 0.05，从左到右依次出现
					from: 'start',
				},
			},
			'shrink+=37'
		);
	}
};
