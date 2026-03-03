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
	);
};
