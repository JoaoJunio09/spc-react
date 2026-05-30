import {
	AlertTriangle,
	Church,
	HelpCircle,
	Home,
	RefreshCw,
	Server
} from 'lucide-react';
import React from 'react';
import type InternalServerError from '../exceptions/server/InternalServerError';

// ==========================================
// COMPONENTE: ErrorIllustration
// ==========================================
const ErrorIllustration: React.FC = () => (
  <div className="relative flex items-center justify-center w-32 h-32 mx-auto mb-6">
    {/* Círculo de brilho de fundo pulsando suavemente */}
    <div className="absolute inset-0 bg-amber-500/10 rounded-full animate-ping [animation-duration:3s]" />
    <div className="absolute w-24 h-24 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-full blur-md" />
    
    {/* Base Principal do Servidor */}
    <div className="relative bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-md flex items-center justify-center w-20 h-20 transition-all hover:scale-105 duration-300">
      <Server className="w-10 h-10 text-slate-700" />
      
      {/* Pequenos LEDs simulando o servidor */}
      <div className="absolute bottom-3 right-3 flex gap-1">
        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
      </div>
    </div>

    {/* Ícone de Alerta Flutuante (Suave) */}
    <div className="absolute -top-1 -right-1 bg-gradient-to-br from-amber-500 to-orange-600 text-white p-2 rounded-xl shadow-lg border-2 border-white animate-bounce [animation-duration:2.5s] flex items-center justify-center">
      <AlertTriangle className="w-5 h-5" />
    </div>
  </div>
);

// ==========================================
// COMPONENTE: ErrorHeader
// ==========================================
const ErrorHeader: React.FC = () => (
  <header className="text-center mb-5">
    {/* Badge de Código do Erro de forma discreta */}
    <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
      <span>Código 500</span>
      <span className="w-1 h-1 bg-amber-400 rounded-full" />
      <span className="font-semibold text-[0.7rem] text-amber-600">Erro Interno do Servidor</span>
    </div>
    
    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
      Ops! Ocorreu um problema inesperado
    </h2>
  </header>
);

// ==========================================
// COMPONENTE: ErrorMessage
// ==========================================
const ErrorMessage: React.FC = () => (
  <section className="text-center text-slate-600 text-[0.95rem] sm:text-base leading-relaxed space-y-3.5 max-w-[460px] mx-auto mb-8">
    <p>
      Não foi possível processar sua solicitação neste momento. Isso pode ter acontecido devido a uma instabilidade temporária do sistema.
    </p>
    <p className="font-medium text-slate-500">
      Aguarde alguns instantes e tente novamente. Se o problema persistir, entre em contato com a coordenação responsável pelo sistema.
    </p>
  </section>
);

// ==========================================
// COMPONENTE: ErrorActions
// ==========================================
const ErrorActions: React.FC = () => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-[400px] mx-auto mb-8">
    {/* Botão Primário: Tentar Novamente */}
    <button 
      type="button" 
      className="w-full border-none sm:flex-1 h-12 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl text-[0.95rem] font-bold shadow-md hover:shadow-lg shadow-orange-600/10 hover:shadow-orange-600/20 hover:-translate-y-0.5 hover:brightness-[1.05] active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
    >
      <RefreshCw className="w-4.5 h-4.5" />
      Tentar novamente
    </button>
    
    {/* Botão Secundário: Voltar ao Início */}
    <button 
      type="button" 
      className="w-full sm:flex-1 h-12 bg-white border-2 border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl text-[0.95rem] font-bold hover:border-slate-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
    >
      <Home className="w-4.5 h-4.5" />
      Voltar ao início
    </button>
  </div>
);

// ==========================================
// COMPONENTE: HelpSection
// ==========================================
const HelpSection: React.FC = () => (
  <div className="border-t border-slate-100 pt-5 mt-2 flex items-start gap-3 text-left bg-slate-50/50 p-4 rounded-xl border border-slate-100">
    <div className="bg-amber-100 text-amber-800 p-2 rounded-lg flex-shrink-0">
      <HelpCircle className="w-5 h-5" />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-[0.9rem] font-bold text-slate-800 mb-0.5">Precisa de ajuda?</h4>
      <p className="text-[0.82rem] text-slate-500 leading-normal">
        Caso o problema continue acontecendo, procure a coordenação responsável pelo sistema para obter auxílio imediato.
      </p>
    </div>
  </div>
);

// ==========================================
// COMPONENTE PRINCIPAL: Error500Page
// ==========================================
function InternalServerErrorPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 font-sans relative overflow-hidden">
      
      {/* Detalhe Litúrgico/Decorativo de Fundo (Simula os vitrais do SPC de forma abstrata) */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-amber-200/10 to-orange-300/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-slate-200/10 to-amber-200/5 rounded-full blur-3xl pointer-events-none" />

      {/* CARD CENTRAL DE ERRO (UX ACOLHEDORA) */}
      <main className="flex-1 flex items-center justify-center py-8 relative z-10">
        <div className="max-w-[500px] w-full bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200/80 text-center animate-[loginCardReveal_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]">
          <ErrorIllustration />
          <ErrorHeader />
          <ErrorMessage />
          <ErrorActions />
          <HelpSection />
        </div>
      </main>

      {/* RODAPÉ DO SISTEMA */}
      <footer className="w-full text-center py-4 relative z-10">
        <p className="text-[0.8rem] font-semibold text-slate-800 mb-0.5">SPC — Sistema de Presença da Catequese</p>
        <p className="text-[0.72rem] text-slate-400 font-medium">Desenvolvido com carinho para as paróquias e comunidades</p>
      </footer>

      {/* Estilos Auxiliares Locais para Animação de Entrada e Reset */}
      <style>{`
        @keyframes loginCardReveal {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default InternalServerErrorPage;