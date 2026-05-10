'use client';

// ═══════════════════════════════════════════════════════
// AeroGest — Flight Details Sheet (Logbook Data)
// ═══════════════════════════════════════════════════════

import { FlightLog, Aircraft } from '@/types/models';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Plane, Clock, MapPin, Fuel, Users, BookOpen, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

interface FlightDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flight: FlightLog | null;
  aircraft: Aircraft | null;
}

export function FlightDetailsSheet({ open, onOpenChange, flight, aircraft }: FlightDetailsSheetProps) {
  if (!flight) return null;

  const formattedDate = flight.date.split('-').reverse().join('/');

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md md:max-w-xl glass-strong border-l border-border/50 p-0 overflow-y-auto">
        <SheetHeader className="p-6 border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-xl z-10">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-xl flex items-center gap-2 text-foreground">
                <BookOpen className="w-5 h-5 text-aero-cyan" />
                Detalhes do Voo
              </SheetTitle>
              <SheetDescription className="text-sm mt-1">
                Registro oficial conforme Diário de Bordo
              </SheetDescription>
            </div>
            <Badge variant="outline" className="bg-aero-cyan/10 text-aero-cyan border-aero-cyan/20 px-3 py-1 text-xs">
              {flight.locked ? 'Assinado (PIC)' : 'Rascunho'}
            </Badge>
          </div>
        </SheetHeader>

        <div className="p-6 space-y-8 animate-fade-in">
          {/* Header Data */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Aeronave</span>
              <p className="registration-plate text-lg text-foreground">{aircraft?.registration || 'N/A'}</p>
              <p className="text-xs text-muted-foreground">{aircraft?.model}</p>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Data do Voo</span>
                <p className="text-lg font-medium text-foreground">{formattedDate}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Natureza do Voo</span>
                <p className="text-sm font-medium text-foreground flex items-center gap-1.5 mt-0.5">
                  <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">{flight.nature || 'Não especificada'}</Badge>
                </p>
              </div>
            </div>
          </div>

          {/* Route & Times */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground border-b border-border/50 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-aero-cyan" />
              Trecho e Horários
            </h4>
            <div className="grid grid-cols-2 gap-y-5 gap-x-4 bg-white/[0.02] p-4 rounded-xl border border-border/30">
              <div className="space-y-1 col-span-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Origem</span>
                <p className="mono-data text-lg text-foreground font-bold">{flight.origin_icao}</p>
              </div>
              <div className="space-y-1 col-span-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Destino</span>
                <p className="mono-data text-lg text-foreground font-bold">{flight.destination_icao}</p>
              </div>
              
              <div className="col-span-2 h-px bg-border/50 my-1" />
              
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Acionamento</span>
                <p className="mono-data text-base text-foreground">{flight.engine_start}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Decolagem</span>
                <p className="mono-data text-base text-foreground">{flight.takeoff}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Pouso</span>
                <p className="mono-data text-base text-foreground">{flight.landing}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Corte</span>
                <p className="mono-data text-base text-foreground">{flight.engine_stop}</p>
              </div>
            </div>
          </div>

          {/* Flight Times Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground border-b border-border/50 pb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-aero-cyan" />
              Horas Voadas
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/[0.02] p-3 rounded-lg border border-border/30 text-center">
                <span className="text-[10px] text-muted-foreground uppercase font-bold block mb-1">Total (Corte-Partida)</span>
                <p className="mono-data text-lg text-aero-cyan font-bold">{flight.hours_flown.toFixed(1)}h</p>
              </div>
              <div className="bg-white/[0.02] p-3 rounded-lg border border-border/30 text-center">
                <span className="text-[10px] text-muted-foreground uppercase font-bold block mb-1">VFR / IFR</span>
                <p className="mono-data text-sm text-foreground mt-1.5">{flight.vfr_hours.toFixed(1)} / {flight.ifr_hours.toFixed(1)}</p>
              </div>
              <div className="bg-white/[0.02] p-3 rounded-lg border border-border/30 text-center">
                <span className="text-[10px] text-muted-foreground uppercase font-bold block mb-1">Diurno / Noturno</span>
                <p className="mono-data text-sm text-foreground mt-1.5">{flight.day_hours.toFixed(1)} / {flight.night_hours.toFixed(1)}</p>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-muted-foreground px-1">
              <span>Total Célula após este voo:</span>
              <span className="mono-data font-semibold text-foreground">{flight.total_airframe_hours.toFixed(1)}h</span>
            </div>
          </div>

          {/* Crew & Operation */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground border-b border-border/50 pb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-aero-cyan" />
              Operação e Tripulação
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Piloto em Comando (PIC)</span>
                <p className="text-sm text-foreground font-medium">{flight.pilot_name}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Segundo em Comando (SIC)</span>
                <p className="text-sm text-foreground">{flight.sic_name || 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold flex items-center gap-1">
                  <Users className="w-3 h-3" /> POB
                </span>
                <p className="text-sm text-foreground">{flight.pob} pessoas a bordo</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold flex items-center gap-1">
                  Pousos Realizados
                </span>
                <p className="text-sm text-foreground">{flight.landings || 0}</p>
              </div>
              
              <div className="col-span-2 mt-2 pt-3 border-t border-border/30 grid grid-cols-3 gap-4">
                 <div className="space-y-1">
                   <span className="text-[10px] text-muted-foreground uppercase font-bold">Combustível Abastecido</span>
                   <p className="text-sm text-foreground font-mono">{flight.fuel_used ? `${flight.fuel_used} L` : 'N/A'}</p>
                 </div>
                 <div className="space-y-1">
                   <span className="text-[10px] text-muted-foreground uppercase font-bold">Óleo Lubrificante</span>
                   <p className="text-sm text-foreground font-mono">{flight.lubricant_used ? `${flight.lubricant_used} Qt` : 'N/A'}</p>
                 </div>
                 <div className="space-y-1">
                   <span className="text-[10px] text-muted-foreground uppercase font-bold">Carga / Bagagem</span>
                   <p className="text-sm text-foreground font-mono">{flight.cargo_weight !== undefined ? `${flight.cargo_weight} kg` : 'N/A'}</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Occurrences (Parte II) */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground border-b border-border/50 pb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-aero-cyan" />
              Parte II - Situação Técnica
            </h4>
            {flight.occurrence ? (
              <div className="bg-aero-amber/5 border border-aero-amber/20 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-aero-amber shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-aero-amber">Ocorrência / Discrepância Registrada</p>
                  <p className="text-sm text-foreground/80">{flight.occurrence}</p>
                </div>
              </div>
            ) : (
              <div className="bg-white/[0.02] border border-border/30 rounded-xl p-4 text-center">
                <p className="text-sm text-muted-foreground">Nenhuma discrepância registrada. Condição normal.</p>
              </div>
            )}
          </div>
          {/* Assinatura Eletrônica (ANAC Compliance) */}
          {flight.locked && (
            <div className="mt-8 pt-8 border-t border-border/50 flex flex-col items-center">
              <div className="w-64 h-16 border-b border-slate-700 relative flex items-end justify-center pb-2">
                <span 
                  className="text-4xl text-foreground opacity-80 tracking-widest" 
                  style={{ fontFamily: "'Brush Script MT', 'Dancing Script', cursive" }}
                >
                  {flight.pilot_name}
                </span>
                <div className="absolute right-0 bottom-2 flex flex-col items-end opacity-60">
                   <CheckCircle2 className="w-4 h-4 text-aero-cyan mb-0.5" />
                   <span className="text-[8px] font-mono text-aero-cyan">{flight.hash?.substring(0, 8) || 'verified'}</span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground mt-3 uppercase tracking-widest font-semibold">Assinatura do Piloto em Comando</span>
              <span className="text-[10px] text-muted-foreground mt-1 text-center max-w-sm">
                Declaro que as informações deste registro são verdadeiras e precisas, de acordo com as regulamentações da ANAC e RBAC.
              </span>
            </div>
          )}
          
          <div className="pb-8" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
