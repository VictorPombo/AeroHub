'use client';

import { mockFuelRecords, mockAircraft } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Droplet, MapPin, Plane, User, Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FuelRecordsPage() {
  const records = mockFuelRecords;

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Registro de Abastecimentos</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="bg-white/[0.02] border-border/50 text-foreground">
            <Download className="w-4 h-4 mr-2" /> Exportar (CSV)
          </Button>
          <Button className="bg-aero-cyan text-aero-navy hover:bg-aero-cyan-light shrink-0">
            <Plus className="w-4 h-4 mr-2" /> Lançar Abastecimento
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {records.map(rec => {
          const aircraft = mockAircraft.find(a => a.id === rec.aircraft_id);

          return (
            <Card key={rec.id} className="glass hover:bg-white/[0.02] transition-colors group">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  {/* Left Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-white/[0.02] border border-border/50 rounded-xl shrink-0 mt-1">
                      <Droplet className="w-6 h-6 text-aero-cyan" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-lg font-bold text-foreground">
                          {rec.quantity} {rec.unit.toUpperCase()}
                        </span>
                        <Badge variant="outline" className="uppercase bg-aero-cyan/10 text-aero-cyan border-aero-cyan/20">
                          {rec.fuel_type}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5 font-mono text-foreground">
                          <Plane className="w-4 h-4" /> {aircraft?.registration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" /> Local: {rec.aerodrome_icao}
                        </span>
                        <span className="flex items-center gap-1.5">
                          Data: {new Date(rec.date).toLocaleDateString('pt-BR')}
                        </span>
                        {rec.provider && (
                          <span className="flex items-center gap-1.5">
                            Fornecedor: {rec.provider}
                          </span>
                        )}
                        {rec.pilot_id && (
                          <span className="flex items-center gap-1.5">
                            <User className="w-4 h-4" /> {rec.pilot_id}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Financial Info */}
                  <div className="md:text-right border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 pl-0 md:pl-6">
                    <div className="mb-3">
                      <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Custo Unitário</span>
                      <span className="text-sm font-mono text-muted-foreground mt-1 block">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(rec.unit_price)} / {rec.unit}
                      </span>
                    </div>

                    <div>
                      <span className="block text-[10px] uppercase font-bold tracking-wider text-emerald-500">Valor Total Pago</span>
                      <span className="text-2xl font-mono font-bold text-emerald-500 mt-1 block">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(rec.total_cost)}
                      </span>
                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
