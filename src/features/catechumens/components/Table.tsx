import type { CatechumenResponse } from "../../../interfaces/catechumen/CatechumenResponse";
import { FormatStep } from "../../../utils/FormatStep";

type TableProps = {
	catechumens: CatechumenResponse[]
}

function Table({ catechumens }: TableProps) {
	return (
		<table className="tabela-catequizandos" id="tabela-dados" style={{ display: `${catechumens.length === 0 ? 'none' : 'initial'}` }}>
			<thead>
				<tr>
					<th>Nome do Catequizando</th>
					<th>Etapa da Catequese</th>
					<th>Catequista</th>
					<th className="text-center">Frequência Atual</th>
					<th className="text-center">Frequência Total</th>
				</tr>
			</thead>
			<tbody>
				{catechumens.map(catechumen => (
					<tr key={catechumen.id} className="catequizando-row">
						<td id="firstName">{catechumen.firstName} {catechumen.lastName}</td>
						<td id="step">{FormatStep.format(catechumen.step.stepName)}</td>
						<td id="catechistFirstName">{catechumen.step.catechists[0].firstName}</td>
						<td className="text-center">
							<div className="freq-wrapper">
								<span className="freq-badge freq-high">{catechumen.currentFrequency}%</span>
							</div>
						</td>
						<td className="text-center">
							<div className="freq-wrapper">
								<span className="freq-badge freq-medium">{catechumen.totalFrequency}%</span>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default Table;