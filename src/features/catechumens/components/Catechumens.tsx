import type { StepResponse } from '../../../interfaces/step/StepResponse';
import { FormatStep } from '../../../utils/FormatStep';
import useLoadSelectFilter from '../hooks/useLoadSelectFilter';
import '../styles/catechumens.css';

function Catechumens() {

	const { steps, error } = useLoadSelectFilter();

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
		<main className="container-catechumens catequizandos-page">
			<section className="page-intro">
				<h1>Catequizandos</h1>
				<p>Consulte a frequência dos catequizandos filtrando por etapa e catequista.</p>
			</section>

			<section className="toolbar-filtros">
				<div className="card-filtros">
					<div className="filtros-main">
						<div className="filtro-group">
							<label htmlFor="filtro-etapa">Etapa e Catequista</label>
							<select id="filter-step-and-catechist">
								<option hidden>[Selecione a Etapa e o Catequista]</option>
								{steps.map(step => (
									step.catechists.length === 1
										? <option value={`${step.id}-${step.catechists[0].id}`}>
												{FormatStep.format(step.stepName)} - {step.catechists[0].firstName} {step.catechists[0].lastName}
											</option>
										: <option value={`${step.id}-${step.catechists[0].id}`}>
												{defineOptionOfCatechists(step)}
											</option>
								))}
							</select>
						</div>
					</div>
				</div>
			</section>

			<section className="tabela-section">
				<div className="tabela-container">
					<table className="tabela-catequizandos" id="tabela-dados" style={{ display: 'none' }}>
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
								
						</tbody>
					</table>

					<div className="estado-vazio" id="estado-vazio-filtros">
						<div className="vazio-content">
							<i data-lucide="users" className="vazio-icon"></i>
							<h3>Filtre os catequizandos por ETAPA e CATEQUISTA</h3>
							<p>Selecione uma etapa e um catequista para visualizar os catequizandos e suas frequências.</p>
						</div>
					</div>
				</div>
			</section>       
    </main>
	)
}

export default Catechumens;