'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, Briefcase, Plane, ExternalLink, Settings, Save, X, DollarSign, TrendingUp, Users, CalendarDays, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { mockAircraft } from '@/lib/mock-data';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

export default function CommercialDashboardPage() {
  const companySlug = 'aerogest-demo';
  const bookingLink = `http://localhost:3001/book/${companySlug}`;
  
  const [copied, setCopied] = useState(false);
  const [editingAircraft, setEditingAircraft] = useState<typeof mockAircraft[0] | null>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bookingLink);
    setCopied(true);
    toast.success('Link copiado!', { description: 'Agora você pode colar e enviar ao cliente.' });
    setTimeout(() => setCopied(false), 2000);
  };

  const getMockPricing = (type: string) => {
    if (type === 'helicopter') return { val: 4500, margin: '30%', min: '1.0' };
    return { val: 2500, margin: '25%', min: '2.0' };
  };

  const mockQuotes = [
    { id: '1', date: 'Hoje, 09:30', client: 'Roberto Silva', route: 'SBSP ✈️ SBBR', value: 'R$ 15.400', status: 'approved' },
    { id: '2', date: 'Ontem, 14:15', client: 'Marina Costa', route: 'SBJR ✈️ SBBH', value: 'R$ 8.900', status: 'pending' },
    { id: '3', date: '12 Mai, 10:00', client: 'Grupo Alpha', route: 'SBGR ✈️ SBGL', value: 'R$ 12.500', status: 'pending' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-500">Vendas & Fretamento</h1>
          <p className="text-muted-foreground mt-1">Gestão de precificação e portal comercial B2C.</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card border-border/50 hover:bg-white/[0.02] transition-colors overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          <CardContent className="p-5 flex items-center gap-4 relative z-10">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Faturamento Previsto</p>
              <p className="text-2xl font-bold font-mono">R$ 145.800</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-border/50 hover:bg-white/[0.02] transition-colors overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          <CardContent className="p-5 flex items-center gap-4 relative z-10">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Cotações Ativas</p>
              <p className="text-2xl font-bold font-mono">12</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-border/50 hover:bg-white/[0.02] transition-colors overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          <CardContent className="p-5 flex items-center gap-4 relative z-10">
            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Conversão (Mês)</p>
              <p className="text-2xl font-bold font-mono">28%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Link + Active Quotes */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Public Link Generator */}
          <Card className="glass-card border-emerald-500/20 shadow-lg shadow-emerald-500/5 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50" />
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-emerald-500" />
                Portal Comercial B2C
              </CardTitle>
              <CardDescription>
                Envie este link para seus clientes cotarem e reservarem voos diretamente. O pagamento cai via Stripe e a OS é gerada no ERP.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex-1 bg-black/40 border border-border/50 rounded-lg px-4 py-3 font-mono text-sm text-emerald-500/80 overflow-x-auto whitespace-nowrap">
                  {bookingLink}
                </div>
                <Button 
                  onClick={copyToClipboard}
                  className="flex items-center justify-center gap-2 h-11 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all shrink-0"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copiado!' : 'Copiar Link'}
                </Button>
              </div>
              <div className="pt-2 flex justify-end">
                <Link href={`/book/${companySlug}`} target="_blank" className="text-sm font-semibold text-emerald-500 hover:text-emerald-400 hover:underline flex items-center gap-1.5 transition-colors">
                  Testar Portal como Cliente <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Quotes */}
          <Card className="glass-card">
            <CardHeader className="pb-3 border-b border-border/30 bg-black/20">
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-blue-500" />
                Cotações Recentes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/30">
                {mockQuotes.map(quote => (
                  <div key={quote.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground font-bold border border-border/50">
                        {quote.client.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{quote.client}</p>
                        <p className="text-xs text-muted-foreground font-mono mt-0.5">{quote.route} • {quote.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 justify-between sm:justify-end">
                      <div className="text-right">
                        <p className="font-mono font-bold text-emerald-500">{quote.value}</p>
                      </div>
                      <Badge variant="outline" className={quote.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}>
                        {quote.status === 'approved' ? 'Aprovado' : 'Pendente'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-border/30 text-center">
                <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground w-full">Ver Todas as Cotações</Button>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Column: Pricing Rules */}
        <div>
          <Card className="glass-card h-full border-blue-500/20">
            <CardHeader className="pb-3 border-b border-border/30 bg-black/20">
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-500" />
                Regras de Precificação
              </CardTitle>
              <CardDescription>Valor/hora para cotação automatizada.</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
               {mockAircraft.map(acft => {
                 const pricing = getMockPricing(acft.type);
                 return (
                   <div key={acft.id} className="p-5 bg-white/[0.02] border border-border/50 rounded-xl space-y-3 hover:bg-white/[0.04] transition-colors group">
                     <div className="flex items-start justify-between border-b border-border/30 pb-3">
                       <div>
                         <span className="font-bold text-base block">{acft.model}</span>
                         <span className="text-xs text-muted-foreground font-mono tracking-wider">{acft.registration}</span>
                       </div>
                       <div className="p-2 bg-blue-500/10 rounded-lg">
                         <Plane className="w-4 h-4 text-blue-500" />
                       </div>
                     </div>
                     <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm pt-1">
                       <div className="text-muted-foreground">Valor/Hora:</div>
                       <div className="font-mono text-right font-semibold text-foreground">R$ {pricing.val}</div>
                       
                       <div className="text-muted-foreground">Margem:</div>
                       <div className="font-mono text-right text-emerald-500 font-bold">{pricing.margin}</div>
                       
                       <div className="text-muted-foreground">Mínimo:</div>
                       <div className="font-mono text-right text-muted-foreground">{pricing.min} h</div>
                     </div>
                     <Button 
                       variant="outline"
                       onClick={() => setEditingAircraft(acft)}
                       className="w-full mt-2 h-9 text-xs font-bold bg-white/[0.02] hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/30 transition-all border-border/50"
                     >
                       <Settings className="w-3.5 h-3.5 mr-2" /> Editar Regras
                     </Button>
                   </div>
                 );
               })}
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Pricing Edit Sheet */}
      <Sheet open={!!editingAircraft} onOpenChange={(open) => !open && setEditingAircraft(null)}>
        <SheetContent className="bg-aero-navy border-l-border/30 w-[400px] sm:w-[540px]">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-xl flex items-center gap-2 text-foreground">
              <Settings className="w-5 h-5 text-blue-500" />
              Editar Precificação
            </SheetTitle>
            <SheetDescription className="text-muted-foreground">
              Configure as margens e valores base para cálculo automático no portal B2C.
            </SheetDescription>
          </SheetHeader>

          {editingAircraft && (
            <div className="space-y-6 mt-4">
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4 flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Plane className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-base font-bold">{editingAircraft.model}</p>
                  <p className="text-sm text-blue-500 font-mono tracking-wider">{editingAircraft.registration}</p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-muted-foreground font-semibold">Valor da Hora de Voo (R$)</Label>
                  <Input 
                    type="number" 
                    defaultValue={getMockPricing(editingAircraft.type).val} 
                    className="bg-background/50 border-border/50 font-mono h-11 text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground font-semibold">Margem de Lucro Desejada (%)</Label>
                  <Input 
                    type="number" 
                    defaultValue={parseInt(getMockPricing(editingAircraft.type).margin)} 
                    className="bg-emerald-500/5 border-emerald-500/20 font-mono h-11 text-lg text-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground font-semibold">Mínimo Garantido (Horas/Dia)</Label>
                  <Input 
                    type="number" 
                    step="0.1"
                    defaultValue={parseFloat(getMockPricing(editingAircraft.type).min)} 
                    className="bg-background/50 border-border/50 font-mono h-11 text-lg"
                  />
                </div>
              </div>

              <div className="pt-8 flex gap-3">
                <Button variant="outline" className="flex-1 border-border/50 h-11" onClick={() => setEditingAircraft(null)}>
                  <X className="w-4 h-4 mr-2" /> Cancelar
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11" onClick={() => {
                  setEditingAircraft(null);
                  toast.success('Regras atualizadas com sucesso', { 
                    description: 'Os novos valores já estão ativos no portal do cliente.',
                    icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  });
                }}>
                  <Save className="w-4 h-4 mr-2" /> Salvar Regras
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

    </div>
  );
}
