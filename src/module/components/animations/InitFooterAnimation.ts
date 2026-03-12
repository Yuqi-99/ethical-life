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
	} else {
		tl.fromTo(
			'#footer-mobile',
			{
				// y: '100vh',
				opcaity: 1,
			},
			{
				// y: 0,
				opacity: 1,
				duration: 7,
				ease: 'ease',
			},
			'>'
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
		'shrink+=38'
	);
};
