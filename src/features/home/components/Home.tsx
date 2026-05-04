import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useCalendaryModal from '../hooks/useCalendaryModal';
import useLoadMasses from '../hooks/useLoadMasses';
import '../styles/home.css';
import CalendaryModal from './CalendaryModal';
import useWeekCalendary from '../hooks/useWeekCalendary';
import useLoadEvent from '../hooks/useLoadEvent';
import useLoadPresences from '../hooks/useLoadPresences';

type HomeProps = {
	userName: string | null
}

function Home({ userName }: HomeProps) {
	const { isOpen, setIsOpen }	 											= useCalendaryModal();
	const { masses, massesDates, error: errorMasses } = useLoadMasses();
	const { presences, error: errorPresences } 				= useLoadPresences();
	const { daysOfWeek } 				 							 				= useWeekCalendary({ massesDates: massesDates });
	const { events, loadEvent }  							 				= useLoadEvent({ masses: masses, presences: presences });
	const [selectedDate, setSelectedDate] 						= useState<string | null>(null);

	function handleSelectDate(date: string) {
		setSelectedDate(date);
		loadEvent(date);
	}

	useEffect(() => {
		const today = daysOfWeek.find(day => day.isToday);

		if (today) {
			setSelectedDate(today.dateString);
			loadEvent(today.dateString);
		}
	}, [daysOfWeek, loadEvent]);

	return (
		<main>
			{errorMasses && toast.error(errorMasses)}
			{errorPresences && toast.error(errorPresences)}
			<section className="week-calendar-section">
				<div className="home-container">
					<h1 className="welcome">Olá, <strong>{userName}</strong></h1>
					<h2 className="section-label">Agenda da Semana</h2>
					<div className="week-grid" id="weekGrid">
						{daysOfWeek.map(day => (
							<div
								key={day.dateString}
								className={`day-card ${day.isMass && 'has-missa'} ${selectedDate === day.dateString ? 'active-day' : ''}`}
								onClick={() =>  handleSelectDate(day.dateString)}
							>
								<span className="day-name">{day.dayOfWeek}</span>
								<span className="day-num">{day.dayNum}</span>
								{massesDates.map(date => (
									day.dateString === date &&
									<div className='event-indicator'>
										Missa
									</div> 
								))}
							</div>
						))}
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
				<div className="event-container" id="eventContainer">
					{events.map(event => (
						event.isEvent
						?
							<div
								key={event.massId}
								className={`event-card mass-card ${event.isRegisteredPresence && 'event-card-register-presence'}`}
								mass-date={event.massId}
							>
								<div>
									<div className="card-header">
										<span className="badge">Missa</span>
										<h2>{event.title}</h2>
									</div>
									<div className="card-body">
										<div className="info-item">
											<span className="label">Dia:</span>
											<span className="value value-date">{event.massDate}</span>
										</div>
										<div className="info-item">
											<span className="label">Horário:</span>
											<span className="value value-time">
												{event.massLocation}
											</span>
										</div>
									</div>
									<button
										className={`btn-primary btn-register-presence ${event.isRegisteredPresence ? 'btn-primary-register-presence' : ''}`}
										id="btn-register-attendance"
									>
										{event.isRegisteredPresence ? 'Presença na Missa já foi registrada' : 'Registrar Presença'}
									</button>
								</div>	
							</div>
						:
							<div className="no-event-message">
								<p>{event.title}</p>
							</div>
					))}
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