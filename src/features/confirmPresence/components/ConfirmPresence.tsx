import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import InfoDialog from '../../../components/feedback/InfoDialog';
import { useStatusBannerContext } from '../../../context/StatusBannerContext';
import ConflictInTheDatabaseException from '../../../exceptions/database/ConflicInTheDatabaseException';
import type { PresenceRequest } from '../../../data/presence/PresenceRequest';
import { DefineNameCatechists } from '../../../utils/DefineNameCatechists';
import useConfirmPresense from '../hooks/useConfirmPresence';

import '../styles/confirmPresence.css';
import { useAuthContext } from '../../../context/AuthContext';

function ConfirmPresence() {
	const {
		catechumensConfirm,
		confirmPresenceMutation,
		massId,
		catechistId,
		clearPresenceFlow,
		infoDialog,
		openInfoDialog,
		closeInfoDialog
	} = useConfirmPresense();

	const { showStatusBanner } = useStatusBannerContext();

	const { username } = useAuthContext();

	async function handleConfirm() {
		if (!massId || catechumensConfirm?.length === 0 || catechumensConfirm === null) {
			toast.error('Dados inválidos para confirmar presença');
			return;
		}

		if (!username) {
			toast.error('Usuário não definido');
			return;
		}

		try {
			const presences: PresenceRequest[] = catechumensConfirm.map((catechumen) => ({
				id: null,
				username: username,
				catechumenId: catechumen.id,
				massId: Number(massId),
				status: 'PRESENT',
				justification: null
			}));

			await Promise.all(
				presences.map((presence) => confirmPresenceMutation.mutateAsync(presence))
			);

			openInfoDialog({
				variant: 'success',
				title: "Presenças registradas com sucesso",
        description: "Os catequizandos foram confirmados na missa e o sistema atualizou os registros corretamente.",
        buttonText: "Perfeito",
        path: "/inicio"
			});
			
			showStatusBanner('success', 'As Presenças foram registradas com sucesso.');
		}
		catch (err) {
			if (err instanceof ConflictInTheDatabaseException) {
				openInfoDialog({
					variant: 'warning',
					title: "Presenças registradas",
					description: "Você selecinou alguns catequizandos que já estavam marcados com presença na missa, mas a operação foi concluída com sucesso.",
					buttonText: "Entendi, fechar",
					path: "/inicio"
				});
				return;
			}

			openInfoDialog({
				variant: 'error',
				title: "Erro no servidor",
        description: "Houve um erro inesperado ao tentar registrar as presenças. Verifique sua conexão ou tente novamente em alguns instantes.",
        buttonText: "Fechar",
        path: "/inicio"
			});
		}
		finally {
			clearPresenceFlow();
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
						<div key={catechumen.id} className="review-card">
							<div className="review-info">
								<h4 id="catechumen-name">{catechumen.firstName} {catechumen.lastName}</h4>
								<p id="step-and-catechists-name">
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

			<InfoDialog
				open={infoDialog.open}
				onOpenChange={(open) => {
					if (!open) closeInfoDialog()
				}}
				variant={infoDialog.variant}
				title={infoDialog.title}
				description={infoDialog.description}
				buttonText={infoDialog.buttonText}
				path={infoDialog.path}
			/>
    </main>
	)
}

export default ConfirmPresence;