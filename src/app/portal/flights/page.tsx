'use client';

import { mockFlightLogs, mockAircraft } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Plane, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function PortalFlightsPage() {
  const myAircraft = mockAircraft.find(a => a.registration === 'PT-KZM');
  const myFlights = mockFlightLogs.filter(f => f.aircraft_id === myAircraft?.id).sort((a, b) => new Date(`${b.date}T${b.engine_start}`).getTime() - new Date(`${a.date}T${a.engine_start}`).getTime());

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled': return { label: 'Agendado', color: 'bg-aero-cyan/10 text-aero-cyan border-aero-cyan/20', icon: Calendar };
      case 'in_flight': return { label: 'Em Voo', color: 'bg-indigo-400/10 text-indigo-400 border-indigo-400/20', icon: Plane };
      case 'completed': return { label: 'Concluído', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', icon: CheckCircle2 };
      default: return { label: 'Cancelado', color: 'bg-aero-rose/10 text-aero-rose border-aero-rose/20', icon: Clock };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Meus Voos</h2>
        <Button className="bg-aero-cyan text-aero-navy hover:bg-aero-cyan-light shrink-0">
          Solicitar Voo
        </Button>
      </div>

      <div className="grid gap-4">
        {myFlights.map(flight => {
          const config = getStatusLabel(flight.locked ? 'completed' : 'scheduled');
          const Icon = config.icon;

          return (
            <Card key={flight.id} className="glass hover:bg-white/[0.02] transition-colors group">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  
                  {/* Flight Route */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={cn("uppercase text-[10px] tracking-wider flex items-center gap-1", config.color)}>
                          <Icon className="w-3 h-3" /> {config.label}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">ID: {flight.id}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2 max-w-md">
                      {/* Origin */}
                      <div className="text-left">
                        <span className="text-3xl font-bold font-mono text-foreground">{flight.origin_icao}</span>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                          <Clock className="w-3.5 h-3.5" />
                          {flight.engine_start}
                        </div>
                      </div>

                      {/* Flight Path Line */}
                      <div className="flex-1 px-4 flex flex-col items-center">
                        <div className="w-full h-[1px] bg-border/50 relative flex items-center justify-center">
                          <Plane className="w-4 h-4 text-aero-cyan absolute bg-background px-1" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground mt-2 tracking-wider">
                          {new Date(`${flight.date}T12:00:00Z`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                        </span>
                      </div>

                      {/* Destination */}
                      <div className="text-right">
                        <span className="text-3xl font-bold font-mono text-foreground">{flight.destination_icao}</span>
                        <div className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground mt-1">
                          {flight.engine_stop}
                          <Clock className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions / Info */}
                  <div className="md:w-64 border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 pl-0 md:pl-6 flex flex-col justify-between">
                    <div>
                      <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2">Comandante Escala</span>
                      <p className="text-sm font-medium text-foreground">{flight.pilot_name}</p>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        Detalhes
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full text-xs text-aero-rose hover:text-aero-rose hover:bg-aero-rose/10 hidden">
                        Cancelar
                      </Button>
                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>
          );
        })}
        {myFlights.length === 0 && (
          <div className="p-8 text-center text-muted-foreground border border-border/30 rounded-xl bg-white/[0.01]">
            Você ainda não possui histórico de voos com esta aeronave.
          </div>
        )}
      </div>
    </div>
  );
}
