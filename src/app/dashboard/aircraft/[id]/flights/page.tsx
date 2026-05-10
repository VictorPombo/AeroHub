'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { mockAircraft, mockFlightLogs, mockPilotCredentials, mockPilotFlightHours } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, AlertTriangle, ShieldX } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

export default function AircraftFlightsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [, forceUpdate] = useState(0);

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [flightHours, setFlightHours] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const aircraft = mockAircraft.find(a => a.id === id);
  const flights = mockFlightLogs.filter(f => f.aircraft_id === id);

  if (!aircraft) return null;

  function handleOpenNewFlight() {
    // 1. Check CMA
    const cma = mockPilotCredentials.find(c => c.credential_type === 'cma' && c.user_id === user?.id);
    const isCmaValid = cma && cma.expiry_date && new Date(cma.expiry_date).getTime() > Date.now();
    
    if (!isCmaValid) {
      setErrorMsg('BLOQUEIO DE VOO: O seu CMA está vencido ou não cadastrado. Regularize suas credenciais em M7 - Tripulação.');
      setOpen(true);
      return;
    }

    // 2. Check Type Rating (assuming aircraft.model requires it, or just checking if they have any valid rating for simplicity)
    // Note: in a real app, we would cross-reference aircraft.type with the credential description
    const hasRating = mockPilotCredentials.some(c => 
      c.user_id === user?.id && 
      c.credential_type === 'habilitacao_tipo' && 
      c.expiry_date && new Date(c.expiry_date).getTime() > Date.now()
    );
    if (!hasRating && aircraft?.type === 'airplane') {
      setErrorMsg('BLOQUEIO DE VOO: Você não possui uma Habilitação de Tipo válida para esta aeronave.');
      setOpen(true);
      return;
    }

    setErrorMsg('');
    setOrigin('');
    setDestination('');
    setFlightHours('');
    setOpen(true);
  }

  function handleSaveFlight() {
    if (errorMsg) {
      setOpen(false);
      return;
    }

    const duration = parseFloat(flightHours);
    if (isNaN(duration) || duration <= 0) return;

    // 3. Check 24h limit
    const current24h = mockPilotFlightHours.last_24h_hours;
    if (current24h + duration > 11) {
      setErrorMsg(`BLOQUEIO DE JORNADA: Este voo excederá o limite de 11 horas nas últimas 24h. Horas atuais: ${current24h}h.`);
      return; // prevent save, show error
    }

    // Save mock flight
    mockFlightLogs.unshift({
      id: `flt_${Date.now()}`,
      aircraft_id: aircraft!.id,
      date: new Date().toISOString().split('T')[0],
      origin_icao: origin.toUpperCase(),
      destination_icao: destination.toUpperCase(),
      engine_start: '12:00',
      engine_stop: '13:00',
      takeoff: '12:10',
      landing: '12:50',
      hours_flown: duration,
      vfr_hours: duration,
      ifr_hours: 0,
      night_hours: 0,
      day_hours: duration,
      pob: 1,
      pilot_id: user!.id,
      pilot_name: user!.full_name,
      total_airframe_hours: 1500 + duration,
      aircraft_condition: 'normal',
      locked: false,
      created_at: new Date().toISOString(),
    });

    // Update pilot hours
    mockPilotFlightHours.total_hours += duration;
    mockPilotFlightHours.last_24h_hours += duration;

    setOpen(false);
    forceUpdate(n => n + 1);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Diário de Bordo</h2>
        <Button onClick={handleOpenNewFlight} className="bg-aero-cyan text-black hover:bg-aero-cyan-light gap-2">
          <Plus className="w-4 h-4" /> Registrar Voo
        </Button>
      </div>

      <Card className="glass border-border/50">
        <CardContent className="pt-6">
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{errorMsg ? 'Bloqueio de Segurança' : 'Registrar Voo'}</DialogTitle>
          </DialogHeader>

          {errorMsg ? (
            <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-aero-rose/10 flex items-center justify-center">
                <ShieldX className="w-8 h-8 text-aero-rose" />
              </div>
              <p className="text-sm font-medium text-foreground px-4">{errorMsg}</p>
              <Badge className="bg-aero-rose/10 text-aero-rose hover:bg-aero-rose/20">Ação Requerida</Badge>
            </div>
          ) : (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Origem (ICAO)</Label>
                  <Input value={origin} onChange={e => setOrigin(e.target.value)} placeholder="SBSP" className="uppercase mono-data" />
                </div>
                <div className="space-y-2">
                  <Label>Destino (ICAO)</Label>
                  <Input value={destination} onChange={e => setDestination(e.target.value)} placeholder="SBRJ" className="uppercase mono-data" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tempo de Voo (Horas)</Label>
                <Input type="number" step="0.1" value={flightHours} onChange={e => setFlightHours(e.target.value)} placeholder="Ex: 1.5" />
              </div>
              <div className="p-3 rounded-lg bg-aero-amber/10 border border-aero-amber/20 flex gap-3 text-sm text-aero-amber">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>Este voo será registrado e as horas serão somadas à sua jornada diária e aos itens de CTM da aeronave.</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {errorMsg ? 'Fechar' : 'Cancelar'}
            </Button>
            {!errorMsg && (
              <Button onClick={handleSaveFlight} className="bg-aero-cyan text-black hover:bg-aero-cyan-light">
                Salvar Voo
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
