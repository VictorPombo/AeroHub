'use client';

import { mockInvoices } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Search, Send, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function InvoicesPage() {
  const invoices = mockInvoices;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'draft': return { label: 'Rascunho', color: 'text-muted-foreground bg-white/[0.05] border-border/50', icon: FileText };
      case 'sent': return { label: 'Enviado', color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20', icon: Send };
      case 'paid': return { label: 'Pago', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle2 };
      case 'overdue': return { label: 'Atrasado', color: 'text-aero-rose bg-aero-rose/10 border-aero-rose/20', icon: Clock };
      default: return { label: status, color: 'text-muted-foreground bg-white/[0.05]', icon: FileText };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Faturamento (Invoices)</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar cliente ou número..." className="pl-9 bg-white/[0.02] border-border/50" />
          </div>
          <Button className="bg-aero-cyan text-aero-navy hover:bg-aero-cyan-light shrink-0">
            <Plus className="w-4 h-4 mr-2" /> Nova Fatura
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {invoices.map(inv => {
          const config = getStatusConfig(inv.status);
          const Icon = config.icon;

          return (
            <Card key={inv.id} className="glass hover:bg-white/[0.02] transition-colors group">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  {/* Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-white/[0.02] border border-border/50 rounded-xl shrink-0 mt-1">
                      <FileText className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-lg font-bold text-foreground">{inv.invoice_number}</span>
                        <Badge variant="outline" className={cn("flex items-center gap-1.5", config.color)}>
                          <Icon className="w-3.5 h-3.5" /> {config.label}
                        </Badge>
                      </div>
                      
                      <p className="font-bold text-foreground text-lg mt-2">{inv.client_name}</p>
                      {inv.client_document && (
                        <p className="text-xs font-mono text-muted-foreground mt-0.5">Doc: {inv.client_document}</p>
                      )}
                      
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-xs text-muted-foreground">
                        <span>Emissão: {new Date(inv.issue_date).toLocaleDateString('pt-BR')}</span>
                        <span className={cn(inv.status === 'overdue' ? 'text-aero-rose font-bold' : '')}>
                          Vencimento: {new Date(inv.due_date).toLocaleDateString('pt-BR')}
                        </span>
                        {inv.flight_id && (
                          <span className="text-aero-cyan">Voo Relacionado: {inv.flight_id}</span>
                        )}
                      </div>

                      {inv.notes && (
                        <p className="text-xs text-muted-foreground mt-3 bg-white/[0.02] p-2 rounded border border-border/30 max-w-xl">
                          {inv.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Financials */}
                  <div className="md:text-right border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 pl-0 md:pl-6">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Valor Cobrado</span>
                    <span className="text-2xl font-mono font-bold text-foreground mt-1 block">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(inv.amount)}
                    </span>
                    
                    <div className="mt-4 flex flex-col md:items-end gap-2">
                      <Button variant="outline" size="sm" className="w-full md:w-auto h-8 text-xs">
                        Visualizar PDF
                      </Button>
                      {inv.status !== 'paid' && (
                        <Button variant="ghost" size="sm" className="w-full md:w-auto h-8 text-xs text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Marcar como Pago
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
