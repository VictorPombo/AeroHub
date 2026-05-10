'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass, Users, MapPin, FileText, PlaneTakeoff, Navigation } from 'lucide-react';
import Link from 'next/link';

export default function CoordinationDashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Centro de Operações (DOV)</h1>
        <p className="text-muted-foreground mt-1">Coordenação e Despacho de Voos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <Link href="/dashboard/coordination/planning" className="group">
          <Card className="glass-card h-full border-blue-500/20 hover:bg-white/[0.04] transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 group-hover:text-blue-500 transition-colors">
                <Compass className="w-5 h-5 text-blue-500" />
                Planejamento de Voo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Cálculo de rotas, consumo e ETA (Performance).</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/coordination/tracking" className="group">
          <Card className="glass-card h-full border-aero-cyan/20 hover:bg-white/[0.04] transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 group-hover:text-aero-cyan transition-colors">
                <Navigation className="w-5 h-5 text-aero-cyan" />
                Rastreamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Monitoramento de voos em tempo real e status da frota.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/coordination/manifest" className="group">
          <Card className="glass-card h-full border-emerald-500/20 hover:bg-white/[0.04] transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 group-hover:text-emerald-500 transition-colors">
                <Users className="w-5 h-5 text-emerald-500" />
                Manifesto de Carga
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Lista de passageiros, bagagens e controle de peso.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/coordination/roster" className="group">
          <Card className="glass-card h-full border-indigo-500/20 hover:bg-white/[0.04] transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 group-hover:text-indigo-500 transition-colors">
                <PlaneTakeoff className="w-5 h-5 text-indigo-500" />
                Escalação de Voo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Atribuição de tripulantes e controle de jornada.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/coordination/gedec" className="group">
          <Card className="glass-card h-full border-amber-500/20 hover:bg-white/[0.04] transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 group-hover:text-amber-500 transition-colors">
                <FileText className="w-5 h-5 text-amber-500" />
                GEDEC & Ordem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Ordem de Missão e Gerenciamento Eletrônico Documental.</p>
            </CardContent>
          </Card>
        </Link>

      </div>
    </div>
  );
}
