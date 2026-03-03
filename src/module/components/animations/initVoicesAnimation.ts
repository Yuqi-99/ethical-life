import gsap from 'gsap';

export const initVoicesAnimation = (tl: gsap.core.Timeline) => {
	gsap.set(['#voices-line1', '#voices-line2'], { opacity: 0 });

	tl.fromTo(
		'#voices-line2',
		{
			opacity: 0,
			scale: 6,
			y: 100,
		},
		{
			opacity: 1,
			scale: 1,
			y: 0,
			duration: 3,
			ease: 'power2.out',
		},
		'shrink+=6'
	)
		.fromTo(
			'#voices-line1',
			{
				opacity: 0,
				scale: 3,
				y: -200, // 从屏幕更上方
				rotateX: 70, // 躺着
				transformOrigin: '50% 50%',
			},
			{
				opacity: 0.5,
				scale: 1,
				y: 0,
				rotateX: 50, // 立起来
				duration: 3,
				ease: 'power2.out',
			},
			'shrink+=6.5'
		)
		.to(
			'#voices-line1',
			{
				opacity: 1,
				scale: 1,
				y: 0,
				rotateX: 0, // 立起来
				duration: 1.5,
				ease: 'power2.out',
			},
			'>'
		);
};

export const exitVoicesAnimation = (tl: gsap.core.Timeline) => {
	tl.to('#voices-line1', { opacity: 0, duration: 1, ease: 'none' }, 'shrink+=10');

	tl.to('#voices-line2', { opacity: 0, duration: 1, ease: 'none' }, 'shrink+=10');
};
