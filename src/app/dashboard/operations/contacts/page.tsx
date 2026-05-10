'use client';

import { mockOperationalContacts } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Contact, Phone, Mail, Radio, Info, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function OperationalContactsPage() {
  const contacts = mockOperationalContacts;

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'fbo': return 'FBO / VIP Lounge';
      case 'handling': return 'Handling / Rampa';
      case 'catering': return 'Catering (Alimentação)';
      case 'transport': return 'Transporte Terrestre';
      case 'security': return 'Segurança';
      default: return 'Outros';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Contatos Operacionais</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar por base ou nome..." className="pl-9 bg-white/[0.02] border-border/50" />
          </div>
          <Button className="bg-aero-cyan text-aero-navy hover:bg-aero-cyan-light shrink-0">
            <Plus className="w-4 h-4 mr-2" /> Novo Contato
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map(contact => (
          <Card key={contact.id} className="glass hover:bg-white/[0.02] transition-colors group">
            <CardContent className="p-5 flex flex-col h-full">
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/[0.02] border border-border/50 rounded-lg">
                    <Contact className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-aero-cyan transition-colors">
                      {contact.name}
                    </h3>
                    <Badge variant="outline" className="uppercase text-[10px] tracking-wider bg-white/[0.01] border-border/50 text-muted-foreground mt-1">
                      {getCategoryLabel(contact.category)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3 flex-1 mt-2">
                {contact.aerodrome_icao && (
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <span className="font-mono bg-white/[0.05] px-2 py-0.5 rounded border border-border/30">
                      {contact.aerodrome_icao}
                    </span>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Phone className="w-4 h-4 text-muted-foreground" /> {contact.phone}
                  </div>
                )}
                {contact.email && (
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Mail className="w-4 h-4 text-muted-foreground" /> {contact.email}
                  </div>
                )}
                {contact.frequency && (
                  <div className="flex items-center gap-2 text-sm text-aero-cyan">
                    <Radio className="w-4 h-4" /> Freq: {contact.frequency}
                  </div>
                )}
              </div>

              {contact.notes && (
                <div className="mt-4 pt-4 border-t border-border/30">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <p className="italic">{contact.notes}</p>
                  </div>
                </div>
              )}

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
