export const initFooterAnimation = (tl: gsap.core.Timeline, isDesktop: boolean) => {
	tl.fromTo(
		'#footer',
		{ visibility: 'hidden' },
		{
			visibility: 'visible',
			// opacity: 1,
			duration: 3,
			ease: 'none',
		},
		isDesktop ? 'shrink+=38' : 'shrink+=38'
	);
};
