'use client';

// ═══════════════════════════════════════════════════════
// AeroGest — Dashboard Home Page
// ═══════════════════════════════════════════════════════

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  mockAircraft,
  mockAircraftHours,
  mockDashboardKPIs,
  mockMaintenanceAlerts,
  mockFlightLogs,
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Plane,
  Clock,
  AlertTriangle,
  Calendar,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowRight,
  Gauge,
  Wrench,
  MapPin,
} from 'lucide-react';
import { FlightDetailsSheet } from '@/components/flight-details-sheet';
import { MaintenanceDetailsSheet } from '@/components/maintenance-details-sheet';
import type { FlightLog, MaintenanceAlert } from '@/types/models';
import dynamic from 'next/dynamic';

const FleetMap = dynamic(() => import('@/components/fleet-map'), { ssr: false });

// Map icon strings to components
const iconMap: Record<string, React.ElementType> = {
  Plane,
  Clock,
  AlertTriangle,
  Calendar,
};

const statusConfig = {
  active: { label: 'Ativo', className: 'bg-aero-emerald/10 text-aero-emerald border-aero-emerald/20' },
  maintenance: { label: 'Em Manutenção', className: 'bg-aero-amber/10 text-aero-amber border-aero-amber/20' },
  grounded: { label: 'Inoperante', className: 'bg-aero-rose/10 text-aero-rose border-aero-rose/20' },
};

const maintenanceStatusConfig = {
  ok: { label: 'OK', className: 'text-aero-emerald' },
  approaching: { label: 'Próximo', className: 'text-aero-amber' },
  due: { label: 'Vencido', className: 'text-aero-rose' },
  overdue: { label: 'Atrasado', className: 'text-aero-rose' },
};

const colorMap = {
  cyan: 'text-aero-cyan bg-aero-cyan/10 border-aero-cyan/20',
  amber: 'text-aero-amber bg-aero-amber/10 border-aero-amber/20',
  emerald: 'text-aero-emerald bg-aero-emerald/10 border-aero-emerald/20',
  rose: 'text-aero-rose bg-aero-rose/10 border-aero-rose/20',
};

export default function DashboardPage() {
  const { user } = useAuth();
  const firstName = user?.full_name?.split(' ')[0] || 'Piloto';

  // State for Modals/Sheets
  const [selectedFlight, setSelectedFlight] = useState<FlightLog | null>(null);
  const [selectedMaintenance, setSelectedMaintenance] = useState<MaintenanceAlert | null>(null);

  const selectedFlightAircraft = selectedFlight ? mockAircraft.find(a => a.id === selectedFlight.aircraft_id) || null : null;
  const selectedMaintenanceAircraft = selectedMaintenance ? mockAircraft.find(a => a.id === selectedMaintenance.aircraft_id) || null : null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Bem-vindo, <span className="text-aero-cyan">{firstName}</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Aqui está o resumo da sua frota hoje.
          </p>
        </div>
        <Button className="bg-aero-cyan hover:bg-aero-cyan-light text-aero-navy font-semibold gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          Nova Aeronave
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        {mockDashboardKPIs.map((kpi, index) => {
          const IconComponent = iconMap[kpi.icon] || Plane;
          
          const cardContent = (
            <Card
              className={cn(
                "glass border-border/50 glass-hover h-full flex flex-col",
                kpi.href ? "cursor-pointer transition-transform hover:scale-[1.02]" : "cursor-default"
              )}
            >
              <CardContent className="p-5 flex-1 flex flex-col justify-center">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {kpi.label}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-foreground mono-data">
                        {kpi.value}
                      </span>
                      {kpi.unit && (
                        <span className="text-xs text-muted-foreground">{kpi.unit}</span>
                      )}
                    </div>
                    {kpi.change !== undefined && (
                      <div className="flex items-center gap-1">
                        {kpi.trend === 'up' ? (
                          <TrendingUp className="w-3 h-3 text-aero-emerald" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-aero-rose" />
                        )}
                        <span
                          className={cn(
                            'text-xs font-medium',
                            kpi.trend === 'up' ? 'text-aero-emerald' : 'text-aero-rose'
                          )}
                        >
                          {kpi.change > 0 ? '+' : ''}{kpi.change}%
                        </span>
                        <span className="text-xs text-muted-foreground">vs. mês anterior</span>
                      </div>
                    )}
                  </div>
                  <div
                    className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-xl border',
                      colorMap[kpi.color]
                    )}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );

          if (kpi.href) {
            return (
              <Link key={index} href={kpi.href} className="flex flex-col h-full">
                {cardContent}
              </Link>
            );
          }

          return <div key={index} className="flex flex-col h-full">{cardContent}</div>;
        })}
      </div>

      {/* Real-time Fleet Map */}
      <Card className="glass border-border/50 p-1 mb-6">
        <FleetMap />
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Aircraft Fleet — 2 columns */}
        <div className="lg:col-span-2 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Plane className="w-5 h-5 text-aero-cyan" />
              Sua Frota
            </h3>
            <Link href="/dashboard/aircraft">
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-aero-cyan gap-1">
                Ver todas <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-rows-2 gap-4 stagger-children flex-1">
            {mockAircraft.map((aircraft) => {
              const hours = mockAircraftHours[aircraft.id];
              const status = statusConfig[aircraft.status];
              const alerts = mockMaintenanceAlerts.filter(
                (a) => a.aircraft_id === aircraft.id && (a.status === 'approaching' || a.status === 'due')
              );

              return (
                <Link key={aircraft.id} href={`/dashboard/aircraft/${aircraft.id}`} className="flex flex-col h-full">
                  <Card
                    className="glass border-border/50 glass-hover cursor-pointer group flex flex-col flex-1"
                  >
                    <CardContent className="p-5 flex-1 flex flex-col">
                      {/* Header: Registration + Status */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="registration-plate text-xl text-foreground group-hover:text-aero-cyan transition-colors">
                            {aircraft.registration}
                          </p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {aircraft.model}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn('text-[10px] font-semibold', status.className)}
                        >
                          {status.label}
                        </Badge>
                      </div>

                      {/* Type + Year */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Plane className="w-3.5 h-3.5" />
                          <span className="capitalize">{aircraft.type === 'airplane' ? 'Avião' : 'Helicóptero'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{aircraft.year}</span>
                        </div>
                      </div>

                      {/* Hours Bar */}
                      {hours && (
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                              <Gauge className="w-3.5 h-3.5" />
                              Horas Célula
                            </span>
                            <span className="mono-data text-sm font-semibold text-foreground">
                              {hours.airframe_hours.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}h
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-aero-cyan to-aero-cyan-light rounded-full transition-all duration-1000"
                              style={{ width: `${Math.min((hours.airframe_hours / 3000) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Spacer to push alerts to bottom */}
                      <div className="flex-1" />

                      {/* Maintenance alerts */}
                      {alerts.length > 0 && (
                        <div className="mt-auto pt-3 border-t border-border/50">
                          {alerts.map((alert) => (
                            <div
                              key={alert.id}
                              className={cn(
                                'flex items-center gap-2 text-xs',
                                maintenanceStatusConfig[alert.status].className
                              )}
                            >
                              <Wrench className="w-3 h-3" />
                              <span className="truncate">{alert.component}</span>
                              <span className="ml-auto mono-data font-semibold shrink-0">
                                {(alert.next_due_hours - alert.current_hours).toFixed(1)}h
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right column: Recent flights + Maintenance */}
        <div className="flex flex-col h-full">
          {/* Invisible Spacer to match left header height */}
          <div className="flex items-center justify-between mb-4 shrink-0 opacity-0 pointer-events-none hidden lg:flex">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Plane className="w-5 h-5" /> Spacer
            </h3>
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              Spacer <ArrowRight className="w-3 h-3" />
            </Button>
          </div>

          <div className="flex flex-col gap-4 flex-1">
            {/* Recent Flights */}
            <Card className="glass border-border/50 flex flex-col flex-1 min-h-0">
              <CardHeader className="pb-3 shrink-0">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-aero-cyan" />
                  Voos Recentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 flex-1 flex flex-col justify-start">
                {mockFlightLogs.slice(0, 3).map((flight) => (
                  <div
                    key={flight.id}
                    onClick={() => setSelectedFlight(flight)}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-aero-cyan/10 shrink-0">
                      <Plane className="w-4 h-4 text-aero-cyan group-hover:rotate-12 transition-transform" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="mono-data text-sm font-bold text-foreground">
                          {flight.origin_icao}
                        </span>
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                        <span className="mono-data text-sm font-bold text-foreground">
                          {flight.destination_icao}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {flight.pilot_name} · {flight.date.split('-').reverse().join('/')}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="mono-data text-sm font-semibold text-foreground">
                        {flight.hours_flown}h
                      </p>
                    </div>
                  </div>
                ))}
                <div className="mt-auto pt-2">
                  <Link href="/dashboard/flights">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs text-muted-foreground hover:text-aero-cyan gap-1"
                    >
                      Ver todos os voos <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Maintenance Alerts */}
            <Card className="glass border-border/50 flex flex-col flex-1 min-h-0">
              <CardHeader className="pb-3 shrink-0">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-aero-amber" />
                  Alertas de Manutenção
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 flex-1 flex flex-col justify-start overflow-hidden">
                {mockMaintenanceAlerts
                  .filter((a) => a.status !== 'ok')
                  .map((alert) => {
                    const aircraft = mockAircraft.find((ac) => ac.id === alert.aircraft_id);
                    const statusCfg = maintenanceStatusConfig[alert.status];
                    const remaining = alert.next_due_hours - alert.current_hours;

                    return (
                      <div
                        key={alert.id}
                        onClick={() => setSelectedMaintenance(alert)}
                        className="p-3 rounded-lg bg-white/[0.02] border border-border/30 hover:bg-white/[0.04] transition-colors cursor-pointer group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate group-hover:text-aero-cyan transition-colors">
                              {alert.component}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {aircraft?.registration} · Revisão {alert.type}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={cn(
                              'text-[10px] font-bold shrink-0',
                              alert.status === 'due'
                                ? 'bg-aero-rose/10 text-aero-rose border-aero-rose/20'
                                : 'bg-aero-amber/10 text-aero-amber border-aero-amber/20'
                            )}
                          >
                            {remaining.toFixed(1)}h restantes
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                <div className="mt-auto pt-2">
                  <Link href="/dashboard/maintenance">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs text-muted-foreground hover:text-aero-cyan gap-1"
                    >
                      Ver painel técnico <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Sheets */}
      <FlightDetailsSheet 
        open={!!selectedFlight} 
        onOpenChange={(open) => !open && setSelectedFlight(null)} 
        flight={selectedFlight} 
        aircraft={selectedFlightAircraft} 
      />
      <MaintenanceDetailsSheet 
        open={!!selectedMaintenance} 
        onOpenChange={(open) => !open && setSelectedMaintenance(null)} 
        alert={selectedMaintenance} 
        aircraft={selectedMaintenanceAircraft} 
      />
    </div>
  );
}
