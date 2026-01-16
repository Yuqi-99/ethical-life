import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const RootLayout = () => {
	return (
		// <main className='bg-bg-light relative flex min-h-screen w-full max-w-360 flex-col items-center'>
		// 	<Header />
		// 	{/* <ImageSequencePage /> */}
		// 	<Outlet />
		// </main>

		<main className='bg-bg-light flex items-center justify-center'>
			<div
				id='content-wrapper'
				className='relative flex h-full min-h-dvh w-full max-w-360 flex-col items-center'
			>
				<Header />
				<Outlet />
			</div>
		</main>
	);
};
