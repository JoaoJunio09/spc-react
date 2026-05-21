import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useCalendaryModal from '../hooks/useCalendaryModal';
import useLoadMasses from '../hooks/useLoadMasses';
import CalendaryModal from './CalendaryModal';
import useWeekCalendary from '../hooks/useWeekCalendary';
import useLoadEvent from '../hooks/useLoadEvent';
import useLoadPresences from '../hooks/useLoadPresences';
import WeekOfCalendar from './WeekOfCalendar';
import EventDetails from './EventDetails';
import StatusBanner from '../../../components/feedback/StatusBanner';

import '../styles/home.css';
import { useStatusBannerContext } from '../../../context/StatusBannerContext';

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

	const { openStatusBanner, variant, message, clearStatusFlow } = useStatusBannerContext();

	function handleSelectDate(date: string) {
		setSelectedDate(date);
		loadEvent(date);
	}

	useEffect(() => {
		if (!openStatusBanner) return;

		const timeout = setTimeout(() => {
			clearStatusFlow();
		}, 10000);

		return () => clearTimeout(timeout);
	}, [openStatusBanner, clearStatusFlow]);

	useEffect(() => {
		const today = daysOfWeek.find(day => day.isToday);

		if (today) {
			setSelectedDate(today.dateString);
			loadEvent(today.dateString);
		}
	}, [daysOfWeek, loadEvent]);

	useEffect(() => {
		if (errorMasses) {
			toast.error(errorMasses);
		}

		if (errorPresences) {
			toast.error(errorPresences);
		}
	}, [errorMasses, errorPresences]);

	return (
		<main>
			<StatusBanner
				open={openStatusBanner}
				variant={variant}
				message={message}
			/>

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