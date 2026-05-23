import Skeleton from "react-loading-skeleton";

function CatechumenCardSkeleton() {
	return (
		<div className="flex items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all duration-200 hover:border-[#CBD5E1] hover:shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1),0_2px_4px_-2px_rgb(0_0_0/0.1)]">
			<Skeleton borderRadius={50} height={70} width={70} />

			<div className="w-full">
				<Skeleton height={30} className="w-full"/>
				<Skeleton height={30} className="w-full" />
			</div>
		</div>
	)
}

export default CatechumenCardSkeleton;