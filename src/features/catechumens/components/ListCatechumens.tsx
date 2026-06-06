import { BookOpen, ChevronLeft, ChevronRight, Inbox, Users } from "lucide-react";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import type { CatechumenPage } from "../../../data/catechumen/CatechumenPage";
import type { CatechumenResponse } from "../../../data/catechumen/CatechumenResponse";
import { FormatStep } from "../../../utils/FormatStep";
import { Link } from "react-router-dom";

const CatechumenCardSkeleton = () => {
  return (
    <article 
      className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-4">
          <Skeleton height={30} width={130} />
        </div>

        <Skeleton height={30} width={240} />

        <div className="grid grid-cols-2 gap-x-4 mb-5 border-t border-b border-slate-100 py-4">
          <div>
            <Skeleton height={20} width={80} />
            <Skeleton height={20} width={30} />
          </div>
          <div className="border-l border-slate-100 pl-4">
            <Skeleton height={20} width={80} />
            <Skeleton height={20} width={30} />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-bold mb-1.5">
          <span className="text-slate-400 uppercase tracking-wider">
          </span>
          <Skeleton height={20} width={30} />
        </div>
       <Skeleton borderRadius={10} height={12} width={240} />
      </div>

      <Skeleton borderRadius={10} height={40} width={240} />
    </article>
  )
}

type CatechumenCardProps = {
  catechumen: CatechumenResponse
  status: string
  statusText: string
}

const CatechumenCard = ({
  catechumen,
  status,
  statusText
}: CatechumenCardProps) => {
  const badgeColors = {
    good: "bg-emerald-50 text-emerald-700 border-emerald-200",
    attention: "bg-amber-50 text-amber-700 border-amber-200",
    critical: "bg-rose-50 text-rose-700 border-rose-200",
  }[status];

  const progressColors = {
    good: "bg-emerald-500",
    attention: "bg-amber-500",
    critical: "bg-rose-500",
  }[status];

  return (
    <article 
      key={catechumen.id} 
      className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
    >
      <div>
        {/* Badge do Status individual */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-extrabold tracking-wide uppercase border ${badgeColors}`}>
            {statusText}
          </span>
        </div>

        {/* Nome do Catequizando */}
        <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight mb-4">
          {catechumen.firstName} {catechumen.lastName}
        </h3>

        <div className="flex flex-col gap-2 mb-4 pb-4 border-b border-slate-100">
          {/* Turma */}
          <div className="flex items-center gap-2 text-xs">
            <BookOpen className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span className="font-semibold text-slate-400">Turma:</span>
            <span className="font-bold text-slate-700">{FormatStep.format(catechumen.step.stepName)}</span>
          </div>
          {/* Catequista(s) */}
          <div className="flex items-center gap-2 text-xs">
            <Users className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />

            <span className="font-semibold text-slate-400">
              {catechumen.step.catechists.length > 1? "Catequistas:" : "Catequista:"}
            </span>

            <span className="font-bold text-slate-700 truncate">
              {catechumen.step.catechists.map((catechist, index) => (
                <span key={catechist.id}>
                  {index > 0 && " • "}
                  {catechist.firstName}
                </span>
              ))}
            </span>
          </div>
        </div>
        
        {/* Indicadores de Frequência em formato de grid compacto de duas colunas */}
        <div className="grid grid-cols-2 gap-x-4 mb-5 border-b border-slate-100 py-4">
          <div>
            <span className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Presenças</span>
            <span className="text-2xl font-black text-emerald-600">
              {catechumen.presences}
            </span>
          </div>
          <div className="border-l border-slate-100 pl-4">
            <span className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Ausências</span>
            <span className="text-2xl font-black text-rose-500">
              {catechumen.absences}
            </span>
          </div>
        </div>
      </div>

      {/* Progresso de Frequência e Barra visual */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-bold mb-1.5">
          <span className="text-slate-400 uppercase tracking-wider">
            {/* Frequência Atual */}
          </span>
          <span className="text-slate-700">
            {catechumen.currentFrequency}%
          </span>
        </div>
        {/* Barra de Progresso Real */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div 
            className={`h-full ${progressColors} rounded-full transition-all duration-500`}
            style={{ width: `${catechumen.currentFrequency}%` }}
          />
        </div>
      </div>

      {/* Ação: Ver Histórico Completo */}
      <button className="w-full mt-2 h-10 bg-slate-50 border border-slate-200 hover:bg-amber-50/50 hover:border-amber-300 hover:text-amber-700 text-slate-600 rounded-xl text-xs sm:text-sm font-bold transition-all">
        <Link to='/presencas/individual' className="text-slate-600 flex items-center justify-center gap-1.5 cursor-pointer">
          Ver Histórico Completo
          <ChevronRight className="w-4 h-4" />
        </Link>
      </button>
    </article>
  )
}

type EmptyStateProps = {
  clearSearch: (value: string) => void
}

const EmptyState = ({
  clearSearch
}: EmptyStateProps) => {
  return (
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
      <button
        className="h-11 border-none bg-amber-500 text-white font-extrabold px-6 rounded-xl text-sm shadow-md hover:bg-amber-600 transition-all cursor-pointer"
        onClick={() => clearSearch('')}  
      >
        Limpar Busca
      </button>
    </section>
  )
}

type PaginationProps = {
  pageable: CatechumenPage,
  onSelectPage: (page: number) => void,
  onPrevious: () => void,
  onNext: () => void,
}

const Pagination = ({
  pageable,
  onSelectPage,
  onPrevious,
  onNext
}: PaginationProps) => {
  const currentPage = pageable.page.number;
  const totalPages = pageable.page.totalPages;

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;
  
  function getVisiblePages(): number[] {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }
    if (currentPage === 0) return [0, 1, 2];
    if (isLastPage) return [totalPages - 3, totalPages - 2, totalPages - 1];
    return [currentPage - 1, currentPage, currentPage + 1];
  }

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/80 pt-6 mt-10">
      <div className="text-xs sm:text-sm font-semibold text-slate-500">
        Exibindo{' '}
        <span className="font-bold text-slate-800">
          {Math.min(pageable._embedded.catechumens.length, pageable.page.totalElements)}
        </span>{' '}
        de{' '}
        <span className="font-bold text-slate-800">{pageable.page.totalElements}</span>{' '}
        catequizandos
      </div>

      {totalPages > 1 && (
        <nav className="inline-flex -space-x-px rounded-xl bg-white overflow-hidden" aria-label="Paginação">
          <button
            className="relative inline-flex items-center px-3.5 py-2.5 border-0 text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-all cursor-pointer"
            onClick={onPrevious}
            disabled={isFirstPage}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="sr-only">Anterior</span>
          </button>

          {visiblePages.map(page => (
            <button
              key={page}
              className={`relative inline-flex items-center px-4 py-2.5 border-0 text-xs sm:text-sm font-bold transition-all cursor-pointer
                ${page === currentPage
                  ? 'bg-amber-500 text-white'
                  : 'text-slate-600 hover:bg-slate-50'
                }`}
              onClick={() => onSelectPage(page)}
            >
              {page + 1}
            </button>
          ))}
          
          {/* Botão Próximo */}
          <button
            className="relative inline-flex items-center px-3.5 py-2.5 border-0 text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-all cursor-pointer"
            onClick={onNext}
            disabled={isLastPage}
          >
            <span className="sr-only">Próximo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          
        </nav>
      )}
    </div>
  )
}

type ListCatechumensProps = {
  pageable: CatechumenPage,
  selectPage: (page: number) => void,
	nextPage: () => void,
	previousPage: () => void,
  isLoading: boolean,
  clearSearch: (value: string) => void
}

function ListCatechumens({
  pageable,
  selectPage,
	nextPage,
	previousPage,
  isLoading,
  clearSearch
}: ListCatechumensProps) {
  function getStatus(catechumen: CatechumenResponse) {
    if (catechumen.currentFrequency < 50) {
      return 'critical';
    }
    else if (catechumen.currentFrequency < 75) {
      return 'attention';
    }
    else {
      return 'good';
    }
  }

  function getStatusText(catechumen: CatechumenResponse) {
    if (catechumen.currentFrequency < 50) {
      return 'Baixa Frequência';
    }
    else if (catechumen.currentFrequency < 75) {
      return 'Atenção';
    }
    else {
      return 'Boa Frequência';
    }
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Meus catequizandos</h2>
        <span className="text-xs bg-slate-200 text-slate-600 font-bold px-2.5 py-1 rounded-full">
          {
            pageable._embedded
            ? `Exibindo ${pageable._embedded.catechumens.length}`
            : 'Exibindo 0'
          }
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {
          isLoading && pageable._embedded
          ? Array.from({ length: 4 }).map((_, index) => (
              <CatechumenCardSkeleton key={index} />
            ))
          : pageable._embedded?.catechumens.map((catechumen) => (
              <CatechumenCard
                key={catechumen.id}
                catechumen={catechumen}
                status={getStatus(catechumen)}
                statusText={getStatusText(catechumen)}
              /> 
            ))
        }
      </div>

      {!pageable._embedded && !isLoading && (
        <EmptyState clearSearch={clearSearch} />
      )}

      {
        pageable._embedded &&
          <Pagination
            pageable={pageable}
            onSelectPage={selectPage}
            onPrevious={previousPage}
            onNext={nextPage}
          />
      }
    </section>
  )
}

export default ListCatechumens;