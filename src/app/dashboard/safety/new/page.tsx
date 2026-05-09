'use client';

import { ArrowLeft, ShieldAlert, Send } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export default function NewSafetyReportPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/safety" className="p-2 bg-white/[0.02] border border-border/50 rounded-lg hover:bg-white/[0.05] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Novo Reporte (RCSV)</h1>
          <p className="text-sm text-muted-foreground">Sistema de reporte voluntário de ocorrências</p>
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 flex gap-4 text-sm text-amber-500/90 mb-6">
        <ShieldAlert className="w-5 h-5 shrink-0 text-amber-500" />
        <p>
          <strong>Cultura Justa:</strong> Este reporte tem caráter preventivo e não punitivo. 
          O objetivo é identificar riscos e melhorar a segurança operacional da frota.
        </p>
      </div>

      <Card className="glass-card">
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Data da Ocorrência *</label>
              <input type="date" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Local (ICAO) ou Descrição *</label>
              <input type="text" placeholder="Ex: SBGR ou Fazenda Santa Maria" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Tipo de Ocorrência *</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="perigo_potencial">Perigo Potencial</option>
                <option value="ocorrencia_anormal">Ocorrência Anormal</option>
                <option value="ocorrencia_solo">Ocorrência de Solo</option>
                <option value="incidente">Incidente</option>
                <option value="sugestao_seguranca">Sugestão de Segurança</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Aeronave Envolvida</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="">Nenhuma / Não se aplica</option>
                <option value="PT-KZM">PT-KZM (Cessna 182)</option>
                <option value="PP-HEL">PP-HEL (Robinson R44)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Descrição Detalhada do Evento *</label>
            <textarea 
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px]" 
              placeholder="Descreva o que aconteceu, a sequência dos eventos e como a situação foi gerenciada..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Fatores Contribuintes / Sugestões</label>
            <textarea 
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]" 
              placeholder="Na sua visão, o que contribuiu para o evento? Como podemos evitar que se repita?"
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-white/[0.02] border border-border/50 rounded-lg">
            <input type="checkbox" id="anonymous" className="w-4 h-4 rounded border-border bg-background" />
            <label htmlFor="anonymous" className="text-sm font-medium text-foreground cursor-pointer">
              Enviar anonimamente (Omitir minha identidade para a gestão)
            </label>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Link href="/dashboard/safety" className="btn-secondary">
              Cancelar
            </Link>
            <button className="btn-primary flex items-center gap-2">
              <Send className="w-4 h-4" />
              Submeter Reporte
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
