'use client';

// ═══════════════════════════════════════════════════════
// AeroGest — Aircraft Flights (Diário de Bordo)
// ═══════════════════════════════════════════════════════

import { useParams } from 'next/navigation';
import { mockAircraft, mockFlightLogs } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AircraftFlightsPage() {
  const { id } = useParams();

  const aircraft = mockAircraft.find(a => a.id === id);
  const flights = mockFlightLogs.filter(f => f.aircraft_id === id);

  if (!aircraft) return null;

  return (
    <Card className="glass border-border/50">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Diário de Bordo ({aircraft.registration})</CardTitle>
      </CardHeader>
      <CardContent>
        {flights.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">Nenhum voo registrado para esta aeronave.</p>
        ) : (
          <div className="space-y-2">
            {flights.map(flight => (
              <div key={flight.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-border/30 hover:bg-white/[0.05] transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-aero-cyan/10 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-aero-cyan uppercase">{flight.date.split('-')[1]}</span>
                  <span className="text-lg font-bold text-aero-cyan leading-none">{flight.date.split('-')[2]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{flight.origin_icao} → {flight.destination_icao}</p>
                  <p className="text-xs text-muted-foreground">PIC: {flight.pilot_name}</p>
                </div>
                <div className="text-right">
                  <p className="mono-data text-sm font-bold text-foreground">{flight.hours_flown.toFixed(1)}h</p>
                  <p className="text-[10px] text-muted-foreground uppercase">{flight.engine_start} - {flight.engine_stop}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
