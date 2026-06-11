import './index.css';

import { useState } from 'react';
import logoImg from '../../../assets/brasao_paroquia.png';
import { useAuthContext } from '../../../context/AuthContext';
import type { CommunityOrParish } from '../../../enums/CommunityOrParish';
import Nav from '../nav';
import { Bell, BellRing, X } from 'lucide-react';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "new_mass",
    title: "Nova missa cadastrada",
    description: "Missa de Corpus Christi foi adicionada ao calendário paroquial da Capela São José.",
    time: "há 5 minutos",
    isNew: true
  },
  {
    id: 2,
    type: "success_registration",
    title: "Presença registrada com sucesso",
    description: "O catequista João Batista registrou a presença de 18 catequizandos na Matriz Santo Antônio.",
    time: "há 30 minutos",
    isNew: true
  },
  {
    id: 3,
    type: "system_update",
    title: "Atualização disponível no sistema",
    description: "Versão 3.1 lançada. Melhoramos o tamanho das letras e os contrastes para facilitar a leitura no celular.",
    time: "ontem",
    isNew: false
  },
  {
    id: 4,
    type: "catechist_linked",
    title: "Novo catequista vinculado à turma",
    description: "Ana Clara Silva foi vinculada como auxiliar na turma de Crisma II.",
    time: "há 2 dias",
    isNew: false
  }
];

type HeaderProps = {
	active: string
}

function Header({ active }: HeaderProps) {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [notificationState, setNotificationState] = useState<'with_data' | 'empty'>('with_data');
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const communityOrParish = loadCommunityOrParish();

	function loadCommunityOrParish() {
		const communityOrParishForStorage: string | null = sessionStorage.getItem('communityOrParish');

		let communityOrParish: CommunityOrParish | null = null;

		if (communityOrParishForStorage === 'SAO_SEBASTIAO') {
			communityOrParish = 'SAO_SEBASTIAO';
		}
		else if (communityOrParishForStorage === 'DIVINO_ESPIRITO_SANTO') {
			communityOrParish = 'DIVINO_ESPIRITO_SANTO';
		}

		return communityOrParish;
	}

	function activateTheMenu(menuActual: string): string {
		if (active === 'home' && menuActual === 'home') return 'active';
		else if (active === 'masses' && menuActual === 'masses') return 'active';
		else if (active === 'catechists' && menuActual === 'catechists') return 'active';
		else if (active === 'steps-and-catechists' && menuActual === 'steps-and-catechists') return 'active';
		else if (active === 'catechumens' && menuActual === 'catechumens') return 'active';
		else if (active === 'presences' && menuActual === 'presences') return 'active';
		else return '';
	}

	const { auth } = useAuthContext();

	return (
		<header className="main-header">
			<div className="container header-container">
				<div className="logo-area">
					<div className="church-logo-placeholder">
						<img src={logoImg} alt="Logo Paróquia" />
					</div>
					<div className="system-title">
						<h1>SPC</h1>
						{
							communityOrParish === 'SAO_SEBASTIAO' ? <p>Paróquia <strong>São Sebastião</strong></p> 
							: (communityOrParish === 'DIVINO_ESPIRITO_SANTO' ? <p>Capela <strong>Divino Espírito Santo</strong></p>
							: <p>Coordenação <strong>São Sebastião</strong></p>)
						}
					</div>
				</div>

				<button
					className="menu-toggle"
					id="btnMenu"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? '✕ FECHAR' : '☰ MENU'}	
				</button>

				{ auth && <Nav isOpen={isOpen} activateTheMenu={activateTheMenu} roles={auth.roles} /> }

				<div className="flex items-center gap-3">
					<button 
						onClick={() => setIsDrawerOpen(true)}
						className="relative p-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer border border-slate-200 text-slate-700 focus:outline-none focus:ring-4 focus:ring-amber-500/10"
						aria-label="Abrir notificações"
					>
						{notificationState === 'with_data' ? (
							<>
								<BellRing className="w-6 h-6 text-amber-600 animate-pulse" />
								{/* Badge de notificações */}
								<span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[11px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center border-2 border-white shadow-sm">
									4
								</span>
							</>
						) : (
							<Bell className="w-6 h-6 text-slate-500" />
						)}
					</button>
				</div>
			</div>

			<div 
        className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ${
          isDrawerOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Overlay do fundo escuro com blur */}
        <div 
          onClick={() => setIsDrawerOpen(false)}
          className={`absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 ${
            isDrawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <div 
            className={`w-screen max-w-md transform transition-transform duration-300 ease-in-out bg-white shadow-2xl flex flex-col ${
              isDrawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Header da Gaveta */}
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Bell className="w-5.5 h-5.5 text-amber-500" />
                  Notificações
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-1">Acompanhe avisos e atualizações do sistema.</p>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 border-none hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                aria-label="Fechar painel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo da Gaveta */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              
              {notificationState === 'with_data' ? (
                <div className="space-y-4 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avisos recentes</span>
                    <button 
                      onClick={() => setNotificationState('empty')}
                      className="border-none bg-transparent text-xs font-bold text-amber-600 hover:text-orange-700 cursor-pointer"
                    >
                      Limpar todos
                    </button>
                  </div>
                  
                  {MOCK_NOTIFICATIONS.map((notif) => {
                    const iconColor = notif.type === 'new_mass' ? 'bg-amber-100 text-amber-700' :
                                      notif.type === 'success_registration' ? 'bg-emerald-100 text-emerald-700' :
                                      notif.type === 'system_update' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700';

                    return (
                      <div 
                        key={notif.id}
                        className={`p-4 rounded-xl border transition-all ${
                          notif.isNew 
                            ? "bg-amber-50/50 border-amber-200/60" 
                            : "bg-white border-slate-100 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm ${iconColor}`}>
                            {notif.type === 'new_mass' ? "⛪" :
                             notif.type === 'success_registration' ? "✓" :
                             notif.type === 'system_update' ? "⚙" : "👥"}
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-sm font-bold text-slate-900">{notif.title}</h4>
                              {notif.isNew && (
                                <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed font-semibold">{notif.description}</p>
                            <span className="block text-[10px] text-slate-400 font-bold uppercase mt-1">{notif.time}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Estado Vazio de Notificações */
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-20 h-20 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
                    <Bell className="w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 tracking-tight">Você não possui notificações</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xs mt-1.5">
                    O sistema está em dia! Todos os novos registros e avisos aparecerão aqui assim que ocorrerem.
                  </p>
                </div>
              )}
            </div>

            {/* Footer da Gaveta */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 text-center">
              <p className="text-xs font-semibold text-slate-400">SPC Avisos e Central de Frequência • v3.1</p>
            </div>
          </div>
        </div>
      </div>
    </header>
	)
}

export default Header;