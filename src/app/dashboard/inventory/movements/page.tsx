'use client';

import { mockInventoryMovements, mockInventoryItems } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowDownRight, ArrowUpRight, ArrowRightLeft, User, Wrench, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function InventoryMovementsPage() {
  const movements = mockInventoryMovements;

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'in': return { label: 'Entrada', color: 'text-emerald-500 bg-emerald-500/10', icon: ArrowDownRight };
      case 'out': return { label: 'Saída', color: 'text-aero-rose bg-aero-rose/10', icon: ArrowUpRight };
      case 'adjustment': return { label: 'Ajuste', color: 'text-aero-amber bg-aero-amber/10', icon: ArrowRightLeft };
      default: return { label: type, color: 'text-muted-foreground bg-white/[0.05]', icon: ArrowRightLeft };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Histórico de Movimentações (Kardex)</h2>
        <Button className="bg-white/[0.05] border border-border/50 text-foreground hover:bg-white/[0.1]">
          Exportar Relatório
        </Button>
      </div>

      <div className="grid gap-4">
        {movements.map(mov => {
          const item = mockInventoryItems.find(i => i.id === mov.item_id);
          const config = getTypeConfig(mov.movement_type);
          const Icon = config.icon;

          return (
            <Card key={mov.id} className="glass hover:bg-white/[0.02] transition-colors group">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  {/* Item Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className={cn("p-3 rounded-xl shrink-0 mt-1", config.color)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-foreground">{item?.part_number}</span>
                        <Badge variant="outline" className={cn("text-[10px] uppercase font-bold tracking-wider", config.color, "border-transparent")}>
                          {config.label}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">{item?.description}</p>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {mov.performed_by}</span>
                        <span className="flex items-center gap-1.5">Data: {new Date(mov.date).toLocaleString('pt-BR')}</span>
                        {mov.work_order_id && (
                          <span className="flex items-center gap-1.5 text-aero-cyan">
                            <Wrench className="w-3.5 h-3.5" /> OS Vinculada: {mov.work_order_id}
                          </span>
                        )}
                        {mov.purchase_order_id && (
                          <span className="flex items-center gap-1.5 text-indigo-400">
                            <ShoppingCart className="w-3.5 h-3.5" /> Compra Vinculada: {mov.purchase_order_id}
                          </span>
                        )}
                      </div>
                      
                      {mov.notes && (
                        <p className="text-xs text-muted-foreground mt-2 italic border-l-2 border-border/50 pl-2">
                          "{mov.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Cost */}
                  <div className="md:text-right border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 pl-0 md:pl-6 grid grid-cols-2 md:block gap-4">
                    <div className="md:mb-4">
                      <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Quantidade</span>
                      <span className={cn("text-2xl font-mono font-bold", mov.movement_type === 'in' ? 'text-emerald-500' : mov.movement_type === 'out' ? 'text-aero-rose' : 'text-aero-amber')}>
                        {mov.movement_type === 'in' ? '+' : mov.movement_type === 'out' ? '-' : ''}{mov.quantity} <span className="text-sm font-sans font-normal text-muted-foreground">{item?.unit_of_measure}</span>
                      </span>
                    </div>

                    {mov.unit_cost && (
                      <div>
                        <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Custo Unitário</span>
                        <span className="text-sm font-mono font-bold text-foreground">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(mov.unit_cost)}
                        </span>
                      </div>
                    )}
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
