'use client';

// ═══════════════════════════════════════════════════════
// AeroGest — Sidebar Navigation
// ═══════════════════════════════════════════════════════

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Plane,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Wrench,
  Calendar,
  ShieldAlert,
  UserCheck,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Aeronaves',
    href: '/dashboard/aircraft',
    icon: Plane,
  },
  {
    label: 'Diário de Bordo',
    href: '/dashboard/flights',
    icon: BookOpen,
  },
  {
    label: 'Manutenção',
    href: '/dashboard/maintenance',
    icon: Wrench,
  },
  {
    label: 'Tripulação',
    href: '/dashboard/pilot-profile',
    icon: UserCheck,
  },
  {
    label: 'Segurança',
    href: '/dashboard/safety',
    icon: ShieldAlert,
  },
  {
    label: 'Agendamentos',
    href: '/dashboard/schedule',
    icon: Calendar,
  },
  {
    label: 'Perfil & LGPD',
    href: '/dashboard/profile',
    icon: User,
  },
  {
    label: 'Configurações',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  function handleLogout() {
    logout();
    router.push('/login');
  }

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col glass-strong h-screen sticky top-0 transition-all duration-300 ease-in-out z-40',
        collapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-border/50">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-aero-cyan/10 border border-aero-cyan/20 group-hover:bg-aero-cyan/20 transition-colors shrink-0">
            <Plane className="w-5 h-5 text-aero-cyan" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold tracking-tight animate-fade-in">
              Aero<span className="text-aero-cyan">Gest</span>
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative',
                isActive
                  ? 'text-aero-cyan bg-aero-cyan/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
              )}
              title={collapsed ? item.label : undefined}
            >
              {/* Active indicator bar */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-aero-cyan rounded-r-full" />
              )}
              <item.icon
                className={cn(
                  'w-5 h-5 shrink-0 transition-colors',
                  isActive ? 'text-aero-cyan' : 'text-muted-foreground group-hover:text-foreground'
                )}
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-4 border-t border-border/50 space-y-1">
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all duration-200 w-full"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 shrink-0" />
              <span>Recolher</span>
            </>
          )}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-aero-rose hover:bg-aero-rose/10 transition-all duration-200 w-full"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
}
