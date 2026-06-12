import {
  BookOpen,
  Church,
  ClipboardList,
  Home,
  Users,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImg from '../../../assets/brasao_paroquia.png';
import type { CommunityOrParish } from '../../../enums/CommunityOrParish';

// ─── Types ────────────────────────────────────────────────────────────────────

type MenuItem = {
  label: string;
  to: string;
  key: string;
  icon: React.ReactNode;
};

type NavProps = {
  /** Controls drawer open state on mobile */
  isOpen: boolean;
  /** Returns 'active' string when the given key matches the current route */
  activateTheMenu(key: string): string;
  roles: string[];
  communityOrParish: CommunityOrParish | null;
  /** Full name of the logged-in user */
  userName: string;
  /** Called when the drawer should close (X button or overlay click or link click) */
  onClose(): void;
};

// ─── Menu definitions per role ────────────────────────────────────────────────

const CATECHIST_MENU: MenuItem[] = [
  { label: 'Início', to: '/inicio', key: 'home', icon: <Home className="w-5 h-5" /> },
  { label: 'Meus Catequizandos', to: '/catequizandos', key: 'catechumens', icon: <BookOpen className="w-5 h-5" /> },
  { label: 'Histórico', to: '/presencas', key: 'presences', icon: <ClipboardList className="w-5 h-5" /> },
];

const COORDINATOR_MENU: MenuItem[] = [
  { label: 'Início', to: '/inicio', key: 'home', icon: <Home className="w-5 h-5" /> },
  { label: 'Etapas', to: '/etapas-e-catequistas', key: 'steps-and-catechists', icon: <BookOpen className="w-5 h-5" /> },
  { label: 'Catequizandos', to: '/catequizandos', key: 'catechumens', icon: <Users className="w-5 h-5" /> },
  { label: 'Missas', to: '/missas', key: 'masses', icon: <Church className="w-5 h-5" /> },
  { label: 'Histórico', to: '/presencas', key: 'presences', icon: <ClipboardList className="w-5 h-5" /> },
];

const ADMIN_MENU: MenuItem[] = [
  { label: 'Início', to: '/inicio', key: 'home', icon: <Home className="w-5 h-5" /> },
  { label: 'Etapas', to: '/etapas-e-catequistas', key: 'steps-and-catechists', icon: <BookOpen className="w-5 h-5" /> },
  { label: 'Catequizandos', to: '/catequizandos', key: 'catechumens', icon: <Users className="w-5 h-5" /> },
  { label: 'Missas', to: '/missas', key: 'masses', icon: <Church className="w-5 h-5" /> },
  { label: 'Histórico', to: '/presencas', key: 'presences', icon: <ClipboardList className="w-5 h-5" /> },
];

function getMenuItems(roles: string[]): MenuItem[] {
  if (roles.includes('ROLE_ADMIN')) return ADMIN_MENU;
  if (roles.includes('ROLE_COORDINATOR')) return COORDINATOR_MENU;
  if (roles.includes('ROLE_CATECHIST')) return CATECHIST_MENU;
  return [];
}

// ─── Community label helper ───────────────────────────────────────────────────

function CommunityLabel({ communityOrParish }: { communityOrParish: CommunityOrParish | null }) {
  if (communityOrParish === 'SAO_SEBASTIAO') {
    return <p className="text-sm text-slate-500">Paróquia <strong className="font-semibold text-slate-600">São Sebastião</strong></p>;
  }
  if (communityOrParish === 'DIVINO_ESPIRITO_SANTO') {
    return <p className="text-sm text-slate-500">Capela <strong className="font-semibold text-slate-600">Divino Espírito Santo</strong></p>;
  }
  return <p className="text-sm text-slate-500">Coordenação <strong className="font-semibold text-slate-600">São Sebastião</strong></p>;
}

// ─── Desktop Nav ──────────────────────────────────────────────────────────────

export function DesktopNav({
  activateTheMenu,
  roles,
}: Pick<NavProps, 'activateTheMenu' | 'roles'>) {
  const items = getMenuItems(roles);

  return (
    <nav aria-label="Navegação principal" className="hidden lg:flex">
      <ul className="flex items-center gap-1" role="list">
        {items.map((item) => {
          const isActive = activateTheMenu(item.key) === 'active';
          return (
            <li key={item.key}>
              <Link
                to={item.to}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500',
                  isActive
                    ? 'bg-amber-100 text-amber-800'
                    : 'text-slate-600 hover:bg-amber-50 hover:text-amber-800',
                ].join(' ')}
              >
                <span className={isActive ? 'text-amber-700' : 'text-slate-400'}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ─── User initials helper ─────────────────────────────────────────────────────

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return '?';
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

// ─── Mobile Drawer Nav ────────────────────────────────────────────────────────

function Nav({
  isOpen,
  activateTheMenu,
  roles,
  communityOrParish,
  userName,
  onClose,
}: NavProps) {
  const items = getMenuItems(roles);
  const initials = getInitials(userName);

  return (
    <>
      {/* ── Overlay ── */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={[
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      {/* ── Drawer ── */}
      <aside
        aria-label="Menu de navegação"
        aria-hidden={!isOpen}
        role="dialog"
        className={[
          'fixed top-0 left-0 z-50 h-full w-[70vw] max-w-[320px] bg-white flex flex-col shadow-2xl',
          'transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-amber-50/60">
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Brasão da paróquia"
              className="w-10 h-auto"
            />
            <div>
              <p className="text-lg font-extrabold text-amber-800 leading-tight">SPC</p>
              <CommunityLabel communityOrParish={communityOrParish} />
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar menu"
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer links */}
        <nav aria-label="Menu mobile" className="flex-1 overflow-y-auto py-3 px-3">
          <ul role="list" className="flex flex-col gap-1">
            {items.map((item) => {
              const isActive = activateTheMenu(item.key) === 'active';
              return (
                <li key={item.key}>
                  <Link
                    to={item.to}
                    onClick={onClose}
                    aria-current={isActive ? 'page' : undefined}
                    className={[
                      'flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 relative',
                      isActive
                        ? 'bg-amber-100 text-amber-800'
                        : 'text-slate-700 hover:bg-amber-50 hover:text-amber-800',
                    ].join(' ')}
                  >
                    {/* Active indicator bar */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-amber-500"
                      />
                    )}
                    <span className={isActive ? 'text-amber-700' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── User profile footer ── */}
        <div className="px-4 py-4 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            {/* Avatar com iniciais */}
            <div
              aria-hidden="true"
              className="
                w-10 h-10 rounded-full shrink-0
                bg-amber-100 border-2 border-amber-300
                flex items-center justify-center
                text-amber-800 text-sm font-bold
                select-none
              "
            >
              {initials}
            </div>

            {/* Nome */}
            <div className="min-w-0">
              <p className="text-xs text-slate-400 leading-tight">Conectado como</p>
              <p
                className="text-sm font-semibold text-slate-700 truncate leading-tight"
                title={userName}
              >
                {userName}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Nav;
