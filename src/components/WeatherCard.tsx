'use client';

import { Card, CardContent } from '@/components/ui/card';
import { CloudRain, Wind, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function WeatherCard({ icao = 'SBGR' }: { icao?: string }) {
  return (
    <Card className="glass-card overflow-hidden">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-border/50 p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              <CloudRain className="w-5 h-5 text-aero-cyan" />
              Meteorologia ({icao})
            </h3>
            <p className="text-xs text-slate-400 mt-1">Dados simulados via REDEMET</p>
          </div>
          <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30">VFR OK</Badge>
        </div>
      </div>
      <CardContent className="p-4 space-y-4">
        <div className="bg-black/20 p-3 rounded-md border border-border/50 font-mono text-xs text-muted-foreground leading-relaxed">
          METAR {icao} 092000Z 12015KT 9999 BKN030 25/18 Q1012=
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-slate-400" />
            <span>Vento: <strong className="text-foreground">120° / 15 kt</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 font-medium">NOTAMs: 2 Ativos</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
