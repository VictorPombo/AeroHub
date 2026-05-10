'use client';

import { mockTravelDocuments } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileSignature, AlertTriangle, ShieldCheck, User, Calendar, Plus, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function TravelDocumentsPage() {
  const documents = mockTravelDocuments;

  const isExpiringSoon = (dateStr: string) => {
    const expiry = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(expiry.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 180;
  };

  const isExpired = (dateStr: string) => {
    return new Date(dateStr) < new Date();
  };

  const getDocTypeLabel = (type: string) => {
    switch (type) {
      case 'passport': return 'Passaporte';
      case 'visa_us': return 'Visto Americano (EUA)';
      case 'visa_eu': return 'Visto Schengen (Europa)';
      case 'vaccine_yellow_fever': return 'Vacina (Febre Amarela)';
      default: return type;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Passaportes e Vistos</h2>
        <Button className="bg-aero-cyan text-aero-navy hover:bg-aero-cyan-light shrink-0">
          <Plus className="w-4 h-4 mr-2" /> Novo Documento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map(doc => {
          const expired = isExpired(doc.expiry_date);
          const expiring = isExpiringSoon(doc.expiry_date);
          
          let statusConfig = { label: 'Em Dia', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20', icon: ShieldCheck };
          if (expired) {
            statusConfig = { label: 'Vencido', color: 'text-aero-rose bg-aero-rose/10 border-aero-rose/20', icon: AlertTriangle };
          } else if (expiring) {
            statusConfig = { label: 'Vencendo', color: 'text-aero-amber bg-aero-amber/10 border-aero-amber/20', icon: AlertTriangle };
          }

          const StatusIcon = statusConfig.icon;

          return (
            <Card key={doc.id} className={cn("glass hover:bg-white/[0.02] transition-colors group", (expired || expiring) && "border-aero-amber/30")}>
              <CardContent className="p-5 flex flex-col h-full">
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/[0.02] border border-border/50 rounded-lg">
                      <FileSignature className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">
                        {getDocTypeLabel(doc.document_type)}
                      </h3>
                      <p className="text-xs font-mono text-muted-foreground mt-0.5">Nº: {doc.document_number}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <User className="w-4 h-4 text-muted-foreground" /> {doc.person_name}
                    <Badge variant="outline" className="text-[10px] uppercase ml-1">
                      {doc.person_type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Calendar className="w-4 h-4 text-muted-foreground" /> Emissão: {new Date(doc.issue_date).toLocaleDateString('pt-BR')}
                  </div>
                  {doc.notes && (
                    <p className="text-xs text-muted-foreground italic">"{doc.notes}"</p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-border/30 flex items-end justify-between">
                  <div>
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-1">Vencimento</span>
                    <span className={cn("text-lg font-mono font-bold flex items-center gap-2", statusConfig.color.split(' ')[0])}>
                      {new Date(doc.expiry_date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={cn("px-2 py-1 flex items-center gap-1", statusConfig.color)}>
                      <StatusIcon className="w-3 h-3" /> {statusConfig.label}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-aero-cyan">
                      <Download className="w-4 h-4" />
                    </Button>
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
