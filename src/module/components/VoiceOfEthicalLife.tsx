import { VoicesFloatingStars } from './VoicesFloatingStars';
import { VoicesReviewCards } from './VoicesReviewCards';

export const VoiceOfEthicalLife = () => {
	return (
		<>
			<div className='fixed inset-0 flex h-screen w-full max-w-360 items-center justify-center place-self-center overflow-hidden'>
				<div className='perspective-1000 text-center leading-none'>
					<div
						id='voices-line1'
						className='block text-5xl font-black uppercase sm:text-7xl md:text-8xl lg:text-[144px]'
						style={{ opacity: 0 }}
					>
						VOICES OF
					</div>

					<div
						id='voices-line2'
						className='block text-5xl font-black uppercase sm:text-7xl md:text-8xl lg:text-[144px]'
						style={{ opacity: 0 }}
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
