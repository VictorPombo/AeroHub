'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Shield, Download, Trash2, Key, Mail, Fingerprint } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <User className="w-6 h-6 text-aero-cyan" />
          Perfil & LGPD
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Gerencie seus dados pessoais, credenciais e preferências de privacidade.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dados Pessoais */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" />
              Informações Pessoais
            </CardTitle>
            <CardDescription>Atualize seus dados de contato e identificação.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nome Completo</Label>
              <Input defaultValue={user?.full_name} className="bg-black/20 border-border/50" />
            </div>
            <div className="space-y-2">
              <Label>E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input defaultValue={user?.email} className="pl-9 bg-black/20 border-border/50" disabled />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Código ANAC (CANAC)</Label>
              <Input defaultValue={user?.canac} className="bg-black/20 border-border/50" />
            </div>
            <Button className="w-full bg-aero-cyan hover:bg-aero-cyan-light text-aero-navy font-bold mt-2">
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Segurança */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                Segurança da Conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-border/50">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Senha</p>
                    <p className="text-xs text-muted-foreground">Última alteração há 3 meses</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-border/50 bg-transparent text-xs">
                  Alterar
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-border/50">
                <div className="flex items-center gap-3">
                  <Fingerprint className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Autenticação 2FA</p>
                    <p className="text-xs text-aero-emerald">Ativado</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-border/50 bg-transparent text-xs">
                  Gerenciar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Privacidade & LGPD */}
          <Card className="glass border-rose-500/20">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 text-rose-400">
                <Shield className="w-5 h-5" />
                Privacidade & LGPD
              </CardTitle>
              <CardDescription>Controle de dados sensíveis conforme a Lei Geral de Proteção de Dados.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2 border-border/50 bg-transparent hover:bg-white/5">
                <Download className="w-4 h-4 text-blue-400" />
                Exportar Meus Dados (JSON)
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 border-rose-500/20 bg-rose-500/5 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300">
                <Trash2 className="w-4 h-4" />
                Solicitar Exclusão de Conta
              </Button>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Para dúvidas sobre o tratamento dos seus dados, entre em contato com nosso DPO em dpo@aerogest.app
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
