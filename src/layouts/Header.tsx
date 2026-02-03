import gsap from 'gsap';
import { AnimatedNav } from './AnimatedNav';
import { useEffect, useRef, useState } from 'react';
import { MobileMenuItem } from './components/MobileMenuItems';

const desktopMenu = ['about', 'shop', 'blog'];
const mobileMenu = ['About', 'Shop', 'Blog', 'FAQ'];
const socials = [
	{ label: 'Instagram', link: 'https://www.instagram.com/ethicallifeworld' },
	{ label: 'Facebook', link: 'https://www.facebook.com/ethicallifeworld/' },
	{ label: 'Tiktok', link: 'https://www.tiktok.com/@ethicallifeworld' },
	{ label: 'Linkedin', link: 'https://www.linkedin.com/company/ethical-life/' },
];

export const Header = () => {
	const btnRef = useRef<HTMLButtonElement>(null);
	const tlRef = useRef<gsap.core.Timeline | null>(null);
	const [open, setOpen] = useState(false);
	const [isFirstRender, setIsFirstRender] = useState(true);

	const drawerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!btnRef.current) return;

		const ctx = gsap.context(() => {
			tlRef.current = gsap
				.timeline({ paused: true })
				.to('.line-top', {
					y: 3.4,
					duration: 0.25,
					ease: 'power2.out',
				})
				.to(
					'.line-bottom',
					{
						y: -3.4,
						duration: 0.25,
						ease: 'power2.out',
					},
					'<'
				)
				.to('.line-top', {
					rotate: 45,
					duration: 0.25,
					ease: 'power2.out',
				})
				.to(
					'.line-bottom',
					{
						rotate: -45,
						duration: 0.25,
						ease: 'power2.out',
					},
					'<'
				);
		}, btnRef);

		return () => ctx.revert();
	}, []);

	const toggle = () => {
		if (!tlRef.current) return;

		if (open) {
			tlRef.current.reverse();
		} else {
			tlRef.current.play();
		}

		setOpen(!open);
	};

	useEffect(() => {
		const drawer = drawerRef.current;
		if (!drawer) return;

		if (isFirstRender) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setIsFirstRender(false);
			return;
		}

		if (open) {
			gsap.fromTo(drawer, { x: '-100%' }, { x: '0%', duration: 0.5, ease: 'power3.out' });

			gsap.fromTo(
				'.mobile-menu-item',
				{ y: 40, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
			);

			gsap.fromTo(
				'.social-link',
				{ opacity: 0 },
				{ opacity: 1, duration: 0.5, stagger: 0.05, delay: 0.6 }
			);
		} else {
			gsap.fromTo(drawer, { x: '0%' }, { x: '-100%', duration: 0.5, ease: 'power3.out' });
		}
	}, [open]);

	return (
		<div className='fixed top-0 left-0 z-50 w-full px-6'>
			{/* mobile drawer */}
			<div
				ref={drawerRef}
				className='drawer bg-bg-drawer fixed top-0 left-0 z-50 h-full w-full px-6'
				style={{ transform: 'translateX(-100%)' }}
			>
				<div className='mt-[30%] flex w-full flex-col items-start px-4'>
					{mobileMenu.map((item) => (
						<MobileMenuItem key={item} label={item} />
					))}
				</div>

				<div className='mt-14 flex w-full flex-col items-start justify-center px-4'>
					<p className='mb-2 text-xs'>Socials</p>
					{socials.map((item) => (
						<MobileMenuItem key={item.label} label={item.label} link={item.link} isSocial />
					))}
				</div>
			</div>

			{/* mobile */}
			<div className='grid grid-cols-3 place-content-center items-center lg:hidden'>
				{/* LEFT */}
				<button
					ref={btnRef}
					onClick={() => toggle()}
					className='menu-opener z-60 cursor-pointer'
					aria-label='Toggle menu'
				>
					<span className='line line-top' />
					<span className='line line-bottom' />
				</button>

				{/* LOGO */}
				<div className='bg-yellow-main z-60 flex h-12 items-center justify-center justify-self-center rounded-b-xl px-4 sm:h-14'>
					<img src='/images/assets/logo.svg' alt='logo' className='min-w-28 sm:min-w-30' />
				</div>

				{/* RIGHT */}
				<div className='z-60 flex h-fit justify-between justify-self-end rounded-full uppercase'>
					<img src='/images/assets/profile-icon.svg' alt='logo' className='size-6 w-12' />
					<img src='/images/assets/cart-icon.svg' alt='logo' className='size-6 w-12 p-0.5' />
				</div>
			</div>

			{/* desktop */}
			<div className='hidden h-17.5 w-full grid-cols-3 place-content-center items-center lg:grid'>
				{/* LEFT */}
				<AnimatedNav items={desktopMenu} left />

				{/* LOGO */}
				<div className='bg-yellow-main flex h-17.5 items-center justify-center justify-self-center rounded-b-xl px-4'>
					<img src='/images/assets/logo.svg' alt='logo' className='w-40' />
				</div>

				{/* RIGHT */}
				<AnimatedNav
					items={[
						<img src='/images/assets/profile-icon.svg' alt='profile' />,
						<img src='/images/assets/cart-icon.svg' alt='cart' />,
					]}
					itemWidth='w-14'
				/>
			</div>
		</div>
	);
};
