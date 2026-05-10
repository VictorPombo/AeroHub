'use client';

import { mockFinancialTransactions } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowDownRight, ArrowUpRight, Search, Plus, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function TransactionsPage() {
  const txns = mockFinancialTransactions;

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Contas a Pagar e Receber</h2>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar transação..." className="pl-9 bg-white/[0.02] border-border/50" />
          </div>
          <Button variant="outline" className="bg-white/[0.02] border-border/50">
            <Filter className="w-4 h-4 mr-2" /> Filtros
          </Button>
          <Button variant="outline" className="bg-white/[0.02] border-border/50">
            <Download className="w-4 h-4 mr-2" /> Exportar
          </Button>
          <Button className="bg-emerald-500 text-white hover:bg-emerald-600 shrink-0">
            <Plus className="w-4 h-4 mr-2" /> Lançamento
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {txns.map(txn => {
          const isIncome = txn.type === 'income';

          return (
            <Card key={txn.id} className="glass hover:bg-white/[0.02] transition-colors group">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  {/* Txn Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className={cn("p-3 rounded-xl shrink-0 mt-1", isIncome ? "bg-emerald-500/10 text-emerald-500" : "bg-aero-rose/10 text-aero-rose")}>
                      {isIncome ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-lg text-foreground">{txn.description}</span>
                        <Badge variant="outline" className={cn("uppercase text-[10px] tracking-wider", txn.status === 'paid' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-aero-amber/10 text-aero-amber border-aero-amber/20")}>
                          {txn.status === 'paid' ? 'Pago/Recebido' : 'Pendente'}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-xs text-muted-foreground">
                        <span>Data: {new Date(txn.date).toLocaleDateString('pt-BR')}</span>
                        <span className="uppercase font-mono bg-white/[0.05] px-2 py-0.5 rounded border border-border/30">
                          {txn.category.replace('_', ' ')}
                        </span>
                        {txn.aircraft_id && (
                          <span className="text-aero-cyan">Aeronave: {txn.aircraft_id}</span>
                        )}
                        {txn.payment_method && (
                          <span>Método: {txn.payment_method}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="md:text-right border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 pl-0 md:pl-6">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Valor</span>
                    <span className={cn("text-2xl font-mono font-bold mt-1 block", isIncome ? "text-emerald-500" : "text-foreground")}>
                      {isIncome ? '+' : '-'} {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(txn.amount)}
                    </span>
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
