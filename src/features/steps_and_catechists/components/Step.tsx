import { useState } from "react";
import { FormatStep } from "../../../utils/FormatStep";
import ViewCatechumensModal from "./ViewCatechumensModal";
import type { CatechistSummary } from "../../../interfaces/catechist/CatechistSummary";
import type { StepResponse } from "../../../interfaces/step/StepResponse";

type StepProps = {
	catechists: CatechistSummary[],
	step: StepResponse
}

function Step({ catechists, step }: StepProps) {
	const [isOpenViewCatechumensModal, setIsOpenViewCatechumensModal] = useState<boolean>(false);

	return (
		<div className="card" data-catechists={JSON.stringify(catechists)} data-step={JSON.stringify(step)}>
			<h3 id="step">{FormatStep.format(step.stepName)}</h3>
			<p>Responsável:</p>
			<div className="catechists-container" id="firstNameCatechist">
				{catechists.map(catechist => (
					<strong key={catechist.id}>{`${catechist.firstName} ${catechist.lastName}`}</strong>
				))}
			</div>
			<button
				className="btn btn-view btn-view-catechumens"
				onClick={() => setIsOpenViewCatechumensModal(true)}
			>
				VISUALIZAR CATEQUIZANDOS
			</button>

			{isOpenViewCatechumensModal &&
				<ViewCatechumensModal
					catechists={catechists}
					step={step}
					onClose={() => setIsOpenViewCatechumensModal(false)}
				/>
			}
		</div>
	)
}

export default Step;