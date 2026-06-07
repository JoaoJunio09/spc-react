import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import StatusBanner from '../../../components/feedback/StatusBanner';
import useCalendaryModal from '../hooks/useCalendaryModal';
import useLoadEvent from '../hooks/useLoadEvent';
import useLoadMasses from '../hooks/useLoadMasses';
import useLoadPresences from '../hooks/useLoadPresences';
import useWeekCalendary from '../hooks/useWeekCalendary';
import CalendaryModal from './CalendaryModal';
import EventDetails from './EventDetails';
import WeekOfCalendar from './WeekOfCalendar';

import { useAuthContext } from '../../../context/AuthContext';
import { useStatusBannerContext } from '../../../context/StatusBannerContext';
import '../styles/home.css';
import LoadingDialog from '../../../components/feedback/LoadingDialog';
import InfoDialog from '../../../components/feedback/InfoDialog';
import { CheckCircleIcon, SparklesIcon } from 'lucide-react';

function Home() {
	const [selectedDate, setSelectedDate] 						= useState<string | null>(null);
	const { isOpen, setIsOpen }	 											= useCalendaryModal();
	const {
		masses,
		massesDates,
		isLoading,
		setIsLoading,
		infoDialog,
		openInfoDialog,
		closeInfoDialog,
		progress, error: errorMasses
	} = useLoadMasses();
	const { presences, error: errorPresences } 				= useLoadPresences();
	const { daysOfWeek } 				 							 				= useWeekCalendary({ massesDates: massesDates });
	const { events, loadEvent }  							 				= useLoadEvent({ masses: masses, presences: presences });
	const {
		openStatusBanner,
		variant,
		message,
		clearStatusFlow
	} = useStatusBannerContext();

	const { fullName } = useAuthContext();

	const sortedEvents = [...events].sort((a, b) => {
		const dateA = new Date(a.massDateTime!);
		const dateB = new Date(b.massDateTime!);

		return (
			dateA.getHours() * 60 +
			dateA.getMinutes() -
			(dateB.getHours() * 60 +
				dateB.getMinutes())
		);
	});

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
			openInfoDialog({
				variant: 'info',
				title: 'Erro ao carregar',
				description: 'Não foi possível carregar as informações, aguarde um momento',
				buttonText: 'Tente novamente',
				path: '/'
			});
		}

		if (errorPresences) {
			toast.error(errorPresences);
		}
	}, [errorMasses, errorPresences]);

	return (
		<main>
			<LoadingDialog
				open={isLoading}
				onOpenChange={setIsLoading}
				title='Carregando, aguarde um momento'
				status='Carregando as missas'
				progress={progress}
			/>

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

			<StatusBanner
				open={openStatusBanner}
				variant={variant}
				message={message}
			/>

			<WeekOfCalendar
				userName={fullName}
				daysOfWeek={daysOfWeek}
				selectedDate={selectedDate}
				massesDates={massesDates}
				handleSelectDate={handleSelectDate}
				setIsOpenModal={setIsOpen}
			/>

    	<EventDetails events={sortedEvents} />

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