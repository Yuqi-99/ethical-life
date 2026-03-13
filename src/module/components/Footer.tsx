import { cn } from '../../utils/cn';
import { useMediaQuery } from '../../utils/useMediaQuery';
import { FooterEthicalLifeTitle } from './FooterEthicalLifeTitle';

const INDEX = ['Home', 'About', 'Shop', 'Blog', 'FAQ'];
const SOCIALS = [
	{ label: 'Instagram', link: 'https://www.instagram.com/ethicallifeworld' },
	{ label: 'Facebook', link: 'https://www.facebook.com/ethicallifeworld/' },
	{ label: 'Tiktok', link: 'https://www.tiktok.com/@ethicallifeworld' },
	{ label: 'Linkedin', link: 'https://www.linkedin.com/company/ethical-life/' },
];

export const Footer = () => {
	const isDekstop = useMediaQuery('(min-width: 1024px)');
	return (
		<div
			id={isDekstop ? 'footer' : 'footer-mobile'}
			className={cn(
				'sticky top-0 bottom-0 flex h-full min-h-screen w-full flex-col items-center justify-around',
				isDekstop ? 'px-10' : 'bottom-radial-gradient-2 px-6'
			)}
			style={{ visibility: 'hidden' }}
		>
			<div className='mt-8 flex h-full w-full items-start justify-center'>
				<FooterEthicalLifeTitle />
			</div>

			<div className='flex w-full flex-col justify-between lg:flex-row'>
				<p className='footer-text max-w-75 text-start text-3xl font-semibold lg:max-w-100 lg:text-5xl'>
					Kinder world with ethical Life.
				</p>

				<div className='mt-12 flex w-2/3 flex-wrap justify-between gap-x-4 lg:mt-0 lg:w-2/5'>
					{/* Index */}
					<div className='flex flex-col items-start'>
						<p className='footer-text mb-2 text-sm font-medium'>Index</p>

						{INDEX.map((item, index) => (
							<p key={index} className='footer-text mb-1 text-xl font-semibold lg:mb-0'>
								{item}
							</p>
						))}
					</div>

					{/* Social */}
					<div className='flex flex-col items-start'>
						<p className='footer-text mb-2 text-sm font-medium'>Social</p>

						{SOCIALS.map((item, index) => (
							<a
								key={index}
								target='_blank'
								href={item.link}
								className='footer-text mb-1 text-xl font-semibold lg:mb-0'
							>
								{item.label}
							</a>
						))}
					</div>

					{/* Contact */}
					<div className='mt-10 flex flex-col items-start sm:mt-0'>
						<p className='footer-text mb-2 text-sm font-medium'>Contact</p>

						<p className='footer-text text-xl font-semibold'>hello@ethicallifeworld.com</p>
					</div>
				</div>
			</div>

			<div className='flex w-full flex-col justify-between font-medium sm:flex-row'>
				<p className='footer-text mb-10 text-start text-sm sm:mb-0'>© 2026 Ethical Life</p>

				<div className='flex w-full justify-between sm:w-2/3 lg:w-1/4'>
					<p className='footer-text text-sm lg:max-w-75'>Clone by Yuqi</p>
					<p className='footer-text text-sm lg:max-w-75'>Privacy Policy</p>
					<p className='footer-text text-sm lg:max-w-75'>Terms of Service</p>
				</div>
			</div>
		</div>
	);
};
