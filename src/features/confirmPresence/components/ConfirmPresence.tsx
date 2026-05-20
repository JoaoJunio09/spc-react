import { Link } from 'react-router-dom';
import { DefineNameCatechists } from '../../../utils/DefineNameCatechists';
import { FormatStep } from '../../../utils/FormatStep';
import useConfirmPresense from '../hooks/useConfirmPresence';
import '../styles/confirmPresence.css';


function ConfirmPresence() {
	const {
		catechumensConfirm,
		confirmPresenceMutation,
		titleMass
	} = useConfirmPresense();

	return (
		<main className="confirm-presence-container">
			<section className="page-intro">
				<h2>Confirmar Presenças Registradas</h2>
				<p>Verifique a lista de catequizandos presentes antes de finalizar o registro.</p>
			</section>

			<section className="review-section">
				<div className="review-list" id="reviewList">
					{catechumensConfirm?.map(catechumen => (
						<div className="review-card">
							<div className="review-info">
								<h4 id="catechumen-name">{catechumen.firstName} {catechumen.lastName}</h4>
								<p id="step-and-catechists-name">
									{FormatStep.format(catechumen.step.stepName)} • 
									{DefineNameCatechists.define(catechumen.step)}
								</p>
							</div>
							<div className="review-badge">Presente</div>
						</div>
					))}
				</div>

				<div className="empty-state" id="emptyState" style={{ display: 'none' }}>
					<p>Nenhum catequizando marcado como presente.</p>
				</div>
			</section>

			<section className="review-actions">
				<button className="btn-back">
					<Link to={`/presencas/registrar/${titleMass}`} style={{ color: '#000' }}>
						<i data-lucide="arrow-left"></i> Voltar e Alterar
					</Link>
				</button>
				<button className="btn-confirm-submit" id="btnSubmit">
					<i data-lucide="check-circle-2"></i> Confirmar Presenças
				</button>
			</section>
    </main>
	)
}

export default ConfirmPresence;