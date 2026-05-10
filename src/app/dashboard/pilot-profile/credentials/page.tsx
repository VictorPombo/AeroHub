'use client';

import { useState } from 'react';
import { mockPilotCredentials } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileBadge, Plus, Upload, Save } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CredentialsPage() {
  const [open, setOpen] = useState(false);
  const [, forceUpdate] = useState(0);

  // Form State
  const [type, setType] = useState('cma');
  const [desc, setDesc] = useState('');
  const [auth, setAuth] = useState('ANAC');
  const [docNum, setDocNum] = useState('');
  const [issued, setIssued] = useState('');
  const [expiry, setExpiry] = useState('');

  function handleSave() {
    mockPilotCredentials.push({
      id: `cred_${Date.now()}`,
      user_id: 'usr_001',
      credential_type: type as any,
      description: desc || (type === 'cma' ? 'Certificado Médico Aeronáutico' : 'Nova Credencial'),
      issuing_authority: auth,
      document_number: docNum,
      issued_date: issued,
      expiry_date: expiry,
      status: 'valid'
    });
    setOpen(false);
    forceUpdate(n => n + 1);
  }

  function getStatus(expiryDate: string) {
    if (!expiryDate) return { label: 'Válido', className: 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' };
    
    const diff = new Date(expiryDate).getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days < 0) {
      return { label: 'Vencido', className: 'bg-aero-rose/10 text-aero-rose border-aero-rose/20' };
    }
    if (days <= 30) {
      return { label: 'Vencendo', className: 'bg-aero-amber/10 text-aero-amber border-aero-amber/20' };
    }
    return { label: 'Válido', className: 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' };
  }

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
        <button onClick={() => setOpen(true)} className="btn-primary flex items-center gap-2">
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
                {mockPilotCredentials.map((cred) => {
                  const st = getStatus(cred.expiry_date ?? '');
                  return (
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
                        <Badge className={st.className}>
                          {st.label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-xs font-medium text-aero-cyan hover:underline flex items-center justify-end gap-1 ml-auto">
                          <Upload className="w-3 h-3" /> Atualizar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nova Credencial</DialogTitle>
            <DialogDescription>
              Adicione um novo certificado ou habilitação.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Tipo de Credencial</Label>
              <Select value={type} onValueChange={(v) => v && setType(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cma">CMA - Certificado Médico</SelectItem>
                  <SelectItem value="habilitacao_tipo">Habilitação de Tipo (HT)</SelectItem>
                  <SelectItem value="habilitacao_classe">Habilitação de Classe (MNTE/MLTE)</SelectItem>
                  <SelectItem value="habilitacao_ifr">Habilitação IFR</SelectItem>
                  <SelectItem value="proficiencia_linguistica">Proficiência Linguística (ICAO)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Descrição (Ex: Habilitação C182)</Label>
              <Input
                value={desc}
                onChange={e => setDesc(e.target.value)}
                placeholder="Ex: Habilitação de Tipo: C182"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nº do Documento</Label>
                <Input
                  value={docNum}
                  onChange={e => setDocNum(e.target.value)}
                  placeholder="Ex: 123456"
                />
              </div>
              <div className="space-y-2">
                <Label>Órgão Emissor</Label>
                <Input
                  value={auth}
                  onChange={e => setAuth(e.target.value)}
                  placeholder="ANAC"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data de Emissão</Label>
                <Input
                  type="date"
                  value={issued}
                  onChange={e => setIssued(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Data de Validade</Label>
                <Input
                  type="date"
                  value={expiry}
                  onChange={e => setExpiry(e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <button onClick={() => setOpen(false)} className="px-4 py-2 text-sm border border-border/50 rounded-lg hover:bg-white/[0.05]">
              Cancelar
            </button>
            <button onClick={handleSave} className="btn-primary flex items-center gap-2">
              <Save className="w-4 h-4" /> Salvar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
