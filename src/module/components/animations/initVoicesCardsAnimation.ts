import gsap from 'gsap';

export const initVoicesCardsAnimation = (tl: gsap.core.Timeline) => {
	const cards = gsap.utils.toArray<HTMLElement>('.voice-card');

	const SLOT = 1;
	const DURATION = 12;

	gsap.set(cards, {
		opacity: 1,
		visibility: 'hidden',
		x: '100vw',
		y: '100vh',
		rotation: 35,
	});

	// ✨ 用真正的圆弧公式生成点
	// 圆心在屏幕中间下方，从右下到左下画半圆
	const generateArcKeyframes = (steps = 20) => {
		const frames = [];
		for (let i = 0; i <= steps; i++) {
			const t = i / steps; // 0 到 1
			const angle = Math.PI * t; // 0 到 180度（半圆）

			const x = Math.cos(Math.PI - angle); // 1 → -1
			const y = Math.sin(angle); // 0 → 1 → 0 (弧顶)

			frames.push({
				x: `${-x * 100}vw`, // 右(100vw) → 左(-100vw)
				y: `${(1 - y) * 80}vh`, // 下(80vh) → 顶(0) → 下(80vh)
				rotation: 35 - t * 70, // 35deg → -35deg
				ease: 'none',
			});
		}
		return frames;
	};

	cards.forEach((card, index) => {
		const start = `shrink+=${5 + index * SLOT}`;

		tl.fromTo(
			card,
			{
				x: '100vw',
				y: '80vh',
				rotation: 35,
				visibility: 'hidden',
			},
			{
				visibility: 'visible',
				duration: DURATION,
				ease: 'sine.inOut',
				keyframes: generateArcKeyframes(20),
			},
			start
		);
	});
};
