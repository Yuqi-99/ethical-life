import { useEffect, useState } from 'react';
import { STAR_RESPONSIVE, type StarResponsive } from '../constants/stars';

const getStarResponsive = (): StarResponsive => {
	const w = window.innerWidth;

	if (w < 768) return STAR_RESPONSIVE.mobile;
	if (w < 1024) return STAR_RESPONSIVE.tablet;
	return STAR_RESPONSIVE.desktop;
};

export const useStarResponsive = () => {
	const [responsive, setResponsive] = useState<StarResponsive>(getStarResponsive);

	useEffect(() => {
		const onResize = () => setResponsive(getStarResponsive());
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

	return responsive;
};
