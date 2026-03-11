import gsap from 'gsap';

export const initSecondDescriptionAnimation = (
	tl: gsap.core.Timeline,
	isMobile: boolean,
	isDesktop: boolean
) => {
	const lines = [
		'#desc-line1',
		'#desc-line2',
		'#desc-line3',
		'#desc-line4',
		'#desc-line5',
		'#desc-line6',
	];
	const BASE_TIME = isMobile ? 19 : 17; // 第一行的开始时间
	const INTERVAL = 0.6; // 每行之间的间隔

	gsap.set(lines, { visibility: 'hidden' });

	lines.forEach((line, index) => {
		tl.fromTo(
			line,
			{ visibility: 'hidden', scale: 0.9, rotateX: -80, transformOrigin: '50% 50%' },
			{ visibility: 'visible', scale: 1, rotateX: 0, duration: 2.5, ease: 'power2.out' },
			`shrink+=${BASE_TIME + index * INTERVAL}`
		);
	});

	lines.forEach((line) => {
		tl.to(
			line,
			{ visibility: 'hidden', duration: 2.5, ease: 'power2.out' },
			isDesktop ? 'shrink+=24' : 'shrink+=28'
		);
	});

	tl.to(
		'#hasgtag-background',
		{ opacity: 0.1, duration: 1, ease: 'none' },
		isMobile ? 'shrink+=19' : 'shrink+=16'
	);
};
