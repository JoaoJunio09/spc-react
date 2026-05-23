import { Link } from "react-router-dom";
import type { Event } from "../hooks/useLoadEvent";

type EventCalendarProps = {
	events: Event[] | []
}

function EventDetails({ events }: EventCalendarProps) {
	return (
		<section className="event-details-section">
			<div className="event-container flex flex-col gap-15" id="eventContainer">
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
									<h2 className="font-bold">{event.title}</h2>
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
								<div className="flex flex-col gap-3">
									<button
										className={`btn-primary btn-register-presence ${event.isRegisteredPresence ? 'btn-primary-register-presence' : ''}`}
										id="btn-register-attendance"
									>
										<Link to={`/presencas/registrar/${event.massId}`}>
											{event.isRegisteredPresence ? 'Presença na Missa já foi registrada' : 'Registrar Presença'}
										</Link>
									</button>
									{
										event.isRegisteredPresence
										?
											<button className="btn-primary btn-primary-register-presence-late">
												<Link to={`/presencas/registrar-com-atraso/${event.massId}`}>
													Registrar presenças atrasadas
												</Link>
											</button>
										:
											''
									}
								</div>
							</div>	
						</div>
					:
						<div key={event.title} className="no-event-message">
							<p>{event.title}</p>
						</div>
				))}
			</div>
		</section>
	)
}

export default EventDetails;