'use client';

import { mockSuppliers } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Mail, Phone, MapPin, Building2, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SuppliersPage() {
  const suppliers = mockSuppliers;

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'parts': return 'Peças e Componentes';
      case 'maintenance': return 'Oficina / Manutenção';
      case 'fuel': return 'Combustível';
      case 'services': return 'Serviços Gerais';
      default: return 'Outros';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Fornecedores Homologados</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome ou CNPJ..." className="pl-9 bg-white/[0.02] border-border/50" />
          </div>
          <Button className="bg-aero-cyan text-aero-navy hover:bg-aero-cyan-light shrink-0">
            <Plus className="w-4 h-4 mr-2" /> Cadastrar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suppliers.map(supplier => {
          return (
            <Card key={supplier.id} className="glass hover:bg-white/[0.02] transition-colors group">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/[0.02] border border-border/50 rounded-lg">
                      <Building2 className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-aero-cyan transition-colors">
                        {supplier.name}
                      </h3>
                      {supplier.cnpj && (
                        <p className="text-xs font-mono text-muted-foreground mt-0.5">CNPJ: {supplier.cnpj}</p>
                      )}
                    </div>
                  </div>
                  {supplier.active ? (
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                      Ativo
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20">
                      Inativo
                    </Badge>
                  )}
                </div>

                <Badge variant="outline" className="uppercase text-[10px] bg-white/[0.02] border-border/50 text-muted-foreground mb-4">
                  {getCategoryLabel(supplier.category)}
                </Badge>
                
                <div className="space-y-2 mt-2">
                  {supplier.contact_name && (
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <UserIcon className="w-4 h-4 text-muted-foreground" /> {supplier.contact_name}
                    </div>
                  )}
                  {supplier.phone && (
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Phone className="w-4 h-4 text-muted-foreground" /> {supplier.phone}
                    </div>
                  )}
                  {supplier.email && (
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Mail className="w-4 h-4 text-muted-foreground" /> {supplier.email}
                    </div>
                  )}
                </div>

              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// Helper icon component
function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
