'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Compass, PlaneTakeoff, Navigation, Send, MapPin, AlertTriangle, ShieldX, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { RulesEngine, ValidationResult } from '@/lib/rules-engine';
import { mockAircraft, mockCTMItems, mockPilotCredentials } from '@/lib/mock-data';

// Usaremos a performance mockada do Cirrus SR22
const SR22_PERFORMANCE = {
  cruise_speed_kts: 180,
  fuel_burn_ph: 65,
};

export default function FlightPlanningPage() {
  const [origin, setOrigin] = useState('SBSP');
  const [destination, setDestination] = useState('SBBR');
  const [alternate, setAlternate] = useState('SBGO');
  const [distanceNm, setDistanceNm] = useState(472);

  // Calcula tempo de voo (horas decimais) e combustível (Litros)
  const timeEnrouteHours = distanceNm / SR22_PERFORMANCE.cruise_speed_kts;
  const fuelRequired = timeEnrouteHours * SR22_PERFORMANCE.fuel_burn_ph;
  
  // Adiciona 45 minutos de reserva regulamentar (VFR) = 0.75h
  const reserveFuel = 0.75 * SR22_PERFORMANCE.fuel_burn_ph;
  const totalFuel = fuelRequired + reserveFuel;

  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  function formatTime(decimalHours: number) {
    const hrs = Math.floor(decimalHours);
    const mins = Math.round((decimalHours - hrs) * 60);
    return `${hrs}h ${mins.toString().padStart(2, '0')}m`;
  }

  function handleSavePlan() {
    // Para fins de mock, assumimos que vamos voar a aeronave PT-KZM (acft_001)
    const aircraft = mockAircraft[0];
    
    // Executa a inteligência do motor de regras cruzando as entidades
    const result = RulesEngine.validateFlight(aircraft, mockCTMItems, mockPilotCredentials);
    setValidationResult(result);
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/coordination" className="p-2 bg-white/[0.02] border border-border/50 rounded-lg hover:bg-white/[0.05] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Planejamento de Voo</h1>
          <p className="text-sm text-muted-foreground">Cálculo de performance e rota nativo</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formulário de Rota */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              Parâmetros da Rota
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground font-semibold uppercase">Aeronave (Perfil de Performance)</label>
              <div className="p-3 bg-white/[0.02] border border-border/50 rounded-md text-sm flex items-center justify-between">
                <div>
                  <strong className="text-aero-cyan tracking-wider">PT-RJB</strong> (Cirrus SR22)
                </div>
                <div className="text-muted-foreground font-mono text-xs">
                  180 kts / 65 L/h
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-semibold">Origem (ICAO)</label>
                <input 
                  type="text" 
                  value={origin} 
                  onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors uppercase font-mono" 
                  maxLength={4}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-semibold">Destino (ICAO)</label>
                <input 
                  type="text" 
                  value={destination} 
                  onChange={(e) => setDestination(e.target.value.toUpperCase())}
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors uppercase font-mono" 
                  maxLength={4}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-semibold">Alternado (ICAO)</label>
                <input 
                  type="text" 
                  value={alternate} 
                  onChange={(e) => setAlternate(e.target.value.toUpperCase())}
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors uppercase font-mono" 
                  maxLength={4}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-semibold">Distância Estimada (NM)</label>
                <input 
                  type="number" 
                  value={distanceNm} 
                  onChange={(e) => setDistanceNm(Number(e.target.value))}
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors font-mono" 
                />
              </div>
            </div>
            
            <div className="pt-2">
               <p className="text-xs text-muted-foreground leading-relaxed">
                 O cálculo de distância no ERP é baseado em Linha Reta (Great Circle). Para rotas complexas via aerovias e desvios meteorológicos visuais, utilize a exportação para o sistema EFB parceiro (Ex: NexAtlas).
               </p>
            </div>
          </CardContent>
        </Card>

        {/* Resultados de Performance */}
        <Card className="glass-card border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-blue-500">
              <Compass className="w-5 h-5" />
              Cálculo Operacional
            </CardTitle>
            <CardDescription>
              Valores baseados no perfil de Cruzeiro
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="bg-white/[0.02] border border-border/30 rounded-xl p-4 flex justify-between items-center">
              <div>
                <span className="text-xs text-muted-foreground uppercase font-bold block mb-1">Tempo Estimado (EET)</span>
                <span className="text-2xl font-bold font-mono text-foreground">{formatTime(timeEnrouteHours)}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-muted-foreground uppercase font-bold block mb-1">Distância</span>
                <span className="text-xl font-bold font-mono text-foreground">{distanceNm} NM</span>
              </div>
            </div>

            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center border-b border-blue-500/10 pb-2">
                <span className="text-sm font-medium">Combustível Rota:</span>
                <span className="font-mono font-bold">{Math.round(fuelRequired)} Litros</span>
              </div>
              <div className="flex justify-between items-center border-b border-blue-500/10 pb-2">
                <span className="text-sm font-medium">Reserva (45 min):</span>
                <span className="font-mono font-bold text-muted-foreground">{Math.round(reserveFuel)} Litros</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-sm font-bold text-blue-500">Mínimo Requerido:</span>
                <span className="font-mono font-bold text-xl text-blue-500">{Math.round(totalFuel)} Litros</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Button 
                onClick={handleSavePlan}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 h-11"
              >
                <PlaneTakeoff className="w-4 h-4" />
                Salvar Plano Interno (Validar Regras)
              </Button>
              <Button 
                variant="outline"
                className="w-full h-11 bg-white/[0.02] hover:bg-white/[0.05] border border-border/50 flex items-center justify-center gap-2"
                onClick={() => {
                  toast('Exportando para NexAtlas...', {
                    description: 'Enviando rota ' + origin + ' - ' + destination,
                    icon: <Send className="w-4 h-4 text-blue-500" />
                  });
                }}
              >
                <Send className="w-4 h-4 text-muted-foreground" />
                Exportar para EFB (Integração NexAtlas)
              </Button>
            </div>

            {/* Validation Alerts */}
            {validationResult && (
              <div className="mt-4 space-y-3 animate-fade-in">
                {!validationResult.passed && (
                  <div className="bg-aero-rose/10 border border-aero-rose/30 rounded-lg p-4">
                    <h4 className="text-aero-rose font-bold flex items-center gap-2 mb-2">
                      <ShieldX className="w-5 h-5" />
                      Voo Bloqueado (NO-GO)
                    </h4>
                    <ul className="list-disc pl-5 text-sm text-aero-rose/90 space-y-1">
                      {validationResult.errors.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>
                  </div>
                )}

                {validationResult.passed && validationResult.warnings.length === 0 && (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 text-emerald-500 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <div>
                      <p className="font-bold text-sm">Voo Liberado (GO)</p>
                      <p className="text-xs opacity-90 mt-0.5">Todas as regras da ANAC, CTM e Jornada validadas com sucesso.</p>
                    </div>
                  </div>
                )}

                {validationResult.warnings.length > 0 && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                    <h4 className="text-amber-500 font-bold flex items-center gap-2 mb-2 text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      Avisos Operacionais
                    </h4>
                    <ul className="list-disc pl-5 text-xs text-amber-500/90 space-y-1">
                      {validationResult.warnings.map((warn, i) => <li key={i}>{warn}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
