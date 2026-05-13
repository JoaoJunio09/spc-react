import type { CatechistSummary } from "../../../interfaces/catechist/CatechistSummary";
import { FormatStep } from "../../../utils/FormatStep";

type StepProps = {
	catechists: CatechistSummary[],
	step: string
}

function Step({ catechists, step }: StepProps) {
	return (
		<div className="card" data-catechists={catechists} data-step={step}>
			<h3 id="step">{FormatStep.format(step)}</h3>
			<p>Responsável:</p>
			<div className="catechists-container" id="firstNameCatechist">
				{catechists.map(catechist => (
					<strong>{`${catechist.firstName} ${catechist.lastName}`}</strong>
				))}
			</div>
			<button className="btn btn-view btn-view-catechumens">VISUALIZAR CATEQUIZANDOS</button>
		</div>
	)
}

export default Step;