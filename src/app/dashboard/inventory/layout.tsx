'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Package, RefreshCw, ShoppingCart, Truck, Boxes } from 'lucide-react';

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const tabs = [
    { label: 'Visão Geral', href: '/dashboard/inventory', icon: Boxes, exact: true },
    { label: 'Estoque e Peças', href: '/dashboard/inventory/items', icon: Package },
    { label: 'Movimentações', href: '/dashboard/inventory/movements', icon: RefreshCw },
    { label: 'Compras (PO)', href: '/dashboard/inventory/purchases', icon: ShoppingCart },
    { label: 'Fornecedores', href: '/dashboard/inventory/suppliers', icon: Truck },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Package className="w-8 h-8 text-aero-cyan" />
            Suprimentos e Estoque
          </h1>
          <p className="text-muted-foreground mt-1">Gestão de almoxarifado, peças e ordens de compra.</p>
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
