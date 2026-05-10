'use client';

import { mockInventoryItems } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, AlertTriangle, Search, Plus, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export default function InventoryItemsPage() {
  const items = mockInventoryItems;

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'consumable': return 'Consumível';
      case 'rotatable': return 'Rotativo';
      case 'tool': return 'Ferramenta';
      case 'hardware': return 'Hardware';
      case 'avionics': return 'Aviônicos';
      default: return cat;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Estoque e Peças</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar por P/N ou descrição..." className="pl-9 bg-white/[0.02] border-border/50" />
          </div>
          <Button className="bg-aero-cyan text-aero-navy hover:bg-aero-cyan-light shrink-0">
            <Plus className="w-4 h-4 mr-2" /> Novo Item
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {items.map(item => {
          const isLowStock = item.current_quantity <= item.minimum_quantity;

          return (
            <Card key={item.id} className={cn("glass transition-colors group hover:bg-white/[0.02]", isLowStock ? "border-aero-rose/30" : "border-border/50")}>
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row gap-6">
                  
                  {/* Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="uppercase text-[10px] bg-white/[0.02] border-border/50 text-muted-foreground">
                            {getCategoryLabel(item.category)}
                          </Badge>
                          {isLowStock && (
                            <Badge variant="outline" className="bg-aero-rose/10 text-aero-rose border-aero-rose/20 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Estoque Baixo
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-mono text-xl font-bold text-foreground">
                          {item.part_number}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-sm font-medium text-muted-foreground">
                      {item.description}
                    </p>

                    {item.location && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                        <MapPin className="w-3.5 h-3.5" /> Locação: {item.location}
                      </div>
                    )}
                  </div>

                  {/* Stock Levels & Cost */}
                  <div className="md:w-64 border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 pl-0 md:pl-6 grid grid-cols-2 gap-4">
                    
                    <div>
                      <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Em Estoque</span>
                      <span className={cn("text-2xl font-mono font-bold mt-1 block", isLowStock ? "text-aero-rose" : "text-emerald-500")}>
                        {item.current_quantity} <span className="text-sm font-sans font-normal text-muted-foreground">{item.unit_of_measure}</span>
                      </span>
                      <span className="text-xs text-muted-foreground mt-1 block">Mínimo: {item.minimum_quantity}</span>
                    </div>

                    <div>
                      <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Custo Médio</span>
                      <span className="text-lg font-mono font-bold text-foreground mt-1.5 block">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.average_unit_cost)}
                      </span>
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
