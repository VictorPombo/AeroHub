'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, Download, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/profile" className="p-2 bg-white/[0.02] border border-border/50 rounded-lg hover:bg-white/[0.05] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Privacidade e LGPD</h1>
          <p className="text-sm text-muted-foreground">Gerencie seus dados pessoais e preferências de privacidade</p>
        </div>
      </div>

      <Card className="glass-card border-aero-cyan/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-aero-cyan" />
            Termos e Consentimento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-aero-cyan/5 border border-aero-cyan/20 rounded-lg">
            <p className="text-sm text-foreground">
              Você aceitou os Termos de Uso e a Política de Privacidade (v1.0) em <strong>15/01/2026</strong>.
            </p>
          </div>
          
          <div className="text-sm text-muted-foreground space-y-2">
            <p>O AeroGest processa os seguintes dados pessoais:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Dados de perfil (Nome, E-mail, CANAC, CPF) para identificação.</li>
              <li>Dados de saúde (Certificado Médico Aeronáutico) e proficiência, exigidos para validação de voo.</li>
              <li>Histórico de voos (localização, data/hora), armazenados para cumprimento de obrigação legal/regulatória (Resolução 457/2017 da ANAC).</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Portabilidade de Dados</CardTitle>
          <CardDescription>
            Você tem o direito de solicitar uma cópia de todos os seus dados pessoais armazenados em nossos servidores.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar Meus Dados (JSON)
          </button>
        </CardContent>
      </Card>

      <Card className="glass-card border-aero-rose/20">
        <CardHeader>
          <CardTitle className="text-lg text-aero-rose">Exclusão de Conta</CardTitle>
          <CardDescription>
            A exclusão da conta é permanente. Seus dados pessoais e credenciais serão apagados. 
            No entanto, seus registros de voo (Diário de Bordo) serão mantidos de forma <strong>anonimizada</strong> para cumprimento de obrigações regulatórias da aeronave.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <button className="btn-primary bg-aero-rose hover:bg-aero-rose/90 text-white flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Solicitar Exclusão Definitiva
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
