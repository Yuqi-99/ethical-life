import { REVIEW_LISTS } from '../../constants/reviews';
import { cn } from '../../utils/cn';
import { VscTriangleRight } from 'react-icons/vsc';
import { Modal } from './modal/Modal';
import { createPortal } from 'react-dom';
import { useState } from 'react';

type TReviewNameList = {
	name: string;
	city: string;
	code: string;
	img?: string;
};

const ReviewNameList = ({ name, city, code, img }: TReviewNameList) => {
	return (
		<div className={cn('absolute bottom-0 flex w-full items-center justify-center', img && 'p-8')}>
			<div className='z-20 flex size-9 min-w-9 items-center justify-center rounded-full bg-black text-sm text-white'>
				{code}
			</div>

			{img && (
				<div className='absolute bottom-0 h-32 w-full bg-linear-to-t from-black to-transparent' />
			)}

			<div className={cn('z-20 ml-3 flex w-full flex-col', img && 'text-white')}>
				<p className='text-sm font-bold'>{name}</p>
				<p className='text-sm font-normal'>{city}</p>
			</div>

			{img && (
				<div className='z-20 flex size-8 min-w-8 items-center justify-center rounded-full bg-white'>
					<VscTriangleRight className='text-black' />
				</div>
			)}
		</div>
	);
};

export const VoicesReviewCards = () => {
	const [openVideoModal, setOpenVideoModal] = useState(false);
	const [selectedVideoUrl, setSelectedVideoUrl] = useState('');

	return (
		<>
			<div className='voices-review-cards-container absolute inset-0 z-20 flex items-center justify-center'>
				{REVIEW_LISTS?.map((item, index) => {
					return (
						<div
							key={index}
							className={cn(
								'voice-card absolute flex h-[70dvh] w-[40dvh] flex-col justify-between border border-black/5 p-0 sm:w-[35dvw] lg:w-[25dvw]',
								item.review && 'p-8',
								index % 2 === 0 ? 'bg-white' : 'bg-yellow-main'
							)}
							style={{
								opacity: 0,
								visibility: 'hidden',
							}}
							onClick={() => {
								if (item.video) {
									setOpenVideoModal(true);
									setSelectedVideoUrl(item.video);
								}
							}}
						>
							{item.review && (
								<div className='flex flex-1 items-start justify-center'>
									<p className='text-start text-xl leading-8 font-medium italic md:text-2xl lg:text-[28px]'>
										{item.review}
									</p>
								</div>
							)}

							{item.video && (
								<img src={item.img} alt={item.name} className='h-full w-full object-cover' />
							)}

							<div className='relative h-20'>
								<ReviewNameList name={item.name} city={item.city} code={item.code} img={item.img} />
							</div>
						</div>
					);
				})}
			</div>
			{createPortal(
				<Modal
					opened={openVideoModal}
					onClose={() => {
						setOpenVideoModal(false);
						setSelectedVideoUrl('');
					}}
				>
					<iframe
						src={selectedVideoUrl}
						title='user review video'
						allow='autoplay'
						// allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						className='h-[80dvh] w-full'
					/>{' '}
				</Modal>,
				document.body
			)}
		</>
	);
};
