'use client';

// ═══════════════════════════════════════════════════════
// AeroGest — Aircraft Fleet Page
// ═══════════════════════════════════════════════════════

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { mockAircraft, mockAircraftHours, mockMaintenanceAlerts } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plane, Plus, Search, Filter, Calendar, Gauge, Wrench, MoreVertical, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const FleetMap = dynamic(() => import('@/components/fleet-map'), { ssr: false });

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

export default function AircraftPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAircraft = mockAircraft.filter(
    (a) =>
      a.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Plane className="w-6 h-6 text-aero-cyan" />
            Aeronaves
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie suas aeronaves, horas de voo e manutenções.
          </p>
        </div>
        <Button className="bg-aero-cyan hover:bg-aero-cyan-light text-aero-navy font-semibold gap-2">
          <Plus className="w-4 h-4" />
          Nova Aeronave
        </Button>
      </div>

      {/* Real-time Fleet Map */}
      <Card className="glass border-border/50 p-1">
        <FleetMap />
      </Card>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por matrícula ou modelo..."
            className="pl-9 bg-white/[0.02] border-border/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2 border-border/50 bg-white/[0.02]">
          <Filter className="w-4 h-4" />
          Filtros
        </Button>
      </div>

      {/* Aircraft Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
        {filteredAircraft.map((aircraft) => {
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

                  {/* Spacer to push alerts/button to bottom */}
                  <div className="flex-1" />

                  {/* Maintenance alerts */}
                  {alerts.length > 0 && (
                    <div className="mt-auto pt-3 border-t border-border/50 mb-4">
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

                  <div className={cn("mt-auto", alerts.length === 0 && "pt-3 border-t border-border/50")}>
                    <Button className="w-full bg-white/[0.02] hover:bg-white/[0.05] border border-border/50 text-foreground transition-colors group-hover:border-aero-cyan/30 group-hover:text-aero-cyan pointer-events-none">
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
        {filteredAircraft.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <p className="text-muted-foreground">Nenhuma aeronave encontrada com esses termos.</p>
          </div>
        )}
      </div>
    </div>
  );
}
