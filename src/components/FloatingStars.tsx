import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../FloatingStars.css';
import { STARS } from '../constants/stars';
import { useStarResponsive } from '../utils/useStarResponsive';

gsap.registerPlugin(ScrollTrigger);

export const FloatingStars = () => {
	const responsive = useStarResponsive();

	const starRefs = useRef<HTMLDivElement[]>([]);
	const xSetters = useRef<gsap.QuickToFunc[]>([]);
	const ySetters = useRef<gsap.QuickToFunc[]>([]);
	const idleTweens = useRef<gsap.core.Tween[]>([]);

	/* ---------- Mouse Parallax ---------- */
	useEffect(() => {
		starRefs.current.forEach((el) => {
			xSetters.current.push(gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }));
			ySetters.current.push(gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' }));
		});

		const onMove = (e: MouseEvent) => {
			const x = (e.clientX / window.innerWidth - 0.5) * 2;
			const y = (e.clientY / window.innerHeight - 0.5) * 2;

			starRefs.current.forEach((_, i) => {
				xSetters.current[i](x * STARS[i].depth * responsive.depth);
				ySetters.current[i](y * STARS[i].depth * responsive.depth);
			});
		};

		window.addEventListener('mousemove', onMove);
		return () => window.removeEventListener('mousemove', onMove);
	}, []);

	/* ---------- Idle Float ---------- */
	useEffect(() => {
		idleTweens.current = [];

		starRefs.current.forEach((el, i) => {
			const tween = gsap.to(el, {
				y: `+=${STARS[i].idleOffset}`,
				duration: 3 + i * 0.6,
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut',
				paused: true, // ⭐ 先暂停
			});

			idleTweens.current.push(tween);
		});
	}, []);

	/* ---------- Scroll Motion（飘走 + 翻滚） ---------- */
	useEffect(() => {
		starRefs.current.forEach((el, i) => {
			const { rotation } = STARS[i];

			gsap.to(el, {
				// y: '-450',
				y: `-${450 * responsive.scroll}`,
				rotation: rotation,
				// opacity: 0,
				ease: 'none',
				scrollTrigger: {
					start: 'top top',
					end: '+=650', // 在前 650px 滚动内完成
					scrub: 1.5,
				},

				onLeave: () => {
					idleTweens.current[i]?.pause();
				},

				onLeaveBack: () => {
					idleTweens.current[i]?.pause();
				},

				onEnterBack: () => {
					idleTweens.current[i]?.pause();
				},
			});
		});
	}, []);

	useEffect(() => {
		ScrollTrigger.refresh();
	}, [responsive]);

	return (
		<div className='parallax-stars'>
			{STARS.map((star, i) => {
				return (
					<div
						key={star.id}
						ref={(el) => {
							if (el) {
								starRefs.current[i] = el;
							}
						}}
						className={`star ${star.isLeft ? 'edge' : ''} z-20`}
						style={{
							top: star.top,
							left: star.left,
							right: star.right,
							width: star.size * responsive.size,
							transform: `rotate(${star.rotation * 0.4}deg)`,
						}}
					>
						<img src={star.src} alt='' />
					</div>
				);
			})}
		</div>
	);
};
