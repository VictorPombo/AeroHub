'use client';

import { mockWorkOrders, mockAircraft } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench, CheckCircle2, Clock, AlertTriangle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function PortalMaintenancePage() {
  const myAircraft = mockAircraft.find(a => a.registration === 'PT-KZM');
  const myWorkOrders = mockWorkOrders.filter(wo => wo.aircraft_id === myAircraft?.id).sort((a, b) => new Date(b.open_date).getTime() - new Date(a.open_date).getTime());

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'open': return { label: 'Em Orçamento', color: 'bg-aero-amber/10 text-aero-amber border-aero-amber/20', icon: AlertTriangle };
      case 'in_progress': return { label: 'Na Oficina', color: 'bg-aero-cyan/10 text-aero-cyan border-aero-cyan/20', icon: Wrench };
      case 'closed': return { label: 'Concluído', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', icon: CheckCircle2 };
      default: return { label: status, color: 'bg-white/[0.05] text-muted-foreground', icon: Clock };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-xl font-semibold">Status Técnico</h2>
          <p className="text-sm text-muted-foreground">Acompanhe as intervenções na sua aeronave.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {myWorkOrders.map(wo => {
          const config = getStatusConfig(wo.status);
          const Icon = config.icon;

          return (
            <Card key={wo.id} className="glass hover:bg-white/[0.02] transition-colors group">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  
                  {/* WO Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className={cn("uppercase text-[10px] tracking-wider flex items-center gap-1", config.color)}>
                        <Icon className="w-3 h-3" /> {config.label}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">OS: {wo.work_order_number}</span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2">{wo.title}</h3>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" /> Entrada: {new Date(wo.open_date).toLocaleDateString('pt-BR')}
                      </span>
                      {wo.close_date && (
                        <span className="flex items-center gap-1.5">
                          Saída: {new Date(wo.close_date).toLocaleDateString('pt-BR')}
                        </span>
                      )}
                    </div>

                    {wo.notes && (
                      <p className="text-sm text-muted-foreground mt-4 bg-white/[0.02] p-3 rounded-lg border border-border/30">
                        {wo.notes}
                      </p>
                    )}
                  </div>

                  {/* Financials / Actions */}
                  <div className="md:w-64 border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 pl-0 md:pl-6 flex flex-col justify-between">
                    <div>
                      <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-1">Custo Estimado / Total</span>
                      <span className={cn("text-2xl font-mono font-bold mt-1 block", wo.status === 'closed' ? "text-muted-foreground" : "text-foreground")}>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(wo.total_cost || 0)}
                      </span>
                    </div>

                    <div className="mt-6 flex flex-col gap-2">
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        <FileText className="w-3.5 h-3.5 mr-1.5" /> Ver Orçamento PDF
                      </Button>
                      {wo.status === 'open' && (
                        <Button size="sm" className="w-full text-xs bg-emerald-500 text-white hover:bg-emerald-600">
                          Aprovar Orçamento
                        </Button>
                      )}
                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>
          );
        })}
        {myWorkOrders.length === 0 && (
          <div className="p-8 text-center text-muted-foreground border border-border/30 rounded-xl bg-white/[0.01]">
            Nenhuma ordem de serviço registrada para sua aeronave.
          </div>
        )}
      </div>
    </div>
  );
}
