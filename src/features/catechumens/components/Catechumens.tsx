import { toast } from 'react-toastify';
import type { StepResponse } from '../../../interfaces/step/StepResponse';
import { FormatStep } from '../../../utils/FormatStep';
import useLoadSelectFilter from '../hooks/useLoadSelectFilter';
import '../styles/catechumens.css';
import useFilter from '../hooks/useFilter';
import Table from './Table';
import Select from './Select';

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
							<Select steps={steps} handleFilter={handleFilter} />
						</div>
					</div>
				</div>
			</section>

			<section className="tabela-section">
				<div className="tabela-container">
					<Table catechumens={catechumens} />

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