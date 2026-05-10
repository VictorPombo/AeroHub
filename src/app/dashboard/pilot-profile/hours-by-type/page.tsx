'use client';

import { mockHoursByType } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Plane, ChevronLeft, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function HoursByTypePage() {
  const records = mockHoursByType;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/pilot-profile" className="p-2 bg-white/[0.02] border border-border/50 rounded-lg hover:bg-white/[0.05] transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Plane className="w-8 h-8 text-aero-amber" />
            Horas por Modelo
          </h1>
          <p className="text-muted-foreground mt-1">Desdobramento da sua experiência por tipo de equipamento.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {records.map((record) => {
          return (
            <Card key={record.id} className="glass border-border/50 hover:bg-white/[0.02] transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  {/* Model Info */}
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-foreground">{record.aircraft_model}</h2>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="uppercase bg-aero-amber/10 text-aero-amber border-aero-amber/20">
                        {record.aircraft_category}
                      </Badge>
                      {record.last_flown_date && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Último voo: {new Date(record.last_flown_date).toLocaleDateString('pt-BR')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hours Breakdown */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 flex-1 md:justify-end">
                    
                    <div className="text-center sm:text-right">
                      <span className="block text-[10px] text-muted-foreground uppercase font-bold tracking-wider">PIC (Comando)</span>
                      <span className="block text-xl font-mono text-foreground mt-1">{record.pic_hours.toFixed(1)}h</span>
                    </div>

                    <div className="text-center sm:text-right">
                      <span className="block text-[10px] text-muted-foreground uppercase font-bold tracking-wider">SIC (Copiloto)</span>
                      <span className="block text-xl font-mono text-foreground mt-1">{record.sic_hours.toFixed(1)}h</span>
                    </div>

                    <div className="text-center sm:text-right">
                      <span className="block text-[10px] text-muted-foreground uppercase font-bold tracking-wider">IFR / Noturno</span>
                      <span className="block text-sm font-mono text-muted-foreground mt-2">
                        {record.ifr_hours.toFixed(1)} / {record.night_hours.toFixed(1)}
                      </span>
                    </div>

                    <div className="text-center sm:text-right border-t sm:border-t-0 sm:border-l border-border/50 pt-2 sm:pt-0 sm:pl-6">
                      <span className="block text-[10px] text-aero-cyan uppercase font-bold tracking-wider">Total</span>
                      <span className="block text-2xl font-mono text-aero-cyan font-bold mt-1">{record.total_hours.toFixed(1)}h</span>
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
