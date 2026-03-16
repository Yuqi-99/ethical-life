import { createPortal } from 'react-dom';
import { Modal } from './modal/Modal';
import { IoClose } from 'react-icons/io5';

type TPromotion = {
	open: boolean;
	onClose: () => void;
};

export const PromotionModal = ({ open, onClose }: TPromotion) => {
	return createPortal(
		<Modal
			opened={open}
			onClose={() => {
				onClose();
			}}
			className='w-full bg-transparent sm:w-3/4 lg:w-2/3'
			blur
		>
			<div className='flex w-full flex-col items-center justify-center lg:h-140 lg:flex-row'>
				<div className='relative h-60 w-full sm:w-3/4 lg:h-full lg:w-fit'>
					<IoClose
						className='absolute top-5 right-5 flex size-5 cursor-pointer text-gray-950 lg:hidden'
						onClickCapture={() => {
							onClose();
						}}
					/>
					<img src='/images/popup_image.png' alt='deco' className='h-full w-full object-cover' />
				</div>
				<div className='bg-yellow-main relative flex h-full w-full flex-col items-center justify-evenly px-12 py-6 sm:w-3/4 lg:w-1/2 lg:py-0'>
					<IoClose
						className='absolute top-5 right-5 hidden size-5 cursor-pointer text-gray-950 lg:flex'
						onClickCapture={() => {
							onClose();
						}}
					/>
					<img
						src='/images/assets/ethical-life-logo.svg'
						alt='Ethical Life'
						className='mb-4 h-5 lg:mb-0 lg:h-10'
					/>
					<div className='flex flex-col items-center gap-y-3'>
						<p className='text-center text-3xl font-black text-gray-950 uppercase'>
							Get 10% off your first order
						</p>

						<p className='text-center font-normal text-gray-950 lg:text-lg'>New customers only</p>

						<input
							type='text'
							placeholder='Enter Your Email Adress'
							className='w-full border border-solid border-gray-950 bg-white px-2 py-3 text-center text-gray-950 placeholder:text-gray-950 lg:p-4'
						/>

						<button
							type='button'
							className='bg-blue-text w-full cursor-pointer px-4 py-2 text-sm font-medium uppercase transition delay-150 duration-300 ease-in-out hover:scale-110 hover:bg-blue-800 lg:py-3 lg:text-base lg:font-bold'
						>
							Place order
						</button>

						<button
							type='button'
							className='w-full cursor-pointer px-4 py-2 font-medium text-gray-950 transition delay-150 duration-300 ease-in-out hover:scale-110 lg:font-bold'
							onClick={() => {
								onClose();
							}}
						>
							No thanks.
						</button>
					</div>
				</div>
			</div>
		</Modal>,
		document.body
	);
};
