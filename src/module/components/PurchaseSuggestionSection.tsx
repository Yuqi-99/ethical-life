import type { RefObject } from 'react';
import { PurchaseCard } from './PurchaseCard';

export const PurchaseSuggestionSection = ({
	canvasRef,
}: {
	canvasRef: RefObject<HTMLCanvasElement | null>;
}) => {
	return (
		<div
			id='purchase-suggestion-section'
			className='bg-white-gradient sticky top-0 flex h-full min-h-screen flex-col items-center justify-center px-6 py-20 text-center'
		>
			{/* section content - Ensuring it is at z-10 above the bottle */}
			<div className='hidden flex-col self-start lg:flex'>
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
				<div className='pointer-events-none absolute inset-0 z-10 flex w-2/3 items-center justify-start overflow-hidden'>
					<canvas ref={canvasRef} className='h-full w-full object-cover will-change-transform' />
				</div>
			</div>

			{/* lg:w-[521px] */}
			<div className='z-20 mb-10 flex w-full self-end lg:fixed lg:top-10 lg:w-lg'>
				<PurchaseCard />
			</div>
		</div>
	);
};
