import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useRef } from 'react';
import { ModalOverlay } from './ModalOverlay';
import { cn } from '../../../utils/cn';

type TModal = {
	opened: boolean;
	children: React.ReactNode;
	className?: string;
	blur?: boolean;
	onClose: () => void;
};

export const Modal = ({ children, opened, className, blur = false, onClose }: TModal) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	// 锁定 body 滚动
	useEffect(() => {
		if (opened) document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = '';
		};
	}, [opened]);

	// ✨ 打开动画
	useGSAP(
		() => {
			if (!modalRef.current) return;

			gsap.fromTo(
				modalRef.current,
				{ scale: 0.5, opacity: 0 },
				{ scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1)' }
			);
		},
		{ dependencies: [opened], scope: containerRef }
	);

	// ✨ 关闭动画：缩小，动画结束后再onClose
	const handleClose = () => {
		if (!modalRef.current) return;

		gsap.to(modalRef.current, {
			scale: 0.5,
			opacity: 0,
			duration: 0.2,
			ease: 'back.in(1)',
			onComplete: onClose,
		});
	};

	return (
		opened && (
			<div
				ref={containerRef}
				className='z-modal fixed flex h-full w-full max-w-[inherit] min-w-[inherit]'
			>
				<ModalOverlay opened={opened} onClose={handleClose} blur={blur} />
				<div className='z-modal-content fixed top-1/2 left-1/2 flex h-auto max-h-[90vh] w-screen max-w-[inherit] min-w-[inherit] -translate-x-1/2 -translate-y-1/2 items-center justify-center'>
					<div
						ref={modalRef}
						className={cn(
							'z-modal-content absolute flex h-auto max-h-[90vh] w-[94%] flex-col items-center justify-center rounded-xl bg-black text-white',
							className
						)}
					>
						<div className='flex w-full flex-col overflow-y-auto px-4'>{children}</div>
					</div>
				</div>
			</div>
		)
	);
};
