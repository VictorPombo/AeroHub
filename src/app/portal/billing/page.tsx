'use client';

import { mockOwnerStatements, mockAircraft } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle2, Clock, AlertTriangle, Download, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function PortalBillingPage() {
  const myStatements = mockOwnerStatements.filter(s => s.owner_name === 'Dr. Roberto Almeida').sort((a, b) => b.month - a.month);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'paid': return { label: 'Pago', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', icon: CheckCircle2 };
      case 'sent': return { label: 'Aguardando Pagamento', color: 'bg-aero-amber/10 text-aero-amber border-aero-amber/20', icon: Clock };
      default: return { label: status, color: 'bg-white/[0.05] text-muted-foreground', icon: AlertTriangle };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-xl font-semibold">Faturas e Extratos (Rateio)</h2>
          <p className="text-sm text-muted-foreground">Seus custos de operação e hangaragem.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {myStatements.map(stmt => {
          const config = getStatusConfig(stmt.status);
          const Icon = config.icon;
          const monthName = new Date(stmt.year, stmt.month - 1).toLocaleString('pt-BR', { month: 'long' });

          return (
            <Card key={stmt.id} className={cn("glass hover:bg-white/[0.02] transition-colors border-border/50", stmt.status === 'sent' && "border-aero-amber/30")}>
              <CardHeader className="pb-4 border-b border-border/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2.5 rounded-xl border", stmt.status === 'sent' ? "bg-aero-amber/10 text-aero-amber border-aero-amber/20" : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20")}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg capitalize">Fechamento Mensal — {monthName} {stmt.year}</CardTitle>
                      <div className="text-sm text-muted-foreground mt-1">
                        Cota: {stmt.fraction_percentage}%
                      </div>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className={cn("px-2.5 py-1 text-xs uppercase tracking-wider flex items-center gap-1.5", config.color)}>
                    <Icon className="w-3.5 h-3.5" /> {config.label}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border/30">
                  
                  <div className="p-5">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-1">Seu Uso (Variável)</span>
                    <span className="text-xl font-mono font-bold text-foreground">
                      {stmt.flight_hours_used} <span className="text-sm text-muted-foreground">h</span>
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stmt.variable_costs_share)}
                    </p>
                  </div>
                  
                  <div className="p-5">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-1">Cota Fixa (Sua Fração)</span>
                    <span className="text-lg font-mono font-bold text-muted-foreground">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stmt.fixed_costs_share)}
                    </span>
                  </div>

                  <div className="p-5">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-1">Taxa de Gestão</span>
                    <span className="text-lg font-mono font-bold text-muted-foreground">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stmt.management_fee || 0)}
                    </span>
                  </div>

                  <div className={cn("p-5", stmt.status === 'sent' ? "bg-aero-amber/5" : "bg-white/[0.01]")}>
                    <span className={cn("block text-[10px] uppercase font-bold tracking-wider mb-1", stmt.status === 'sent' ? "text-aero-amber" : "text-muted-foreground")}>Total da Fatura</span>
                    <span className={cn("text-3xl font-mono font-bold block mb-3", stmt.status === 'sent' ? "text-aero-amber" : "text-foreground")}>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stmt.total_due)}
                    </span>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="w-full text-xs h-8 bg-white/[0.02]">
                        <Download className="w-3.5 h-3.5 mr-1.5" /> PDF
                      </Button>
                      {stmt.status === 'sent' && (
                        <Button size="sm" className="w-full text-xs h-8 bg-aero-amber text-aero-navy hover:bg-aero-amber/90">
                          <CreditCard className="w-3.5 h-3.5 mr-1.5" /> Pagar
                        </Button>
                      )}
                    </div>
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
