export type StarConfig = {
	id: number;
	src: string;
	size: number;
	top: number;
	left?: number;
	right?: number;
	depth: number;
	scrollSpeed: number;
	rotation: number;
	scrollY: number;
	idleOffset: number;
	isLeft: boolean;
};

export type StarResponsive = {
	size: number;
	depth: number;
	scroll: number;
	blur: number;
};

export const STARS: StarConfig[] = [
	{
		id: 1,
		src: '/images/gummy-4-big.webp',
		size: 150,
		top: 220,
		left: 10,
		depth: 28,
		scrollSpeed: 10,
		rotation: 380,
		scrollY: 380,
		idleOffset: 16,
		isLeft: true,
	},
	{
		id: 2,
		src: '/images/gummy-1-big.webp',
		size: 180,
		top: 600,
		left: 180,
		depth: 8,
		scrollSpeed: 0.4,
		rotation: 380,
		scrollY: 380,
		idleOffset: 6,
		isLeft: true,
	},
	{
		id: 3,
		src: '/images/gummy-3-big.webp',
		size: 80,
		top: 480,
		left: 420,
		depth: 14,
		scrollSpeed: 0.6,
		rotation: 380,
		scrollY: 380,
		idleOffset: 8,
		isLeft: false,
	},
	{
		id: 4,
		src: '/images/gummy-4-big.webp',
		size: 140,
		top: 360,
		right: 56,
		depth: 20,
		scrollSpeed: 0.8,
		rotation: 12,
		scrollY: 380,
		idleOffset: 12,
		isLeft: true,
	},
	{
		id: 5,
		src: '/images/gummy-2-big.webp',
		size: 120,
		top: 600,
		right: 150,
		depth: 20,
		scrollSpeed: 0.8,
		rotation: 180,
		scrollY: 380,
		idleOffset: 12,
		isLeft: true,
	},
	{
		id: 6,
		src: '/images/gummy-2-big.webp',
		size: 80,
		top: 400,
		right: 340,
		depth: 20,
		scrollSpeed: 0.8,
		rotation: 380,
		scrollY: 380,
		idleOffset: 12,
		isLeft: false,
	},
];

export const STAR_RESPONSIVE: Record<'mobile' | 'tablet' | 'desktop', StarResponsive> = {
	mobile: {
		size: 0.5,
		depth: 0.5,
		scroll: 0.7,
		blur: 1.2,
	},
	tablet: {
		size: 0.7,
		depth: 0.75,
		scroll: 0.85,
		blur: 1,
	},
	desktop: {
		size: 1,
		depth: 1,
		scroll: 1,
		blur: 1,
	},
};
