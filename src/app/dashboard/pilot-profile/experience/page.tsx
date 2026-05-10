'use client';

import { useAuth } from '@/contexts/AuthContext';
import { mockPilotFlightHours, mockExperienceEvents } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, ChevronLeft, Sun, Moon, Navigation, Info } from 'lucide-react';
import Link from 'next/link';

export default function ExperiencePage() {
  const { user } = useAuth();
  const hours = mockPilotFlightHours;
  const events = mockExperienceEvents;

  // RBAC Limits
  const reqLandingsDay = 3;
  const reqLandingsNight = 3;
  const reqIfrApproaches = 6;

  // Calculate percentages
  const pctDay = Math.min((hours.landings_day_90d! / reqLandingsDay) * 100, 100);
  const pctNight = Math.min((hours.landings_night_90d! / reqLandingsNight) * 100, 100);
  const pctIfr = Math.min((hours.ifr_approaches_6m! / reqIfrApproaches) * 100, 100);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/pilot-profile" className="p-2 bg-white/[0.02] border border-border/50 rounded-lg hover:bg-white/[0.05] transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Target className="w-8 h-8 text-emerald-500" />
            Experiência Recente
          </h1>
          <p className="text-muted-foreground mt-1">Indicadores de proficiência (90 dias / 6 meses) conf. RBAC 61.</p>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pousos Diurnos */}
        <Card className="glass border-emerald-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span className="flex items-center gap-2"><Sun className="w-4 h-4 text-emerald-500" /> VFR Diurno</span>
              <span className="font-mono text-xl">{hours.landings_day_90d} <span className="text-sm text-muted-foreground font-sans">/ {reqLandingsDay}</span></span>
            </CardTitle>
            <CardDescription className="text-[10px] uppercase font-bold tracking-wider">Últimos 90 Dias</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={pctDay} className="h-2 bg-emerald-500/20" indicatorClassName="bg-emerald-500" />
            <div className="mt-3 text-xs text-muted-foreground flex gap-2">
              <Info className="w-4 h-4 shrink-0" />
              Mínimo de 3 pousos/decolagens para carregar passageiros de dia.
            </div>
          </CardContent>
        </Card>

        {/* Pousos Noturnos */}
        <Card className="glass border-indigo-400/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span className="flex items-center gap-2"><Moon className="w-4 h-4 text-indigo-400" /> VFR Noturno</span>
              <span className="font-mono text-xl">{hours.landings_night_90d} <span className="text-sm text-muted-foreground font-sans">/ {reqLandingsNight}</span></span>
            </CardTitle>
            <CardDescription className="text-[10px] uppercase font-bold tracking-wider">Últimos 90 Dias</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={pctNight} className="h-2 bg-indigo-400/20" indicatorClassName="bg-indigo-400" />
            <div className="mt-3 text-xs text-muted-foreground flex gap-2">
              <Info className="w-4 h-4 shrink-0" />
              Mínimo de 3 pousos noturnos completos para voar IFR/Noite com pax.
            </div>
          </CardContent>
        </Card>

        {/* IFR */}
        <Card className="glass border-aero-cyan/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span className="flex items-center gap-2"><Navigation className="w-4 h-4 text-aero-cyan" /> IFR (Aproximações)</span>
              <span className="font-mono text-xl">{hours.ifr_approaches_6m} <span className="text-sm text-muted-foreground font-sans">/ {reqIfrApproaches}</span></span>
            </CardTitle>
            <CardDescription className="text-[10px] uppercase font-bold tracking-wider">Últimos 6 Meses</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={pctIfr} className="h-2 bg-aero-cyan/20" indicatorClassName="bg-aero-cyan" />
            <div className="mt-3 text-xs text-muted-foreground flex gap-2">
              <Info className="w-4 h-4 shrink-0" />
              6 aproximações e 1 procedimento de espera (holding) exigidos.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events List */}
      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          Eventos Registrados
        </h3>
        <Card className="glass">
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {events.map((ev) => {
                const isNight = ev.event_type.includes('night');
                const isIFR = ev.event_type.includes('ifr');
                let Icon = Sun;
                let colorClass = "text-emerald-500 bg-emerald-500/10";
                
                if (isNight) {
                  Icon = Moon;
                  colorClass = "text-indigo-400 bg-indigo-400/10";
                } else if (isIFR) {
                  Icon = Navigation;
                  colorClass = "text-aero-cyan bg-aero-cyan/10";
                }

                return (
                  <div key={ev.id} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${colorClass}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground capitalize">
                          {ev.event_type.replace(/_/g, ' ')}
                        </h4>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span>{new Date(ev.event_date).toLocaleDateString('pt-BR')}</span>
                          {ev.airport_icao && <span>• {ev.airport_icao}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-mono font-bold">+{ev.quantity}</span>
                      <span className="text-xs text-muted-foreground block uppercase">Registros</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
