'use client';

import { mockDocumentsGEDEC } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Download, Plus, CheckCircle2, AlertTriangle, FileArchive } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function GedecPage() {
  const docs = mockDocumentsGEDEC;

  const handleNewDocument = () => {
    toast.success('Novo Documento', {
      description: 'Abertura de formulário de upload de documento do GEDEC.',
    });
  };

  const handleDownload = (title: string) => {
    toast('Download Iniciado', {
      description: `Baixando documento: ${title}`,
      icon: <Download className="w-4 h-4 text-aero-cyan" />
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
            <h1 className="text-2xl font-bold tracking-tight text-amber-500">GEDEC & Documentação</h1>
            <p className="text-sm text-muted-foreground">Gerenciamento Eletrônico Documental</p>
          </div>
        </div>

        <Button onClick={handleNewDocument} className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20 gap-2">
          <Plus className="w-4 h-4" />
          Novo Documento
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass-card border-border/50 hover:bg-white/[0.02] transition-colors">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500 shrink-0">
              <FileArchive className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total de Documentos</p>
              <p className="text-2xl font-bold font-mono">{docs.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border/50 hover:bg-white/[0.02] transition-colors">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Documentos Validados</p>
              <p className="text-2xl font-bold font-mono">{docs.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border/50 hover:bg-white/[0.02] transition-colors">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-aero-rose/10 rounded-xl text-aero-rose shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Aguardando Assinatura</p>
              <p className="text-2xl font-bold font-mono">0</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Docs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {docs.map((doc) => (
          <Card key={doc.id} className="glass-card hover:bg-white/[0.04] transition-all group border-amber-500/20 hover:border-amber-500/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/50" />
            <CardHeader className="pb-3 pt-5 px-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-500/10 rounded-lg text-amber-500">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground leading-tight line-clamp-2">{doc.title}</h3>
                    <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-bold">{doc.type.replace('_', ' ')}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="flex items-center justify-between mt-2">
                <div>
                  {doc.aircraft_id ? (
                    <Badge variant="outline" className="bg-amber-500/5 text-amber-500 border-amber-500/20 uppercase text-[10px]">Para: {doc.aircraft_id}</Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground">Documento Geral</span>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10 rounded-md transition-colors"
                  onClick={() => handleDownload(doc.title)}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
