'use client';

import { mockChecklistTemplates } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, ArrowLeft, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ChecklistPage() {
  const params = useParams();
  const id = params.id as string;
  
  // In a real app we'd filter by aircraft ID, but here we just show the mock templates
  const templates = mockChecklistTemplates;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/dashboard/aircraft/${id}`} className="p-2 bg-white/[0.02] border border-border/50 rounded-lg hover:bg-white/[0.05] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Checklists</h1>
          <p className="text-sm text-muted-foreground">Listas de verificação operacionais e de emergência.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map(template => (
          <Card key={template.id} className="glass-card hover:bg-white/[0.04] transition-colors group cursor-pointer border-aero-cyan/20">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Badge className="bg-aero-cyan/10 text-aero-cyan hover:bg-aero-cyan/20 mb-2">
                    {template.type === 'pre_flight' ? 'Pré-Voo' : template.type === 'post_flight' ? 'Pós-Voo' : 'Emergência'}
                  </Badge>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </div>
                <div className="p-2 rounded-full bg-aero-cyan/10 text-aero-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-6 h-6" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <CheckSquare className="w-4 h-4" />
                {template.items.length} itens a verificar
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
