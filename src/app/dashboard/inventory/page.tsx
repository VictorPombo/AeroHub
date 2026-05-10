'use client';

import { mockInventoryItems, mockPurchaseOrders } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, AlertTriangle, ShoppingCart, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function InventoryDashboardPage() {
  const items = mockInventoryItems;
  const purchases = mockPurchaseOrders;

  // KPIs
  const totalValue = items.reduce((acc, item) => acc + (item.current_quantity * item.average_unit_cost), 0);
  const itemsBelowMinimum = items.filter(item => item.current_quantity <= item.minimum_quantity);
  const pendingOrders = purchases.filter(po => po.status === 'approved' || po.status === 'shipped');

  return (
    <div className="space-y-6">
      
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Card className="glass border-border/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total de Itens Cadastrados</p>
                <h3 className="text-3xl font-bold font-mono">{items.length}</h3>
              </div>
              <div className="p-3 bg-aero-cyan/10 rounded-xl text-aero-cyan">
                <Package className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Valor em Estoque</p>
                <h3 className="text-3xl font-bold font-mono text-emerald-500">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(totalValue)}
                </h3>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-aero-rose/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-aero-rose/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Abaixo do Mínimo</p>
                <h3 className="text-3xl font-bold font-mono text-aero-rose">{itemsBelowMinimum.length}</h3>
              </div>
              <div className="p-3 bg-aero-rose/10 rounded-xl text-aero-rose">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Compras em Trânsito</p>
                <h3 className="text-3xl font-bold font-mono text-indigo-400">{pendingOrders.length}</h3>
              </div>
              <div className="p-3 bg-indigo-400/10 rounded-xl text-indigo-400">
                <ShoppingCart className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Alerts List */}
        <Card className="glass border-aero-rose/20">
          <CardHeader className="pb-3 border-b border-border/30">
            <CardTitle className="text-lg flex items-center gap-2 text-aero-rose">
              <AlertTriangle className="w-5 h-5" />
              Atenção: Estoque Baixo
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {itemsBelowMinimum.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">Nenhum item abaixo do estoque mínimo de segurança.</div>
            ) : (
              <div className="divide-y divide-border/30">
                {itemsBelowMinimum.map(item => (
                  <div key={item.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                    <div>
                      <span className="font-mono font-bold text-foreground">{item.part_number}</span>
                      <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-aero-rose font-mono">
                        {item.current_quantity} <span className="text-xs font-sans text-muted-foreground">/ min {item.minimum_quantity}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="p-3 border-t border-border/30 bg-white/[0.01]">
              <Link href="/dashboard/inventory/items">
                <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-aero-cyan justify-between">
                  Ver todo o estoque <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent POs */}
        <Card className="glass border-border/50">
          <CardHeader className="pb-3 border-b border-border/30">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-indigo-400" />
              Últimas Compras
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/30">
              {purchases.slice(0, 3).map(po => (
                <div key={po.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                  <div>
                    <span className="font-mono font-bold text-foreground">{po.po_number}</span>
                    <p className="text-sm text-muted-foreground mt-1">Status: <span className="capitalize text-foreground font-medium">{po.status}</span></p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-emerald-500 font-mono">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(po.total_amount || 0)}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(po.date_created).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border/30 bg-white/[0.01]">
              <Link href="/dashboard/inventory/purchases">
                <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-aero-cyan justify-between">
                  Gerenciar pedidos <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}
