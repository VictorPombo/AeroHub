'use client';

import { mockPilotCredentials } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileBadge, Plus, Upload } from 'lucide-react';
import Link from 'next/link';

export default function CredentialsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/pilot-profile" className="p-2 bg-white/[0.02] border border-border/50 rounded-lg hover:bg-white/[0.05] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Credenciais do Piloto</h1>
          <p className="text-sm text-muted-foreground">Gerencie CMA, Habilitações e Certificados</p>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Adicionar Credencial
        </button>
      </div>

      <Card className="glass-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground bg-black/20 border-b border-border/50 uppercase">
                <tr>
                  <th className="px-6 py-4 font-medium">Documento</th>
                  <th className="px-6 py-4 font-medium">Órgão Emissor</th>
                  <th className="px-6 py-4 font-medium">Emissão</th>
                  <th className="px-6 py-4 font-medium">Validade</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {mockPilotCredentials.map((cred) => (
                  <tr key={cred.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-medium flex items-center gap-3">
                      <FileBadge className="w-4 h-4 text-aero-cyan" />
                      {cred.description}
                      {cred.document_number && (
                        <span className="text-xs text-muted-foreground ml-2">({cred.document_number})</span>
                      )}
                    </td>
                    <td className="px-6 py-4">{cred.issuing_authority}</td>
                    <td className="px-6 py-4">{cred.issued_date}</td>
                    <td className="px-6 py-4 font-medium">{cred.expiry_date}</td>
                    <td className="px-6 py-4">
                      <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
                        Válido
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-xs font-medium text-aero-cyan hover:underline flex items-center justify-end gap-1 ml-auto">
                        <Upload className="w-3 h-3" /> Atualizar
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
