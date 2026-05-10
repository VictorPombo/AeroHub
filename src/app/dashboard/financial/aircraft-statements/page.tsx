'use client';

import { mockAircraftStatementSummaries, mockAircraft } from '@/lib/mock-data';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Plane, Calendar, TrendingUp, TrendingDown, Clock, BarChart3, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function AircraftStatementsPage() {
  const statements = mockAircraftStatementSummaries;

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Demonstrativo de Resultado (DRE por Cauda)</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="bg-white/[0.02] border-border/50 text-foreground">
            <Download className="w-4 h-4 mr-2" /> Relatório Consolidado
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {statements.map(stmt => {
          const aircraft = mockAircraft.find(a => a.id === stmt.aircraft_id);
          const monthName = new Date(stmt.year, stmt.month - 1).toLocaleString('pt-BR', { month: 'long' });
          const isProfit = stmt.gross_profit >= 0;

          return (
            <Card key={`${stmt.aircraft_id}-${stmt.month}`} className="glass hover:bg-white/[0.02] transition-colors border-border/50 overflow-hidden">
              <CardHeader className="pb-4 border-b border-border/30 bg-white/[0.01]">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-aero-cyan/10 rounded-xl text-aero-cyan border border-aero-cyan/20">
                      <Plane className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-mono text-foreground">{aircraft?.registration}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{aircraft?.model}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="capitalize text-xs font-medium text-muted-foreground bg-white/[0.02] border-border/50">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" /> {monthName} {stmt.year}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="p-5 flex items-center justify-between border-b border-border/30">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" /> Horas Voadas no Mês
                  </div>
                  <span className="text-xl font-bold font-mono">{stmt.total_flight_hours} h</span>
                </div>

                <div className="grid grid-cols-2 divide-x divide-border/30 border-b border-border/30">
                  
                  {/* Receitas */}
                  <div className="p-5">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Receita Bruta (Voos)
                    </span>
                    <span className="text-2xl font-mono font-bold text-emerald-500">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(stmt.total_revenue)}
                    </span>
                  </div>
                  
                  {/* Despesas */}
                  <div className="p-5">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                      <TrendingDown className="w-3.5 h-3.5 text-aero-rose" /> Custos Operacionais
                    </span>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Fixos</span>
                        <span className="font-mono text-aero-rose">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(stmt.fixed_costs)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Variáveis</span>
                        <span className="font-mono text-aero-rose">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(stmt.variable_costs)}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Gross Profit */}
                <div className={cn("p-5 flex items-center justify-between", isProfit ? "bg-emerald-500/5" : "bg-aero-rose/5")}>
                  <div className="flex items-center gap-2">
                    <BarChart3 className={cn("w-5 h-5", isProfit ? "text-emerald-500" : "text-aero-rose")} />
                    <span className={cn("font-bold", isProfit ? "text-emerald-500" : "text-aero-rose")}>
                      Resultado Líquido (DRE)
                    </span>
                  </div>
                  <span className={cn("text-3xl font-bold font-mono", isProfit ? "text-emerald-500" : "text-aero-rose")}>
                    {isProfit ? '+' : ''}{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(stmt.gross_profit)}
                  </span>
                </div>

              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
