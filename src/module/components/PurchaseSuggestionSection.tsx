import type { RefObject } from 'react';
import { PurchaseCard } from './PurchaseCard';
import { useMediaQuery } from '../../utils/useMediaQuery';
import { Footer } from './Footer';

export const PurchaseSuggestionSection = ({
	canvasRef,
}: {
	canvasRef: RefObject<HTMLCanvasElement | null>;
}) => {
	const isDesktop = useMediaQuery('(min-width: 1024px)');

	return (
		<>
			<div id='purchase-suggestion-section' className='bg-white-gradient sticky -top-22 h-24' />
			<div
				id='purchase-suggestion-gradient'
				className='sticky top-0 flex h-full min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f0f5fa] pt-32 text-center lg:py-20'
			>
				{/* section content - Ensuring it is at z-10 above the bottle */}
				<div className='hidden flex-col self-start px-6 lg:flex'>
					<p className='purchase-suggestion-line text-blue-main text-[164px]/[144px] font-bold uppercase'>
						{'Vegan'?.split(' ').map((word, i) => (
							<span key={i} className='mr-3 inline-block opacity-0'>
								{word}
							</span>
						))}
					</p>
					<p className='purchase-suggestion-line text-blue-main text-[164px]/[144px] font-bold uppercase'>
						{'Gummies'?.split(' ').map((word, i) => (
							<span key={i} className='mr-3 inline-block opacity-0'>
								{word}
							</span>
						))}
					</p>

					<img
						id='grass-deco'
						src='/images/grass.webp'
						alt='grass'
						className='absolute bottom-0 left-0 w-full'
					/>

					{/* Bottle Animation Canvas - Ensuring it is at z-0 behind the text */}
					<div
						id='purchase-bottle-wrapper'
						className='pointer-events-none absolute inset-0 z-10 flex w-2/3 items-center justify-start overflow-hidden'
					>
						<div className='bottom-radial-gradient absolute inset-0 h-full w-full -translate-y-10 scale-80' />
						<canvas ref={canvasRef} className='h-full w-full object-cover will-change-transform' />
					</div>
				</div>

				{/* lg:w-[521px] */}
				<div
					id={isDesktop ? 'purchase-card' : 'purchase-card-mobile'}
					className='z-20 mb-10 flex self-center px-6 sm:w-3/4 lg:fixed lg:top-14 lg:right-10 lg:w-lg lg:self-end'
					style={{ visibility: isDesktop ? 'hidden' : 'visible' }}
				>
					<PurchaseCard />
				</div>
				{!isDesktop && <Footer />}
			</div>
		</>
	);
};
