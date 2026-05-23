import { Calendar, Church, Clock } from "lucide-react";
import type { MassResponse } from "../../../interfaces/mass/MassResponse";
import MetaItem from "./MetaItem";
import { UtilsDate } from "../../../utils/UtilsDate";

type MassCardProps = {
	mass: MassResponse,
	selected: boolean,
	onSelect: () => void,
	onFilter: (param: number) => void
}

function MassCard({ mass, selected, onSelect, onFilter }: MassCardProps) {
	return (
		<article
			key={`${mass.id}`}
			onClick={() => {
				onFilter(mass.id)
				onSelect();
			}}
			className={[
				'flex cursor-pointer flex-col gap-3 rounded-2xl border-2 p-6 transition-all duration-200',
				'hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1),0_2px_4px_-2px_rgb(0_0_0/0.1)]',
				selected
					? 'border-[var(--primary)] bg-[#FFFBEB] shadow-[0_0_0_4px_rgba(245,158,11,0.15)]'
					: 'border-[#E2E8F0] bg-white shadow-sm',
			].join(' ')}
		>
			<div className="flex items-center gap-3 text-[1.15rem] font-bold text-[var(--primary-dark)]">
				<Church className="size-[22px] shrink-0" />
				<span>{mass.location === 'MATRIZ' ? 'São Sebastião - Matriz' : 'Divino Espírito Santo'}</span>
			</div>

			<div className="flex flex-col gap-1.5">
				<MetaItem icon={<Calendar className="size-[18px]" />}>
					{UtilsDate.formatDateTimeForDate(mass.dateTime)}
				</MetaItem>

				<MetaItem icon={<Clock className="size-[18px]" />}>
					{UtilsDate.formatDateTimeThisMissaForTime(mass.dateTime)}
				</MetaItem>
			</div>
		</article>
	)
}

export default MassCard;