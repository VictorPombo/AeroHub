'use client';

import { mockFuelRecords, mockTravelDocuments, mockAerodromes } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, AlertTriangle, Droplet, MapPin, PlaneTakeoff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function OperationsDashboardPage() {
  const fuelRecords = mockFuelRecords;
  const docs = mockTravelDocuments;
  const aerodromes = mockAerodromes;

  // KPIs
  const totalFuelCost = fuelRecords.reduce((acc, rec) => acc + rec.total_cost, 0);
  const totalLiters = fuelRecords.reduce((acc, rec) => acc + (rec.unit === 'l' ? rec.quantity : rec.quantity * 3.78541), 0);
  
  const isExpiringSoon = (dateStr: string) => {
    const expiry = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(expiry.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 180; // Less than 6 months
  };

  const expiringDocs = docs.filter(doc => isExpiringSoon(doc.expiry_date));

  return (
    <div className="space-y-6">
      
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Card className="glass border-border/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Custo Total de QAV/AVGAS</p>
                <h3 className="text-2xl font-bold font-mono text-emerald-500">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(totalFuelCost)}
                </h3>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                <Droplet className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Litragem Consumida</p>
                <h3 className="text-2xl font-bold font-mono">
                  {new Intl.NumberFormat('pt-BR').format(totalLiters)} L
                </h3>
              </div>
              <div className="p-3 bg-aero-cyan/10 rounded-xl text-aero-cyan">
                <PlaneTakeoff className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={cn("glass transition-colors", expiringDocs.length > 0 ? "border-aero-amber/30" : "border-border/50")}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Docs a Vencer (6m)</p>
                <h3 className={cn("text-3xl font-bold font-mono", expiringDocs.length > 0 ? "text-aero-amber" : "text-foreground")}>
                  {expiringDocs.length}
                </h3>
              </div>
              <div className={cn("p-3 rounded-xl", expiringDocs.length > 0 ? "bg-aero-amber/10 text-aero-amber" : "bg-white/[0.05] text-muted-foreground")}>
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Bases / Aeródromos</p>
                <h3 className="text-3xl font-bold font-mono text-indigo-400">{aerodromes.length}</h3>
              </div>
              <div className="p-3 bg-indigo-400/10 rounded-xl text-indigo-400">
                <MapPin className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Document Alerts */}
        <Card className="glass border-aero-amber/20">
          <CardHeader className="pb-3 border-b border-border/30">
            <CardTitle className="text-lg flex items-center gap-2 text-aero-amber">
              <AlertTriangle className="w-5 h-5" />
              Atenção: Documentos Vencendo
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {expiringDocs.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">Todos os passaportes e vistos estão em dia.</div>
            ) : (
              <div className="divide-y divide-border/30">
                {expiringDocs.map(doc => (
                  <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                    <div>
                      <span className="font-bold text-foreground capitalize flex items-center gap-2">
                        {doc.document_type.replace('_', ' ')}
                      </span>
                      <p className="text-sm text-muted-foreground">{doc.person_name}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-aero-amber font-mono">
                        Expira em: {new Date(doc.expiry_date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="p-3 border-t border-border/30 bg-white/[0.01]">
              <Link href="/dashboard/operations/documents">
                <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-aero-cyan justify-between">
                  Gerenciar Documentos <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Fuel */}
        <Card className="glass border-border/50">
          <CardHeader className="pb-3 border-b border-border/30">
            <CardTitle className="text-lg flex items-center gap-2">
              <Droplet className="w-5 h-5 text-aero-cyan" />
              Últimos Abastecimentos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/30">
              {fuelRecords.slice(0, 3).map(rec => (
                <div key={rec.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                  <div>
                    <span className="font-mono font-bold text-foreground flex items-center gap-2">
                      {rec.quantity} {rec.unit.toUpperCase()} <span className="uppercase text-xs text-muted-foreground">{rec.fuel_type}</span>
                    </span>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> {rec.aerodrome_icao}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-emerald-500 font-mono">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(rec.total_cost)}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(rec.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border/30 bg-white/[0.01]">
              <Link href="/dashboard/operations/fuel">
                <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-aero-cyan justify-between">
                  Ver log de combustível <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}
