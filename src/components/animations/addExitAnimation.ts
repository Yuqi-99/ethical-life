import type { RefObject } from 'react';

export const addExitAnimation = (tl: gsap.core.Timeline, containerRef: RefObject<HTMLElement>) => {
	tl.to('#animation-wrapper', { scale: 0, opacity: 0 }, 'shrink+=5.5');
	tl.fromTo(
		'#text-animation-wrapper',
		{ scale: 1, opacity: 1 },
		{ scale: 0.5, opacity: 0, duration: 0.7 },
		'shrink+=5.5'
	);
	// 6. 背景再次变换（深到浅）
	tl.to(
		containerRef.current,
		{ backgroundColor: 'transparent', duration: 2, ease: 'none' },
		'shrink+=5.5'
	);
};
