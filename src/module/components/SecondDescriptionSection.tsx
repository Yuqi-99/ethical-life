import { cn } from '../../utils/cn';

export const SecondDescriptionSection = () => {
	const DECS_2 = [
		'vegan multivitamin gummies',
		'non-GMO, made with clean ingredients',
		'your daily essentials',
		'without artificial colors or flavors',
		'made in the USA',
		'and packaged in recycled bottles',
	];
	return (
		<>
			{/* 背景图片装饰 */}
			<img
				id='hasgtag-background'
				src='/images/bg-1-1200x675.jpg.webp'
				alt='desc-background'
				className='pointer-events-none fixed inset-0 -z-40 flex h-screen w-full items-center justify-center object-cover object-center opacity-0'
			/>
			<div
				id='description-section-2'
				className='pointer-events-none fixed inset-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 text-center'
			>
				{DECS_2.map((word, i) => (
					<div
						key={i}
						id={`desc-line${i + 1}`}
						className={cn(
							'block text-2xl font-bold sm:text-4xl md:text-[44px] lg:text-6xl',
							i !== 0 && 'text-white'
						)}
						style={{ visibility: 'hidden' }}
					>
						{word}
					</div>
				))}
			</div>
		</>
	);
};
