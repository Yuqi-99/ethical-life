import { FooterEthicalLifeTitle } from './FooterEthicalLifeTitle';

export const Footer = () => {
	return (
		<div
			id='footer'
			className='sticky top-0 bottom-0 flex h-full min-h-screen w-full items-center justify-center'
		>
			<div className='flex h-full w-[95%] items-start justify-center'>
				<FooterEthicalLifeTitle />
			</div>
		</div>
	);
};
