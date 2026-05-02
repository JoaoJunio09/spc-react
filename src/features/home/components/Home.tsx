import '../styles/home.css';

type HomeProps = {
	catechistOrUserName: string | null
}

function Home({ catechistOrUserName }: HomeProps) {
	return (
		<main>
			<section className="week-calendar-section">
				<div className="home-container">
					<h1 className="welcome">Olá, <strong>{catechistOrUserName}</strong></h1>
					<h2 className="section-label">Agenda da Semana</h2>
					<div className="week-grid" id="weekGrid">
							
					</div>
					
					<div style={{textAlign: 'center', marginTop: '20px'}}>
						<button
							id="btn-open-calendar"
							className="btn-primary"
							style={{width: 'auto', padding: '.8rem 2rem', background: 'var(--primary-dark)'}}
						>
							Abrir calendário completo
						</button>
					</div>
				</div>
			</section>

    	<section className="event-details-section">
				<div className="container" id="eventContainer">
					
				</div>
    	</section>

			<div className="modal-overlay" id="calendarModal">
				<div className="modal-content">
					<div className="modal-header">
						<h2 id="currentMonth">Março 2026</h2>
						<button className="close-modal" id="btn-close-calendar">&times;</button>
					</div>
					
					<div className="month-grid-header">
						<span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span>
					</div>
					<div className="month-grid" id="monthGrid">
							
					</div>

					<div className="nextAndPreviousMonth">
						<button className="btn-nav-month">&lt; Anterior</button>
						<button className="btn-nav-month">Próximo &gt;</button>
					</div>
				
					<div className="modal-footer">
						<div className="legend">
							<div className="legend-item"><span className="circle verde"></span>Missa</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Home;