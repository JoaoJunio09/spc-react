import { Calendar, Church } from "lucide-react";
import type { PresenceResponse } from "../../../data/presence/PresenceResponse";
import { UtilsDate } from "../../../utils/UtilsDate";
import MetaItem from "./MetaItem";

type CatechumenCardProps = {
	presence: PresenceResponse,
}

function CatechumenCard({ presence }: CatechumenCardProps) {
	return (
		<article
			key={presence.id}
			className="flex items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all duration-200 hover:border-[#CBD5E1] hover:shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1),0_2px_4px_-2px_rgb(0_0_0/0.1)]"
		>
			<div className="flex size-[52px] shrink-0 items-center justify-center rounded-full border-2 border-[#FDE68A] bg-[#FEF3C7] text-[1.3rem] font-extrabold text-[var(--primary-dark)]">
				{presence.catechumen.fullName[0]}
			</div>

			<div className="flex flex-col gap-1">
				<h4 className="text-[1.1rem] font-bold text-[var(--text-main)]">
					{presence.catechumen.fullName}
				</h4>

				<div className="flex flex-wrap items-center gap-x-4 gap-y-1">
					<MetaItem icon={<Church className="size-[18px]" />}>
						{presence.mass.location === 'MATRIZ' ? 'Matriz' : 'Capela do Divino'}
					</MetaItem>

					<MetaItem icon={<Calendar className="size-[18px]" />}>
						{UtilsDate.formatDateTime(presence.mass.dateTime)}
					</MetaItem>
				</div>

				<p className="text-[.8rem] text-[var(--text-muted)]">
					Registrado por:
					<span className="font-semibold ml-1">{presence.user.fullName.split(' ')[0] } {presence.user.fullName.split(' ')[1]}</span>
				</p>
				
			</div>
		</article>
	)
}

export default CatechumenCard;