import gsap from 'gsap';

export const initPurchaseSuggestionAnimation = (tl: gsap.core.Timeline) => {
	// white gradient background animation
	tl.fromTo(
		'#purchase-suggestion-section',
		{
			visibility: 'hidden',
			y: '100vh',
		},
		{
			visibility: 'visible',
			y: 0,
			// ease: 'power2.out',
			duration: 2,
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
			visibility: 'hidden',
			y: '100vh',
		},
		{
			visibility: 'visible',
			y: 0,
			duration: 2,
		},
		'shrink+=23'
	);

  
};
