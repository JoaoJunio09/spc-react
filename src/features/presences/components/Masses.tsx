import { Church } from "lucide-react";
import { useState } from "react";
import type { MassResponse } from "../../../interfaces/mass/MassResponse";
import MassCard from "./MasCard";
import SectionTitle from "./SectionTitle";
import { Link } from "react-router-dom";

type MassesProps = {
	masses: MassResponse[],
	onFilter: (param: number) => void
}

function Masses({ masses, onFilter }: MassesProps) {
	const [selectedMassId, setSelectedMassId] = useState<number | null>(null);

	return (
		<section className="mb-12">
			<div className="mb-10">
				<button className="btn btn-primary">
					<Link to={`/presencas/registrar/${masses[0].id}?retroativo=true`}>
						Registrar presença retroativa
					</Link>
				</button>
			</div>

			<SectionTitle icon={<Church className="size-5" />}>
				Missas encontradas
			</SectionTitle>
			
			<div className="grid grid-cols-1 gap-5 md:grid-cols-3">
				{masses.map(mass => (
					<MassCard
						key={mass.id}
						mass={mass}
						selected={selectedMassId === mass.id}
						onSelect={() => setSelectedMassId(mass.id)}
						onFilter={onFilter}
					/>
				))}
			</div>
		</section>
	)
}

export default Masses;