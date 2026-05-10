'use client';

import { useParams } from 'next/navigation';
import { mockAircraftComponents } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Cpu, Settings2, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function ComponentsMapPage() {
  const { id } = useParams();
  
  // Filter components for this aircraft
  const components = mockAircraftComponents.filter(c => c.aircraft_id === id);

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'ok': return { label: 'Em Dia', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle2 };
      case 'warning': return { label: 'Atenção (Próximo ao TBO)', color: 'text-aero-amber bg-aero-amber/10 border-aero-amber/20', icon: ShieldAlert };
      case 'due': return { label: 'Vencido (TBO Atingido)', color: 'text-aero-rose bg-aero-rose/10 border-aero-rose/20', icon: ShieldAlert };
      default: return { label: 'Removido', color: 'text-muted-foreground bg-muted/10 border-border', icon: Settings2 };
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      engine: 'Motor',
      propeller: 'Hélice / Rotor',
      avionics: 'Aviônicos',
      landing_gear: 'Trem de Pouso',
      structural: 'Estrutural',
      accessory: 'Acessório',
    };
    return labels[category] || category;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Mapa de Componentes</h2>
        <Button className="bg-aero-cyan text-aero-navy hover:bg-aero-cyan-light">Instalar Componente</Button>
      </div>

      <div className="grid gap-4">
        {components.length === 0 ? (
          <Card className="glass border-dashed border-border/50">
            <CardContent className="p-12 text-center text-muted-foreground">
              <Cpu className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum componente cadastrado no mapa desta aeronave.</p>
            </CardContent>
          </Card>
        ) : (
          components.map(comp => {
            const StatusIcon = getStatusConfig(comp.status).icon;
            
            let tboPercent = 0;
            if (comp.tbo_hours && comp.tbo_hours > 0) {
              tboPercent = Math.min((comp.current_tso / comp.tbo_hours) * 100, 100);
            }

            return (
              <Card key={comp.id} className="glass hover:bg-white/[0.02] transition-colors group">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row gap-6">
                    
                    {/* Header Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="uppercase text-[10px] bg-white/[0.05] border-border/50">
                              {getCategoryLabel(comp.category)}
                            </Badge>
                            {comp.parent_component_id && (
                              <Badge variant="outline" className="uppercase text-[10px] bg-white/[0.05] border-border/50 text-muted-foreground">
                                Sub-componente
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                            {comp.name}
                          </h3>
                        </div>
                        <Badge variant="outline" className={cn("flex items-center gap-1.5 px-2 py-1", getStatusConfig(comp.status).color)}>
                          <StatusIcon className="w-4 h-4" /> {getStatusConfig(comp.status).label}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground bg-white/[0.02] p-3 rounded-lg border border-border/30">
                        <div><span className="font-semibold">P/N:</span> <span className="font-mono text-foreground">{comp.part_number || 'N/A'}</span></div>
                        <div><span className="font-semibold">S/N:</span> <span className="font-mono text-foreground">{comp.serial_number || 'N/A'}</span></div>
                        <div><span className="font-semibold">Instalado em:</span> <span className="text-foreground">{comp.install_date ? new Date(comp.install_date).toLocaleDateString('pt-BR') : 'N/A'}</span></div>
                      </div>
                    </div>

                    {/* Hours Tracking */}
                    <div className="md:w-72 space-y-4 border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 pl-0 md:pl-6">
                      
                      {comp.tbo_hours ? (
                        <div>
                          <div className="flex justify-between items-end mb-1">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Consumo do TBO</span>
                            <span className="font-mono text-sm font-bold text-foreground">{comp.current_tso.toFixed(1)} <span className="text-muted-foreground font-normal">/ {comp.tbo_hours}h</span></span>
                          </div>
                          <Progress value={tboPercent} className={cn("h-2", tboPercent > 90 ? "bg-aero-rose/20" : tboPercent > 80 ? "bg-aero-amber/20" : "bg-aero-cyan/20")} 
                            indicatorClassName={tboPercent > 90 ? "bg-aero-rose" : tboPercent > 80 ? "bg-aero-amber" : "bg-aero-cyan"} />
                          <div className="text-right mt-1">
                            <span className="text-[10px] text-muted-foreground">Disponível: {(comp.tbo_hours - comp.current_tso).toFixed(1)}h</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center p-3 bg-white/[0.02] rounded-lg border border-border/50">
                          <span className="text-xs text-muted-foreground">Item On Condition (Sem TBO)</span>
                        </div>
                      )}

                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">TTSN (Total Time Since New)</span>
                        <span className="font-mono font-bold text-foreground">{comp.current_tsn.toFixed(1)}h</span>
                      </div>

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
