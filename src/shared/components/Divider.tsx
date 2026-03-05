import { cn } from '../../utils/cn';

type TDivider = {
	className?: string;
};

export const Divider = ({ className }: TDivider) => {
	return <hr className={cn('w-full border border-black/10', className)} />;
};
