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
  CalendarDays
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface AttendanceRecord {
  id: number;
  liturgicalTime: string;
  churchName: string;
  date: string;
  time: string;
  status: 'present' | 'absent';
  registeredBy?: string;
}

interface CatechizedInfo {
  name: string;
  group: string;
  catechists: string[];
  attendanceRate: number;
  presences: number;
  absences: number;
  totalMasses: number;
}

function IndividualPresence() {
  const studentInfo: CatechizedInfo = {
    name: "João Pedro Silva",
    group: "Crisma II",
    catechists: ["Maria Aparecida", "João Batista"],
    attendanceRate: 47, // 9 presenças de 19 missas = ~47%
    presences: 9,
    absences: 10,
    totalMasses: 19
  };

  const attendanceHistory: AttendanceRecord[] = [
    {
      id: 1,
      liturgicalTime: "Domingo de Pentecostes",
      churchName: "Matriz Santo Antônio",
      date: "31 de Maio de 2026",
      time: "19h30",
      status: "absent"
    },
    {
      id: 2,
      liturgicalTime: "Ascensão do Senhor",
      churchName: "Capela São José",
      date: "24 de Maio de 2026",
      time: "18h00",
      status: "present",
      registeredBy: "Maria Aparecida"
    },
    {
      id: 3,
      liturgicalTime: "6º Domingo da Páscoa",
      churchName: "Matriz Santo Antônio",
      date: "17 de Maio de 2026",
      time: "19h30",
      status: "absent"
    },
    {
      id: 4,
      liturgicalTime: "5º Domingo da Páscoa",
      churchName: "São Sebastião",
      date: "10 de Maio de 2026",
      time: "09h00",
      status: "absent"
    },
    {
      id: 5,
      liturgicalTime: "4º Domingo da Páscoa",
      churchName: "Divino Espírito Santo",
      date: "03 de Maio de 2026",
      time: "08h00",
      status: "present",
      registeredBy: "João Batista"
    },
    {
      id: 6,
      liturgicalTime: "3º Domingo da Páscoa",
      churchName: "Matriz Santo Antônio",
      date: "26 de Abril de 2026",
      time: "19h30",
      status: "absent"
    },
    {
      id: 7,
      liturgicalTime: "2º Domingo da Páscoa",
      churchName: "Capela São José",
      date: "19 de Abril de 2026",
      time: "18h00",
      status: "present",
      registeredBy: "Maria Aparecida"
    },
    {
      id: 8,
      liturgicalTime: "Domingo de Páscoa",
      churchName: "Matriz Santo Antônio",
      date: "12 de Abril de 2026",
      time: "08h00",
      status: "present",
      registeredBy: "João Batista"
    },
    {
      id: 9,
      liturgicalTime: "Sexta-feira da Paixão",
      churchName: "Matriz Santo Antônio",
      date: "10 de Abril de 2026",
      time: "15h00",
      status: "present",
      registeredBy: "Maria Aparecida"
    },
    {
      id: 10,
      liturgicalTime: "Domingo de Ramos",
      churchName: "Divino Espírito Santo",
      date: "05 de Abril de 2026",
      time: "08h00",
      status: "absent"
    },
    {
      id: 11,
      liturgicalTime: "5º Domingo da Quaresma",
      churchName: "Capela São José",
      date: "29 de Março de 2026",
      time: "18h00",
      status: "absent"
    },
    {
      id: 12,
      liturgicalTime: "4º Domingo da Quaresma",
      churchName: "Matriz Santo Antônio",
      date: "22 de Março de 2026",
      time: "19h30",
      status: "present",
      registeredBy: "João Batista"
    },
    {
      id: 13,
      liturgicalTime: "3º Domingo da Quaresma",
      churchName: "São Sebastião",
      date: "15 de Março de 2026",
      time: "09h00",
      status: "absent"
    },
    {
      id: 14,
      liturgicalTime: "2º Domingo da Quaresma",
      churchName: "Matriz Santo Antônio",
      date: "08 de Março de 2026",
      time: "19h30",
      status: "present",
      registeredBy: "Maria Aparecida"
    },
    {
      id: 15,
      liturgicalTime: "1º Domingo da Quaresma",
      churchName: "Divino Espírito Santo",
      date: "01 de Março de 2026",
      time: "08h00",
      status: "absent"
    },
    {
      id: 16,
      liturgicalTime: "Quarta-feira de Cinzas",
      churchName: "Matriz Santo Antônio",
      date: "25 de Fevereiro de 2026",
      time: "19h30",
      status: "present",
      registeredBy: "João Batista"
    },
    {
      id: 17,
      liturgicalTime: "7º Domingo do Tempo Comum",
      churchName: "São Sebastião",
      date: "22 de Fevereiro de 2026",
      time: "09h00",
      status: "absent"
    },
    {
      id: 18,
      liturgicalTime: "6º Domingo do Tempo Comum",
      churchName: "Capela São José",
      date: "15 de Fevereiro de 2026",
      time: "18h00",
      status: "present",
      registeredBy: "Maria Aparecida"
    },
    {
      id: 19,
      liturgicalTime: "5º Domingo do Tempo Comum",
      churchName: "Divino Espírito Santo",
      date: "08 de Fevereiro de 2026",
      time: "08h00",
      status: "absent"
    }
  ];

  const [activeFilter, setActiveFilter] = useState<'todos' | 'presentes' | 'ausentes'>('presentes');

  const filteredHistory = attendanceHistory.filter(record => {
    if (activeFilter === 'presentes') return record.status === 'present';
    if (activeFilter === 'ausentes') return record.status === 'absent';
    return true; // 'todos'
  });

  const getRateColor = (rate: number) => {
    if (rate >= 75) return "bg-emerald-500";
    if (rate >= 50) return "bg-amber-500";
    return "bg-rose-500";
  };

  const getRateTextColor = (rate: number) => {
    if (rate >= 75) return "text-emerald-700 bg-emerald-50 border-emerald-200";
    if (rate >= 50) return "text-amber-700 bg-amber-50 border-amber-200";
    return "text-rose-700 bg-rose-50 border-rose-200";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased text-left pb-16">
      {/* CONTEÚDO PRINCIPAL */}
     	<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* CABEÇALHO DA TELA & BOTÃO VOLTAR */}
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
        </section>

        {}
        {/* CARD PRINCIPAL DO CATEQUIZANDO */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7 mb-8 transition-all hover:border-slate-300">
          
          {/* Dados Gerais do Estudante */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="text-left">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Catequizando</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {studentInfo.name}
              </h2>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  <span className="text-slate-400">Turma:</span>
                  <span className="font-bold text-slate-800">{studentInfo.group}</span>
                </div>
                <div className="hidden sm:inline text-slate-300">•</div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400">Catequistas:</span>
                  <span className="font-bold text-slate-800">{studentInfo.catechists.join(" • ")}</span>
                </div>
              </div>
            </div>

            {/* Badge de Status de Frequência */}
            <div className="flex sm:justify-end">
              <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-extrabold tracking-wide uppercase border ${getRateTextColor(studentInfo.attendanceRate)}`}>
                {studentInfo.attendanceRate >= 75 ? "Boa Frequência" : studentInfo.attendanceRate >= 50 ? "Atenção" : "Baixa Frequência"}
              </span>
            </div>
          </div>

          {/* Indicadores de Frequência Corrigidos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 transition-colors hover:bg-slate-100/50">
              <span className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider mb-1">Frequência Atual</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-950">{studentInfo.attendanceRate}</span>
                <span className="text-xs font-extrabold text-slate-400">%</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 transition-colors hover:bg-slate-100/50">
              <span className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider mb-1">Presenças</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-emerald-600">{studentInfo.presences}</span>
                <span className="text-[0.68rem] font-bold text-emerald-500/80 uppercase">missas</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 transition-colors hover:bg-slate-100/50">
              <span className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider mb-1">Ausências</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-rose-500">{studentInfo.absences}</span>
                <span className="text-[0.68rem] font-bold text-rose-400/80 uppercase">faltas</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 transition-colors hover:bg-slate-100/50">
              <span className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider mb-1">Missas Ocorridas</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-700">{studentInfo.totalMasses}</span>
                <span className="text-[0.68rem] font-bold text-slate-400 uppercase">celebradas</span>
              </div>
            </div>
          </div>

          {/* Barra Visual de Frequência */}
          <div className="pt-4 border-t border-slate-100 text-left">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-slate-400 uppercase tracking-wider">Aproveitamento</span>
              <span className="text-slate-800">{studentInfo.attendanceRate}%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getRateColor(studentInfo.attendanceRate)} rounded-full transition-all duration-500`}
                style={{ width: `${studentInfo.attendanceRate}%` }}
              />
            </div>
          </div>

        </section>

        {}
        {/* SEÇÃO DE FILTROS SEGMENTADOS */}
        <section className="mb-8 text-left bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Filtrar Histórico</span>
              <h3 className="text-base font-extrabold text-slate-950 tracking-tight">Participação</h3>
            </div>
            
            {/* Segmented Control Moderno */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/40 w-full sm:w-auto">
              <button 
                onClick={() => setActiveFilter('todos')}
                className={`cursor-pointer border-none flex-1 sm:flex-initial text-center py-2 px-5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 ${
                  activeFilter === 'todos' 
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/30' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Todos
              </button>
              <button 
                onClick={() => setActiveFilter('presentes')}
                className={`cursor-pointer border-none flex-1 sm:flex-initial text-center py-2 px-5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 ${
                  activeFilter === 'presentes' 
                    ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/30' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Presentes
              </button>
              <button 
                onClick={() => setActiveFilter('ausentes')}
                className={`cursor-pointer border-none flex-1 sm:flex-initial text-center py-2 px-5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 ${
                  activeFilter === 'ausentes' 
                    ? 'bg-white text-rose-700 shadow-sm border border-slate-200/30' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Ausentes
              </button>
            </div>
          </div>
        </section>

        {}
        {/* TIMELINE DE PARTICIPAÇÃO INTEGRADA */}
        <section className="relative text-left">
          
          {filteredHistory.length > 0 ? (
            <div className="relative pl-6 sm:pl-8">
              
              {/* Linha vertical dinâmica da timeline */}
              <div className={`absolute left-[10px] sm:left-[13px] top-4 bottom-4 w-[2px] transition-colors duration-300 ${
                activeFilter === 'presentes' ? 'bg-emerald-200' :
                activeFilter === 'ausentes' ? 'bg-rose-200' : 'bg-slate-200'
              }`} />

              {filteredHistory.map((record) => {
                const isPresent = record.status === 'present';
                
                // Variáveis estéticas dinâmicas baseadas nos filtros e no status
                const indicatorColor = isPresent ? 'bg-emerald-500 ring-emerald-100' : 'bg-rose-500 ring-rose-100';
                const badgeStyle = isPresent 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                  : 'bg-rose-50 text-rose-700 border-rose-100';

                return (
                  <article key={record.id} className="relative mb-6 last:mb-0 group">
                    
                    {/* Indicador Visual do Status na Timeline */}
                    <div className={`absolute -left-[21px] sm:-left-[25px] top-2 w-3.5 h-3.5 rounded-full border-2 border-white ring-4 transition-all duration-300 ${
                      activeFilter === 'presentes' ? 'bg-emerald-500 ring-emerald-100' :
                      activeFilter === 'ausentes' ? 'bg-rose-500 ring-rose-100' : indicatorColor
                    }`} />

                    {/* Card do Encontro / Missa */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 transition-all hover:border-slate-300 hover:shadow-md">
                      
                      {/* Cabeçalho da Missa: Liturgia, Local e Status */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3.5 border-b border-slate-100">
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                            {record.liturgicalTime}
                          </h4>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mt-1">
                            <Church className="w-3.5 h-3.5 text-amber-500" />
                            <span>{record.churchName}</span>
                          </div>
                        </div>
                        
                        {/* Badge de Status de Presença */}
                        <div className="flex items-start">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase border ${
                            activeFilter === 'presentes' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                            activeFilter === 'ausentes' ? 'bg-rose-50 text-rose-700 border-rose-100' : badgeStyle
                          }`}>
                            {activeFilter === 'presentes' || (activeFilter === 'todos' && isPresent) ? (
                              <>
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                Presente
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                Ausente
                              </>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Detalhes de Registro (Data, Hora e Registrador) */}
                      <div className="pt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-semibold text-slate-500">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span>{record.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span>{record.time}</span>
                          </div>
                        </div>

                        {/* Oculta registrador em caso de ausência por padrão */}
                        {isPresent && record.registeredBy && activeFilter !== 'ausentes' && (
                          <div className="flex items-center gap-1.5 text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            <span>Registrado por: <strong className="text-slate-700 font-bold">{record.registeredBy}</strong></span>
                          </div>
                        )}
                      </div>

                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 border border-slate-200 shadow-sm text-center max-w-md mx-auto my-6 animate-fade-in">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5 text-slate-400">
                <CalendarDays className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-2">
                Nenhum registro encontrado
              </h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Não encontramos missas registradas para o filtro selecionado no histórico deste catequizando.
              </p>
            </div>
          )}
        </section>

      </main>

      {/* RODAPÉ DO SISTEMA */}
      <footer className="w-full text-center py-6 border-t border-slate-200 bg-white mt-16">
        <p className="text-[0.8rem] font-bold text-slate-800 mb-0.5">SPC — Sistema de Presença da Catequese</p>
        <p className="text-[0.72rem] text-slate-400 font-medium">Versão 2.1 • Desenvolvido com carinho para as paróquias e comunidades</p>
      </footer>
    </div>
  );
}

export default IndividualPresence;