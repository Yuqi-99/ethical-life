import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { getStarConfig } from '../../constants/stars';
import '../../FloatingStars.css';
import { useMediaQuery } from '../../utils/useMediaQuery';
import { useStarResponsive } from '../../utils/useStarResponsive';

gsap.registerPlugin(ScrollTrigger);

export const FloatingStars = () => {
	const responsive = useStarResponsive();

	const starRefs = useRef<HTMLDivElement[]>([]);
	const xSetters = useRef<gsap.QuickToFunc[]>([]);
	const ySetters = useRef<gsap.QuickToFunc[]>([]);
	const idleTweens = useRef<gsap.core.Tween[]>([]);

	const isMobile = useMediaQuery('(max-width: 425px)');
	const isTablet = useMediaQuery('(max-width: 930px)');
	const STARS_CONFIG = getStarConfig(isMobile || isTablet);
	const STARS = () => {
		if (isMobile) {
			return [STARS_CONFIG[0], STARS_CONFIG[1], STARS_CONFIG[4], STARS_CONFIG[5]];
		} else if (isTablet) {
			return STARS_CONFIG;
		} else {
			return STARS_CONFIG;
		}
	};

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
				xSetters.current[i](x * STARS()[i].depth * responsive.depth);
				ySetters.current[i](y * STARS()[i].depth * responsive.depth);
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
				y: `+=${STARS()[i].idleOffset}`,
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
			const { rotation } = STARS()[i];

			// ✨ 明确设置初始状态，防止刷新时位置偏移
			gsap.set(el, {
				y: 0,
				rotation: rotation * 0.4, // 对应 style 中的 transform
			});

			gsap.to(el, {
				// y: '-450',
				y: `-${450 * responsive.scroll}`,
				rotation: rotation,
				// opacity: 0,
				ease: 'none',
				scrollTrigger: {
					start: 'top top',
					end: '+=450', // 在前 600px 滚动内完成
					scrub: 1.5,
					invalidateOnRefresh: true, // ✨ 刷新时重新计算
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
	}, [responsive]);

	useEffect(() => {
		ScrollTrigger.refresh();
	}, [responsive]);

	return (
		<div className='parallax-stars'>
			{STARS().map((star, i) => {
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
