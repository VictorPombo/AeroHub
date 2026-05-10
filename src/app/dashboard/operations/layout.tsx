'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Globe, MapPin, Droplet, FileSignature, BookOpen, Contact } from 'lucide-react';

export default function OperationsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const tabs = [
    { label: 'Centro de Operações', href: '/dashboard/operations', icon: Globe, exact: true },
    { label: 'Aeródromos', href: '/dashboard/operations/aerodromes', icon: MapPin },
    { label: 'Combustível', href: '/dashboard/operations/fuel', icon: Droplet },
    { label: 'Documentos e Vistos', href: '/dashboard/operations/documents', icon: FileSignature },
    { label: 'Checklists (SOP)', href: '/dashboard/operations/checklists', icon: BookOpen },
    { label: 'Contatos', href: '/dashboard/operations/contacts', icon: Contact },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Globe className="w-8 h-8 text-aero-cyan" />
            Operações Aéreas (DOV)
          </h1>
          <p className="text-muted-foreground mt-1">Logística de solo, abastecimento e inteligência de voo.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-2 border-b border-border/50 gap-2 hide-scrollbar">
        {tabs.map((tab) => {
          const isActive = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href);
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
      <div className="pt-2 animate-fade-in">
        {children}
      </div>
    </div>
  );
}
