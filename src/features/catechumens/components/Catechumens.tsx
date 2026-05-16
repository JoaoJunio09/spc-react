import { toast } from 'react-toastify';
import type { StepResponse } from '../../../interfaces/step/StepResponse';
import { FormatStep } from '../../../utils/FormatStep';
import useLoadSelectFilter from '../hooks/useLoadSelectFilter';
import '../styles/catechumens.css';
import useFilter from '../hooks/useFilter';

function Catechumens() {

	const { steps, error: errorFilter } = useLoadSelectFilter();
	const {
		filter,
		setStepId,
		setCatechistId,
		catechumens,
		loading,
		error
	} = useFilter();

	console.log(catechumens);

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

	function handleFilter(e: React.ChangeEvent<HTMLSelectElement>) {
		const value = e.target.value.split('-');
		
		const stepId = value[0];
		const catechistId = value[1];

		setStepId(Number(stepId));
		setCatechistId(Number(catechistId));
	}

	return (
		<main className="container-catechumens catequizandos-page">
			{errorFilter && toast.error(errorFilter)}
			<section className="page-intro">
				<h1>Catequizandos</h1>
				<p>Consulte a frequência dos catequizandos filtrando por etapa e catequista.</p>
			</section>

			<section className="toolbar-filtros">
				<div className="card-filtros">
					<div className="filtros-main">
						<div className="filtro-group">
							<label htmlFor="filtro-etapa">Etapa e Catequista</label>
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
						</div>
					</div>
				</div>
			</section>

			<section className="tabela-section">
				<div className="tabela-container">
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

					<div className="estado-vazio" id="estado-vazio-filtros" style={{ display: `${catechumens.length === 0 ? 'initial' : 'none'}` }}>
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