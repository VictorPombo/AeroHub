'use client';

import { mockFlightRosters } from '@/lib/mock-data';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, PlaneTakeoff, UserCheck, Plus, Clock, Users, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function RosterPage() {
  const rosters = mockFlightRosters;

  const handleNewRoster = () => {
    toast.success('Nova Escala', {
      description: 'Abertura do modal de atribuição de tripulantes.',
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/coordination" className="p-2 bg-white/[0.02] border border-border/50 rounded-lg hover:bg-white/[0.05] transition-colors group">
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-indigo-400">Escalação de Voo</h1>
            <p className="text-sm text-muted-foreground">Atribuição de tripulantes e jornada</p>
          </div>
        </div>

        <Button onClick={handleNewRoster} className="bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 gap-2">
          <Plus className="w-4 h-4" />
          Nova Escala
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass-card border-border/50 hover:bg-white/[0.02] transition-colors">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 shrink-0">
              <PlaneTakeoff className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Escalas Programadas</p>
              <p className="text-2xl font-bold font-mono">{rosters.filter(r => r.status === 'scheduled').length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border/50 hover:bg-white/[0.02] transition-colors">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tripulantes em Voo</p>
              <p className="text-2xl font-bold font-mono">2</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border/50 hover:bg-white/[0.02] transition-colors">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Alerta de Fadiga</p>
              <p className="text-2xl font-bold font-mono">0</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {rosters.map((roster) => (
          <Card key={roster.id} className="glass-card border-indigo-500/20 overflow-hidden relative group hover:border-indigo-500/40 transition-colors">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50" />
            
            <CardHeader className="border-b border-border/30 bg-white/[0.01] pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 flex items-center gap-1.5 px-3 py-1">
                    <Clock className="w-3.5 h-3.5" />
                    {roster.date}
                  </Badge>
                  <span className="font-bold text-lg">{roster.origin} ✈️ {roster.destination}</span>
                </div>
                <Badge className={roster.status === 'scheduled' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-emerald-500/10 text-emerald-500'}>
                  {roster.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <h4 className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5" />
                    Tripulação Escalada
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex justify-between items-center p-4 bg-white/[0.02] border border-border/40 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block mb-1">Piloto em Comando (PIC)</span>
                        <span className="font-medium text-foreground">{roster.pic_name}</span>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Apto</Badge>
                    </div>
                    {roster.sic_name ? (
                      <div className="flex justify-between items-center p-4 bg-white/[0.02] border border-border/40 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block mb-1">Copiloto (SIC)</span>
                          <span className="font-medium text-foreground">{roster.sic_name}</span>
                        </div>
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Apto</Badge>
                      </div>
                    ) : (
                      <div className="p-4 bg-white/[0.01] border border-border/20 rounded-xl text-center border-dashed flex items-center justify-center h-full min-h-[72px]">
                        <span className="text-xs text-muted-foreground">Sem SIC escalado (Single Pilot)</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">Aeronave Base</h4>
                  <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl flex flex-col justify-center items-center h-[72px]">
                    <span className="text-2xl font-bold tracking-widest text-indigo-400 font-mono">PT-RJB</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
