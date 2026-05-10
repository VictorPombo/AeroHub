'use client';

import { mockPassengerManifests } from '@/lib/mock-data';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Briefcase, Plus, PlaneTakeoff, Scale, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function PassengerManifestPage() {
  const manifests = mockPassengerManifests;

  const handleNewManifest = () => {
    toast.success('Novo Manifesto', {
      description: 'Abertura do formulário para adicionar passageiros.',
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/coordination" className="p-2 bg-white/[0.02] border border-border/50 rounded-lg hover:bg-white/[0.05] transition-colors group">
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-emerald-500">Manifesto de Carga e Passageiros</h1>
            <p className="text-sm text-muted-foreground">Controle operacional de passageiros e bagagens</p>
          </div>
        </div>

        <Button onClick={handleNewManifest} className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 gap-2">
          <Plus className="w-4 h-4" />
          Novo Manifesto
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass-card border-border/50 hover:bg-white/[0.02] transition-colors">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Passageiros Hoje</p>
              <p className="text-2xl font-bold font-mono">
                {manifests.reduce((acc, m) => acc + m.passengers.length, 0)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border/50 hover:bg-white/[0.02] transition-colors">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Carga Paga (Payload)</p>
              <p className="text-2xl font-bold font-mono">
                {manifests.reduce((acc, m) => acc + m.total_pax_weight + m.total_baggage_weight, 0)} <span className="text-sm">kg</span>
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border/50 hover:bg-white/[0.02] transition-colors">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 shrink-0">
              <PlaneTakeoff className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Voos Programados</p>
              <p className="text-2xl font-bold font-mono">{manifests.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {manifests.map((manifest) => (
          <Card key={manifest.id} className="glass-card border-emerald-500/20 overflow-hidden hover:border-emerald-500/40 transition-colors">
            <CardHeader className="border-b border-border/30 bg-black/20 p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 flex items-center gap-1.5 px-3 py-1">
                    <Clock className="w-3.5 h-3.5" />
                    {manifest.date}
                  </Badge>
                  <span className="font-bold text-lg font-mono">{manifest.origin} ✈️ {manifest.destination}</span>
                </div>
                <Badge className={cn("px-3 py-1", manifest.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500')}>
                  {manifest.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-[10px] text-muted-foreground bg-white/[0.02] border-b border-border/30 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="px-6 py-4">Passageiro</th>
                      <th className="px-6 py-4">Documento</th>
                      <th className="px-6 py-4">Peso (kg)</th>
                      <th className="px-6 py-4">Bagagem (kg)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    {manifest.passengers.map((pax, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.04] transition-colors group">
                        <td className="px-6 py-4 font-medium flex items-center gap-3">
                          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 group-hover:bg-emerald-500/20 transition-colors">
                            <Users className="w-4 h-4" /> 
                          </div>
                          {pax.name}
                        </td>
                        <td className="px-6 py-4 font-mono text-muted-foreground">{pax.document}</td>
                        <td className="px-6 py-4 font-mono">{pax.weight}</td>
                        <td className="px-6 py-4 flex items-center gap-2 font-mono">
                          <Briefcase className="w-4 h-4 text-muted-foreground" /> {pax.baggage_weight}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-black/40 font-bold border-t border-border/50">
                      <td className="px-6 py-5 text-right text-muted-foreground uppercase text-[10px] tracking-wider" colSpan={2}>
                        Total do Manifesto
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xl font-mono text-emerald-500">{manifest.total_pax_weight} <span className="text-xs text-emerald-500/50">kg</span></span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xl font-mono text-emerald-500">{manifest.total_baggage_weight} <span className="text-xs text-emerald-500/50">kg</span></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
