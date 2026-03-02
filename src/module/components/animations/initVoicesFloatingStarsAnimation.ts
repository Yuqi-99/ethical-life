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
			duration: isMobile ? 3 : 1.5,
			ease: 'none',
			// stagger: 0.1,
		},
		isMobile ? 'shrink+=8.5' : 'shrink+=9'
	);
};
