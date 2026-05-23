import { Calendar, Church } from "lucide-react";
import type { CatechumenResponse } from "../../../interfaces/catechumen/CatechumenResponse";
import MetaItem from "./MetaItem";

type CardCatechumenProps = {
	catechumen: CatechumenResponse,
	placeAndTime: string
}

function CardCatechumen({ catechumen, placeAndTime }: CardCatechumenProps) {
	return (
		<article
			key={catechumen.id}
			className="flex items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all duration-200 hover:border-[#CBD5E1] hover:shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1),0_2px_4px_-2px_rgb(0_0_0/0.1)]"
		>
			<div className="flex size-[52px] shrink-0 items-center justify-center rounded-full border-2 border-[#FDE68A] bg-[#FEF3C7] text-[1.3rem] font-extrabold text-[var(--primary-dark)]">
				{/* {catechumen.initial} */}
				A
			</div>

			<div className="flex flex-col gap-1">
				<h4 className="text-[1.1rem] font-bold text-[var(--text-main)]">
					{catechumen.firstName} {catechumen.lastName}
				</h4>

				<div className="flex flex-wrap items-center gap-x-4 gap-y-1">
					<MetaItem icon={<Church className="size-[18px]" />}>
						{catechumen.communityOrParish}
					</MetaItem>

					<MetaItem icon={<Calendar className="size-[18px]" />}>
						{placeAndTime}
					</MetaItem>
				</div>
			</div>
		</article>
	)
}

export default CardCatechumen;