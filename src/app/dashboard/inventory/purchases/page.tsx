'use client';

import { mockPurchaseOrders, mockSuppliers } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, CheckCircle2, Clock, Truck, FileText, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function PurchaseOrdersPage() {
  const purchases = mockPurchaseOrders;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'draft': return { label: 'Rascunho', color: 'text-muted-foreground bg-white/[0.05] border-border/50', icon: FileText };
      case 'quoted': return { label: 'Em Cotação', color: 'text-aero-cyan bg-aero-cyan/10 border-aero-cyan/20', icon: Clock };
      case 'approved': return { label: 'Aprovado', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle2 };
      case 'shipped': return { label: 'Em Trânsito', color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20', icon: Truck };
      case 'received': return { label: 'Recebido', color: 'text-slate-400 bg-slate-400/10 border-slate-400/20', icon: CheckCircle2 };
      default: return { label: status, color: 'text-muted-foreground bg-white/[0.05]', icon: FileText };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Ordens de Compra (PO)</h2>
        <Button className="bg-aero-cyan text-aero-navy hover:bg-aero-cyan-light">
          <Plus className="w-4 h-4 mr-2" /> Nova Compra
        </Button>
      </div>

      <div className="grid gap-4">
        {purchases.map(po => {
          const supplier = mockSuppliers.find(s => s.id === po.supplier_id);
          const config = getStatusConfig(po.status);
          const Icon = config.icon;

          return (
            <Card key={po.id} className="glass hover:bg-white/[0.02] transition-colors group">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  {/* PO Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-white/[0.02] border border-border/50 rounded-xl shrink-0 mt-1">
                      <ShoppingCart className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-lg font-bold text-foreground">{po.po_number}</span>
                        <Badge variant="outline" className={cn("flex items-center gap-1", config.color)}>
                          <Icon className="w-3 h-3" /> {config.label}
                        </Badge>
                      </div>
                      
                      {supplier && (
                        <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5 mt-2">
                          <Truck className="w-3.5 h-3.5" /> Fornecedor: {supplier.name}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-xs text-muted-foreground">
                        <span>Criado em: {new Date(po.date_created).toLocaleDateString('pt-BR')}</span>
                        {po.date_expected && <span>Previsão: {new Date(po.date_expected).toLocaleDateString('pt-BR')}</span>}
                        {po.date_received && <span className="text-emerald-500">Recebido em: {new Date(po.date_received).toLocaleDateString('pt-BR')}</span>}
                        <span>Solicitante: {po.requested_by}</span>
                      </div>

                      {po.notes && (
                        <p className="text-xs text-muted-foreground mt-3 bg-white/[0.02] p-2 rounded border border-border/30">
                          {po.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Financials */}
                  <div className="md:text-right border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 pl-0 md:pl-6">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Valor Total</span>
                    {po.total_amount ? (
                      <span className="text-2xl font-mono font-bold text-emerald-500 mt-1 block">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(po.total_amount)}
                      </span>
                    ) : (
                      <span className="text-lg font-mono text-muted-foreground mt-1 block">Aguardando Cotação</span>
                    )}
                    
                    <div className="mt-4 flex flex-col md:items-end gap-2">
                      <Button variant="outline" size="sm" className="w-full md:w-auto h-8 text-xs">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
