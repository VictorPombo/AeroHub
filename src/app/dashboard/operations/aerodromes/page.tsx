'use client';

import { mockAerodromes } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Info, Droplet, Search, Plus, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AerodromesPage() {
  const aerodromes = mockAerodromes;

  const getSurfaceLabel = (surface: string) => {
    switch (surface) {
      case 'asphalt': return 'Asfalto';
      case 'concrete': return 'Concreto';
      case 'dirt': return 'Terra';
      case 'grass': return 'Grama';
      case 'water': return 'Água';
      case 'helipad': return 'Heliponto';
      default: return 'Outro';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Diretório de Aeródromos</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar ICAO ou IATA..." className="pl-9 bg-white/[0.02] border-border/50" />
          </div>
          <Button className="bg-aero-cyan text-aero-navy hover:bg-aero-cyan-light shrink-0">
            <Plus className="w-4 h-4 mr-2" /> Novo Aeródromo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {aerodromes.map(ad => (
          <Card key={ad.id} className="glass hover:bg-white/[0.02] transition-colors group">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-400/10 border border-indigo-400/20 rounded-lg text-indigo-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-aero-cyan transition-colors">
                      {ad.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {ad.city}, {ad.state} — {ad.country}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <Badge variant="outline" className="font-mono text-lg bg-white/[0.02] border-border/50">
                    {ad.icao}
                  </Badge>
                  {ad.iata && (
                    <Badge variant="outline" className="font-mono text-xs bg-white/[0.01] border-border/30 text-muted-foreground">
                      IATA: {ad.iata}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-white/[0.02] p-4 rounded-lg border border-border/30">
                
                <div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-1">Características da Pista</span>
                  <p className="text-sm font-medium text-foreground capitalize flex items-center gap-1.5">
                    <Map className="w-3.5 h-3.5" /> {getSurfaceLabel(ad.runway_surface)}
                  </p>
                  {ad.runway_length_meters && (
                    <p className="text-sm font-mono text-muted-foreground mt-1">
                      {ad.runway_length_meters} metros
                    </p>
                  )}
                </div>

                <div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-1">Combustível / Operação</span>
                  <p className="text-sm font-medium text-foreground flex items-center gap-1.5 uppercase">
                    <Droplet className="w-3.5 h-3.5 text-aero-cyan" /> {ad.fuel_available.join(', ')}
                  </p>
                  {ad.operating_hours && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Horário: {ad.operating_hours}
                    </p>
                  )}
                </div>

              </div>

              {ad.notes && (
                <div className="mt-4 p-3 bg-aero-amber/5 border border-aero-amber/20 rounded-lg text-sm text-aero-amber flex items-start gap-2">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>{ad.notes}</p>
                </div>
              )}

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
