import type { RefObject } from 'react';

export const PurchaseSuggestionSection = ({
	canvasRef,
}: {
	canvasRef: RefObject<HTMLCanvasElement | null>;
}) => {
	return (
		<div
			id='purchase-suggestion-section'
			className='bg-white-gradient sticky top-0 flex min-h-[120dvh] flex-col items-center justify-center px-6 py-20 text-center'
		>
			{/* section content - Ensuring it is at z-10 above the bottle */}
			<div className='mt-20 hidden flex-col self-start lg:flex'>
				<p className='purchase-suggestion-line text-[164px]/[144px] font-bold text-[#3f69e2] uppercase'>
					{'Vegan'?.split(' ').map((word, i) => (
						<span key={i} className='mr-3 inline-block opacity-0'>
							{word}
						</span>
					))}
				</p>
				<p className='purchase-suggestion-line text-[164px]/[144px] font-bold text-[#3f69e2] uppercase'>
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
		</div>
	);
};
