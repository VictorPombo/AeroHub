'use client';

import { mockFlightTracking } from '@/lib/mock-data';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Navigation, PlaneTakeoff, ShieldAlert, Plane } from 'lucide-react';
import Link from 'next/link';

export default function TrackingPage() {
  const trackingData = mockFlightTracking;
  const inFlightCount = trackingData.filter(t => t.status === 'in_flight').length;
  const onGroundCount = trackingData.filter(t => t.status !== 'in_flight').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in pb-12">
      <div className="flex items-center gap-4 mb-2">
        <Link href="/dashboard/coordination" className="p-2 bg-white/[0.02] border border-border/50 rounded-lg hover:bg-white/[0.05] transition-colors group">
          <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-aero-cyan">Rastreamento de Frota</h1>
          <p className="text-sm text-muted-foreground">Monitoramento em tempo real via Satélite</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass-card border-border/50 hover:bg-white/[0.02] transition-colors">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-aero-cyan/10 rounded-xl text-aero-cyan shrink-0">
              <PlaneTakeoff className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Aeronaves em Voo</p>
              <p className="text-2xl font-bold font-mono">{inFlightCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border/50 hover:bg-white/[0.02] transition-colors">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-white/5 rounded-xl text-muted-foreground shrink-0">
              <Plane className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Aeronaves no Solo</p>
              <p className="text-2xl font-bold font-mono">{onGroundCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border/50 hover:bg-white/[0.02] transition-colors">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status do Satélite</p>
              <p className="text-lg font-bold">Online</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mock Map View */}
      <Card className="glass-card overflow-hidden border-aero-cyan/20">
        <div className="h-[400px] w-full bg-black/60 relative flex items-center justify-center border-b border-border/50 overflow-hidden">
          {/* Radar Grid Pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(100, 255, 218, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 255, 218, 0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e4/World_map_blank_black_lines.svg')] opacity-10 bg-no-repeat bg-center bg-cover mix-blend-screen" />
          
          <div className="text-center space-y-4 relative z-10 p-6 bg-black/40 backdrop-blur-sm rounded-2xl border border-aero-cyan/20">
            <div className="relative w-16 h-16 mx-auto">
              <Navigation className="w-16 h-16 text-aero-cyan opacity-80" />
              <div className="absolute inset-0 border-4 border-aero-cyan rounded-full animate-ping opacity-20" />
            </div>
            <div>
              <p className="font-bold text-aero-cyan tracking-wider uppercase">Mapa Interativo Desabilitado</p>
              <p className="text-sm text-muted-foreground mt-1">Conecte a API do provedor (Spidertracks/Garmin) para visualização real.</p>
            </div>
          </div>
        </div>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-muted-foreground bg-white/[0.02] border-b border-border/30 uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-4">Aeronave</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Altitude / Velocidade</th>
                  <th className="px-6 py-4 text-right">Última Atualização</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {trackingData.map((trk) => (
                  <tr key={trk.id} className="hover:bg-white/[0.04] transition-colors group">
                    <td className="px-6 py-4 font-bold tracking-widest text-foreground font-mono">
                      {trk.registration}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={trk.status === 'in_flight' ? 'bg-aero-cyan/10 text-aero-cyan border-aero-cyan/30' : 'bg-white/5 text-muted-foreground border-border/50'}>
                        {trk.status === 'in_flight' ? (
                          <span className="flex items-center gap-1.5"><PlaneTakeoff className="w-3 h-3" /> Em Voo</span>
                        ) : (
                          'No Solo'
                        )}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 font-mono">
                      {trk.status === 'in_flight' ? (
                        <div className="flex flex-col">
                          <span className="text-aero-cyan">FL{trk.altitude ? Math.floor(trk.altitude / 100) : 'N/A'}</span>
                          <span className="text-xs text-muted-foreground">{trk.speed} kts</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right text-muted-foreground font-mono text-xs">
                      {new Date(trk.last_updated).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
