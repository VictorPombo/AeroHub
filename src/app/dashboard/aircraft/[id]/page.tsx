'use client';

// ═══════════════════════════════════════════════════════
// AeroGest — Aircraft Overview (Visão Geral)
// ═══════════════════════════════════════════════════════

import { useParams } from 'next/navigation';
import { mockAircraftHours, mockMaintenanceAlerts } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Plane, Calendar, Gauge, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockAircraft } from '@/lib/mock-data';

const maintenanceStatusConfig = {
  ok: { label: 'OK', className: 'text-aero-emerald' },
  approaching: { label: 'Próximo', className: 'text-aero-amber' },
  due: { label: 'Vencido', className: 'text-aero-rose' },
  overdue: { label: 'Atrasado', className: 'text-aero-rose' },
};

export default function AircraftOverviewPage() {
  const { id } = useParams();

  const aircraft = mockAircraft.find(a => a.id === id);
  const hours = mockAircraftHours[id as string];
  const alerts = mockMaintenanceAlerts.filter(a => a.aircraft_id === id);

  if (!aircraft) return null; // layout handles the 404

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Info Column */}
      <div className="space-y-6">
        <Card className="glass border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-bold">Tipo</span>
              <p className="text-sm text-foreground capitalize flex items-center gap-2 mt-0.5">
                <Plane className="w-3.5 h-3.5 text-aero-cyan" /> {aircraft.type === 'airplane' ? 'Avião' : 'Helicóptero'}
              </p>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-bold">Ano de Fabricação</span>
              <p className="text-sm text-foreground flex items-center gap-2 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-aero-cyan" /> {aircraft.year}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hours & Alerts Column */}
      <div className="md:col-span-2 space-y-6">
        <Card className="glass border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Gauge className="w-4 h-4 text-aero-cyan" /> Totalização de Horas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hours ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div className="bg-white/[0.02] border border-border/30 rounded-xl p-4">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Horas de Célula</span>
                  <p className="mono-data text-2xl font-bold text-foreground mt-1">{hours.airframe_hours.toFixed(1)}h</p>
                </div>
                <div className="bg-white/[0.02] border border-border/30 rounded-xl p-4">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Horas de Motor</span>
                  <p className="mono-data text-2xl font-bold text-foreground mt-1">{hours.engine_hours.toFixed(1)}h</p>
                </div>
                <div className="bg-white/[0.02] border border-border/30 rounded-xl p-4">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Horas de Hélice/Rotor</span>
                  <p className="mono-data text-2xl font-bold text-foreground mt-1">{hours.prop_hours.toFixed(1)}h</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Dados de horímetro não encontrados.</p>
            )}
          </CardContent>
        </Card>

        <Card className="glass border-border/50">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Wrench className="w-4 h-4 text-aero-amber" /> Resumo de Alertas
            </CardTitle>
            <Badge variant="outline" className="bg-aero-amber/10 text-aero-amber border-aero-amber/20">
              {alerts.filter(a => a.status !== 'ok').length} Pendentes
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.slice(0, 3).map(alert => {
              const cfg = maintenanceStatusConfig[alert.status];
              return (
                <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-border/30">
                  <div className="flex items-center gap-3">
                    <Wrench className={cn("w-4 h-4", cfg.className)} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{alert.component}</p>
                      <p className="text-xs text-muted-foreground">Revisão {alert.type}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={cn("text-[10px] font-bold", cfg.className)}>{cfg.label}</Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
