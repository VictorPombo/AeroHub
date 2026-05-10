'use client';

import { useParams } from 'next/navigation';
import { mockWorkOrders } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Hammer, CheckCircle2, AlertCircle, FileText, User, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function WorkOrdersPage() {
  const { id } = useParams();
  
  // Filter OS for this aircraft
  const orders = mockWorkOrders.filter(o => o.aircraft_id === id);

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'open': return { label: 'Aberta', color: 'bg-aero-amber/10 text-aero-amber border-aero-amber/20', icon: AlertCircle };
      case 'in_progress': return { label: 'Em Execução', color: 'bg-aero-cyan/10 text-aero-cyan border-aero-cyan/20', icon: Hammer };
      case 'closed': return { label: 'Fechada', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', icon: CheckCircle2 };
      default: return { label: 'Cancelada', color: 'bg-muted/10 text-muted-foreground border-border', icon: FileText };
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'scheduled': return 'Programada';
      case 'unscheduled': return 'Não Programada';
      case 'ad_sb': return 'AD / SB';
      case 'stc': return 'Modificação (STC)';
      case 'inspection': return 'Inspeção';
      default: return type;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Ordens de Serviço (OS)</h2>
        <Button className="bg-aero-cyan text-aero-navy hover:bg-aero-cyan-light">Nova OS</Button>
      </div>

      {orders.length === 0 ? (
        <Card className="glass border-dashed border-border/50">
          <CardContent className="p-12 text-center text-muted-foreground">
            <Hammer className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhuma Ordem de Serviço encontrada para esta aeronave.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {orders.map(order => {
            const StatusIcon = getStatusConfig(order.status).icon;
            return (
              <Card key={order.id} className="glass hover:bg-white/[0.02] transition-colors cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    {/* Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-lg font-bold text-foreground">{order.work_order_number}</span>
                        <Badge variant="outline" className={cn("flex items-center gap-1", getStatusConfig(order.status).color)}>
                          <StatusIcon className="w-3 h-3" /> {getStatusConfig(order.status).label}
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-medium text-foreground group-hover:text-aero-cyan transition-colors">
                        {order.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> {getTypeLabel(order.type)}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(order.open_date).toLocaleDateString('pt-BR')}</span>
                        {order.shop_name && <span className="flex items-center gap-1.5"><Hammer className="w-4 h-4" /> {order.shop_name}</span>}
                        {order.mechanic_name && <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {order.mechanic_name}</span>}
                      </div>
                    </div>

                    {/* Cost / Hours */}
                    <div className="md:text-right flex flex-row md:flex-col items-center justify-between md:items-end md:justify-center border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 pl-0 md:pl-6">
                      <div className="text-left md:text-right">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">TTSN na Entrada</span>
                        <p className="font-mono text-sm">{order.aircraft_hours_in.toFixed(1)}h</p>
                      </div>
                      
                      {order.total_cost && (
                        <div className="text-right mt-2 md:mt-4">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-500">Custo Total</span>
                          <p className="font-mono text-lg font-bold text-emerald-500">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.total_cost)}
                          </p>
                        </div>
                      )}
                    </div>
                    
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  );
}
