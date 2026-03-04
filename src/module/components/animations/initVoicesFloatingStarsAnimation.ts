import { getStarDecoConfig } from '../../../constants/voicesStarsDeco';

export const initVoicesFloatingStarsAnimation = (tl: gsap.core.Timeline, isMobile: boolean) => {
	const starsConfig = getStarDecoConfig(false); // We can pass a default or handle responsive inside if needed

	tl.fromTo(
		'#voices-stars .star',
		{
			opacity: 1,
			y: 500,
			rotation: (i) => (starsConfig[i]?.rotation || 0) * 0.4,
		},
		{
			opacity: 1,
			y: -800,
			rotation: (i) => starsConfig[i]?.rotation || 0,
			duration: 5,
			ease: 'none',
			scrub: 1.5,
			// stagger: 0.1,
		},
		isMobile ? 'shrink+=8' : 'shrink+=8.5'
	);

	tl.fromTo(
		'#voices-stars .star',
		{
			opacity: 1,
			y: 500,
			rotation: (i) => (starsConfig[i]?.rotation || 0) * 0.4,
		},
		{
			opacity: 1,
			y: -800,
			rotation: (i) => starsConfig[i]?.rotation || 0,
			duration: 5,
			ease: 'none',
			scrub: 1.5,
		},
		isMobile ? 'shrink+=17' : 'shrink+=16'
	);
};
