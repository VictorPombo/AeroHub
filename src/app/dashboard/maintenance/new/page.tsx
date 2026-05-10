'use client';

// ═══════════════════════════════════════════════════════
// AeroGest — Maintenance Registration Form
// ═══════════════════════════════════════════════════════

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockAircraft } from '@/lib/mock-data';
import { Wrench, ShieldAlert, ArrowLeft, Save, ShieldCheck, PenTool, Plane, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export default function NewMaintenancePage() {
  const router = useRouter();
  
  // Form State
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    aircraft_id: '',
    component: '',
    type: 'preventiva',
    current_hours: '',
    next_due_hours: '',
    technician: '',
    workshop: '',
    observations: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground -ml-4" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Button>
        <Button className="bg-aero-cyan hover:bg-aero-cyan-light text-aero-navy font-semibold gap-2">
          <Save className="w-4 h-4" /> Salvar Intervenção
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Wrench className="w-6 h-6 text-aero-cyan" />
          Registrar Intervenção de Manutenção
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Lançamento de manutenções preventivas, corretivas e cumprimento de diretrizes (ADs/SBs).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-children">
        
        {/* SECTION: Identificação */}
        <Card className="glass border-border/50">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Plane className="w-4 h-4 text-aero-cyan" /> Aeronave e Serviço
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data da Intervenção</Label>
                <Input 
                  type="date" 
                  value={formData.date} 
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="bg-white/[0.02] border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label>Aeronave</Label>
                <select 
                  className="flex h-10 w-full rounded-md border border-border/50 bg-white/[0.02] px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-aero-cyan focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.aircraft_id}
                  onChange={(e) => handleChange('aircraft_id', e.target.value)}
                >
                  <option value="" disabled className="bg-aero-navy">Selecione...</option>
                  {mockAircraft.map(a => (
                    <option key={a.id} value={a.id} className="bg-aero-navy text-foreground">
                      {a.registration} ({a.model})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Componente ou Serviço Executado</Label>
              <Input 
                placeholder="Ex: Inspeção de 100h, Troca de Óleo, AD 2023-01-01" 
                value={formData.component}
                onChange={(e) => handleChange('component', e.target.value)}
                className="bg-white/[0.02] border-border/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Tipo de Intervenção</Label>
              <div className="flex bg-white/[0.02] rounded-md border border-border/50 p-1">
                <button 
                  type="button"
                  onClick={() => handleChange('type', 'preventiva')}
                  className={cn("flex-1 text-xs font-semibold py-1.5 rounded-sm transition-colors", formData.type === 'preventiva' ? "bg-aero-cyan text-aero-navy" : "text-muted-foreground hover:text-foreground")}
                >
                  Preventiva
                </button>
                <button 
                  type="button"
                  onClick={() => handleChange('type', 'corretiva')}
                  className={cn("flex-1 text-xs font-semibold py-1.5 rounded-sm transition-colors", formData.type === 'corretiva' ? "bg-aero-rose text-white" : "text-muted-foreground hover:text-foreground")}
                >
                  Corretiva
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SECTION: Tempos e Executante */}
        <Card className="glass border-border/50">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-aero-cyan" /> Controles e Execução
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs">Horas Atuais (TSN/TSO)</Label>
                <Input 
                  placeholder="Ex: 1540.5" 
                  type="number"
                  step="0.1"
                  value={formData.current_hours}
                  onChange={(e) => handleChange('current_hours', e.target.value)}
                  className="bg-white/[0.02] border-border/50 mono-data"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-aero-amber">Próximo Vencimento (Horas)</Label>
                <Input 
                  placeholder="Ex: 1640.5" 
                  type="number"
                  step="0.1"
                  value={formData.next_due_hours}
                  onChange={(e) => handleChange('next_due_hours', e.target.value)}
                  className="bg-white/[0.02] border-aero-amber/30 text-aero-amber mono-data focus-visible:ring-aero-amber"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Mecânico Responsável (ANAC)</Label>
              <Input 
                placeholder="Nome / CANAC" 
                value={formData.technician}
                onChange={(e) => handleChange('technician', e.target.value)}
                className="bg-white/[0.02] border-border/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Oficina (MRO)</Label>
              <Input 
                placeholder="Oficina homologada" 
                value={formData.workshop}
                onChange={(e) => handleChange('workshop', e.target.value)}
                className="bg-white/[0.02] border-border/50"
              />
            </div>
          </CardContent>
        </Card>

        {/* SECTION: Detalhes e Observações */}
        <Card className="glass border-border/50 lg:col-span-2 flex flex-col">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <PenTool className="w-4 h-4 text-aero-cyan" /> Detalhes do Serviço
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 flex flex-col flex-1">
            <div className="flex-1 flex flex-col space-y-2">
              <Label>Descrição Técnica (Reporte)</Label>
              <Textarea 
                placeholder="Descreva detalhadamente o serviço executado, peças substituídas e laudo..." 
                className="resize-none flex-1 min-h-[160px] bg-white/[0.02] border-border/50"
                value={formData.observations}
                onChange={(e) => handleChange('observations', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
