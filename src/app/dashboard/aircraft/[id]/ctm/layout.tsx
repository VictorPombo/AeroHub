'use client';

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { mockAircraft } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { ChevronLeft, Wrench, ShieldAlert, Cpu, FileSignature, BookOpen } from 'lucide-react';

export default function CTMLayout({ children }: { children: React.ReactNode }) {
  const { id } = useParams();
  const pathname = usePathname();
  const aircraft = mockAircraft.find(a => a.id === id);

  if (!aircraft) return null;

  const tabs = [
    { label: 'Ordens de Serviço', href: `/dashboard/aircraft/${id}/ctm/work-orders`, icon: Wrench },
    { label: 'Componentes (Mapa)', href: `/dashboard/aircraft/${id}/ctm/components`, icon: Cpu },
    { label: 'Boletins e ADs', href: `/dashboard/aircraft/${id}/ctm/service-bulletins`, icon: ShieldAlert },
    { label: 'Modificações (STC)', href: `/dashboard/aircraft/${id}/ctm/modifications`, icon: FileSignature },
    { label: 'Biblioteca Técnica', href: `/dashboard/aircraft/${id}/ctm/library`, icon: BookOpen },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <Link href={`/dashboard/aircraft/${id}`} className="p-2 bg-white/[0.02] border border-border/50 rounded-lg hover:bg-white/[0.05] transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <span className="text-aero-cyan">{aircraft.registration}</span> — CTM Avançado
          </h1>
          <p className="text-muted-foreground mt-1">Gestão técnica profunda da aeronave {aircraft.model}.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-2 border-b border-border/50 gap-2 hide-scrollbar">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          const Icon = tab.icon;
          return (
            <Link key={tab.href} href={tab.href}>
              <div className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors whitespace-nowrap border-b-2",
                isActive 
                  ? "bg-aero-cyan/10 text-aero-cyan border-aero-cyan font-medium" 
                  : "text-muted-foreground hover:bg-white/[0.02] hover:text-foreground border-transparent"
              )}>
                <Icon className="w-4 h-4" />
                {tab.label}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Content */}
      <div className="pt-2">
        {children}
      </div>
    </div>
  );
}
