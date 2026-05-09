import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useCalendaryModal from '../hooks/useCalendaryModal';
import useLoadMasses from '../hooks/useLoadMasses';
import '../styles/home.css';
import CalendaryModal from './CalendaryModal';
import useWeekCalendary from '../hooks/useWeekCalendary';
import useLoadEvent from '../hooks/useLoadEvent';
import useLoadPresences from '../hooks/useLoadPresences';
import WeekOfCalendar from './WeekOfCalendar';
import EventDetails from './EventDetails';

function loadUserName(): string {
	const userName = sessionStorage.getItem('userName');
	
	if (userName) return userName;
	else return 'Usuário sem nome';
}

function Home() {
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

			<WeekOfCalendar
				userName={loadUserName()}
				daysOfWeek={daysOfWeek}
				selectedDate={selectedDate}
				massesDates={massesDates}
				handleSelectDate={handleSelectDate}
				setIsOpenModal={setIsOpen}
			/>

    	<EventDetails events={events} />

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