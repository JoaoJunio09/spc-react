import { Bell, BellRing, Menu } from 'lucide-react';
import { useState } from 'react';
import logoImg from '../../../assets/brasao_paroquia.png';
import { useAuthContext } from '../../../context/AuthContext';
import type { CommunityOrParish } from '../../../enums/CommunityOrParish';
import NotificationDrawer from '../../../features/notifications/components/NotificationDrawer';
import useNotifications from '../../../features/notifications/hooks/useNotifications';
import Nav, { DesktopNav } from '../nav';

// ─── Types ────────────────────────────────────────────────────────────────────

type HeaderProps = {
  active: string;
};

// ─── Community label helpers ──────────────────────────────────────────────────

function getCommunityOrParish(): CommunityOrParish | null {
  const stored = sessionStorage.getItem('communityOrParish');
  if (stored === 'SAO_SEBASTIAO') return 'SAO_SEBASTIAO';
  if (stored === 'DIVINO_ESPIRITO_SANTO') return 'DIVINO_ESPIRITO_SANTO';
  return null;
}

function CommunityLabel({ communityOrParish }: { communityOrParish: CommunityOrParish | null }) {
  if (communityOrParish === 'SAO_SEBASTIAO') {
    return (
      <p className="text-xs text-slate-500 leading-tight hidden sm:block">
        Paróquia <strong className="font-semibold text-slate-600">São Sebastião</strong>
      </p>
    );
  }
  if (communityOrParish === 'DIVINO_ESPIRITO_SANTO') {
    return (
      <p className="text-xs text-slate-500 leading-tight hidden sm:block">
        Capela <strong className="font-semibold text-slate-600">Divino Espírito Santo</strong>
      </p>
    );
  }
  return (
    <p className="text-xs text-slate-500 leading-tight hidden sm:block">
      Coordenação <strong className="font-semibold text-slate-600">São Sebastião</strong>
    </p>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({ active }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const { auth } = useAuthContext();
  const communityOrParish = getCommunityOrParish();

  function activateTheMenu(menuKey: string): string {
    return active === menuKey ? 'active' : '';
  }

  return (
    <>
      {/* ════════════════════════════════════════════
          HEADER
      ════════════════════════════════════════════ */}
      <header
        className="
          bg-white
          shadow-sm
          border-b-4 border-amber-400
          sticky top-0 z-30
        "
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* ── Mobile layout (<lg) ── */}
          <div className="flex items-center justify-between h-16 lg:hidden">

            {/* Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menu de navegação"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              className="
                p-2 rounded-xl
                text-slate-600 hover:bg-amber-50 hover:text-amber-800
                transition-colors duration-150
                focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500
              "
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brasão centralizado */}
            <img
              src={logoImg}
              alt="Brasão da paróquia"
              className="h-10 w-auto"
            />

            {/* Notifications */}
            <NotificationButton
              unreadCount={unreadCount}
              onClick={() => setIsNotificationDrawerOpen(true)}
            />
          </div>

          {/* ── Desktop layout (lg+) ── */}
          <div className="hidden lg:flex items-center justify-between gap-6 py-3">

            {/* Left: logo + title */}
            <div className="flex items-center gap-3 shrink-0">
              <img
                src={logoImg}
                alt="Brasão da paróquia"
                className="w-11 h-auto"
              />
              <div>
                <h1 className="text-xl font-extrabold text-amber-800 leading-tight tracking-tight">
                  SPC
                </h1>
                <CommunityLabel communityOrParish={communityOrParish} />
              </div>
            </div>

            {/* Center: desktop nav */}
            {auth && (
              <DesktopNav
                activateTheMenu={activateTheMenu}
                roles={auth.roles}
              />
            )}

            {/* Right: notifications */}
            <NotificationButton
              unreadCount={unreadCount}
              onClick={() => setIsNotificationDrawerOpen(true)}
            />
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer Nav ── */}
      {auth && (
        <Nav
          isOpen={isMobileMenuOpen}
          activateTheMenu={activateTheMenu}
          roles={auth.roles}
          communityOrParish={communityOrParish}
          userName={auth.fullName ?? ''}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ── Notification Drawer ── */}
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        notifications={notifications}
        unreadCount={unreadCount}
        markAsRead={markAsRead}
        markAllAsRead={markAllAsRead}
      />
    </>
  );
}

// ─── Notification button ──────────────────────────────────────────────────────

type NotificationButtonProps = {
  unreadCount: number;
  onClick(): void;
};

function NotificationButton({ unreadCount, onClick }: NotificationButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={
        unreadCount > 0
          ? `Abrir notificações — ${unreadCount} não lida${unreadCount > 1 ? 's' : ''}`
          : 'Abrir notificações'
      }
      className="
        relative p-2.5 rounded-xl shrink-0
        bg-slate-100 hover:bg-slate-200
        text-slate-600 hover:text-slate-800
        border border-slate-200
        transition-all duration-150
        focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500
        cursor-pointer
      "
    >
      {unreadCount > 0 ? (
        <>
          <BellRing className="w-5 h-5 text-amber-600 animate-pulse" />
          <span
            aria-hidden="true"
            className="
              absolute -top-1 -right-1
              bg-rose-500 text-white
              text-[10px] font-extrabold
              px-1 py-px rounded-full
              min-w-[18px] h-[18px]
              flex items-center justify-center
              border-2 border-white shadow-sm
            "
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        </>
      ) : (
        <Bell className="w-5 h-5 text-slate-500" />
      )}
    </button>
  );
}

export default Header;
