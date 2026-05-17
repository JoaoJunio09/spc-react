import type { StepResponse } from "../../../interfaces/step/StepResponse";
import { FormatStep } from "../../../utils/FormatStep";

type SelectProps = {
	steps: StepResponse[],
	handleFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

function Select({ steps, handleFilter }: SelectProps) {

	function defineOptionOfCatechists(step: StepResponse) {
		let textOption:string = '';

		for (let i = 0; i < step.catechists.length; i++) {
			if (i === 0) {
				textOption = FormatStep.format(step.stepName) + ' - ';
			}

			step.catechists.length - i === 1
				?	textOption += `${step.catechists[i].firstName}`
				:	textOption += `${step.catechists[i].firstName} & `
		}

		return [textOption];
	}

	return (
		<select id="filter-step-and-catechist" onChange={(e) => handleFilter(e)}>
			<option hidden>[Selecione a Etapa e o Catequista]</option>
			{steps.map(step => (
				step.catechists.length === 1
					? <option key={`${step.id}-${step.catechists[0].id}`} value={`${step.id}-${step.catechists[0].id}`}>
							{FormatStep.format(step.stepName)} - {step.catechists[0].firstName} {step.catechists[0].lastName}
						</option>
					: <option key={`${step.id}-${step.catechists[0].id}`} value={`${step.id}-${step.catechists[0].id}`}>
							{defineOptionOfCatechists(step)}
						</option>
			))}
		</select>
	)
}

export default Select;