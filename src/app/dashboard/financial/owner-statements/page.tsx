'use client';

import { mockOwnerStatements, mockAircraft } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Send, CheckCircle2, FileText, Plane, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function OwnerStatementsPage() {
  const statements = mockOwnerStatements;

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Rateio de Proprietários / Cotistas</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="bg-white/[0.02] border-border/50 text-foreground">
            Gerar Fechamento do Mês
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {statements.map(stmt => {
          const aircraft = mockAircraft.find(a => a.id === stmt.aircraft_id);
          const monthName = new Date(stmt.year, stmt.month - 1).toLocaleString('pt-BR', { month: 'long' });

          return (
            <Card key={stmt.id} className="glass hover:bg-white/[0.02] transition-colors border-border/50">
              <CardHeader className="pb-4 border-b border-border/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/[0.05] rounded-xl text-foreground border border-border/50">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{stmt.owner_name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="bg-white/[0.02] text-xs font-mono border-border/50">
                          {stmt.fraction_percentage}% Cota
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Plane className="w-3.5 h-3.5" /> {aircraft?.registration}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-sm font-medium capitalize flex items-center justify-end gap-1.5 text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" /> {monthName} {stmt.year}
                      </span>
                    </div>
                    <Badge variant="outline" className={cn("px-2.5 py-1 text-xs uppercase tracking-wider", stmt.status === 'paid' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-aero-cyan/10 text-aero-cyan border-aero-cyan/20")}>
                      {stmt.status === 'paid' ? 'Pago' : 'Enviado'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border/30">
                  
                  <div className="p-5">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-1">Horas Voadas (Uso)</span>
                    <span className="text-2xl font-mono font-bold text-foreground">
                      {stmt.flight_hours_used} <span className="text-sm text-muted-foreground">h</span>
                    </span>
                  </div>
                  
                  <div className="p-5">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-1">Custos Fixos (Cota)</span>
                    <span className="text-lg font-mono font-bold text-muted-foreground">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stmt.fixed_costs_share)}
                    </span>
                  </div>

                  <div className="p-5">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-1">Custos Variáveis (Uso)</span>
                    <span className="text-lg font-mono font-bold text-muted-foreground">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stmt.variable_costs_share)}
                    </span>
                  </div>

                  <div className="p-5 bg-white/[0.01]">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-aero-cyan mb-1">Total a Pagar</span>
                    <span className="text-3xl font-mono font-bold text-aero-cyan block mb-3">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stmt.total_due)}
                    </span>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="w-full text-xs h-8">
                        <FileText className="w-3.5 h-3.5 mr-1.5" /> Extrato
                      </Button>
                      {stmt.status !== 'paid' && (
                        <Button variant="ghost" size="sm" className="w-full text-xs h-8 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Recebido
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
