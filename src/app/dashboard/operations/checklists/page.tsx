'use client';

import { mockOperationalChecklists } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, AlertTriangle, CheckSquare, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ChecklistsPage() {
  const checklists = mockOperationalChecklists;

  const getCategoryConfig = (cat: string) => {
    switch (cat) {
      case 'normal': return { label: 'Normal', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' };
      case 'emergency': return { label: 'Emergência', color: 'bg-aero-rose/10 text-aero-rose border-aero-rose/20' };
      case 'abnormal': return { label: 'Anormal', color: 'bg-aero-amber/10 text-aero-amber border-aero-amber/20' };
      default: return { label: 'SOP', color: 'bg-white/[0.05] text-muted-foreground border-border/50' };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Biblioteca de Checklists</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar procedimento..." className="pl-9 bg-white/[0.02] border-border/50" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {checklists.map(checklist => {
          const config = getCategoryConfig(checklist.category);
          
          return (
            <Card key={checklist.id} className={cn("glass border-border/50 overflow-hidden", checklist.category === 'emergency' && "border-aero-rose/30")}>
              <CardHeader className="pb-3 border-b border-border/30 bg-white/[0.01]">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {checklist.category === 'emergency' ? (
                      <AlertTriangle className="w-5 h-5 text-aero-rose" />
                    ) : (
                      <CheckSquare className="w-5 h-5 text-aero-cyan" />
                    )}
                    <CardTitle className="text-lg">{checklist.title}</CardTitle>
                  </div>
                  <Badge variant="outline" className={cn("uppercase text-[10px] tracking-wider", config.color)}>
                    {config.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/30">
                  {checklist.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-3 sm:px-5 hover:bg-white/[0.02] transition-colors">
                      <span className="font-medium text-foreground">{item.challenge}</span>
                      <span className={cn("font-bold font-mono text-sm", checklist.category === 'emergency' ? "text-aero-rose" : "text-aero-cyan")}>
                        {item.response}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border/30 bg-white/[0.01]">
                  <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-aero-cyan">
                    Iniciar Execução Digital
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
