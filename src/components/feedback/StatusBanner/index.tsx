import { CircleAlert, CircleCheck, CircleX } from "lucide-react";

export type StatusBannerVariant = 'success' | 'error' | 'warning' | 'info';

type StatusBannerType = {
	open: boolean,
	variant: StatusBannerVariant,
	message: string
}

function returnedVariantBackground(variant: StatusBannerVariant) {
	if (variant === 'success') return 'bg-green-600';
	else if (variant === 'error') return 'bg-red-600';
	else if (variant === 'warning') return 'bg-orange-400';
	else return 'bg-blue-600';
}

function returnedVariantIcon(variant: StatusBannerVariant) {
	if (variant === 'success') return <CircleCheck size={25} color="#fff"/>;
	else if (variant === 'error') return <CircleX size={25} color="#fff"/>;
	else if (variant === 'warning') return <CircleAlert size={25} color="#fff"/>;
	else return <CircleAlert size={25} color="#fff"/>;
}

function StatusBanner({
	open = false,
	variant,
	message
}: StatusBannerType) {
	return (
		<div
			className={`
				w-full min-h-26 px-4 py-4 flex items-center justify-center
				${open ? 'flex' : 'hidden'}
				${returnedVariantBackground(variant)}
			`}
		>
			<div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center sm:text-left max-w-4xl">
				{returnedVariantIcon(variant)}
				<p className="text-white text-sm sm:text-base md:text-lg leading-relaxed break-words">
					{message}
				</p>
			</div>
		</div>
	)
}

export default StatusBanner;