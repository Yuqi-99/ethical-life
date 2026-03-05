import { useState } from 'react';
import { TiTick } from 'react-icons/ti';
import { cn } from '../../utils/cn';
import { Divider } from './Divider';

const accordionData = [
	{
		title: '3-Month Plan',
		titleDesc: 'Billed and delivered every 3 months',
		content: ['3 bottles every 90 days at $32.99 each', 'Cancel anytime', 'Ships every 90 days'],
		price: '$32.99',
		priceOriginal: '$36.99',
	},
	{
		title: 'Monthly Plan',
		titleDesc: 'Payment/Delivery monthly',
		content: ['Cancel anytime', 'Ships every 30 days'],
		price: '$34.99',
		priceOriginal: '$36.99',
	},
	{
		title: 'Buy once',
		titleDesc: 'One-Time purchase including delivery',
		content: ['No commitment', 'One-time order', 'Great to try it out'],
		price: '$36.99',
	},
];

export const PurchaseAccordion = () => {
	const [activeIndex, setActiveIndex] = useState<number | null>(0);

	const toggleAccordion = (index: number) => {
		setActiveIndex(index); // 既然是购买计划，通常建议保持一个始终选中，而不是 toggle 关掉
	};

	return (
		<div className='mx-auto w-full rounded-xl border border-slate-200 bg-white'>
			{accordionData.map((item, index) => {
				const isOpen = activeIndex === index;

				return (
					<div
						key={index}
						className={cn(
							'border-slate-200 p-2',
							isOpen && 'bg-blue-light',
							index !== accordionData.length - 1 && 'border-b'
						)}
					>
						{/* 按钮部分 */}
						<button
							onClick={() => toggleAccordion(index)}
							className='flex w-full items-center justify-between px-2 py-3 text-left text-slate-800'
						>
							<div className='flex items-center'>
								<div className='mr-4 inline-flex items-center'>
									<div className='relative flex items-center'>
										<input
											type='radio'
											name='purchase-plan'
											checked={isOpen}
											onChange={() => toggleAccordion(index)}
											className='peer checked:border-blue-text size-7 cursor-pointer appearance-none rounded-full border border-slate-300 transition-all'
											id={`radio-${index}`}
										/>
										{/* 核心修改：选中时的中心圆点颜色改为蓝色 */}
										<span className='bg-blue-text absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 transform rounded-full opacity-0 transition-opacity duration-200 peer-checked:opacity-100'></span>
									</div>
								</div>

								<div className='flex flex-col'>
									<span className='text-lg font-bold transition-colors'>{item.title}</span>
									<span className='text-sm font-normal text-slate-500'>{item.titleDesc}</span>
								</div>
							</div>

							<div className='flex flex-col items-end'>
								<p className='font-bold'>{item.price}</p>
								{item.priceOriginal && (
									<p className='text-sm text-slate-400 line-through'>{item.priceOriginal}</p>
								)}
							</div>
						</button>

						{/* 内容部分 */}
						<div
							className='overflow-hidden transition-all duration-300 ease-in-out'
							style={{
								maxHeight: isOpen ? '100px' : '0px',
								opacity: isOpen ? 1 : 0,
							}}
						>
							<Divider className='mb-4 border border-slate-200' />

							<div className='flex w-full flex-col items-start pb-4 pl-11'>
								{item.content?.map((contentText, i) => (
									<div key={i} className='mb-1 flex items-center text-sm leading-relaxed'>
										<TiTick className='text-blue-text mr-1 size-4' />
										{contentText}
									</div>
								))}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};
