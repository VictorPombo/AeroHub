'use client';

import { useParams } from 'next/navigation';
import { mockServiceBulletins } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function ServiceBulletinsPage() {
  const { id } = useParams();
  
  // Filter SBs for this aircraft
  const bulletins = mockServiceBulletins.filter(sb => sb.aircraft_id === id);

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'applied': return { label: 'Cumprido', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle2 };
      case 'pending': return { label: 'Pendente', color: 'text-aero-amber bg-aero-amber/10 border-aero-amber/20', icon: AlertTriangle };
      default: return { label: 'N/A', color: 'text-muted-foreground bg-muted/10 border-border', icon: FileText };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Boletins de Serviço e ADs</h2>
        <Button className="bg-aero-cyan text-aero-navy hover:bg-aero-cyan-light">Registrar SB/AD</Button>
      </div>

      <div className="grid gap-4">
        {bulletins.length === 0 ? (
          <Card className="glass border-dashed border-border/50">
            <CardContent className="p-12 text-center text-muted-foreground">
              <ShieldAlert className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum Boletim de Serviço ou AD registrado para esta aeronave.</p>
            </CardContent>
          </Card>
        ) : (
          bulletins.map(sb => {
            const StatusIcon = getStatusConfig(sb.status).icon;
            return (
              <Card key={sb.id} className="glass hover:bg-white/[0.02] transition-colors group">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row gap-6">
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-lg font-bold text-foreground">{sb.sb_number}</span>
                          {sb.ad_number && (
                            <Badge variant="outline" className="font-mono text-rose-400 bg-rose-400/10 border-rose-400/20">
                              {sb.ad_number}
                            </Badge>
                          )}
                          {sb.mandatory && (
                            <Badge variant="destructive" className="uppercase text-[10px] tracking-wider">Obrigatório</Badge>
                          )}
                        </div>
                        <Badge variant="outline" className={cn("flex items-center gap-1.5 px-2 py-1", getStatusConfig(sb.status).color)}>
                          <StatusIcon className="w-4 h-4" /> {getStatusConfig(sb.status).label}
                        </Badge>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-foreground group-hover:text-aero-cyan transition-colors">
                          {sb.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{sb.description}</p>
                      </div>
                    </div>

                    <div className="md:w-64 border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 pl-0 md:pl-6 space-y-4">
                      {sb.status === 'pending' && sb.due_hours ? (
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-aero-amber block">Vencimento em (TSN)</span>
                          <span className="font-mono text-lg font-bold text-aero-amber">{sb.due_hours.toFixed(1)}h</span>
                        </div>
                      ) : sb.status === 'applied' && sb.applied_hours ? (
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-500 block">Cumprido em (TSN)</span>
                          <span className="font-mono text-lg font-bold text-emerald-500">{sb.applied_hours.toFixed(1)}h</span>
                          <span className="text-xs text-muted-foreground block mt-1">Data: {new Date(sb.applied_date!).toLocaleDateString('pt-BR')}</span>
                        </div>
                      ) : null}
                    </div>

                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
