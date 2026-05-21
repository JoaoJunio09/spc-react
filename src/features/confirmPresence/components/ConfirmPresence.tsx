import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DefineNameCatechists } from '../../../utils/DefineNameCatechists';
import { FormatStep } from '../../../utils/FormatStep';
import useConfirmPresense from '../hooks/useConfirmPresence';
import type { PresenceRequest } from '../../../interfaces/presence/PresenceRequest';

import '../styles/confirmPresence.css';
import ConflictInTheDatabaseException from '../../../exceptions/database/ConflicInTheDatabaseException';

function ConfirmPresence() {
	const {
		catechumensConfirm,
		confirmPresenceMutation,
		massId,
		catechistId,
		clearPresenceFlow
	} = useConfirmPresense();

	const navigate = useNavigate();

	async function handleConfirm() {
		if (!massId || !catechistId || catechumensConfirm?.length === 0 || catechumensConfirm === null) {
			toast.error('Dados inválidos para confirmar presença');
			return;
		}

		try {
			const presences: PresenceRequest[] = catechumensConfirm.map((catechumen) => ({
				id: null,
				catechistId: catechistId,
				catechumenId: catechumen.id,
				massId: Number(massId),
				status: 'PRESENT',
				justification: null
			}));

			await Promise.all(
				presences.map((presence) => confirmPresenceMutation.mutateAsync(presence))
			);

			toast.success('Presenças registradas com sucesso');

			clearPresenceFlow();
			navigate('/inicio');
		}
		catch (err) {
			if (err instanceof ConflictInTheDatabaseException) {
				toast.success('Presenças registradas com sucesso');
			}
			else {
				toast.error('Erro ao registrar presenças');
			}
		}
	}

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

				<div
					className="empty-state"
					id="emptyState"
					style={{
						display: `${catechumensConfirm?.length === 0 ? 'initial' : 'none'}`
					}}
				>
					<p>Nenhum catequizando marcado como presente.</p>
				</div>
			</section>

			<section className="review-actions">
				<button className="btn-back">
					<Link to={`/presencas/registrar/${massId}`} style={{ color: '#000' }}>
						<i data-lucide="arrow-left"></i> Voltar e Alterar
					</Link>
				</button>
				<button
					className="btn-confirm-submit"
					id="btnSubmit"
					onClick={handleConfirm}
				>
					<i data-lucide="check-circle-2"></i> Confirmar Presenças
				</button>
			</section>
    </main>
	)
}

export default ConfirmPresence;