'use client';

import { mockAircraft, mockFlightLogs, mockOwnerStatements } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Plane, Calendar, Wrench, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function PortalDashboardPage() {
  // Mock data specifically for "Dr. Roberto Almeida"
  const myAircraft = mockAircraft.find(a => a.registration === 'PT-KZM');
  const myFlights = mockFlightLogs.filter(f => f.aircraft_id === myAircraft?.id);
  const nextFlight = myFlights[0]; // Faking next flight for visual purposes
  const myStatements = mockOwnerStatements.filter(s => s.owner_name === 'Dr. Roberto Almeida' && s.status !== 'paid');

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Main Status Card */}
        <Card className="glass border-aero-cyan/30 flex-1 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-aero-cyan/10 to-transparent opacity-50" />
          <CardContent className="p-6 md:p-8 relative z-10 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold font-mono text-foreground tracking-tight">{myAircraft?.registration}</h2>
                <p className="text-muted-foreground mt-1">{myAircraft?.model}</p>
              </div>
              <Badge variant="outline" className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30 px-3 py-1.5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Aeronave Disponível
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-auto">
              <div className="bg-background/40 backdrop-blur-md p-4 rounded-xl border border-border/50">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-1">Horas Disponíveis (Mês)</span>
                <span className="text-2xl font-mono font-bold text-foreground">17.5 <span className="text-sm font-sans text-muted-foreground">/ 30h</span></span>
              </div>
              <div className="bg-background/40 backdrop-blur-md p-4 rounded-xl border border-border/50">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-1">Próxima Revisão</span>
                <span className="text-lg font-mono font-bold text-foreground mt-1 block">Em 32h <span className="text-sm font-sans text-muted-foreground">(50h)</span></span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Flight Card */}
        <Card className="glass border-border/50 w-full md:w-80 shrink-0">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex items-center gap-2 text-aero-cyan mb-4">
              <Calendar className="w-5 h-5" />
              <h3 className="font-semibold">Próximo Voo</h3>
            </div>
            
            {nextFlight ? (
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-2">{new Date(`${nextFlight.date}T12:00:00Z`).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}</p>
                  <p className="text-2xl font-mono font-bold text-foreground">
                    {nextFlight.engine_start}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-sm font-mono bg-white/[0.02] p-3 rounded-lg border border-border/30">
                  <span className="text-foreground">{nextFlight.origin_icao}</span>
                  <Plane className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{nextFlight.destination_icao}</span>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground">
                <p>Nenhum voo agendado.</p>
              </div>
            )}
            
            <Link href="/portal/flights" className="mt-6">
              <Button variant="outline" className="w-full text-xs bg-white/[0.02] hover:bg-white/[0.05] border-border/50">
                Solicitar Voo
              </Button>
            </Link>
          </CardContent>
        </Card>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pending Bills Alerts */}
        <Card className="glass border-aero-amber/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-aero-amber mb-4">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-semibold">Faturas Pendentes</h3>
            </div>
            
            <div className="space-y-3">
              {myStatements.length > 0 ? myStatements.map(stmt => (
                <div key={stmt.id} className="flex justify-between items-center p-3 bg-white/[0.02] rounded-lg border border-border/30">
                  <div>
                    <span className="font-medium text-foreground block">Rateio Mensal</span>
                    <span className="text-xs text-muted-foreground capitalize">{new Date(stmt.year, stmt.month - 1).toLocaleString('pt-BR', { month: 'long' })} {stmt.year}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-foreground block">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stmt.total_due)}
                    </span>
                  </div>
                </div>
              )) : (
                <p className="text-muted-foreground text-sm">Você não possui faturas em aberto no momento.</p>
              )}
            </div>

            {myStatements.length > 0 && (
              <Link href="/portal/billing" className="block mt-4">
                <Button className="w-full text-xs bg-aero-amber/10 text-aero-amber hover:bg-aero-amber/20 border-transparent">
                  Ir para Pagamentos
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        {/* Maintenance Alert (simplified) */}
        <Card className="glass border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Wrench className="w-5 h-5" />
              <h3 className="font-semibold text-foreground">Status Técnico</h3>
            </div>
            
            <div className="bg-white/[0.02] p-4 rounded-lg border border-border/30">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-full shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">Aeronavegabilidade OK</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Não há ordens de serviço críticas ou manutenções paralisando a aeronave no momento. A próxima inspeção programada está a 32 horas de voo.
                  </p>
                </div>
              </div>
            </div>

            <Link href="/portal/maintenance" className="block mt-4">
              <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-aero-cyan justify-between">
                Ver detalhes técnicos <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
