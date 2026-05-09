'use client';

import { useAuth } from '@/contexts/AuthContext';
import { mockPilotCredentials, mockPilotFlightHours } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import Link from 'next/link';

export default function PilotProfilePage() {
  const { user } = useAuth();
  
  // Calculate expiry status
  const cma = mockPilotCredentials.find(c => c.credential_type === 'cma');
  const typeRatings = mockPilotCredentials.filter(c => c.credential_type === 'habilitacao_tipo');
  
  // Flight hours logic
  const limits = {
    daily: 11,
    weekly: 35,
    monthly: 90,
    yearly: 900
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tripulação</h1>
          <p className="text-muted-foreground mt-1">Gestão de habilitações e horas de voo.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/pilot-profile/credentials" className="btn-primary">
            Gerenciar Credenciais
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Col 1: Status & Credentials */}
        <div className="space-y-6">
          <Card className="glass-card border-aero-cyan/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Status Operacional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center mb-6">
                <span className="text-emerald-500 font-semibold text-lg">Apto para Voo</span>
                <p className="text-sm text-emerald-500/80 mt-1">CMA e habilitações válidas</p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-muted-foreground">CMA (Certificado Médico)</span>
                    <Badge variant={cma?.status === 'valid' ? 'default' : 'destructive'} className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
                      Válido
                    </Badge>
                  </div>
                  <div className="text-sm border border-border/50 rounded-md p-3 bg-white/[0.02]">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Emissão:</span>
                      <span>{cma?.issued_date}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-muted-foreground">Validade:</span>
                      <span className="text-foreground font-medium">{cma?.expiry_date}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Habilitações de Tipo Ativas</span>
                  </div>
                  {typeRatings.map(rating => (
                    <div key={rating.id} className="text-sm border border-border/50 rounded-md p-3 bg-white/[0.02] mb-2 flex justify-between items-center">
                      <div>
                        <div className="font-medium">{rating.description.replace('Habilitação de Tipo: ', '')}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Vence: {rating.expiry_date}</div>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">Válido</Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <Link href="/dashboard/pilot-profile/credentials" className="w-full flex items-center justify-center gap-2 text-sm text-aero-cyan mt-4 hover:underline">
                Ver todas <ChevronRight className="w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Col 2 & 3: Flight Hours */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-aero-cyan" />
                Limites Regulatórios (RBAC 91/135)
              </CardTitle>
              <CardDescription>Acompanhamento de horas voadas para evitar fadiga e infrações.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-4">
                
                {/* 24h Limit */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Últimas 24h</span>
                    <span className="text-muted-foreground">
                      <span className="text-foreground font-medium">{mockPilotFlightHours.last_24h_hours}h</span> / {limits.daily}h
                    </span>
                  </div>
                  <Progress 
                    value={(mockPilotFlightHours.last_24h_hours / limits.daily) * 100} 
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground mt-2">Limite diário de jornada.</p>
                </div>

                {/* 30d Limit */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Últimos 30 dias</span>
                    <span className="text-muted-foreground">
                      <span className="text-foreground font-medium">{mockPilotFlightHours.last_30d_hours}h</span> / {limits.monthly}h
                    </span>
                  </div>
                  <Progress 
                    value={(mockPilotFlightHours.last_30d_hours / limits.monthly) * 100} 
                    className="h-2 bg-aero-cyan"
                  />
                  <p className="text-xs text-muted-foreground mt-2">Limite mensal regulatório.</p>
                </div>

                {/* 90d Limit */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Últimos 90 dias</span>
                    <span className="text-foreground font-medium">{mockPilotFlightHours.last_90d_hours}h</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">Experiência recente (necessário 3 pousos/decolagens).</p>
                </div>

                {/* 12m Limit */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Últimos 12 meses</span>
                    <span className="text-muted-foreground">
                      <span className="text-foreground font-medium">{mockPilotFlightHours.last_12m_hours}h</span> / {limits.yearly}h
                    </span>
                  </div>
                  <Progress 
                    value={(mockPilotFlightHours.last_12m_hours / limits.yearly) * 100} 
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground mt-2">Limite anual regulatório.</p>
                </div>

              </div>

              <div className="mt-8 p-4 bg-aero-cyan/5 border border-aero-cyan/10 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-aero-cyan/10 rounded-md">
                    <Activity className="w-5 h-5 text-aero-cyan" />
                  </div>
                  <div>
                    <h4 className="font-medium">Total de Horas Voadas na Vida</h4>
                    <p className="text-sm text-muted-foreground">Desde o início da carreira</p>
                  </div>
                </div>
                <div className="text-2xl font-bold tracking-tight">{mockPilotFlightHours.total_hours}h</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
