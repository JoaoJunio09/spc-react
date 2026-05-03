import { toast } from 'react-toastify';
import useCalendaryModal from '../hooks/useCalendaryModal';
import useLoadMasses from '../hooks/useLoadMasses';
import '../styles/home.css';
import CalendaryModal from './CalendaryModal';

type HomeProps = {
	userName: string | null
}

function Home({ userName }: HomeProps) {
	const { isOpen, setIsOpen }	 = useCalendaryModal();
	const { massesDates, error } = useLoadMasses();

	console.log(massesDates);

	function handleSelectDate(date: string) {

	}

	return (
		<main>
			{error && toast.error(error)}
			<section className="week-calendar-section">
				<div className="home-container">
					<h1 className="welcome">Olá, <strong>{userName}</strong></h1>
					<h2 className="section-label">Agenda da Semana</h2>
					<div className="week-grid" id="weekGrid">
							
					</div>
					
					<div style={{textAlign: 'center', marginTop: '20px'}}>
						<button
							id="btn-open-calendar"
							className="btn-primary"
							style={{width: 'auto', padding: '.8rem 2rem', background: 'var(--primary-dark)'}}
							onClick={() => setIsOpen(true)}
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

			{isOpen && (
				<CalendaryModal
					onClose={() => setIsOpen(false)}
					massesDates={massesDates}
					onSelectDate={handleSelectDate}
				/>
			)}
		</main>
	)
}

export default Home;