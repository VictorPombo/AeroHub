'use client';

// ═══════════════════════════════════════════════════════
// AeroGest — M5: CTM Dashboard
// ═══════════════════════════════════════════════════════

import { useParams } from 'next/navigation';
import {
  mockAircraft,
  mockAircraftHours,
  mockCTMItems,
  mockCTMMaintenanceLogs,
  mockCTMDiscrepancies,
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Clock,
  CalendarDays,
  Wrench,
  AlertTriangle,
  CircleDot,
  CheckCircle2,
  XCircle,
  Timer,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CTMItemStatus } from '@/types/models';

// ─── Status Configs ──────────────────────────────────

const operationalStatus = {
  available: {
    label: 'DISPONÍVEL',
    description: 'Todos os itens técnicos dentro do prazo.',
    icon: ShieldCheck,
    className: 'text-aero-emerald',
    bgClass: 'bg-aero-emerald/10 border-aero-emerald/20',
    dotClass: 'bg-aero-emerald shadow-[0_0_12px_rgba(16,185,129,0.6)]',
  },
  alert: {
    label: 'ALERTA',
    description: 'Itens próximos do vencimento.',
    icon: ShieldAlert,
    className: 'text-aero-amber',
    bgClass: 'bg-aero-amber/10 border-aero-amber/20',
    dotClass: 'bg-aero-amber shadow-[0_0_12px_rgba(245,158,11,0.6)]',
  },
  grounding: {
    label: 'GROUNDING',
    description: 'Aeronave impedida de voar — item crítico vencido.',
    icon: ShieldX,
    className: 'text-aero-rose',
    bgClass: 'bg-aero-rose/10 border-aero-rose/20',
    dotClass: 'bg-aero-rose shadow-[0_0_12px_rgba(244,63,94,0.6)] animate-pulse',
  },
};

const itemStatusConfig: Record<CTMItemStatus, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  ok: { label: 'OK', className: 'text-aero-emerald', icon: CheckCircle2 },
  alert: { label: 'Alerta', className: 'text-aero-amber', icon: AlertTriangle },
  overdue: { label: 'Vencido', className: 'text-aero-rose', icon: XCircle },
  grounding: { label: 'Grounding', className: 'text-aero-rose', icon: ShieldX },
};

const categoryLabels: Record<string, string> = {
  inspecao_periodica: 'Inspeção Periódica',
  componente: 'Componente',
  ad: 'AD (Diretiva)',
  documento: 'Documento',
  certificado: 'Certificado',
  seguro: 'Seguro',
  equipamento: 'Equipamento',
};

const severityConfig = {
  grounding: { label: 'Grounding', className: 'bg-aero-rose/10 text-aero-rose border-aero-rose/20' },
  defer: { label: 'Adiado', className: 'bg-aero-amber/10 text-aero-amber border-aero-amber/20' },
  mel: { label: 'MEL', className: 'bg-aero-amber/10 text-aero-amber border-aero-amber/20' },
  info: { label: 'Info', className: 'bg-aero-cyan/10 text-aero-cyan border-aero-cyan/20' },
};

export default function CTMDashboardPage() {
  const { id } = useParams();
  const aircraftId = id as string;

  const aircraft = mockAircraft.find(a => a.id === aircraftId);
  const hours = mockAircraftHours[aircraftId];
  const items = mockCTMItems.filter(i => i.aircraft_id === aircraftId);
  const logs = mockCTMMaintenanceLogs.filter(l => l.aircraft_id === aircraftId);
  const discrepancies = mockCTMDiscrepancies.filter(d => d.aircraft_id === aircraftId);

  if (!aircraft) return null;

  // ─── Compute overall status ────────────────────────
  const hasGrounding = items.some(i => i.is_grounding_item && (i.status === 'grounding' || i.status === 'overdue'));
  const hasAlert = items.some(i => i.status === 'alert');
  const overallKey = hasGrounding ? 'grounding' : hasAlert ? 'alert' : 'available';
  const overall = operationalStatus[overallKey];
  const OverallIcon = overall.icon;

  // Find next restriction (closest due item)
  const itemsWithHoursDue = items
    .filter(i => i.next_due_hours && hours)
    .map(i => ({ ...i, remaining: (i.next_due_hours ?? 0) - (hours?.airframe_hours ?? 0) }))
    .filter(i => i.remaining > 0)
    .sort((a, b) => a.remaining - b.remaining);

  const nextRestriction = itemsWithHoursDue[0];

  const openDiscrepancies = discrepancies.filter(d => d.status === 'open' || d.status === 'deferred');
  const lastLog = logs.length > 0 ? logs.sort((a, b) => b.performed_date.localeCompare(a.performed_date))[0] : null;

  return (
    <div className="space-y-6">
      {/* ─── Status Operacional Hero ─── */}
      <div className={cn('rounded-2xl border p-6 relative overflow-hidden', overall.bgClass)}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className={cn('w-4 h-4 rounded-full absolute -top-0.5 -right-0.5', overall.dotClass)} />
              <OverallIcon className={cn('w-10 h-10', overall.className)} />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Status Operacional</p>
              <h2 className={cn('text-2xl font-bold', overall.className)}>{overall.label}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{overall.description}</p>
            </div>
          </div>
          {nextRestriction && (
            <div className="bg-white/[0.04] border border-border/30 rounded-xl px-4 py-3">
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Próxima Restrição</p>
              <p className="text-sm font-semibold text-foreground mt-0.5">
                {nextRestriction.name}
                <span className="text-aero-amber ml-2 mono-data">em {nextRestriction.remaining.toFixed(0)}h</span>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ─── Horas Atuais ─── */}
        <Card className="glass border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Timer className="w-4 h-4 text-aero-cyan" /> Horas Atuais
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hours ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Célula</span>
                  <span className="mono-data text-lg font-bold text-foreground">{hours.airframe_hours.toFixed(1)}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Motor</span>
                  <span className="mono-data text-lg font-bold text-foreground">{hours.engine_hours.toFixed(1)}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{aircraft.type === 'helicopter' ? 'Rotor' : 'Hélice'}</span>
                  <span className="mono-data text-lg font-bold text-foreground">{hours.prop_hours.toFixed(1)}h</span>
                </div>
                {hours.main_rotor_hours != null && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Rotor Principal</span>
                    <span className="mono-data text-lg font-bold text-foreground">{hours.main_rotor_hours.toFixed(1)}h</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Sem dados de horímetro.</p>
            )}
          </CardContent>
        </Card>

        {/* ─── Próximos Vencimentos ─── */}
        <Card className="glass border-border/50 lg:col-span-2">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-aero-amber" /> Próximos Vencimentos
            </CardTitle>
            <Badge variant="outline" className="bg-white/[0.03] text-muted-foreground border-border/30">
              {items.length} itens rastreados
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {items.map(item => {
                const cfg = itemStatusConfig[item.status];
                const StatusIcon = cfg.icon;

                // Compute remaining info
                let remainingLabel = '';
                if (item.next_due_hours && hours) {
                  const rem = item.next_due_hours - hours.airframe_hours;
                  remainingLabel = rem > 0 ? `faltam ${rem.toFixed(0)}h` : `vencido há ${Math.abs(rem).toFixed(0)}h`;
                } else if (item.next_due_date) {
                  const diff = Math.ceil((new Date(item.next_due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                  remainingLabel = diff > 0 ? `${diff} dias` : `vencido há ${Math.abs(diff)} dias`;
                }

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-border/30 hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <StatusIcon className={cn('w-4 h-4 shrink-0', cfg.className)} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">{categoryLabels[item.category] ?? item.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={cn('mono-data text-xs font-semibold', cfg.className)}>
                        {remainingLabel}
                      </span>
                      <Badge variant="outline" className={cn('text-[10px] font-bold', cfg.className)}>
                        {cfg.label}
                      </Badge>
                    </div>
                  </div>
                );
              })}
              {items.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-6">Nenhum item CTM cadastrado.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ─── Discrepâncias Abertas ─── */}
        <Card className="glass border-border/50">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-aero-rose" /> Discrepâncias Abertas
            </CardTitle>
            {openDiscrepancies.length > 0 && (
              <Badge variant="outline" className="bg-aero-rose/10 text-aero-rose border-aero-rose/20">
                {openDiscrepancies.length}
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            {openDiscrepancies.length === 0 ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-8 h-8 text-aero-emerald/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Nenhuma discrepância aberta.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {openDiscrepancies.map(disc => {
                  const sev = severityConfig[disc.severity];
                  return (
                    <div key={disc.id} className="p-3 rounded-xl bg-white/[0.02] border border-border/30">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <p className="text-sm text-foreground">{disc.description}</p>
                        <Badge variant="outline" className={cn('text-[10px] font-bold shrink-0', sev.className)}>
                          {sev.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground uppercase mt-2">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          {new Date(disc.created_at).toLocaleDateString('pt-BR')}
                        </span>
                        {disc.deferred_until && (
                          <span className="text-aero-amber">
                            Adiado até {new Date(disc.deferred_until).toLocaleDateString('pt-BR')}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ─── Última Manutenção ─── */}
        <Card className="glass border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Wrench className="w-4 h-4 text-aero-cyan" /> Histórico de Manutenção
            </CardTitle>
          </CardHeader>
          <CardContent>
            {logs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">Nenhuma manutenção registrada.</p>
            ) : (
              <div className="space-y-3">
                {logs.map(log => (
                  <div key={log.id} className="p-3 rounded-xl bg-white/[0.02] border border-border/30">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-medium text-foreground">{log.description}</p>
                        <p className="text-[10px] text-muted-foreground uppercase mt-0.5">
                          {log.type} {log.performed_at_hours ? `• ${log.performed_at_hours}h` : ''}
                        </p>
                      </div>
                      {log.cost && (
                        <span className="mono-data text-sm font-bold text-aero-emerald shrink-0">
                          R$ {log.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground uppercase">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        {new Date(log.performed_date).toLocaleDateString('pt-BR')}
                      </span>
                      {log.shop_name && (
                        <span className="flex items-center gap-1">
                          <CircleDot className="w-3 h-3" />
                          {log.shop_name}
                        </span>
                      )}
                      {log.mechanic_name && <span>{log.mechanic_name}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
