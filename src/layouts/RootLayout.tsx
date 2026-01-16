import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const RootLayout = () => {
	return (
		<main className='flex min-h-screen w-full flex-col items-center justify-start'>
			<div
				id='content-wrapper'
				className='relative flex min-h-screen w-full max-w-360 flex-col items-center'
			>
				<Header />
				<Outlet />
			</div>
		</main>
	);
};
