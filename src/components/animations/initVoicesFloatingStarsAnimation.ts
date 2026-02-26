import { getStarDecoConfig } from '../../constants/voicesStarsDeco';

export const initVoicesFloatingStarsAnimation = (tl: gsap.core.Timeline) => {
	const starsConfig = getStarDecoConfig(false); // We can pass a default or handle responsive inside if needed

	tl.fromTo(
		'#voices-stars .star',
		{
			opacity: 1,
			y: 350,
			rotation: (i) => (starsConfig[i]?.rotation || 0) * 0.4,
		},
		{
			opacity: 1,
			y: -800,
			rotation: (i) => starsConfig[i]?.rotation || 0,
			duration: 5,
			ease: 'none',
			stagger: 0.1,
		},
		'shrink+=8.5'
	);
};
