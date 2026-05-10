'use client';

import { useAuth } from '@/contexts/AuthContext';
import { mockPilotCredentials, mockPilotFlightHours } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle2, ChevronRight, Activity, CalendarClock, Target, Plane, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function PilotProfilePage() {
  const { user } = useAuth();
  
  // Calculate expiry status
  const cma = mockPilotCredentials.find(c => c.credential_type === 'cma');
  const typeRatings = mockPilotCredentials.filter(c => c.credential_type === 'habilitacao_tipo');
  const language = mockPilotCredentials.find(c => c.credential_type === 'proficiencia_linguistica');
  
  // Flight hours logic
  const limits = {
    daily: 11,
    weekly: 35,
    monthly: 90,
    yearly: 900
  };

  const hubLinks = [
    {
      title: 'Jornada e Fadiga',
      description: 'Controle de turnos, check-in e limites de descanso (RBAC 135/91).',
      href: '/dashboard/pilot-profile/duty',
      icon: CalendarClock,
      color: 'text-aero-cyan',
      bg: 'bg-aero-cyan/10',
      border: 'border-aero-cyan/20'
    },
    {
      title: 'Experiência Recente',
      description: 'Acompanhamento de pousos (Dia/Noite) e proficiência IFR em 6 meses.',
      href: '/dashboard/pilot-profile/experience',
      icon: Target,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20'
    },
    {
      title: 'Horas por Modelo',
      description: 'Desdobramento das horas voadas por modelo e categoria de aeronave.',
      href: '/dashboard/pilot-profile/hours-by-type',
      icon: Plane,
      color: 'text-aero-amber',
      bg: 'bg-aero-amber/10',
      border: 'border-aero-amber/20'
    },
    {
      title: 'Treinamentos',
      description: 'Cursos, certificados (Ground School, CRM) e vencimentos.',
      href: '/dashboard/pilot-profile/training',
      icon: GraduationCap,
      color: 'text-indigo-400',
      bg: 'bg-indigo-400/10',
      border: 'border-indigo-400/20'
    },
    {
      title: 'Agenda de Voos',
      description: 'Próximos voos marcados e status de disponibilidade.',
      href: '/dashboard/pilot-profile/schedule',
      icon: CalendarClock,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tripulação</h1>
          <p className="text-muted-foreground mt-1">Seu hub central de operações, experiência e treinamentos.</p>
        </div>
      </div>

      {/* Hub Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {hubLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href}>
              <Card className={cn("glass hover:bg-white/[0.03] transition-all cursor-pointer h-full border border-border/50")}>
                <CardContent className="p-6 flex flex-col h-full">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", link.bg, link.border, "border")}>
                    <Icon className={cn("w-6 h-6", link.color)} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{link.title}</h3>
                  <p className="text-sm text-muted-foreground mt-auto">{link.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Col 1: Status & Credentials */}
        <div className="space-y-6">
          <Card className="glass-card border-aero-cyan/20">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Status Operacional
              </CardTitle>
              <Link href="/dashboard/pilot-profile/credentials">
                <Badge variant="outline" className="hover:bg-white/5 cursor-pointer">Ver Todas</Badge>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center mb-6">
                <span className="text-emerald-500 font-semibold text-lg">Apto para Voo</span>
                <p className="text-sm text-emerald-500/80 mt-1">Credenciais e treinamentos em dia</p>
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
                    <span className="text-sm font-medium text-muted-foreground">Proficiência Linguística</span>
                    {language ? (
                      <Badge className="bg-aero-cyan/10 text-aero-cyan hover:bg-aero-cyan/20">Nível {language.language_level}</Badge>
                    ) : (
                      <Badge variant="outline">Pendente</Badge>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Habilitações de Tipo</span>
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
              
            </CardContent>
          </Card>
        </div>

        {/* Col 2 & 3: Flight Hours Overview */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-aero-cyan" />
                  Limites Regulatórios (RBAC 91/135)
                </CardTitle>
                <CardDescription>Acompanhamento de horas voadas para evitar fadiga.</CardDescription>
              </div>
              <Link href="/dashboard/pilot-profile/duty">
                <Badge variant="outline" className="bg-aero-cyan/10 text-aero-cyan border-aero-cyan/30 hover:bg-aero-cyan/20 cursor-pointer">
                  Ver Jornada Atual
                </Badge>
              </Link>
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
                  <p className="text-xs text-muted-foreground mt-2">Limite diário de voo.</p>
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
