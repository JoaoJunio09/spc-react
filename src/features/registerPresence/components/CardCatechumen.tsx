import type { CatechumenResponse } from "../../../interfaces/catechumen/CatechumenResponse";
import { FormatStep } from "../../../utils/FormatStep";

type CardCatechumenProps = {
	catechumen: CatechumenResponse,
	isPresent: boolean,
	handleMarkPresence: (catechumen: CatechumenResponse) => void,
	handleMarkAbsence: (catechumen: CatechumenResponse) => void
}

function CardCatechumen({ catechumen, isPresent, handleMarkPresence, handleMarkAbsence }: CardCatechumenProps) {
	return (
		<div className="catequizando-card catechumen-card" data-catechumen="">
			<div className="student-info">
				<h4 id="catechumen-name">{catechumen.firstName} {catechumen.lastName}</h4>
				<p id="step-and-catechist-name">{FormatStep.format(catechumen.step.stepName)}</p>
				{catechumen.step.catechists.map(catechist => (
					<p key={catechist.id} id="step-and-catechist-name">{catechist.firstName}</p>
				))}
			</div>
			<div className="attendance-controls">
				<button
					className={`btn-toggle btn-mark-presence presente ${isPresent ? 'active' : ''}`}
					onClick={() => handleMarkPresence(catechumen)}
				>
					<i data-lucide="check"></i> Presença
				</button>
				<button
					className={`btn-toggle btn-mark-absence ausente ${!isPresent ? 'active' : ''}`}
					onClick={() => handleMarkAbsence(catechumen)}
				>
					Ausência
				</button>
			</div>
		</div>
	)
}

export default CardCatechumen;