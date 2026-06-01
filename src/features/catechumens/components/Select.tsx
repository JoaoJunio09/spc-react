import type { StepResponse } from "../../../data/step/StepResponse";
import { DefineNameCatechists } from "../../../utils/DefineNameCatechists";
import { FormatStep } from "../../../utils/FormatStep";

type SelectProps = {
	steps: StepResponse[],
	handleFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

function Select({ steps, handleFilter }: SelectProps) {
	return (
		<select id="filter-step-and-catechist" onChange={(e) => handleFilter(e)}>
			<option hidden>[Selecione a Etapa e o Catequista]</option>
			{steps.map(step => (
				step.catechists.length === 1
					? <option key={`${step.id}-${step.catechists[0].id}`} value={`${step.id}-${step.catechists[0].id}`}>
							{FormatStep.format(step.stepName)} - {step.catechists[0].firstName} {step.catechists[0].lastName}
						</option>
					: <option key={`${step.id}-${step.catechists[0].id}`} value={`${step.id}-${step.catechists[0].id}`}>
							{DefineNameCatechists.define(step)}
						</option>
			))}
		</select>
	)
}

export default Select;