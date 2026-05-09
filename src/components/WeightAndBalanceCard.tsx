'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Scale, CheckCircle2, AlertCircle } from 'lucide-react';

export function WeightAndBalanceCard() {
  const [pob, setPob] = useState(2);
  const [baggage, setBaggage] = useState(20);
  const [fuelGal, setFuelGal] = useState(40);

  // Fake simplified calculation for mock purposes
  const basicEmptyWeight = 1750;
  const maxTakeoffWeight = 3100;
  const paxWeight = pob * 170; // 170 lbs per person avg
  const fuelWeight = fuelGal * 6; // 6 lbs per gallon

  const totalWeight = basicEmptyWeight + paxWeight + baggage + fuelWeight;
  const isOverweight = totalWeight > maxTakeoffWeight;

  return (
    <Card className={`glass-card border-l-4 ${isOverweight ? 'border-l-aero-rose' : 'border-l-aero-cyan'}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Scale className="w-5 h-5" />
          Peso e Balanceamento (W&B)
        </CardTitle>
        <CardDescription>Cálculo simplificado (Mock)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">POB (Pessoas)</label>
            <input 
              type="number" 
              value={pob} 
              onChange={(e) => setPob(Number(e.target.value))}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Bagagem (lbs)</label>
            <input 
              type="number" 
              value={baggage} 
              onChange={(e) => setBaggage(Number(e.target.value))}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Combustível (Gal)</label>
            <input 
              type="number" 
              value={fuelGal} 
              onChange={(e) => setFuelGal(Number(e.target.value))}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors" 
            />
          </div>
        </div>

        <div className={`p-3 rounded-md flex items-center justify-between border ${isOverweight ? 'bg-aero-rose/10 border-aero-rose/30 text-aero-rose' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'}`}>
          <div className="flex items-center gap-2">
            {isOverweight ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
            <span className="font-medium text-sm">Peso de Decolagem</span>
          </div>
          <div className="font-bold">
            {totalWeight} <span className="text-xs font-normal">/ {maxTakeoffWeight} lbs</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
