import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Church, 
  CheckCircle, 
  XCircle, 
  BookOpen, 
  Users, 
  Clock, 
  User,
  Sparkles,
  CalendarDays,
  Filter,
  Timeline,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CatechumenCard from './CatechumenCard';
import TimeLine from './Timeline';
import useInvidualPresence from '../hooks/useInvidualPresence';
import TopProgressBar from '../../../components/feedback/TopProgressBar';

export interface AttendanceRecord {
  id: number;
  liturgicalTime: string;
  churchName: string;
  date: string;
  time: string;
  status: 'present' | 'absent';
  registeredBy?: string;
}

export interface CatechizedInfo {
  name: string;
  group: string;
  catechists: string[];
  attendanceRate: number;
  presences: number;
  absences: number;
  totalMasses: number;
}

export const studentInfo: CatechizedInfo = {
  name: "João Pedro Silva",
  group: "Crisma II",
  catechists: ["Maria Aparecida", "João Batista"],
  attendanceRate: 47, // 9 presenças de 19 missas = ~47%
  presences: 9,
  absences: 10,
  totalMasses: 19
};

const Apresentation = () => {
  let overrideDay: 'weekend' | 'weekday' | null = null;
  const currentDay = new Date().getDay();
  const isWeekend = overrideDay === 'weekend' 
    ? true 
    : overrideDay === 'weekday' 
      ? false 
      : [0, 6].includes(currentDay);

  return (
    <section className="mb-6">
      <button className="bg-transparent border-none text-sm font-bold hover:text-slate-800 transition-colors cursor-pointer group mb-4">
        <Link className='flex items-center gap-2 text-slate-500' to='/catequizandos'>
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Voltar</span>
        </Link>
      </button>
      
      <div className="text-left">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          Histórico de Frequência
        </h1>
        <p className="mt-1 text-sm sm:text-base text-slate-500 font-medium">
          Acompanhe de perto as presenças e faltas do catequizando nos encontros paroquiais.
        </p>
      </div>

      {isWeekend && (
          <div className="mt-4 mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex gap-3 text-left shadow-sm animate-fade-in-alert">
            <div className="text-amber-600 flex-shrink-0 mt-0.5">
              <AlertTriangle className="w-5.5 h-5.5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                Atenção
              </h4>
              <p className="text-sm sm:text-[0.92rem] text-amber-800 leading-relaxed font-semibold">
                As informações de frequência podem sofrer alterações durante o final de semana, pois ainda existem missas em andamento ou aguardando registro na paróquia.
              </p>
            </div>
          </div>
        )}
    </section>
  )
}

type FiltersProps = {
  activeFilter: string,
  filter: (filter: 'presents' | 'absents' | 'all') => void
}

const Filters = ({
  activeFilter,
  filter
}: FiltersProps) => {
  return (
    <section className="mb-8 text-left bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Filtrar Histórico</span>
          <h3 className="text-base font-extrabold text-slate-950 tracking-tight">Participação</h3>
        </div>
        
        {/* Segmented Control Moderno */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/40 w-full sm:w-auto">
          <button 
            onClick={() => filter('all')}
            className={`cursor-pointer border-none flex-1 sm:flex-initial text-center py-2 px-5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 ${
              activeFilter === 'all' 
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/30' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Todos
          </button>
          <button 
            onClick={() => filter('presents')}
            className={`cursor-pointer border-none flex-1 sm:flex-initial text-center py-2 px-5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 ${
              activeFilter === 'presents' 
                ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/30' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Presentes
          </button>
          <button 
            onClick={() => filter('absents')}
            className={`cursor-pointer border-none flex-1 sm:flex-initial text-center py-2 px-5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 ${
              activeFilter === 'absents' 
                ? 'bg-white text-rose-700 shadow-sm border border-slate-200/30' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Ausentes
          </button>
        </div>
      </div>
    </section>
  )
}

function IndividualPresence() {
  const {
    presences,
    masses,
    catechumen,
    filter,
    activeFilter,
    filteredHistory,
    isLoadingPresences,
    isLoadingMasses,
    isLoadingCatechumen
  } = useInvidualPresence();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased text-left pb-16">
     	<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoadingCatechumen || isLoadingMasses || isLoadingPresences && (
          <TopProgressBar />
        )}

        {}
        {/* CABEÇALHO DA TELA & BOTÃO VOLTAR */}
        <Apresentation />

        {}
        {/* CARD PRINCIPAL DO CATEQUIZANDO */}
        {catechumen && (
          <CatechumenCard
            catechumen={catechumen}
            presences={presences.length}
            massesOccurred={masses.length}
          />
        )}

        {}
        {/* SEÇÃO DE FILTROS SEGMENTADOS */}
        <Filters activeFilter={activeFilter} filter={filter} />

        {}
        {/* TIMELINE DE PARTICIPAÇÃO INTEGRADA */}
        <TimeLine filteredHistory={filteredHistory} activeFilter={activeFilter} />

      </main>
    </div>
  );
}

export default IndividualPresence;