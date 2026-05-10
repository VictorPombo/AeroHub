'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { DollarSign, Wallet, FileText, Users, LineChart } from 'lucide-react';

export default function FinancialLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const tabs = [
    { label: 'Fluxo de Caixa', href: '/dashboard/financial', icon: LineChart, exact: true },
    { label: 'Contas a Pagar / Receber', href: '/dashboard/financial/transactions', icon: Wallet },
    { label: 'Faturamento (Invoices)', href: '/dashboard/financial/invoices', icon: FileText },
    { label: 'Rateio de Sócios', href: '/dashboard/financial/owner-statements', icon: Users },
    { label: 'DRE por Aeronave', href: '/dashboard/financial/aircraft-statements', icon: DollarSign },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-emerald-500" />
            Controladoria & Financeiro
          </h1>
          <p className="text-muted-foreground mt-1">Inteligência financeira, fluxo de caixa e rateios aeronáuticos.</p>
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
                  ? "bg-emerald-500/10 text-emerald-500 border-emerald-500 font-medium" 
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
