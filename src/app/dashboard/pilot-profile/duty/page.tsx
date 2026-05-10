'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { mockDutyPeriods } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle2, AlertTriangle, CalendarClock, Power, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function DutyPeriodPage() {
  const { user } = useAuth();
  
  // Mock State
  const [dutyPeriods, setDutyPeriods] = useState(mockDutyPeriods);
  const openDuty = dutyPeriods.find(d => d.status === 'open');
  const history = dutyPeriods.filter(d => d.status === 'closed');
  
  // Simulation Helpers
  const handleCheckIn = () => {
    const newDuty = {
      id: `duty_mock_${Date.now()}`,
      user_id: user?.id || 'usr_001',
      duty_start: new Date().toISOString(),
      presentation_time: new Date().toISOString(),
      duty_type: 'single_pilot_vfr' as const,
      flight_time_minutes: 0,
      standby_minutes: 0,
      ground_time_minutes: 0,
      positioning_minutes: 0,
      waiting_minutes: 0,
      max_duty_hours: 10,
      max_flight_hours: 8,
      rest_before_minutes: 720, // 12h
      rest_compliant: true,
      exceeded_limit: false,
      status: 'open' as const,
      created_at: new Date().toISOString(),
    };
    setDutyPeriods([newDuty, ...dutyPeriods]);
  };

  const handleEndDuty = () => {
    setDutyPeriods(dutyPeriods.map(d => 
      d.status === 'open' 
      ? { ...d, status: 'closed', duty_end: new Date().toISOString(), release_time: new Date().toISOString(), total_duty_minutes: 240 } 
      : d
    ));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/pilot-profile" className="p-2 bg-white/[0.02] border border-border/50 rounded-lg hover:bg-white/[0.05] transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <CalendarClock className="w-8 h-8 text-aero-cyan" />
            Jornada e Fadiga
          </h1>
          <p className="text-muted-foreground mt-1">Gestão de turnos e limites de descanso (RBAC 135/91).</p>
        </div>
      </div>

      {/* Current Duty Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Jornada Atual</h2>
        
        {openDuty ? (
          <Card className="glass border-aero-cyan/30 bg-aero-cyan/5">
            <CardHeader className="pb-3 border-b border-aero-cyan/10">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2 text-aero-cyan">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aero-cyan opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-aero-cyan"></span>
                  </span>
                  Em Serviço
                </CardTitle>
                <Badge className="bg-aero-cyan/20 text-aero-cyan hover:bg-aero-cyan/30">
                  Apresentação: {new Date(openDuty.presentation_time!).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Tempo de Jornada</span>
                  <div className="text-4xl font-mono text-foreground font-bold">
                    01:15 <span className="text-base text-muted-foreground font-sans font-normal">/ 10h</span>
                  </div>
                  <Progress value={12} className="h-2 mt-2 bg-black/40" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Tempo de Voo</span>
                  <div className="text-4xl font-mono text-foreground font-bold">
                    00:00 <span className="text-base text-muted-foreground font-sans font-normal">/ 8h</span>
                  </div>
                  <Progress value={0} className="h-2 mt-2 bg-black/40" />
                </div>
                <div className="flex items-center justify-end">
                  <Button onClick={handleEndDuty} variant="destructive" className="w-full md:w-auto flex items-center gap-2">
                    <Power className="w-4 h-4" />
                    Encerrar Jornada
                  </Button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-black/20 rounded-lg flex items-start gap-3 border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-emerald-500">Descanso Regulamentar Cumprido</p>
                  <p className="text-xs text-emerald-500/80 mt-1">
                    Você teve {Math.floor(openDuty.rest_before_minutes! / 60)}h de descanso ininterrupto antes desta jornada. O mínimo exigido é de 10h.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="glass border-border/50 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-white/[0.02] flex items-center justify-center mb-4 border border-border/50">
                <Power className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fora de Serviço</h3>
              <p className="text-sm text-muted-foreground max-w-md mb-6">
                Você está em período de descanso. Certifique-se de ter cumprido as horas mínimas antes de iniciar uma nova jornada.
              </p>
              <Button onClick={handleCheckIn} className="bg-aero-cyan hover:bg-aero-cyan/90 text-slate-900 font-bold px-8">
                Fazer Check-in (Apresentação)
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* History Section */}
      <div className="space-y-4 pt-6 border-t border-border/30">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5 text-muted-foreground" />
          Histórico de Jornadas
        </h2>
        
        <div className="space-y-3">
          {history.map((duty) => {
            const dateStr = new Date(duty.duty_start).toLocaleDateString('pt-BR');
            const startStr = new Date(duty.duty_start).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const endStr = new Date(duty.duty_end!).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            
            return (
              <div key={duty.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-border/30 gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/[0.05] rounded-lg border border-border/50 text-center min-w-[70px]">
                    <span className="block text-xs text-muted-foreground uppercase">{new Date(duty.duty_start).toLocaleDateString('pt-BR', { month: 'short' })}</span>
                    <span className="block text-xl font-bold text-foreground">{new Date(duty.duty_start).getDate()}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{dateStr}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {startStr} — {endStr}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="text-xs bg-black/20">Jornada: {Math.floor(duty.total_duty_minutes! / 60)}h {(duty.total_duty_minutes! % 60).toString().padStart(2, '0')}m</Badge>
                      <Badge variant="outline" className="text-xs bg-black/20">Voo: {Math.floor(duty.flight_time_minutes / 60)}h {(duty.flight_time_minutes % 60).toString().padStart(2, '0')}m</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                  {duty.exceeded_limit ? (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Limite Excedido
                    </Badge>
                  ) : (
                    <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">
                      Regular
                    </Badge>
                  )}
                  {duty.rest_after_minutes && (
                    <span className="text-xs text-muted-foreground">
                      Descanso pós-jornada: {Math.floor(duty.rest_after_minutes / 60)}h
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
