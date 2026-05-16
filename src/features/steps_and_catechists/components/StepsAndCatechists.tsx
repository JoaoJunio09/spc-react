import { toast } from 'react-toastify';
import Catechist from './Catechist';
import Step from './Step';
import { FormatStep } from '../../../utils/FormatStep';
import useStepsAndCatechists from '../hooks/useStepsAndCatechists';

import '../styles/stepsAndCatechists.css';

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

        <section className="list-section-step-and-catechists">
					<h3 className="list-header">Catequistas da Paróquia</h3>
					<div id="lista-catequistas" className="grid-cards">
						{catechists?.map(catechist => (
							<Catechist
								key={catechist.id}
								firstName={catechist.firstName}
								stepName={FormatStep.format(catechist.step.stepName)}
							/>
						))}
					</div>
        </section>

        <section className="list-section-step-and-catechists">
					<h3 className="list-header">Turmas da Catequese</h3>
					<div id="lista-turmas" className="grid-cards">
						{steps?.map(step => (
							<Step
								key={step.id}
								catechists={step.catechists}
								step={step}
							/>
						))}
					</div>
        </section>
    	</div>
		</main>
	)
}

export default StepsAndCatechists;