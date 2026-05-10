'use client';

import { mockFinancialTransactions, mockInvoices } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Wallet, ArrowUpRight, ArrowDownRight, Clock, ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function FinancialDashboardPage() {
  const txns = mockFinancialTransactions;
  const invoices = mockInvoices;

  // Calculos simples
  const totalIncome = txns.filter(t => t.type === 'income' && t.status === 'paid').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = txns.filter(t => t.type === 'expense' && t.status === 'paid').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpense;
  
  const pendingInvoicesAmount = invoices.filter(i => i.status === 'sent' || i.status === 'overdue').reduce((acc, i) => acc + i.amount, 0);

  return (
    <div className="space-y-6">
      
      {/* KPIs Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Card className="glass border-border/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Saldo Atual</p>
                <h3 className={cn("text-3xl font-bold font-mono", balance >= 0 ? "text-emerald-500" : "text-aero-rose")}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(balance)}
                </h3>
              </div>
              <div className={cn("p-3 rounded-xl", balance >= 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-aero-rose/10 text-aero-rose")}>
                <Wallet className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Receitas (Pagas)</p>
                <h3 className="text-2xl font-bold font-mono text-emerald-500">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(totalIncome)}
                </h3>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Despesas (Pagas)</p>
                <h3 className="text-2xl font-bold font-mono text-aero-rose">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(totalExpense)}
                </h3>
              </div>
              <div className="p-3 bg-aero-rose/10 rounded-xl text-aero-rose">
                <ArrowDownRight className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-aero-amber/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-aero-amber/5 to-transparent" />
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">A Receber (Faturas)</p>
                <h3 className="text-2xl font-bold font-mono text-aero-amber">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(pendingInvoicesAmount)}
                </h3>
              </div>
              <div className="p-3 bg-aero-amber/10 rounded-xl text-aero-amber">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Ultimas Transacoes */}
        <Card className="glass border-border/50">
          <CardHeader className="pb-3 border-b border-border/30">
            <CardTitle className="text-lg flex items-center gap-2">
              <LineChart className="w-5 h-5 text-emerald-500" />
              Últimas Transações
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/30">
              {txns.slice(0, 4).map(txn => (
                <div key={txn.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg", txn.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-aero-rose/10 text-aero-rose')}>
                      {txn.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className="font-bold text-foreground">{txn.description}</span>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(txn.date).toLocaleDateString('pt-BR')} • <span className="uppercase">{txn.category.replace('_', ' ')}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={cn("font-bold font-mono", txn.type === 'income' ? 'text-emerald-500' : 'text-foreground')}>
                      {txn.type === 'income' ? '+' : '-'} {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(txn.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border/30 bg-white/[0.01]">
              <Link href="/dashboard/financial/transactions">
                <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-emerald-500 justify-between">
                  Ver extrato completo <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Faturas em Aberto */}
        <Card className="glass border-border/50">
          <CardHeader className="pb-3 border-b border-border/30">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              Contas a Receber (Invoices)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/30">
              {invoices.filter(i => i.status !== 'paid').map(inv => (
                <div key={inv.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                  <div>
                    <span className="font-bold text-foreground">{inv.client_name}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Vencimento: {new Date(inv.due_date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold font-mono text-aero-amber">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(inv.amount)}
                    </span>
                    <p className="text-[10px] uppercase font-bold text-aero-amber tracking-wider mt-1 text-right">
                      {inv.status === 'sent' ? 'Aguardando' : inv.status}
                    </p>
                  </div>
                </div>
              ))}
              {invoices.filter(i => i.status !== 'paid').length === 0 && (
                 <div className="p-6 text-center text-muted-foreground">Nenhuma fatura em aberto.</div>
              )}
            </div>
            <div className="p-3 border-t border-border/30 bg-white/[0.01]">
              <Link href="/dashboard/financial/invoices">
                <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-emerald-500 justify-between">
                  Gerenciar Faturamentos <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}
