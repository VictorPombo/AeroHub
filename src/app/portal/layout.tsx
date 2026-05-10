'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Plane, Calendar, Wrench, CreditCard, UserCircle, LogOut, Bell } from 'lucide-react';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Visão Geral', href: '/portal', icon: Plane, exact: true },
    { label: 'Meus Voos', href: '/portal/flights', icon: Calendar },
    { label: 'Manutenção', href: '/portal/maintenance', icon: Wrench },
    { label: 'Faturas & Extratos', href: '/portal/billing', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
      
      {/* Top Navigation Bar - Premium Feel */}
      <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto w-full">
          
          <div className="flex items-center gap-2">
            <div className="bg-aero-cyan p-1.5 rounded-lg">
              <Plane className="w-5 h-5 text-aero-navy" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:inline-block">
              Aero<span className="text-aero-cyan">Gest</span> <span className="font-light text-muted-foreground ml-1">Portal</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-aero-rose rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border/50">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium leading-none">Dr. Roberto Almeida</p>
                <p className="text-xs text-muted-foreground mt-1">Proprietário (PT-KZM)</p>
              </div>
              <UserCircle className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area with Secondary Nav */}
      <main className="flex-1 flex flex-col items-center p-4 sm:p-8">
        <div className="w-full max-w-5xl space-y-8">
          
          {/* Welcome & Navigation Cards (Desktop) / Horizontal Scroll (Mobile) */}
          <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
            {navItems.map((item) => {
              const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="flex-1 min-w-[120px]">
                  <div className={cn(
                    "flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all border",
                    isActive 
                      ? "bg-aero-cyan/10 border-aero-cyan/30 text-aero-cyan shadow-[0_0_15px_rgba(34,211,238,0.1)]" 
                      : "bg-white/[0.02] border-border/50 text-muted-foreground hover:bg-white/[0.05] hover:text-foreground"
                  )}>
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-medium whitespace-nowrap">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="animate-fade-in pt-4">
            {children}
          </div>

        </div>
      </main>

    </div>
  );
}
