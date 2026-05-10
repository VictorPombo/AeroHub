'use client';

// ═══════════════════════════════════════════════════════
// AeroGest — M6: Financial Dashboard
// ═══════════════════════════════════════════════════════

import { useParams } from 'next/navigation';
import {
  mockAircraft,
  mockFlightLogs,
  mockFixedCosts,
  mockVariableCosts,
  mockHourConfigs,
  mockAircraftMembers,
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import {
  DollarSign,
  TrendingUp,
  Clock,
  Fuel,
  Wrench,
  Shield,
  Users,
  BarChart3,
  Cog,
  PlaneTakeoff,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const fixedCategoryLabels: Record<string, { label: string; icon: typeof DollarSign }> = {
  hangar: { label: 'Hangar', icon: Shield },
  tripulacao: { label: 'Tripulação', icon: Users },
  seguro: { label: 'Seguro', icon: Shield },
  administracao: { label: 'Administração', icon: Cog },
  atualizacao_software_painel: { label: 'Software / Painel', icon: Cog },
  outros: { label: 'Outros', icon: DollarSign },
};

const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function FinancialDashboardPage() {
  const { id } = useParams();
  const aircraftId = id as string;

  const aircraft = mockAircraft.find(a => a.id === aircraftId);
  const fixedCosts = mockFixedCosts.filter(c => c.aircraft_id === aircraftId && c.active);
  const variableCosts = mockVariableCosts.filter(c => c.aircraft_id === aircraftId);
  const hourConfig = mockHourConfigs[aircraftId];
  const members = mockAircraftMembers.filter(m => m.aircraft_id === aircraftId && m.active);
  const flights = mockFlightLogs.filter(f => f.aircraft_id === aircraftId);

  if (!aircraft) return null;

  // ─── Calculations ─────────────────────────────────

  const totalFixed = fixedCosts.reduce((sum, c) => sum + c.monthly_amount, 0);
  const totalVariable = variableCosts.reduce((sum, c) => sum + c.amount, 0);
  const totalMonth = totalFixed + totalVariable;
  const hoursFlownMonth = flights.reduce((sum, f) => sum + f.hours_flown, 0);
  const costPerHourReal = hoursFlownMonth > 0 ? totalMonth / hoursFlownMonth : 0;

  // Estimated cost per hour (from config)
  const estimatedHourly = hourConfig
    ? hourConfig.avg_fuel_cost_per_hour +
      hourConfig.avg_maintenance_cost_per_hour +
      hourConfig.overhaul_reserve_per_hour +
      hourConfig.avg_fees_per_hour
    : 0;

  // Fixed cost share per hour (assuming ~30h/month avg)
  const estimatedMonthlyHours = 30;
  const fixedPerHour = totalFixed / estimatedMonthlyHours;
  const totalEstimatedPerHour = estimatedHourly + fixedPerHour;

  // Owner split — proportional to quota
  const totalQuota = members.reduce((sum, m) => sum + m.monthly_quota_hours, 0);

  return (
    <div className="space-y-6">
      {/* ─── Summary Hero ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass border border-border/50 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-aero-rose/10 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-aero-rose" />
            </div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold">Custo Fixo Mensal</span>
          </div>
          <p className="mono-data text-2xl font-bold text-foreground">R$ {fmt(totalFixed)}</p>
        </div>

        <div className="glass border border-border/50 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-aero-amber/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-aero-amber" />
            </div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold">Variável no Mês</span>
          </div>
          <p className="mono-data text-2xl font-bold text-foreground">R$ {fmt(totalVariable)}</p>
        </div>

        <div className="glass border border-border/50 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-aero-cyan/10 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-aero-cyan" />
            </div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold">Total do Mês</span>
          </div>
          <p className="mono-data text-2xl font-bold text-aero-cyan">{fmt(totalMonth)}</p>
        </div>

        <div className="glass border border-border/50 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-aero-emerald/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-aero-emerald" />
            </div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold">Custo Real/Hora</span>
          </div>
          <p className="mono-data text-2xl font-bold text-foreground">
            {hoursFlownMonth > 0 ? `R$ ${fmt(costPerHourReal)}` : '—'}
          </p>
          <p className="text-[10px] text-muted-foreground mt-1 mono-data">{hoursFlownMonth.toFixed(1)}h voadas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ─── Custo Estimado por Hora ─── */}
        {hourConfig && (
          <Card className="glass border-border/50">
            <CardHeader className="pb-3 border-b border-border/30">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <PlaneTakeoff className="w-4 h-4 text-aero-cyan" /> Custo Estimado por Hora
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border/20">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Fuel className="w-3.5 h-3.5" /> Combustível
                  </span>
                  <span className="mono-data text-sm font-bold text-foreground">R$ {fmt(hourConfig.avg_fuel_cost_per_hour)}/h</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/20">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Wrench className="w-3.5 h-3.5" /> Manutenção
                  </span>
                  <span className="mono-data text-sm font-bold text-foreground">R$ {fmt(hourConfig.avg_maintenance_cost_per_hour)}/h</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/20">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5" /> Reserva Overhaul
                  </span>
                  <span className="mono-data text-sm font-bold text-foreground">R$ {fmt(hourConfig.overhaul_reserve_per_hour)}/h</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/20">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5" /> Taxas médias
                  </span>
                  <span className="mono-data text-sm font-bold text-foreground">R$ {fmt(hourConfig.avg_fees_per_hour)}/h</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/20">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <BarChart3 className="w-3.5 h-3.5" /> Rateio fixos (÷ {estimatedMonthlyHours}h)
                  </span>
                  <span className="mono-data text-sm font-bold text-muted-foreground">R$ {fmt(fixedPerHour)}/h</span>
                </div>

                <div className="flex justify-between items-center pt-3 mt-1">
                  <span className="text-base font-bold text-foreground">Total Estimado</span>
                  <span className="mono-data text-xl font-bold text-aero-emerald">
                    R$ {fmt(totalEstimatedPerHour)}/h
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ─── Custos Fixos Detalhados ─── */}
        <Card className="glass border-border/50">
          <CardHeader className="pb-3 border-b border-border/30">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-aero-rose" /> Custos Fixos
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {fixedCosts.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">Nenhum custo fixo cadastrado.</p>
            ) : (
              <div className="space-y-3">
                {fixedCosts.map(cost => {
                  const cat = fixedCategoryLabels[cost.category] ?? { label: cost.category, icon: DollarSign };
                  const CatIcon = cat.icon;
                  return (
                    <div key={cost.id} className="flex justify-between items-center py-2 border-b border-border/20">
                      <div className="flex items-center gap-2 min-w-0">
                        <CatIcon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{cat.label}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{cost.description}</p>
                        </div>
                      </div>
                      <span className="mono-data text-sm font-bold text-foreground shrink-0 ml-4">
                        R$ {fmt(cost.monthly_amount)}
                      </span>
                    </div>
                  );
                })}
                <div className="flex justify-between items-center pt-3">
                  <span className="text-base font-bold text-foreground">Total Mensal</span>
                  <span className="mono-data text-lg font-bold text-aero-rose">R$ {fmt(totalFixed)}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ─── Rateio por Proprietário ─── */}
      {members.length > 1 && (
        <Card className="glass border-border/50">
          <CardHeader className="pb-3 border-b border-border/30">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Users className="w-4 h-4 text-aero-cyan" /> Rateio por Proprietário — Maio 2026
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {members.map(member => {
                const quotaPct = totalQuota > 0 ? member.monthly_quota_hours / totalQuota : 0;
                const fixedShare = totalFixed * quotaPct;
                // Variable costs for flights by this member
                const memberFlights = flights.filter(f => f.pilot_id === member.user_id);
                const memberFlightIds = new Set(memberFlights.map(f => f.id));
                const memberVariableCosts = variableCosts
                  .filter(v => v.flight_log_id && memberFlightIds.has(v.flight_log_id))
                  .reduce((sum, v) => sum + v.amount, 0);
                const memberTotal = fixedShare + memberVariableCosts;

                return (
                  <div key={member.user_id} className="bg-white/[0.02] border border-border/30 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{member.user_name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">
                          {member.role === 'owner_active' ? 'Proprietário Ativo' : 'Piloto'}
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-aero-cyan/10 text-aero-cyan border-aero-cyan/20 mono-data">
                        {member.monthly_quota_hours}h
                      </Badge>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fixos ({(quotaPct * 100).toFixed(0)}%)</span>
                        <span className="mono-data font-semibold text-foreground">R$ {fmt(fixedShare)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Variáveis (voos)</span>
                        <span className="mono-data font-semibold text-foreground">R$ {fmt(memberVariableCosts)}</span>
                      </div>
                      <div className="border-t border-border/30 pt-2 mt-2 flex justify-between">
                        <span className="font-bold text-foreground">Total</span>
                        <span className="mono-data font-bold text-aero-emerald">R$ {fmt(memberTotal)}</span>
                      </div>
                    </div>

                    {/* Progress bar — hours used */}
                    <div className="mt-4">
                      <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                        <span>Horas usadas</span>
                        <span className="mono-data">{member.hours_used}h / {member.monthly_quota_hours}h</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-aero-cyan transition-all duration-700"
                          style={{ width: `${Math.min(100, (member.hours_used / member.monthly_quota_hours) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ─── Custos Variáveis Recentes ─── */}
      <Card className="glass border-border/50">
        <CardHeader className="pb-3 border-b border-border/30">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-aero-amber" /> Custos Variáveis Recentes
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {variableCosts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">Nenhum custo variável registrado.</p>
          ) : (
            <div className="space-y-2">
              {variableCosts.map(cost => (
                <div key={cost.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-border/30">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{cost.description || cost.category}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">
                      {new Date(cost.date).toLocaleDateString('pt-BR')}
                      {cost.hours_reference ? ` • ${cost.hours_reference}h` : ''}
                    </p>
                  </div>
                  <span className="mono-data text-sm font-bold text-foreground shrink-0 ml-4">
                    R$ {fmt(cost.amount)}
                  </span>
                </div>
              ))}

              <div className="flex justify-between items-center pt-3 px-3">
                <span className="text-base font-bold text-foreground">Total Variável</span>
                <span className="mono-data text-lg font-bold text-aero-amber">R$ {fmt(totalVariable)}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
