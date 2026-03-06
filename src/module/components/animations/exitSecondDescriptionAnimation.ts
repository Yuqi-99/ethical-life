import type { RefObject } from 'react';

export const exitSecondDescriptionAnimation = (
	tl: gsap.core.Timeline,
	containerRef: RefObject<HTMLElement>
	// isMobile: boolean
) => {
	tl.to(
		containerRef.current,
		{ backgroundColor: 'transparent', duration: 2, ease: 'none' },
		'shrink+=24'
	);

	tl.to('#hasgtag-background', { opacity: 0, duration: 1, ease: 'none' }, 'shrink+=24');
};
