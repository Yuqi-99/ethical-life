import { FaStar } from 'react-icons/fa';
import { Divider } from '../../shared/components/Divider';
import { PurchaseAccordion } from '../../shared/components/PurchaseAccordian';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { FaMinus } from 'react-icons/fa6';

export const PurchaseCard = () => {
	const [count, setCount] = useState(1);

	return (
		<div className='z-10 h-full w-full rounded-lg bg-white p-4 pb-10 md:p-8 lg:h-[calc(100vh-80px)] lg:overflow-y-auto lg:shadow-xl'>
			<div className='flex flex-col items-start justify-center gap-y-3'>
				<p className='text-blue-text text-3xl font-semibold md:text-5xl'>Multi for all</p>

				<p className='text-xl font-bold'>VEGAN GUMMIES</p>

				<div className='flex h-full flex-row justify-items-center'>
					{[1, 2, 3, 4, 5].map((index) => (
						<FaStar key={index} className='text-blue-text size-5' />
					))}
					<p className='text-blue-text ml-2 text-sm font-semibold'>(64 customer reviews)</p>
				</div>

				<Divider className='mt-2 border-slate-100' />

				<p className='mb-6 text-start text-lg font-medium md:text-2xl'>
					With your purchase, you support homeless food banks and animal farm sanctuaries. Thank you
					for making a difference!
				</p>

				<PurchaseAccordion />

				{/* Add to cart section */}
				<div className='flex h-fit w-full gap-x-1'>
					<div className='flex w-17 items-center justify-center rounded-lg border border-solid border-slate-200'>
						<p className='text-lg font-medium'>{count}</p>
					</div>

					<div className='flex flex-col justify-between gap-y-1'>
						<button
							className='active:bg-blue-light rounded-lg border border-solid border-slate-200 p-1 active:scale-95 sm:p-2'
							onClickCapture={() => setCount(count + 1)}
						>
							<FaPlus />
						</button>

						<button
							className='active:bg-blue-light rounded-lg border border-solid border-slate-200 p-1 active:scale-95 sm:p-2'
							onClickCapture={() => {
								if (count > 1) {
									setCount(count - 1);
								}
							}}
						>
							<FaMinus />
						</button>
					</div>

					<button className='bg-yellow-main flex-1 rounded-lg px-5 py-2 text-sm font-bold uppercase md:text-lg'>
						Add to cart
					</button>
				</div>

				<div className='mt-2 flex w-full items-center justify-center'>
					<p className='text-sm font-semibold md:text-base'>FREE DELIVERY-LIMITED TIME ONLY</p>
				</div>
			</div>
		</div>
	);
};
