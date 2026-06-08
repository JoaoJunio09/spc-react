import { CheckCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import InstitutionalSection from "./InstitutionalSection";
import LoginCatechist from "./LoginCatechist";
import LoginCoordinatorOrAdmin from "./LoginCoordinatorOrAdmin";
import LoginSelector from "./LoginSelector";

import logoImg from '../../../assets/brasao_paroquia.png';

export type SelectorType = 'Catechist' | 'Coordinator' | 'Admin' | null;

export type onLoginSelectorProps = {
	onSelectLogin: (param: SelectorType) => void,
	roleCoordinatorOrAdmin?: 'Coordenação' | 'Administrador' 
}

function Login() {
	const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);

	const [selector, setSelector] = useState<SelectorType | null>(null);

	function handleSelect(selected: SelectorType) {
		setSelector(selected);

		if (selector) {
			localStorage.setItem('selectedLogin', selector);
		}
	}

	function isReturnedComponentLogin() {
		if (selector === null) {
			return <LoginSelector onSelectLogin={handleSelect} />;
		}
		else if (selector === 'Catechist') {
			return <LoginCatechist onSelectLogin={handleSelect} />
		}
		else {
			return <LoginCoordinatorOrAdmin
				onSelectLogin={handleSelect}
				roleCoordinatorOrAdmin={`${selector === "Coordinator" ? 'Coordenação' : 'Administrador'}`}
			/>
		}
	}

	useEffect(() => {
		setIsOpenModalUpdate(true);
	}, []);
	
	return (
		<div className="bg-slate-900 text-slate-800 overflow-x-hidden min-h-screen select-none">

			{isOpenModalUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-overlay-enter">
          {/* Backdrop Suave Escuro com desfoque */}
          <div 
            onClick={() => setIsOpenModalUpdate(false)}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-[4px] cursor-pointer"
            aria-hidden="true"
          />

          {}
          {/* Card do Modal */}
          <section className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col animate-modal-enter text-left">
            
            {/* Faixa decorativa sutil no topo (Assinatura SPC com gradiente Amber) */}
            <div className="h-2 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500" />

            {/* Conteúdo Interno com Rolagem de segurança para telas de celular pequenas */}
            <div className="p-6 sm:p-8 md:p-10 overflow-y-auto max-h-[85vh] space-y-6 sm:space-y-7 overflow-x-hidden">
              
              {}
              {/* Cabeçalho */}
              <header className="mt-[-15px] flex flex-col items-center sm:items-start text-center sm:text-left gap-4">
                <div className="flex items-center justify-center items-start">
                  <img src={logoImg} alt="" width={60} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Bem-vindo ao novo SPC
                  </h2>
                  <p className="text-[1.05rem] text-slate-500 leading-normal font-medium">
                    O sistema foi atualizado para oferecer uma experiência mais simples, rápida e organizada.
                  </p>
                </div>
              </header>

              {/* Mensagem de Boas-Vindas */}
              <article className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-2">
                <h3 className="text-lg font-bold text-slate-800">Olá!</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                  Preparamos uma nova atualização do SPC com melhorias visuais, novas funcionalidades e uma navegação mais simples para facilitar o dia a dia dos catequistas e coordenadores.
                </p>
              </article>

              {}
              {/* Lista de Novidades */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
                  O que há de novo nesta versão:
                </h4>
                <ul className="grid grid-cols-1 gap-3 pl-1" aria-label="Novidades do sistema">
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon />
                    <span className="text-sm sm:text-base text-slate-700 font-semibold leading-normal">
                      Novo acesso ao sistema simplificado
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon />
                    <span className="text-sm sm:text-base text-slate-700 font-semibold leading-normal">
                      Perfis separados para catequistas e coordenação
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon />
                    <span className="text-sm sm:text-base text-slate-700 font-semibold leading-normal">
                      Nova área de histórico de presenças detalhado
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon />
                    <span className="text-sm sm:text-base text-slate-700 font-semibold leading-normal">
                      Interface mais moderna, organizada e com letras maiores
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon />
                    <span className="text-sm sm:text-base text-slate-700 font-semibold leading-normal">
                      Melhor experiência de navegação em celulares
                    </span>
                  </li>
                </ul>
              </div>

              {}
              {/* Destaque Principal do Modal */}
              <div className="bg-amber-50/60 border-2 border-amber-500/20 rounded-2xl p-5 sm:p-6 shadow-sm relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-5 pointer-events-none">
                  <svg className="w-32 h-32 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2v20M17 5H7M19 9H5" />
                  </svg>
                </div>
                <div className="relative z-10 space-y-2">
                  <h4 className="text-lg font-black text-amber-900 tracking-tight">
                    Quer registrar presença para os catequizandos?
                  </h4>
                  <p className="text-slate-600 text-sm sm:text-[0.95rem] leading-relaxed font-semibold">
                    Clique no botão abaixo para acessar o sistema e continuar utilizando normalmente todas as funcionalidades.
                  </p>
                </div>
              </div>

              {}
              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button 
                  onClick={() => setIsOpenModalUpdate(false)}
                  className="border-none w-full sm:flex-1 h-13 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold text-base sm:text-[1.05rem] rounded-2xl shadow-md hover:shadow-lg shadow-orange-600/15 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Acessar o Sistema
                </button>
                <button 
                  onClick={() => setIsOpenModalUpdate(false)}
                  className="w-full sm:w-auto px-6 h-13 bg-white border-2 border-slate-200 text-slate-600 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-50 font-bold text-sm sm:text-base rounded-2xl transition-all flex items-center justify-center cursor-pointer"
                >
                  Ver Novidades
                </button>
              </div>

              {/* Rodapé institucional sutil */}
              <footer className="text-center pt-2 border-t border-slate-100">
                <p className="text-xs text-slate-400 font-bold tracking-wide">
                  Obrigado por utilizar o Sistema de Presença da Catequese.
                </p>
              </footer>

            </div>
          </section>
        </div>
      )}

			<div className="flex flex-col lg:flex-row min-h-screen w-full bg-[#F8FAFC]">
				<InstitutionalSection />
				<main className="w-full lg:w-[45%] flex items-center justify-center p-8 lg:p-10 bg-[#F8FAFC]">
					{isReturnedComponentLogin()}
				</main>
  		</div>
		</div>
	)
}

export default Login;