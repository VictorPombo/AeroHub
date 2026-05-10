'use client';

import { useParams } from 'next/navigation';
import { mockAircraftModifications } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { FileSignature, Hammer, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ModificationsPage() {
  const { id } = useParams();
  
  // Filter SBs for this aircraft
  const modifications = mockAircraftModifications.filter(m => m.aircraft_id === id);

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Grandes Modificações (STC)</h2>
        <Button className="bg-aero-cyan text-aero-navy hover:bg-aero-cyan-light">Registrar STC</Button>
      </div>

      <div className="grid gap-4">
        {modifications.length === 0 ? (
          <Card className="glass border-dashed border-border/50">
            <CardContent className="p-12 text-center text-muted-foreground">
              <FileSignature className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma modificação ou STC registrado para esta aeronave.</p>
            </CardContent>
          </Card>
        ) : (
          modifications.map(mod => {
            return (
              <Card key={mod.id} className="glass hover:bg-white/[0.02] transition-colors group">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row gap-6">
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <span className="font-mono text-lg font-bold text-aero-cyan">{mod.stc_number}</span>
                        <h3 className="text-xl font-medium text-foreground mt-1">
                          {mod.title}
                        </h3>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{mod.description}</p>
                      
                      {mod.notes && (
                        <div className="p-3 bg-white/[0.02] border border-border/30 rounded-lg text-sm text-muted-foreground">
                          <span className="font-semibold block mb-1 text-foreground">Observações:</span>
                          {mod.notes}
                        </div>
                      )}
                    </div>

                    <div className="md:w-64 border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 pl-0 md:pl-6 space-y-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1 mb-1">
                          <Calendar className="w-3 h-3" /> Instalado em
                        </span>
                        <span className="text-foreground">{new Date(mod.installation_date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      
                      {mod.installed_by && (
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1 mb-1">
                            <Hammer className="w-3 h-3" /> Instalado por
                          </span>
                          <span className="text-foreground">{mod.installed_by}</span>
                        </div>
                      )}
                    </div>

                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
