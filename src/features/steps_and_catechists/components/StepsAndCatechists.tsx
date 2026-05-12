import { toast } from 'react-toastify';
import useStepsAndCatechists from '../hooks/useStepsAndCatechists';
import '../styles/stepsAndCatechists.css';
import Catechist from './Catechist';
import { FormatStep } from '../../../utils/FormatStep';

function StepsAndCatechists() {
	const { catechists, steps, error } = useStepsAndCatechists();

	return (
		<main>
			{error && toast.error(error)}
			<div className="steps-and-catechists-container">
        <section className="page-intro">
					<h2>Gestão de Turmas e Catequistas</h2>
					<p>Controle a alocação de catequistas e visualize o desempenho de presença dos catequizandos.</p>
        </section>

        <section className="list-section">
					<h3 className="list-header">Catequistas da Paróquia</h3>
					
					<div id="lista-catequistas" className="grid-cards">
						{catechists?.map(catechist => (
							<Catechist firstName={catechist.firstName} stepName={FormatStep.format(catechist.step.stepName)} />
						))}
					</div>
        </section>

        <section className="list-section">
					<h3 className="list-header">Turmas da Catequese</h3>
					<div id="lista-turmas" className="grid-cards">

					</div>
        </section>
    	</div>
		</main>
	)
}

export default StepsAndCatechists;