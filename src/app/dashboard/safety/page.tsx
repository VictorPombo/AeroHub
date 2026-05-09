'use client';

import { mockSafetyReports } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, AlertTriangle, FileWarning, Plus, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function SafetyDashboardPage() {
  const openReports = mockSafetyReports.filter(r => r.status !== 'closed' && r.status !== 'resolved');
  
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Segurança Operacional</h1>
          <p className="text-muted-foreground mt-1">Reportes voluntários (RCSV) e análise de risco.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/safety/new" className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Novo Reporte
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ocorrências Abertas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <span className="text-3xl font-bold">{openReports.length}</span>
              <AlertTriangle className="w-5 h-5 text-amber-500 mb-1" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Reportes Críticos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <span className="text-3xl font-bold text-aero-rose">
                {mockSafetyReports.filter(r => r.severity === 'high' || r.severity === 'critical').length}
              </span>
              <ShieldAlert className="w-5 h-5 text-aero-rose mb-1" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card bg-aero-cyan/5 border-aero-cyan/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-aero-cyan">Cultura de Segurança</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <span className="text-xl font-medium text-aero-cyan">{mockSafetyReports.length} reportes</span>
              <FileWarning className="w-5 h-5 text-aero-cyan mb-1" />
            </div>
            <p className="text-xs text-aero-cyan/70 mt-2">Neste ano</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Reportes Recentes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground bg-black/20 border-b border-border/50 uppercase">
                <tr>
                  <th className="px-6 py-4 font-medium">Data</th>
                  <th className="px-6 py-4 font-medium">Tipo</th>
                  <th className="px-6 py-4 font-medium">Severidade</th>
                  <th className="px-6 py-4 font-medium">Local</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Detalhes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {mockSafetyReports.map((report) => (
                  <tr key={report.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">{report.date_occurred}</td>
                    <td className="px-6 py-4 capitalize">{report.report_type.replace('_', ' ')}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={
                        report.severity === 'low' ? 'border-emerald-500/50 text-emerald-500' :
                        report.severity === 'medium' ? 'border-amber-500/50 text-amber-500' :
                        'border-aero-rose/50 text-aero-rose'
                      }>
                        {report.severity}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 font-medium">{report.location_icao || '-'}</td>
                    <td className="px-6 py-4">
                      <Badge className="bg-white/5 text-muted-foreground hover:bg-white/10">
                        {report.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-aero-cyan hover:underline flex items-center justify-end gap-1 ml-auto">
                        Ver <ChevronRight className="w-4 h-4" />
                      </button>
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
