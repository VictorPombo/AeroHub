'use client';

import { mockTrainingRecords } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, ChevronLeft, Calendar, FileText, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function TrainingPage() {
  const records = mockTrainingRecords;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'valid':
        return { label: 'Válido', className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' };
      case 'expiring':
        return { label: 'Vence em Breve', className: 'bg-aero-amber/10 text-aero-amber border-aero-amber/20' };
      case 'expired':
        return { label: 'Vencido', className: 'bg-rose-500/10 text-rose-500 border-rose-500/20' };
      default:
        return { label: status, className: 'bg-slate-500/10 text-slate-500 border-slate-500/20' };
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/pilot-profile" className="p-2 bg-white/[0.02] border border-border/50 rounded-lg hover:bg-white/[0.05] transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-indigo-400" />
            Treinamentos
          </h1>
          <p className="text-muted-foreground mt-1">Gestão de cursos, reciclagens e Ground School.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {records.map((record) => {
          const cfg = getStatusConfig(record.status);
          const isWarning = record.status === 'expiring' || record.status === 'expired';

          return (
            <Card key={record.id} className={cn("glass transition-all hover:bg-white/[0.02]", isWarning ? "border-rose-500/20" : "border-border/50")}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  
                  {/* Info Column */}
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{record.course_name}</h3>
                        <p className="text-sm text-muted-foreground">{record.provider} {record.instructor_name && `— Instrutor: ${record.instructor_name}`}</p>
                      </div>
                      <Badge variant="outline" className={cfg.className}>{cfg.label}</Badge>
                    </div>

                    {isWarning && record.notes && (
                      <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-lg flex gap-3 text-sm text-rose-400">
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                        <p>{record.notes}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground pt-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Realizado: {new Date(record.start_date).toLocaleDateString('pt-BR')}
                      </div>
                      {record.expiry_date && (
                        <div className={cn("flex items-center gap-2 font-medium", isWarning && "text-rose-400")}>
                          <Calendar className="w-4 h-4" /> Validade: {new Date(record.expiry_date).toLocaleDateString('pt-BR')}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details Column */}
                  <div className="md:w-64 border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 md:pl-6 space-y-4">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">Categoria</span>
                      <span className="text-sm font-medium capitalize mt-1">{record.training_type.replace(/_/g, ' ')}</span>
                    </div>
                    
                    {record.certificate_number && (
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">Certificado</span>
                        <div className="flex items-center gap-2 mt-1">
                          <FileText className="w-3.5 h-3.5 text-indigo-400" />
                          <span className="text-sm font-mono text-indigo-400">{record.certificate_number}</span>
                        </div>
                      </div>
                    )}
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
