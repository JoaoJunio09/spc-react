import './index.css';

import { useState } from 'react';
import logoImg from '../../../assets/brasao_paroquia.png';
import { useAuthContext } from '../../../context/AuthContext';
import type { CommunityOrParish } from '../../../enums/CommunityOrParish';
import Nav from '../nav';
import { Bell, BellRing, X } from 'lucide-react';
import useNotifications from '../../../features/notifications/hooks/useNotifications';
import NotificationDrawer from '../../../features/notifications/components/NotificationDrawer';

type HeaderProps = {
  active: string
}

function Header({ active }: HeaderProps) {
  const [isOpenMenu, setisOpenMenu] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  console.log(notifications);

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
          onClick={() => setisOpenMenu(!isOpenMenu)}
        >
          {isOpenMenu ? '✕ FECHAR' : '☰ MENU'}
        </button>

        {auth && <Nav isOpen={isOpenMenu} activateTheMenu={activateTheMenu} roles={auth.roles} />}

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative p-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer border border-slate-200 text-slate-700 focus:outline-none focus:ring-4 focus:ring-amber-500/10"
            aria-label="Abrir notificações"
          >
            {unreadCount > 0 ? (
              <>
                <BellRing className="w-6 h-6 text-amber-600 animate-pulse" />
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[11px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center border-2 border-white shadow-sm">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              </>
            ) : (
              <Bell className="w-6 h-6 text-slate-500" />
            )}
          </button>
        </div>
      </div>

      <NotificationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        notifications={notifications}
        unreadCount={unreadCount}
        markAsRead={markAsRead}
        markAllAsRead={markAllAsRead}
      />
    </header>
  )
}

export default Header;