'use client';

// ═══════════════════════════════════════════════════════
// AeroGest — Aircraft Detail Layout (Shared Hero + Nav)
// ═══════════════════════════════════════════════════════

import { useParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { mockAircraft } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import {
  Plane,
  ArrowLeft,
  MoreVertical,
  ShieldAlert,
  LayoutDashboard,
  BookOpen,
  Wrench,
  DollarSign,
  Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';

const statusConfig = {
  active: { label: 'Ativo', className: 'bg-aero-emerald/10 text-aero-emerald border-aero-emerald/20' },
  maintenance: { label: 'Em Manutenção', className: 'bg-aero-amber/10 text-aero-amber border-aero-amber/20' },
  grounded: { label: 'Inoperante', className: 'bg-aero-rose/10 text-aero-rose border-aero-rose/20' },
};

const statusOptions = [
  { value: 'active', label: 'Ativo' },
  { value: 'maintenance', label: 'Em Manutenção' },
  { value: 'grounded', label: 'Inoperante' },
] as const;

const navTabs = [
  { key: 'overview', label: 'Visão Geral', icon: LayoutDashboard, href: '' },
  { key: 'flights', label: 'Diário de Bordo', icon: BookOpen, href: '/flights' },
  { key: 'ctm', label: 'CTM', icon: Wrench, href: '/ctm' },
  { key: 'financial', label: 'Financeiro', icon: DollarSign, href: '/financial' },
];

export default function AircraftDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const [editOpen, setEditOpen] = useState(false);
  const [, forceUpdate] = useState(0);

  const aircraft = mockAircraft.find(a => a.id === id);

  // Local edit state
  const [editReg, setEditReg] = useState('');
  const [editModel, setEditModel] = useState('');
  const [editYear, setEditYear] = useState('');
  const [editStatus, setEditStatus] = useState<'active' | 'maintenance' | 'grounded'>('active');

  if (!aircraft) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <ShieldAlert className="w-12 h-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold text-foreground">Aeronave não encontrada</h2>
        <Button variant="outline" onClick={() => router.back()}>Voltar</Button>
      </div>
    );
  }

  const status = statusConfig[aircraft.status];
  const basePath = `/dashboard/aircraft/${id}`;

  function isTabActive(tabHref: string) {
    const fullPath = basePath + tabHref;
    if (tabHref === '') return pathname === basePath;
    return pathname.startsWith(fullPath);
  }

  function openEditDialog() {
    setEditReg(aircraft!.registration);
    setEditModel(aircraft!.model);
    setEditYear(String(aircraft!.year));
    setEditStatus(aircraft!.status);
    setEditOpen(true);
  }

  function handleSave() {
    if (!aircraft) return;
    // Mutate mock data in-memory (MVP)
    aircraft.registration = editReg.toUpperCase();
    aircraft.model = editModel;
    aircraft.year = parseInt(editYear) || aircraft.year;
    aircraft.status = editStatus;
    setEditOpen(false);
    forceUpdate(n => n + 1); // trigger re-render
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header / Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="gap-2 text-muted-foreground hover:text-foreground -ml-4"
          onClick={() => router.push('/dashboard/aircraft')}
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="border-border/50 bg-white/[0.02]" onClick={openEditDialog}>
            Editar
          </Button>
          <Button variant="outline" size="icon" className="border-border/50 bg-white/[0.02]">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Aircraft Profile Hero */}
      <div className="glass-strong border border-border/50 rounded-2xl overflow-hidden relative">
        <div className="h-32 bg-gradient-to-br from-aero-navy-light to-background border-b border-border/50 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
            <Plane className="w-64 h-64 text-foreground" />
          </div>
        </div>
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-10">
            <div className="flex gap-6 items-end">
              <div className="w-24 h-24 rounded-xl glass border-2 border-border/50 flex items-center justify-center shadow-2xl relative z-10">
                <Plane className="w-12 h-12 text-aero-cyan/40" />
              </div>
              <div className="pb-1">
                <h1 className="registration-plate text-3xl font-bold text-foreground glow-cyan">{aircraft.registration}</h1>
                <p className="text-muted-foreground text-sm font-medium mt-1">{aircraft.model}</p>
              </div>
            </div>
            <div className="pb-2">
              <Badge variant="outline" className={cn('px-4 py-1.5 text-xs font-bold shadow-lg', status.className)}>
                {status.label}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-1 border-b border-border/50 pb-px overflow-x-auto">
        {navTabs.map(tab => {
          const active = isTabActive(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.key}
              href={basePath + tab.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all border-b-2 relative whitespace-nowrap",
                active
                  ? "border-aero-cyan text-aero-cyan"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border/50"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {active && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-aero-cyan glow-cyan shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Page Content */}
      <div className="animate-fade-in">
        {children}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Aeronave</DialogTitle>
            <DialogDescription>
              Atualize as informações da aeronave {aircraft.registration}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-reg">Matrícula</Label>
              <Input
                id="edit-reg"
                value={editReg}
                onChange={e => setEditReg(e.target.value)}
                placeholder="PT-XXX"
                className="uppercase mono-data"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-model">Modelo</Label>
              <Input
                id="edit-model"
                value={editModel}
                onChange={e => setEditModel(e.target.value)}
                placeholder="Cessna 182 Skylane"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-year">Ano de Fabricação</Label>
              <Input
                id="edit-year"
                type="number"
                value={editYear}
                onChange={e => setEditYear(e.target.value)}
                placeholder="2019"
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <div className="flex gap-2">
                {statusOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setEditStatus(opt.value)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-bold border transition-all',
                      editStatus === opt.value
                        ? statusConfig[opt.value].className
                        : 'border-border/30 text-muted-foreground bg-white/[0.02] hover:bg-white/[0.05]'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="gap-2 bg-aero-cyan text-black hover:bg-aero-cyan-light">
              <Save className="w-4 h-4" /> Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

