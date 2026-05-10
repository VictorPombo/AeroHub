'use client';

// ═══════════════════════════════════════════════════════
// AeroGest — Maintenance Page
// ═══════════════════════════════════════════════════════

import { useState } from 'react';
import { mockMaintenanceAlerts, mockAircraft } from '@/lib/mock-data';
import { MaintenanceAlert } from '@/types/models';
import { Wrench, ShieldAlert, Plus, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { MaintenanceDetailsSheet } from '@/components/maintenance-details-sheet';

const statusConfig = {
  ok: { label: 'Em Dia', color: 'text-aero-emerald', border: 'border-aero-emerald/20', bg: 'bg-aero-emerald/10' },
  approaching: { label: 'Próximo', color: 'text-aero-amber', border: 'border-aero-amber/20', bg: 'bg-aero-amber/10' },
  due: { label: 'Vencido', color: 'text-aero-rose', border: 'border-aero-rose/20', bg: 'bg-aero-rose/10' },
  overdue: { label: 'Atrasado', color: 'text-aero-rose', border: 'border-aero-rose/20', bg: 'bg-aero-rose/10' },
};

export default function MaintenancePage() {
  const [selectedAlert, setSelectedAlert] = useState<MaintenanceAlert | null>(null);

  const selectedAircraft = selectedAlert ? mockAircraft.find(a => a.id === selectedAlert.aircraft_id) || null : null;

  // Separate alerts by urgency
  const urgentAlerts = mockMaintenanceAlerts.filter(a => a.status === 'due' || a.status === 'overdue');
  const upcomingAlerts = mockMaintenanceAlerts.filter(a => a.status === 'approaching');
  const okAlerts = mockMaintenanceAlerts.filter(a => a.status === 'ok');

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Wrench className="w-6 h-6 text-aero-cyan" />
            Controle Técnico e Manutenção
          </h2>
          <p className="text-sm text-muted-foreground">
            Acompanhe vencimentos, revisões programadas e Diretrizes de Aeronavegabilidade (ADs).
          </p>
        </div>
        <Link href="/dashboard/maintenance/new">
          <Button className="bg-aero-cyan hover:bg-aero-cyan-light text-aero-navy font-semibold gap-2 shrink-0">
            <Plus className="w-4 h-4" /> Registrar Intervenção
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Urgent & Upcoming */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Urgent Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-aero-rose">
              <ShieldAlert className="w-5 h-5" /> Requer Atenção Imediata
            </h3>
            {urgentAlerts.length === 0 ? (
              <Card className="glass border-border/50 border-dashed">
                <CardContent className="p-8 text-center flex flex-col items-center justify-center text-muted-foreground">
                  <CheckCircle2 className="w-8 h-8 text-aero-emerald/50 mb-2" />
                  <p>Nenhum item vencido ou inoperante.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {urgentAlerts.map(alert => {
                  const aircraft = mockAircraft.find(a => a.id === alert.aircraft_id);
                  const cfg = statusConfig[alert.status];
                  return (
                    <Card key={alert.id} className="glass border-aero-rose/30 hover:border-aero-rose/60 transition-colors cursor-pointer group" onClick={() => setSelectedAlert(alert)}>
                      <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-0.5", cfg.bg, cfg.color)}>
                            <AlertTriangle className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="registration-plate text-lg text-foreground group-hover:text-aero-rose transition-colors">{aircraft?.registration}</p>
                            <p className="text-sm font-semibold text-foreground mt-0.5 truncate">{alert.component}</p>
                            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-1">{alert.notes}</p>
                          </div>
                        </div>
                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2 sm:gap-1 shrink-0 mt-2 sm:mt-0">
                          <Badge variant="outline" className={cn("text-[10px] font-bold shadow-sm", cfg.color, cfg.border)}>{cfg.label}</Badge>
                          <span className={cn("mono-data font-bold", cfg.color)}>
                            {alert.type === 'document' ? 'Vencido' : `${(alert.next_due_hours - alert.current_hours).toFixed(1)}h passadas`}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Upcoming Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-aero-amber">
              <AlertTriangle className="w-5 h-5" /> Próximos Vencimentos
            </h3>
            {upcomingAlerts.length === 0 ? (
              <Card className="glass border-border/50 border-dashed">
                <CardContent className="p-8 text-center text-muted-foreground">
                  Nenhum vencimento próximo.
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {upcomingAlerts.map(alert => {
                  const aircraft = mockAircraft.find(a => a.id === alert.aircraft_id);
                  const cfg = statusConfig[alert.status];
                  const progress = Math.min(100, Math.max(0, (alert.current_hours / alert.next_due_hours) * 100)) || 0;
                  
                  return (
                    <Card key={alert.id} className="glass border-border/50 hover:border-border transition-colors cursor-pointer group" onClick={() => setSelectedAlert(alert)}>
                      <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-0.5", cfg.bg, cfg.color)}>
                            <AlertTriangle className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="registration-plate text-lg text-foreground group-hover:text-aero-amber transition-colors">{aircraft?.registration}</p>
                            <p className="text-sm font-semibold text-foreground mt-0.5 truncate">{alert.component}</p>
                            <div className="mt-2 w-full sm:w-5/6">
                              <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden mb-1">
                                <div className="h-full bg-aero-amber transition-all duration-1000 rounded-full" style={{ width: `${progress}%` }} />
                              </div>
                              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                                {progress.toFixed(1)}% consumido
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2 sm:gap-1 shrink-0 mt-2 sm:mt-0">
                          <Badge variant="outline" className={cn("text-[10px] font-bold shadow-sm", cfg.color, cfg.border)}>{cfg.label}</Badge>
                          <p className={cn("mono-data font-bold text-sm", cfg.color)}>
                            Faltam {(alert.next_due_hours - alert.current_hours).toFixed(1)}h
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Status Summary */}
        <div className="space-y-6">
          <Card className="glass border-border/50 sticky top-24">
            <CardContent className="p-0">
              <div className="p-5 border-b border-border/50">
                <h3 className="text-base font-semibold">Resumo da Frota</h3>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-aero-rose glow-rose" />
                    <span className="text-sm text-foreground">Vencidos / Atrasados</span>
                  </div>
                  <span className="mono-data font-bold">{urgentAlerts.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-aero-amber" />
                    <span className="text-sm text-foreground">Próximos (Alerta)</span>
                  </div>
                  <span className="mono-data font-bold">{upcomingAlerts.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-aero-emerald" />
                    <span className="text-sm text-foreground">Operacionais (Em Dia)</span>
                  </div>
                  <span className="mono-data font-bold">{okAlerts.length}</span>
                </div>
              </div>
              
              <div className="p-3 bg-white/[0.02] border-t border-border/50">
                <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-aero-cyan justify-between">
                  Ver histórico completo <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <MaintenanceDetailsSheet 
        open={!!selectedAlert} 
        onOpenChange={(open) => !open && setSelectedAlert(null)} 
        alert={selectedAlert} 
        aircraft={selectedAircraft} 
      />
    </div>
  );
}
