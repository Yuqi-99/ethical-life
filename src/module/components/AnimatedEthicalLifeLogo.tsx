import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';
import { useMediaQuery } from '../../utils/useMediaQuery';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface AnimatedEthicalLifeLogoProps {
	className?: string;
}

export const AnimatedEthicalLifeLogo = ({ className }: AnimatedEthicalLifeLogoProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const isMobile = useMediaQuery('(max-width: 768px)');

	function centerOutOrder<T>(arr: T[]) {
		const center = Math.floor(arr.length / 2);
		const result: T[] = [arr[center]];

		for (let i = 1; i <= center; i++) {
			if (center - i >= 0) result.push(arr[center - i]);
			if (center + i < arr.length) result.push(arr[center + i]);
		}

		return result;
	}

	useGSAP(
		() => {
			// 获取所有动画组
			const groups = gsap.utils.toArray(
				'.pathAnim1, .pathAnim2, .pathAnim3, .pathAnim4, .pathAnim5'
			);

			// 为每个组设置初始状态（确保一开始是平的）
			gsap.set(groups, {
				y: 0,
				opacity: 1,
			});

			const orderedGroups = centerOutOrder(groups);

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: 'top 8%',
					// end: 'bottom 20%',
					end: '+=450',
					scrub: true,
					invalidateOnRefresh: true, // ✨ 确保刷新时重新计算坐标
				},
			});

			// 关键改变：使用更小的延迟，让动画重叠
			for (let i = 0; i < orderedGroups.length; i += 2) {
				tl.fromTo(
					[orderedGroups[i], orderedGroups[i + 1]].filter(Boolean),
					{
						y: 0,
						opacity: 1,
					},
					{
						y: isMobile ? -800 : -500,
						opacity: 0,
						duration: 3, // 增加duration让动画更长
						ease: 'power2.out',
					},
					i === 0 ? 0 : '-=2.8' // 第一个从0开始，后面的重叠1.8秒（关键！）
				);
			}
		},
		{ scope: containerRef, dependencies: [] }
	);

	return (
		<div ref={containerRef} className={className}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 1595.223 255.726'
				className='h-auto w-full overflow-visible'
			>
				<g className='pathAnim5' data-name='Group 215' transform='matrix(1,0,0,1,0.002,0)'>
					<path
						id='Path_363'
						data-name='Path 363'
						d='M7476.63-10099.8a38.632,38.632,0,0,1-36.632-38.575h36.167c5.643-47.622,37.4-77.489,88.672-77.489,56.361,0,86.968,34.712,86.968,102.644v7.838H7529.38c1.492,23.141,15.675,39.937,36.2,39.937,13.437,0,25.754-6.345,28.367-16.05h55.615c-11.2,37.7-41.8,58.972-81.369,58.972C7513.77-10022.6,7483.24-10048.5,7476.63-10099.8Zm53.87-38.058h67.183c-1.492-24.26-14.929-35.084-33.592-35.084S7532.37-10161,7530.5-10137.9Z'
						transform='matrix(1,0,0,1,-7440,10278.25)'
						fill='#3f69e2'
					></path>
				</g>
				<g className='pathAnim4' data-name='Group 216' transform='matrix(1,0,0,1,0.002,0)'>
					<path
						id='Path_364'
						data-name='Path 364'
						d='M379.346,130v52.254c0,38.818-20.9,73.53-75.4,73.53-55.241,0-75.769-33.965-75.769-73.9V24.588h53V67.294H379.34v38.071H281.183v74.276c0,19.035,7.091,29.113,23.887,29.113,16.423,0,23.888-10.078,23.888-28.74V130Z'
						transform='matrix(1,0,0,1,0,-0.106)'
						fill='#3f69e2'
					></path>
				</g>
				<g className='pathAnim3' data-name='Group 217' transform='matrix(1,0,0,1,0.002,0)'>
					<path
						id='Path_365'
						data-name='Path 365'
						d='M566.746,250.927H512.252V135.967c0-22.768-8.958-30.606-27.993-30.606-20.529,0-32.1,13.437-32.1,34.712V250.927h-54.12V.106H452.16V88.938c8.584-16.423,26.873-26.5,51.134-26.5,37.325,0,63.452,23.141,63.452,57.106Z'
						transform='matrix(1,0,0,1,0,-0.106)'
						fill='#3f69e2'
					></path>
				</g>
				<g className='pathAnim2' data-name='Group 218' transform='matrix(1,0,0,1,0.002,0)'>
					<path
						id='Path_366'
						data-name='Path 366'
						d='M7473.39-9965.19v-183.639h54.123v183.639Zm10.368-206.944v-43.754a43.757,43.757,0,0,1,43.755,43.746ZM7440-10215.9h43.754v43.755a43.756,43.756,0,0,1-43.753-43.745Z'
						transform='matrix(1,0,0,1,-6885.43311,10216.01855)'
						fill='#3f69e2'
					></path>
				</g>
				<g className='pathAnim1' data-name='Group 219' transform='matrix(1,0,0,1,0.002,0)'>
					<path
						id='Path_367'
						data-name='Path 367'
						d='M830.985,133H776.491c-2.613-16.049-14.557-25.754-30.233-25.754-17.543,0-32.846,11.2-32.846,48.522,0,36.952,15.3,54.868,31.353,54.868,16.8,0,29.86-8.958,31.353-26.128h54.493c-5.225,42.55-40.31,71.29-85.473,71.29-50.388,0-85.1-33.219-85.1-98.91S694.75,62.46,746.631,62.46C795.153,62.46,828,89.707,830.985,133Z'
						transform='matrix(1,0,0,1,0,-0.106)'
						fill='#3f69e2'
					></path>
				</g>
				<g className='pathAnim1' data-name='Group 220' transform='matrix(1,0,0,1,0.002,0)'>
					<path
						id='Path_368'
						data-name='Path 368'
						d='M952.046,180.406l.374-15.677c-4.106,3.733-11.2,5.972-26.874,9.332-25.754,5.6-33.219,12.69-33.219,25.753,0,11.571,7.092,17.543,19.782,17.543C938.236,217.357,951.673,199.441,952.046,180.406Zm54.124,70.543h-47.4a48.375,48.375,0,0,1-3.733-15.676c-9.331,11.944-27.62,20.528-54.867,20.528-42.176,0-60.839-20.155-60.839-53,0-47.775,36.205-56.733,85.474-64.2,20.9-2.986,26.873-7.092,26.873-18.662,0-10.451-11.944-16.05-27.247-16.05-20.528,0-28.366,9.331-30.233,23.141H845.3c.747-38.071,21.648-64.571,81.741-64.571,58.973,0,79.131,26.127,79.131,72.41Z'
						transform='matrix(1,0,0,1,0,-0.106)'
						fill='#3f69e2'
					></path>
				</g>
				<g className='pathAnim2' data-name='Group 221' transform='matrix(1,0,0,1,0.002,0)'>
					<path
						id='Path_369'
						data-name='Path 369'
						d='M1080.91,250.927h-54.12V.106h54.12Z'
						transform='matrix(1,0,0,1,0,-0.106)'
						fill='#3f69e2'
					></path>
				</g>
				<g className='pathAnim3' data-name='Group 222' transform='matrix(1,0,0,1,0.002,0)'>
					<path
						id='Path_370'
						data-name='Path 370'
						d='M1228.33,250.927h-54.12V.106h54.12Z'
						transform='matrix(1,0,0,1,0,-0.106)'
						fill='#3f69e2'
					></path>
				</g>
				<g className='pathAnim4' data-name='Group 223' transform='matrix(1,0,0,1,0.002,0)'>
					<path
						id='Path_371'
						data-name='Path 371'
						d='M7442.55-9965.19v-183.639h54.121v183.639ZM7440-10188.3a27.574,27.574,0,0,1,27.564-27.571,27.567,27.567,0,0,1,27.577,27.576,27.568,27.568,0,0,1-27.562,27.564,27.575,27.575,0,0,1-27.58-27.576Z'
						transform='matrix(1,0,0,1,-6193.25098,10216.02344)'
						fill='#3f69e2'
					></path>
				</g>
				<g className='pathAnim4' data-name='Group 224' transform='matrix(1,0,0,1,0.002,0)'>
					<path
						id='Path_372'
						data-name='Path 372'
						d='M1397.13,250.927h-53V105.361h-43.4V67.29h43.4c0-44.79,25.76-67.184,78.76-67.184v43.67c-22.02,0-25.76,4.852-25.76,23.514h26.88v38.071h-26.88Z'
						transform='matrix(1,0,0,1,0,-0.106)'
						fill='#3f69e2'
					></path>
				</g>
				<g className='pathAnim5' data-name='Group 225' transform='matrix(1,0,0,1,0.002,0)'>
					<path
						id='Path_373'
						data-name='Path 373'
						d='M1473.92,140.468h67.18c-1.49-24.261-14.93-35.085-33.59-35.085S1475.79,117.327,1473.92,140.468Zm121.3,32.473H1472.8c1.49,23.141,15.68,39.937,36.21,39.937,13.43,0,25.75-6.345,28.36-16.049h55.62c-11.2,37.7-41.81,58.972-81.37,58.972-61.96,0-92.94-33.592-92.94-100.03,0-56.733,32.85-93.311,89.58-93.311,56.36,0,86.96,34.712,86.96,102.643Z'
						transform='matrix(1,0,0,1,0,-0.106)'
						fill='#3f69e2'
					></path>
				</g>
			</svg>
		</div>
	);
};
