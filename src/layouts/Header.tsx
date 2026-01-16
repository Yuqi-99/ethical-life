export const Header = () => {
	return (
		<div className='fixed top-0 z-50 w-full px-6'>
			<div className='grid h-17.5 w-full grid-cols-3 place-content-center items-center'>
				<div className='flex h-fit justify-between justify-self-start rounded-full border border-solid border-gray-100 bg-white p-3 px-2 uppercase'>
					<p className='w-20 text-center text-sm font-medium'>about</p>
					<p className='w-20 text-center text-sm font-medium'>shop</p>
					<p className='w-20 text-center text-sm font-medium'>blog</p>
				</div>

				<div className='bg-yellow-main flex h-17.5 items-center justify-center justify-self-center rounded-b-xl px-4'>
					<img src='/images/assets/logo.svg' alt='logo' className='w-40' />
				</div>

				<div className='flex h-fit justify-between justify-self-end rounded-full border border-solid border-gray-100 bg-white p-3 px-2 uppercase'>
					<img src='/images/assets/profile-icon.svg' alt='logo' className='size-6 w-14' />
					<img src='/images/assets/cart-icon.svg' alt='logo' className='size-6 w-14' />
				</div>
			</div>
		</div>
	);
};
