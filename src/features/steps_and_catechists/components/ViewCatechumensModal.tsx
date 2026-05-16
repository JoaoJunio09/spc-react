import { toast } from "react-toastify";
import type { CatechistSummary } from "../../../interfaces/catechist/CatechistSummary";
import type { StepResponse } from "../../../interfaces/step/StepResponse";
import useCatechumens from "../hooks/useCatechumens";
import Catechumen from "./Catechumen";
import { FormatStep } from "../../../utils/FormatStep";

type ViewCatechumensModalProps = {
	catechists: CatechistSummary[],
	step: StepResponse
	onClose: () => void
}

function ViewCatechumensModal({ catechists, step, onClose }: ViewCatechumensModalProps) {
	const { catechumens, error } = useCatechumens({ catechists, step });

	return (
		<div id="modalViewCatechumens" className="modal-overlay">
			{error && toast.error(error)}
			<div className="modal-content" style={{maxWidth: '650px'}}>
				<div className="modal-header">
					<h3 id="view-steps-title">{`Catequizandos: ${FormatStep.format(step.stepName)}`}</h3>
				</div>
				<div id="list-catechumens">
					{catechumens.map(catechumen => (
						<Catechumen
							key={catechumen.id}
							firstName={catechumen.firstName}
							lastName={catechumen.lastName}
							currentFrequency={catechumen.currentFrequency}
							totalFrequency={catechumen.totalFrequency}
						/>
					))}
				</div>
				<div className="modal-footer" style={{ gridTemplateColumns: '1fr' }}>
					<button
						className="btn btn-cancel"
						id="btn-cancel"
						onClick={onClose}
					>
						FECHAR
					</button>
				</div>
			</div>
		</div>
	)
}

export default ViewCatechumensModal;