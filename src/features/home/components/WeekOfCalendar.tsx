import type { DayOfWeek } from "../hooks/useWeekCalendary";

type WeekOfCalendarProps = {
	userName: string | null,
	daysOfWeek: DayOfWeek[] | [],
	selectedDate: string | null,
	massesDates: string[] | [],
	handleSelectDate: (date: string) => void,
	setIsOpenModal: (isOpen: boolean) => void
}

function WeekOfCalendar({ userName, daysOfWeek, selectedDate, massesDates, handleSelectDate, setIsOpenModal }: WeekOfCalendarProps) {
	if (!userName) return;

	return (
		<section className="week-calendar-section">
			<div className="home-container">
				<h1 className="welcome">Olá, <strong>{userName.split(' ')[0]}</strong></h1>
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
						onClick={() => setIsOpenModal(true)}
					>
						Abrir calendário completo
					</button>
				</div>
			</div>
		</section>
	)
}

export default WeekOfCalendar;