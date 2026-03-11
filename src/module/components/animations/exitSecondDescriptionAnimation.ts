import type { RefObject } from 'react';

export const exitSecondDescriptionAnimation = (
	tl: gsap.core.Timeline,
	containerRef: RefObject<HTMLElement>,
	isDesktop: boolean
) => {
	tl.to(
		containerRef.current,
		{ backgroundColor: 'transparent', duration: 2, ease: 'none' },
		isDesktop ? 'shrink+=25' : 'shrink+=28'
	);

	tl.to(
		'#hasgtag-background',
		{ opacity: 0, duration: 1, ease: 'none' },
		isDesktop ? 'shrink+=25' : 'shrink+=28'
	);
};
