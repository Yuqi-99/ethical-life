import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import '../FloatingStars.css';
import { getStarDecoConfig } from '../constants/voicesStarsDeco';
import { useMediaQuery } from '../utils/useMediaQuery';
import { useStarResponsive } from '../utils/useStarResponsive';

gsap.registerPlugin(ScrollTrigger);

export const VoicesFloatingStars = () => {
	const responsive = useStarResponsive();

	const starRefs = useRef<HTMLDivElement[]>([]);

	const isMobile = useMediaQuery('(max-width: 425px)');
	const isTablet = useMediaQuery('(max-width: 930px)');
	const STARS_CONFIG = getStarDecoConfig(isMobile || isTablet);

	/* ---------- Internal animations removed to avoid conflict with main timeline ---------- */

	return (
		<div id='voices-stars' className='parallax-stars'>
			{STARS_CONFIG.map((star, i) => {
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
							opacity: 0,
						}}
					>
						<img src={star.src} alt='' />
					</div>
				);
			})}
		</div>
	);
};
