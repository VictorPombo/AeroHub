'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CalendarClock, PlaneTakeoff, CheckCircle2, Clock, MapPin, CalendarDays, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Mock schedule data for the pilot
const mockPilotSchedule = [
  {
    id: 'sch-1',
    date: '2026-05-15',
    origin: 'SBSP',
    destination: 'SBBR',
    aircraft: 'PT-RJB',
    role: 'PIC',
    status: 'confirmed',
    departure_time: '14:00'
  },
  {
    id: 'sch-2',
    date: '2026-05-18',
    origin: 'SBBR',
    destination: 'SBRJ',
    aircraft: 'PT-RJB',
    role: 'PIC',
    status: 'pending',
    departure_time: '09:30'
  }
];

export default function PilotSchedulePage() {
  const [availability, setAvailability] = useState('available'); // 'available', 'standby', 'off'

  const handleStatusChange = (status: string) => {
    setAvailability(status);
    toast.success('Status Atualizado', {
      description: `Sua disponibilidade foi atualizada para a Coordenação (DOV).`,
    });
  };

  const handleAcceptFlight = (id: string) => {
    toast.success('Voo Confirmado', {
      description: 'Você aceitou a escala. O DOV foi notificado.',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in pb-12">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/pilot-profile" className="p-2 bg-white/[0.02] border border-border/50 rounded-lg hover:bg-white/[0.05] transition-colors group">
          <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-blue-500">Agenda de Voos</h1>
          <p className="text-sm text-muted-foreground">Próximos voos marcados e status de disponibilidade</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Availability Status */}
        <div className="md:col-span-1 space-y-6">
          <Card className="glass-card border-blue-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-blue-500" />
                Sua Disponibilidade
              </CardTitle>
              <CardDescription>
                Informe à Coordenação seu status atual para os próximos dias.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className={`w-full justify-start h-12 ${availability === 'available' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-white/[0.02] border-border/50'}`}
                onClick={() => handleStatusChange('available')}
              >
                <div className={`w-3 h-3 rounded-full mr-3 ${availability === 'available' ? 'bg-emerald-500' : 'bg-muted-foreground'}`} />
                Disponível para Escala
              </Button>
              <Button 
                variant="outline" 
                className={`w-full justify-start h-12 ${availability === 'standby' ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-white/[0.02] border-border/50'}`}
                onClick={() => handleStatusChange('standby')}
              >
                <div className={`w-3 h-3 rounded-full mr-3 ${availability === 'standby' ? 'bg-amber-500' : 'bg-muted-foreground'}`} />
                Sobreaviso (Standby)
              </Button>
              <Button 
                variant="outline" 
                className={`w-full justify-start h-12 ${availability === 'off' ? 'bg-aero-rose/10 border-aero-rose/30 text-aero-rose' : 'bg-white/[0.02] border-border/50'}`}
                onClick={() => handleStatusChange('off')}
              >
                <div className={`w-3 h-3 rounded-full mr-3 ${availability === 'off' ? 'bg-aero-rose' : 'bg-muted-foreground'}`} />
                Folga / Indisponível
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Próximas Folgas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-white/[0.02] border border-border/50 rounded-lg text-center space-y-2">
                <span className="text-2xl font-bold font-mono text-muted-foreground">22/05 a 24/05</span>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Aprovado pelo DOV</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scheduled Flights */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <PlaneTakeoff className="w-5 h-5 text-indigo-400" />
            Suas Escalas
          </h3>
          
          {mockPilotSchedule.length === 0 ? (
            <div className="p-8 text-center bg-white/[0.02] border border-border/50 rounded-xl">
              <p className="text-muted-foreground">Você não possui escalas futuras no momento.</p>
            </div>
          ) : (
            mockPilotSchedule.map((flight) => (
              <Card key={flight.id} className="glass-card border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
                <CardHeader className="border-b border-border/30 bg-black/20 p-4">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {flight.date}
                    </Badge>
                    <Badge className={flight.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500 animate-pulse'}>
                      {flight.status === 'confirmed' ? 'CONFIRMADO' : 'PENDENTE'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-5 space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <span className="text-xs text-muted-foreground block mb-1">Origem</span>
                        <span className="text-2xl font-bold font-mono tracking-widest">{flight.origin}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center px-4">
                        <span className="text-xs text-muted-foreground mb-1 font-mono">{flight.departure_time}</span>
                        <ArrowLeft className="w-5 h-5 text-indigo-400 rotate-180" />
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-muted-foreground block mb-1">Destino</span>
                        <span className="text-2xl font-bold font-mono tracking-widest">{flight.destination}</span>
                      </div>
                    </div>
                    
                    <div className="text-left sm:text-right">
                      <span className="text-xs text-muted-foreground block mb-1 uppercase tracking-wider">Aeronave & Função</span>
                      <p className="font-bold text-lg text-aero-cyan">{flight.aircraft} <span className="text-sm font-normal text-muted-foreground">({flight.role})</span></p>
                    </div>
                  </div>

                  {flight.status === 'pending' && (
                    <div className="flex gap-3 pt-4 border-t border-border/30">
                      <Button 
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() => handleAcceptFlight(flight.id)}
                      >
                        Aceitar Escala
                      </Button>
                      <Button variant="outline" className="border-aero-rose/30 text-aero-rose hover:bg-aero-rose/10" onClick={() => {
                        toast.error('Escala Recusada', { description: 'A coordenação foi notificada para providenciar um substituto.' });
                      }}>
                        Recusar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
