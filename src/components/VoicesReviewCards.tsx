import { REVIEW_LISTS } from '../constants/reviews';
import { cn } from '../utils/cn';

type TReviewNameList = {
	name: string;
	city: string;
	code: string;
};

const ReviewNameList = ({ name, city, code }: TReviewNameList) => {
	return (
		<div className='absolute bottom-0 flex w-full items-center justify-center'>
			<div className='flex h-9 w-10 items-center justify-center rounded-full bg-black text-sm text-white'>
				{code}
			</div>
			<div className='ml-3 flex w-full flex-col'>
				<p className='text-sm font-bold'>{name}</p>
				<p className='text-sm font-normal'>{city}</p>
			</div>
		</div>
	);
};

export const VoicesReviewCards = () => {
	return (
		<div className='voices-review-cards-container pointer-events-none absolute inset-0 z-20 flex items-center justify-center'>
			{REVIEW_LISTS?.map((item, index) => {
				return (
					<div
						key={index}
						className={cn(
							'voice-card absolute flex h-[70dvh] w-[40dvh] flex-col justify-between border border-black/5 p-8 sm:w-[30dvw] lg:w-[25dvw]',
							index % 2 === 0 ? 'bg-white' : 'bg-yellow-main'
						)}
						style={{
							opacity: 0,
							visibility: 'hidden',
						}}
					>
						<div className='flex flex-1 items-start justify-center'>
							<p className='text-start text-xl leading-8 font-medium italic md:text-2xl lg:text-[28px]'>
								{item.review}
							</p>
						</div>

						<div className='relative h-20'>
							<ReviewNameList name={item.name} city={item.city} code={item.code} />
						</div>
					</div>
				);
			})}
		</div>
	);
};
