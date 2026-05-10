'use client';

// ═══════════════════════════════════════════════════════
// AeroGest — Flight Registration Form
// ═══════════════════════════════════════════════════════

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockAircraft } from '@/lib/mock-data';
import { BookOpen, Plane, Clock, MapPin, Users, AlertCircle, ArrowLeft, Save, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// Helper for masking ICAO
const formatICAO = (val: string) => val.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 4);

// Helper for time masking (HH:MM)
const formatTime = (val: string) => {
  const digits = val.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}:${digits.slice(2)}`;
  }
  return digits;
};

// Calculate time difference in hours (decimal)
const calculateHours = (start: string, end: string) => {
  if (start.length !== 5 || end.length !== 5) return 0;
  
  const [h1, m1] = start.split(':').map(Number);
  const [h2, m2] = end.split(':').map(Number);
  
  if (isNaN(h1) || isNaN(m1) || isNaN(h2) || isNaN(m2)) return 0;

  let startMins = h1 * 60 + m1;
  let endMins = h2 * 60 + m2;

  if (endMins < startMins) {
    endMins += 24 * 60; // Crossed midnight
  }

  const diffMins = endMins - startMins;
  return diffMins / 60;
};

export default function NewFlightPage() {
  const router = useRouter();
  
  // Form State
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    aircraft_id: '',
    origin_icao: '',
    destination_icao: '',
    engine_start: '',
    takeoff: '',
    landing: '',
    engine_stop: '',
    day_night: 'diurno',
    flight_rules: 'vfr',
    fuel: '',
    pob: '',
    landings: '1',
    pic_name: '',
    pic_anac: '',
    sic_name: '',
    sic_anac: '',
    observations: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Auto-calculated Block Time (Corte - Partida)
  const totalHours = useMemo(() => {
    return calculateHours(formData.engine_start, formData.engine_stop);
  }, [formData.engine_start, formData.engine_stop]);

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground -ml-4" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Button>
        <Button className="bg-aero-cyan hover:bg-aero-cyan-light text-aero-navy font-semibold gap-2">
          <Save className="w-4 h-4" /> Salvar Voo
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-aero-cyan" />
          Registrar Voo
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Preencha os dados do diário de bordo com base no registro físico (Parte I e II).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-children">
        
        {/* SECTION: Identificação */}
        <Card className="glass border-border/50">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Plane className="w-4 h-4 text-aero-cyan" /> Identificação e Trecho
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data do Voo</Label>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>DE (Origem)</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="SBSP" 
                    value={formData.origin_icao}
                    onChange={(e) => handleChange('origin_icao', formatICAO(e.target.value))}
                    className="pl-9 bg-white/[0.02] border-border/50 uppercase mono-data font-bold"
                    maxLength={4}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>PARA (Destino)</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="SBRJ" 
                    value={formData.destination_icao}
                    onChange={(e) => handleChange('destination_icao', formatICAO(e.target.value))}
                    className="pl-9 bg-white/[0.02] border-border/50 uppercase mono-data font-bold"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SECTION: Tempos */}
        <Card className="glass border-border/50">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-aero-cyan" /> Tempos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-5">
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-xs">Partida</Label>
                <Input 
                  placeholder="00:00" 
                  value={formData.engine_start}
                  onChange={(e) => handleChange('engine_start', formatTime(e.target.value))}
                  className="bg-white/[0.02] border-border/50 text-center mono-data px-1"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Decolagem</Label>
                <Input 
                  placeholder="00:00" 
                  value={formData.takeoff}
                  onChange={(e) => handleChange('takeoff', formatTime(e.target.value))}
                  className="bg-white/[0.02] border-border/50 text-center mono-data px-1"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Pouso</Label>
                <Input 
                  placeholder="00:00" 
                  value={formData.landing}
                  onChange={(e) => handleChange('landing', formatTime(e.target.value))}
                  className="bg-white/[0.02] border-border/50 text-center mono-data px-1"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Corte</Label>
                <Input 
                  placeholder="00:00" 
                  value={formData.engine_stop}
                  onChange={(e) => handleChange('engine_stop', formatTime(e.target.value))}
                  className="bg-white/[0.02] border-border/50 text-center mono-data px-1 text-aero-rose focus-visible:ring-aero-rose"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-border/30">
              <div>
                <p className="text-sm font-semibold text-foreground">Tempo Total (Block Time)</p>
                <p className="text-xs text-muted-foreground">Calculado automaticamente (Corte - Partida)</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-aero-cyan mono-data glow-cyan">{totalHours.toFixed(1)}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SECTION: Natureza e Operação */}
        <Card className="glass border-border/50 lg:col-span-2">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-aero-cyan" /> Regras e Operação
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              
              <div className="space-y-2">
                <Label>Turno</Label>
                <div className="flex bg-white/[0.02] rounded-md border border-border/50 p-1">
                  <button 
                    type="button"
                    onClick={() => handleChange('day_night', 'diurno')}
                    className={cn("flex-1 text-xs font-semibold py-1.5 rounded-sm transition-colors", formData.day_night === 'diurno' ? "bg-aero-cyan text-aero-navy" : "text-muted-foreground hover:text-foreground")}
                  >
                    Diurno
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleChange('day_night', 'noturno')}
                    className={cn("flex-1 text-xs font-semibold py-1.5 rounded-sm transition-colors", formData.day_night === 'noturno' ? "bg-aero-cyan text-aero-navy" : "text-muted-foreground hover:text-foreground")}
                  >
                    Noturno
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Regra</Label>
                <div className="flex bg-white/[0.02] rounded-md border border-border/50 p-1">
                  <button 
                    type="button"
                    onClick={() => handleChange('flight_rules', 'vfr')}
                    className={cn("flex-1 text-xs font-semibold py-1.5 rounded-sm transition-colors", formData.flight_rules === 'vfr' ? "bg-aero-cyan text-aero-navy" : "text-muted-foreground hover:text-foreground")}
                  >
                    VFR
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleChange('flight_rules', 'ifr')}
                    className={cn("flex-1 text-xs font-semibold py-1.5 rounded-sm transition-colors", formData.flight_rules === 'ifr' ? "bg-aero-cyan text-aero-navy" : "text-muted-foreground hover:text-foreground")}
                  >
                    IFR
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>POB / Carga</Label>
                <Input 
                  placeholder="Ex: 4" 
                  type="number"
                  value={formData.pob}
                  onChange={(e) => handleChange('pob', e.target.value)}
                  className="bg-white/[0.02] border-border/50 text-center mono-data"
                />
              </div>

              <div className="space-y-2">
                <Label>Combustível</Label>
                <Input 
                  placeholder="Ex: 150 Lts" 
                  value={formData.fuel}
                  onChange={(e) => handleChange('fuel', e.target.value)}
                  className="bg-white/[0.02] border-border/50 text-center"
                />
              </div>

              <div className="space-y-2">
                <Label>Pousos (NAT)</Label>
                <Input 
                  placeholder="1 / Pouso" 
                  value={formData.landings}
                  onChange={(e) => handleChange('landings', e.target.value)}
                  className="bg-white/[0.02] border-border/50 text-center"
                />
              </div>

            </div>
          </CardContent>
        </Card>

        {/* SECTION: Tripulação */}
        <Card className="glass border-border/50">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Users className="w-4 h-4 text-aero-cyan" /> Tripulação (Crew)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-5">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Piloto em Comando (PIC)</p>
                <div className="grid grid-cols-[1fr_100px] gap-3">
                  <Input 
                    placeholder="Nome completo (PIC)" 
                    value={formData.pic_name}
                    onChange={(e) => handleChange('pic_name', e.target.value)}
                    className="bg-white/[0.02] border-border/50"
                  />
                  <Input 
                    placeholder="ANAC" 
                    value={formData.pic_anac}
                    onChange={(e) => handleChange('pic_anac', e.target.value)}
                    className="bg-white/[0.02] border-border/50 text-center mono-data"
                  />
                </div>
              </div>
              <div className="pt-2 border-t border-border/30">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Segundo em Comando (SIC) - Opcional</p>
                <div className="grid grid-cols-[1fr_100px] gap-3">
                  <Input 
                    placeholder="Nome completo (SIC)" 
                    value={formData.sic_name}
                    onChange={(e) => handleChange('sic_name', e.target.value)}
                    className="bg-white/[0.02] border-border/50"
                  />
                  <Input 
                    placeholder="ANAC" 
                    value={formData.sic_anac}
                    onChange={(e) => handleChange('sic_anac', e.target.value)}
                    className="bg-white/[0.02] border-border/50 text-center mono-data"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SECTION: Parte II */}
        <Card className="glass border-border/50 flex flex-col">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-aero-amber">
              <AlertCircle className="w-4 h-4" /> Parte II - Situação Técnica
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 flex flex-col flex-1">
            <div className="flex-1 flex flex-col space-y-2">
              <Label>Ocorrências / Discrepâncias</Label>
              <Textarea 
                placeholder="Voo sem alterações ou descreva as ocorrências..." 
                className="resize-none flex-1 min-h-[140px] bg-white/[0.02] border-border/50 focus-visible:ring-aero-amber"
                value={formData.observations}
                onChange={(e) => handleChange('observations', e.target.value)}
              />
              <p className="text-[10px] text-muted-foreground mt-1">
                Deixe em branco ou escreva "Voo sem alterações" se a aeronave estiver 100% operacional.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
