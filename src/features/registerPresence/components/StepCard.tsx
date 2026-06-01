import type { StepResponse } from "../../../data/step/StepResponse";
import { FormatStep } from "../../../utils/FormatStep";

type StepCardProps = {
	step: StepResponse
	handleListCatechumens: () => void
}

function StepCard({ step, handleListCatechumens }: StepCardProps) {
	return (
		<div id="card-step" className="turma-card" data-id={step.id}>
			<h4>{FormatStep.format(step.stepName)}</h4>
			{
				step.catechists.length === 1
				? <p>{step.catechists[0].firstName}</p>
				: step.catechists.map(catechist => (
					<p key={catechist.id}>{catechist.firstName}</p>
				))
			}
			<button className="btn-list-students" onClick={handleListCatechumens}>
				Listar Catequizandos
			</button>
		</div>
	)
}

export default StepCard;