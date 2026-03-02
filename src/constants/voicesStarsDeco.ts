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

export const getStarDecoConfig = (isMobile: boolean): StarConfig[] => [
	{
		id: 1,
		src: '/images/gummy-4-big.webp',
		size: 150,
		top: isMobile ? 450 : 350,
		left: isMobile ? 10 : 10,
		depth: 28,
		scrollSpeed: 10,
		rotation: 100,
		scrollY: 380,
		idleOffset: 16,
		isLeft: true,
	},
	{
		id: 2,
		src: '/images/gummy-1-big.webp',
		size: 140,
		top: 600,
		left: isMobile ? 80 : 180,
		depth: 8,
		scrollSpeed: 0.4,
		rotation: 340,
		scrollY: 380,
		idleOffset: 6,
		isLeft: true,
	},
	{
		id: 3,
		src: '/images/gummy-3-big.webp',
		size: 50,
		top: isMobile ? 500 : 480,
		left: isMobile ? 300 : 500,
		depth: 14,
		scrollSpeed: 0.6,
		rotation: -620,
		scrollY: 380,
		idleOffset: 8,
		isLeft: false,
	},
	{
		id: 4,
		src: '/images/gummy-4-big.webp',
		size: 200,
		top: isMobile ? 500 : 450,
		right: isMobile ? 35 : 56,
		depth: 20,
		scrollSpeed: 0.8,
		rotation: 580,
		scrollY: 380,
		idleOffset: 12,
		isLeft: true,
	},
	{
		id: 5,
		src: '/images/gummy-2-big.webp',
		size: 180,
		top: 600,
		right: isMobile ? 140 : 200,
		depth: 20,
		scrollSpeed: 0.8,
		rotation: -360,
		scrollY: 380,
		idleOffset: 12,
		isLeft: true,
	},
	{
		id: 6,
		src: '/images/gummy-2-big.webp',
		size: 80,
		top: isMobile ? 450 : 380,
		right: isMobile ? 300 : 360,
		// left: isMobile ? 30 : 0,
		depth: 20,
		scrollSpeed: 0.8,
		rotation: 480,
		scrollY: 380,
		idleOffset: 12,
		isLeft: false,
	},
];

