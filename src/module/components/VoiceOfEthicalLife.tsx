import { VoicesFloatingStars } from './VoicesFloatingStars';
import { VoicesReviewCards } from './VoicesReviewCards';

export const VoiceOfEthicalLife = () => {
	return (
		<>
			<div className='sticky top-0 flex h-screen items-center justify-center overflow-hidden'>
				<div className='perspective-1000 text-center leading-none'>
					<div
						id='voices-line1'
						className='block text-5xl font-black uppercase md:text-8xl lg:text-[144px]'
					>
						VOICES OF
					</div>

					<div
						id='voices-line2'
						className='block text-5xl font-black uppercase md:text-8xl lg:text-[144px]'
					>
						ETHICAL LIFE
					</div>
				</div>

				<VoicesFloatingStars />
				<VoicesReviewCards />
			</div>
		</>
	);
};
