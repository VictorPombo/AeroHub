'use client';

import { useParams } from 'next/navigation';
import { mockTechnicalDocuments } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, FileText, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function LibraryPage() {
  const { id } = useParams();
  
  // Filter docs for this aircraft
  const documents = mockTechnicalDocuments.filter(d => d.aircraft_id === id);

  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'poh': return 'POH / AFM';
      case 'manual': return 'Manual de Manutenção';
      case 'ipc': return 'Catálogo de Peças (IPC)';
      case 'wiring_diagram': return 'Diagrama Elétrico';
      default: return 'Outros';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Biblioteca Técnica</h2>
        <Button className="bg-aero-cyan text-aero-navy hover:bg-aero-cyan-light">Fazer Upload</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.length === 0 ? (
          <Card className="glass border-dashed border-border/50 md:col-span-2">
            <CardContent className="p-12 text-center text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum documento técnico disponível na biblioteca.</p>
            </CardContent>
          </Card>
        ) : (
          documents.map(doc => {
            return (
              <Card key={doc.id} className="glass hover:bg-white/[0.02] transition-colors group">
                <CardContent className="p-5 flex flex-col h-full">
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-indigo-400/10 rounded-lg text-indigo-400">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <Badge variant="outline" className="uppercase text-[10px] tracking-wider bg-white/[0.02] border-border/50 text-muted-foreground mb-1">
                          {getCategoryLabel(doc.category)}
                        </Badge>
                        <h3 className="font-semibold text-foreground group-hover:text-aero-cyan transition-colors line-clamp-2">
                          {doc.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground bg-white/[0.02] p-3 rounded-lg border border-border/30">
                      <div>
                        <span className="block text-[10px] uppercase font-bold tracking-wider">Revisão</span>
                        <span className="font-mono text-foreground">{doc.version || 'Original'}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] uppercase font-bold tracking-wider">Data</span>
                        <span>{doc.release_date ? new Date(doc.release_date).toLocaleDateString('pt-BR') : 'N/A'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      {doc.is_current ? (
                        <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
                          <ShieldCheck className="w-4 h-4" /> Material Atualizado
                        </span>
                      ) : (
                        <span className="text-xs text-aero-amber">Pode haver revisão mais recente</span>
                      )}

                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-aero-cyan">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-aero-cyan">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
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
