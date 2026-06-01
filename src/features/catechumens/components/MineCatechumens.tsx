import {
	AlertTriangle,
	BookOpen,
	Calendar,
	ChevronRight,
	Church,
	Percent,
	Search,
	Sparkles,
	Users
} from 'lucide-react';

interface Student {
  id: number;
  name: string;
  status: 'good' | 'attention' | 'critical';
  statusText: string;
  presences: number;
  absences: number;
  frequency: number;
}

function MineCatechumens() {
  const students: Student[] = [
    { 
      id: 1, 
      name: "João Pedro Silva", 
      status: "good", 
      statusText: "Boa Frequência", 
      presences: 18, 
      absences: 2, 
      frequency: 90 
    },
    { 
      id: 2, 
      name: "Ana Clara Oliveira", 
      status: "good", 
      statusText: "Boa Frequência", 
      presences: 19, 
      absences: 1, 
      frequency: 95 
    },
    { 
      id: 3, 
      name: "Lucas Santos Rocha", 
      status: "attention", 
      statusText: "Atenção", 
      presences: 13, 
      absences: 7, 
      frequency: 65 
    },
    { 
      id: 4, 
      name: "Mariana Costa Souza", 
      status: "good", 
      statusText: "Boa Frequência", 
      presences: 16, 
      absences: 4, 
      frequency: 80 
    },
    { 
      id: 5, 
      name: "Matheus Henrique Lima", 
      status: "critical", 
      statusText: "Baixa Frequência", 
      presences: 8, 
      absences: 12, 
      frequency: 40 
    },
    { 
      id: 6, 
      name: "Beatriz Alves Rezende", 
      status: "attention", 
      statusText: "Atenção", 
      presences: 11, 
      absences: 9, 
      frequency: 55 
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased text-left">
      
      {}
      {/* <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-orange-600/10">
              <Church className="w-5.5 h-5.5" />
            </div>
            <div className="leading-none">
              <span className="text-lg font-black tracking-tight text-slate-900">SPC</span>
              <span className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Presença Catequese</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-slate-500 bg-slate-100/80 px-3.5 py-1.5 rounded-xl border border-slate-200">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span className="text-xs sm:text-sm font-semibold text-slate-700">Turma: 1ª Etapa • Sábado</span>
          </div>
        </div>
      </header> */}

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {}
        <div className="mb-8 md:flex md:items-center md:justify-between">
          <div className="max-w-xl">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Meus Catequizandos
              <Sparkles className="w-5 h-5 text-amber-500 animate-pulse hidden sm:inline" />
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-slate-500 font-medium">
              Acompanhe a frequência detalhada e a participação dos seus catequizandos nas missas.
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-amber-50/50 border border-amber-200/60 rounded-xl p-3.5 flex items-center gap-3 max-w-sm">
            <Calendar className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <p className="text-xs text-amber-800 font-medium leading-relaxed">
              Próximo encontro agendado para o próximo sábado às <strong className="font-bold">09:00h</strong>.
            </p>
          </div>
        </div>

        {}
        <section className="mb-8">
          <div className="relative w-full max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full h-14 pl-12 pr-4 text-base bg-white border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all shadow-sm"
              placeholder="Pesquisar catequizando pelo nome..."
            />
          </div>
        </section>

        {}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-10">
          {/* Card Principal 1: Total de Catequizandos */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4 transition-all hover:border-slate-300 col-span-1">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Total de Catequizandos</span>
              <span className="text-2xl sm:text-3xl font-black text-slate-800 mt-0.5 block">18</span>
            </div>
          </div>

          {/* Card Principal 2: Frequência Média */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4 transition-all hover:border-slate-300 col-span-1">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Percent className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Frequência Média</span>
              <span className="text-2xl sm:text-3xl font-black text-slate-800 mt-0.5 block">84%</span>
            </div>
          </div>

          {/* Card Principal 3: Em Atenção */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4 transition-all hover:border-slate-300 col-span-1">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Em Atenção</span>
              <span className="text-2xl sm:text-3xl font-black text-slate-800 mt-0.5 block">3</span>
            </div>
          </div>

          {/* Card Complementar 4: Total de Missas do Ano (Subtil) */}
          <div className="bg-slate-100/50 rounded-2xl p-4.5 border border-slate-200/60 shadow-sm flex items-center gap-3.5 transition-all hover:border-slate-300/80 col-span-1">
            <div className="w-10 h-10 rounded-lg bg-slate-200/50 text-slate-500 flex items-center justify-center flex-shrink-0">
              <Church className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider">Total de Missas</span>
              <span className="text-xl font-extrabold text-slate-700 mt-0.5 block">50</span>
            </div>
          </div>

          {/* Card Complementar 5: Missas Já Ocorridas (Subtil) */}
          <div className="bg-slate-100/50 rounded-2xl p-4.5 border border-slate-200/60 shadow-sm flex items-center gap-3.5 transition-all hover:border-slate-300/80 col-span-1">
            <div className="w-10 h-10 rounded-lg bg-slate-200/50 text-slate-500 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider">Missas Ocorridas</span>
              <span className="text-xl font-extrabold text-slate-700 mt-0.5 block">20</span>
            </div>
          </div>
        </section>

        {}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Catequizandos da Minha Turma</h2>
            <span className="text-xs bg-slate-200 text-slate-600 font-bold px-2.5 py-1 rounded-full">Exibindo 6</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {students.map((student) => {
              // Estilização de badge de status de frequência do catequizando
              const badgeColors = {
                good: "bg-emerald-50 text-emerald-700 border-emerald-200",
                attention: "bg-amber-50 text-amber-700 border-amber-200",
                critical: "bg-rose-50 text-rose-700 border-rose-200",
              }[student.status];

              const progressColors = {
                good: "bg-emerald-500",
                attention: "bg-amber-500",
                critical: "bg-rose-500",
              }[student.status];

              return (
                /* CARD INDIVIDUAL DO CATEQUIZANDO */
                <article 
                  key={student.id} 
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Badge do Status individual */}
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-extrabold tracking-wide uppercase border ${badgeColors}`}>
                        {student.statusText}
                      </span>
                    </div>

                    {/* Nome do Catequizando */}
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight mb-4">
                      {student.name}
                    </h3>

                    {/* Indicadores de Frequência em formato de grid compacto de duas colunas */}
                    <div className="grid grid-cols-2 gap-x-4 mb-5 border-t border-b border-slate-100 py-4">
                      <div>
                        <span className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Presenças</span>
                        <span className="text-xl font-black text-emerald-600">{student.presences}</span>
                      </div>
                      <div className="border-l border-slate-100 pl-4">
                        <span className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Ausências</span>
                        <span className="text-xl font-black text-rose-500">{student.absences}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progresso de Frequência e Barra visual */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-400 uppercase tracking-wider">Frequência Atual</span>
                      <span className="text-slate-700">{student.frequency}%</span>
                    </div>
                    {/* Barra de Progresso Real */}
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${progressColors} rounded-full transition-all duration-500`}
                        style={{ width: `${student.frequency}%` }}
                      />
                    </div>
                  </div>

                  {/* Ação: Ver Histórico Completo */}
                  <button className="w-full mt-2 h-10 bg-slate-50 border border-slate-200 hover:bg-amber-50/50 hover:border-amber-300 hover:text-amber-700 text-slate-600 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                    Ver Histórico Completo
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {/* 
          ==========================================
          ESTADO VAZIO (COMENTADO PARA DEMONSTRAÇÃO)
          ==========================================
          Para fins de testes de renderização do estado vazio, basta habilitar o trecho abaixo:
        */}
        {/* 
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center max-w-lg mx-auto my-12 animate-fade-in">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5 text-slate-400">
            <Inbox className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight mb-2">
            Nenhum catequizando encontrado
          </h3>
          <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
            Não há catequizandos cadastrados que correspondam à sua pesquisa ou que estejam vinculados a você nesta etapa da catequese.
          </p>
          <button className="h-11 bg-amber-500 text-white font-extrabold px-6 rounded-xl text-sm shadow-md hover:bg-amber-600 transition-all cursor-pointer">
            Limpar Busca
          </button>
        </section> 
        */}

      </main>

      {/* RODAPÉ DO SISTEMA */}
      <footer className="w-full text-center py-6 border-t border-slate-200 bg-white mt-12">
        <p className="text-[0.8rem] font-bold text-slate-800 mb-0.5">SPC — Sistema de Presença da Catequese</p>
        <p className="text-[0.72rem] text-slate-400 font-medium">Versão 2.1 • Desenvolvido com carinho para as paróquias e comunidades</p>
      </footer>
    </main>
  );
}

export default MineCatechumens;