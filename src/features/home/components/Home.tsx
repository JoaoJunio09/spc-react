import {
  ArrowRight,
  Church,
  MapPin,
  User,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import useCalendaryModal from '../hooks/useCalendaryModal';
import useLoadEvent from '../hooks/useLoadEvent';
import useWeekCalendary from '../hooks/useWeekCalendary';
import WeekOfCalendar from './WeekOfCalendar';

import useHome, { type Indicators } from '../hooks/useHome';
import '../styles/home.css';
import CalendaryModal from './CalendaryModal';
import EventDetails from './EventDetails';

type BannerWelcomeProps = {
  name: string | undefined,
  communityOrParish: string | undefined
}

const BannerWelcome = ({
  name,
  communityOrParish
}: BannerWelcomeProps) => {
  const now = new Date();
  const dayWeek = now.toLocaleDateString('pt-BR', { weekday: 'long' });
  const dayMnonth = now.getDate();
  const nameMonth = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(now);

  return (
    <section className="mb-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2.5xl p-6 sm:p-8 md:p-10 text-white shadow-lg shadow-amber-500/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div className="space-y-2 text-left">
        <div className="inline-flex items-center gap-1.5 bg-white/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {communityOrParish}
        </div>
        <h2 className="text-2.5xl sm:text-3.5xl font-black tracking-tight leading-tight">
          Olá, {name}!
        </h2>
        <p className="text-amber-50 text-base sm:text-lg max-w-xl font-medium">
          Acompanhe a frequência litúrgica dos catequizandos e os registros de presenças dos catequistas.
        </p>
      </div>
      
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col justify-center min-w-[220px]">
        <span className="text-xs font-bold text-amber-200 uppercase tracking-wider block">Hoje é</span>
        <span className="text-lg sm:text-xl font-extrabold block mt-1">{dayWeek.slice(0, 7)}, {dayMnonth} de {nameMonth}</span>
        <span className="text-xs text-amber-100 font-semibold block mt-0.5">Ano Catequético de 2026</span>
      </div>
    </section>
  )
}

const Indicators = ({
  name,
  fullName,
  initials,
  communityOrParish,
	nextMass
}: Indicators) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
      {/* 1. Card de Apresentação do Usuário */}
      <div className="bg-white p-6 sm:p-8 rounded-2.5xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all text-left group">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4.5">
            {/* Foto do usuário / Avatar moderno e acolhedor */}
            <div className="relative">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center text-xl sm:text-2xl font-black shadow-md shadow-orange-500/15">
                {initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" title="Usuário online" />
            </div>

            {/* Informações de Identidade */}
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wider block">Olá, {name}! 👋</span>
              <h3 className="text-xl sm:text-2.5xl font-black text-slate-900 tracking-tight leading-tight">
                {fullName}
              </h3>
              <p className="text-sm font-semibold text-slate-500">
                Catequista
              </p>
            </div>
          </div>

          {/* Detalhe da paróquia/comunidade em destaque sutil */}
          <div className="bg-slate-50 border border-slate-150 px-3.5 py-2 rounded-xl self-start sm:self-center">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Unidade Ativa</span>
            <span className="text-xs font-bold text-slate-700 block mt-0.5">
              {communityOrParish === 'SAO_SEBASTIAO' || communityOrParish === null ? 'Paróquia São Sebastião' : 'Divino Espírito Santo'}
            </span>
          </div>
        </div>

        {/* Botão de Ação "Seu Perfil" */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs font-medium text-slate-400">Perfil sincronizado de forma segura</p>
          <button 
            // onClick={() => setActiveMenu("Seu Perfil")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-extrabold rounded-xl transition-all cursor-pointer border border-amber-200/50"
          >
            <User className="w-3.5 h-3.5 text-amber-600" />
            Seu Perfil
          </button>
        </div>
      </div>

      {/* 2. Card de Próxima Missa */}
      <div className="bg-white p-6 sm:p-8 rounded-2.5xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all text-left group">
        <div className="flex items-start gap-4.5">
          {/* Ícone litúrgico estilizado com visual leve e acolhedor */}
          <div className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center flex-shrink-0 border transition-colors duration-300 ${
            nextMass
              ? 'bg-indigo-50 text-indigo-600 border-indigo-100' 
              : 'bg-slate-50 text-slate-400 border-slate-100'
          }`}>
            <Church className="w-8 h-8" />
          </div>

          {/* Informações Litúrgicas e do Evento */}
          <div className="flex-1 min-w-0">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Próxima Missa</span>
            
            {true ? (
              <>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h3 className="text-xl sm:text-2.5xl font-black text-slate-900 tracking-tight leading-tight">
                    {nextMass?.formattedDate}
                  </h3>
                  <span className="text-sm sm:text-base font-black text-slate-500">
                    às {nextMass?.formattedHour}
                  </span>
                </div>
                <p className="text-sm font-bold text-indigo-600 uppercase tracking-wide truncate mt-1.5 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                  {nextMass?.location}
                </p>
              </>
            ) : (
              <>
                <h3 className="text-xl sm:text-2xl font-black text-slate-700 tracking-tight leading-tight">
                  Nenhuma missa agendada
                </h3>
                <p className="text-sm font-semibold text-slate-400 mt-1">
                  Aguardando confirmação de horários.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Rodapé explicativo do compromisso */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
          <span>Compromisso Paroquial</span>
          {true && (
            <span className="text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg font-bold uppercase text-[10px]">
              Presença Obrigatória
            </span>
          )}
        </div>
      </div>

    </section>
  )
}

function Home() {
  const [notificationState, setNotificationState] = useState<'with_data' | 'empty'>('with_data');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
	
  const {
    presences,
    masses,
    massesDates,
    dataIndicators,
    name,
    communityOrParish
  } = useHome();
  const { daysOfWeek } = useWeekCalendary({ massesDates: massesDates });
  const { events, loadEvent } = useLoadEvent({ masses: masses, presences: presences });
  const { isOpen, setIsOpen }	= useCalendaryModal();

  const { fullName } = useAuthContext();

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased pb-16">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BannerWelcome
          name={name}
          communityOrParish={communityOrParish}
        />

        <Indicators
          name={dataIndicators.name}
          fullName={dataIndicators.fullName}
          initials={dataIndicators.initials}
          communityOrParish={dataIndicators.communityOrParish}
          nextMass={dataIndicators.nextMass} 
        />

        <WeekOfCalendar
          userName={fullName}
          daysOfWeek={daysOfWeek}
          selectedDate={selectedDate}
          massesDates={massesDates}
          handleSelectDate={handleSelectDate}
          setIsOpenModal={setIsOpen}
        />

        <EventDetails
          events={sortedEvents}
        />

        {isOpen && (
          <CalendaryModal
            onClose={() => setIsOpen(false)}
            massesDates={massesDates}
            onSelectDate={handleSelectDate}
          />
        )}
      </main>

      {}
      
    </div>
  );
}

export default Home;