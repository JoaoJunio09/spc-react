import '../styles/confirmPresence.css';

function ConfirmPresence() {
	

	return (
		<main className="confirm-presence-container">
			<section className="page-intro">
				<h2>Confirmar Presenças Registradas</h2>
				<p>Verifique a lista de catequizandos presentes antes de finalizar o registro.</p>
			</section>

			<section className="review-section">
				<div className="review-list" id="reviewList">
					
				</div>

				<div className="empty-state" id="emptyState" style={{ display: 'none' }}>
					<p>Nenhum catequizando marcado como presente.</p>
				</div>
			</section>

			<section className="review-actions">
				<button className="btn-back">
					<i data-lucide="arrow-left"></i> Voltar e Alterar
				</button>
				<button className="btn-confirm-submit" id="btnSubmit">
					<i data-lucide="check-circle-2"></i> Confirmar Presenças
				</button>
			</section>
    </main>
	)
}

export default ConfirmPresence;