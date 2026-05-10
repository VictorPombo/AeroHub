// ═══════════════════════════════════════════════════════
// AeroGest — TBO Tables & Default CTM Items
// Sources: Lycoming SI 1009BE, Continental SIL 98-9, P&WC
// ═══════════════════════════════════════════════════════

// ─── TBO Tables ──────────────────────────────────────

export interface TBOEntry {
  model: string;
  tbo_hours: number;
  calendar_years?: number;
  hsi_hours?: number;
  aircraft?: string;
}

export const tboLycomingFixedWing: TBOEntry[] = [
  { model: 'O-235 (exceto F,G,J)', tbo_hours: 2400, calendar_years: 12 },
  { model: 'O-235-F, -G, -J', tbo_hours: 2000, calendar_years: 12 },
  { model: 'O-290-D', tbo_hours: 2000, calendar_years: 12 },
  { model: 'O-320 Series', tbo_hours: 2000, calendar_years: 12 },
  { model: 'IO-320-A, -E', tbo_hours: 2000, calendar_years: 12 },
  { model: 'IO-320-B, -D, -F', tbo_hours: 2000, calendar_years: 12 },
  { model: 'IO-320-C', tbo_hours: 1800, calendar_years: 12 },
  { model: 'AIO-320 (160HP)', tbo_hours: 1600, calendar_years: 12 },
  { model: 'AEIO-320 Series', tbo_hours: 1600, calendar_years: 12 },
  { model: 'O-360 Series', tbo_hours: 2000, calendar_years: 12 },
  { model: 'IO-360-L2A', tbo_hours: 2000, calendar_years: 12 },
  { model: 'IO-360-A,-C,-D,-J (200HP)', tbo_hours: 2000, calendar_years: 12 },
  { model: 'IO-360-B,-E,-F,-M,-N (180HP)', tbo_hours: 2000, calendar_years: 12 },
  { model: 'TO-360-C,-F; TIO-360-C', tbo_hours: 1800, calendar_years: 12 },
  { model: 'TIO-360-A Series', tbo_hours: 1200, calendar_years: 12 },
  { model: 'AEIO-360 Series (180HP)', tbo_hours: 1600, calendar_years: 12 },
  { model: 'AEIO-360 Series (200HP)', tbo_hours: 1400, calendar_years: 12 },
  { model: 'IO-390-A', tbo_hours: 2000, calendar_years: 12 },
  { model: 'O-540 Series', tbo_hours: 2000, calendar_years: 12 },
  { model: 'IO-540 Series', tbo_hours: 2000, calendar_years: 12 },
  { model: 'TIO-540-A Series (com mod SI 1225)', tbo_hours: 1800, calendar_years: 12 },
  { model: 'TIO-540-A Series (sem mod)', tbo_hours: 1500, calendar_years: 12 },
  { model: 'TIO-540-C Series (com mod SI 1225)', tbo_hours: 2000, calendar_years: 12 },
  { model: 'TIO-540-C Series (sem mod)', tbo_hours: 1500, calendar_years: 12 },
  { model: 'TIO-540-J Series', tbo_hours: 1800, calendar_years: 12 },
];

export const tboLycomingHelicopter: TBOEntry[] = [
  { model: 'O-320-A2C, -B2C', tbo_hours: 2000, calendar_years: 12 },
  { model: 'O-320-B2C (Robinson)', tbo_hours: 2200, calendar_years: 12 },
  { model: 'HO-360-C1A', tbo_hours: 2000, calendar_years: 12 },
  { model: 'O-360-C2B,-C2D; HO-360; HIO-360-B', tbo_hours: 1500, calendar_years: 12 },
  { model: 'O-360-J2A', tbo_hours: 2000, calendar_years: 12 },
  { model: 'O-360-J2A (Robinson)', tbo_hours: 2200, calendar_years: 12 },
  { model: 'HIO-360-A,-C,-D,-E,-F Series', tbo_hours: 1500, calendar_years: 12 },
  { model: 'O-540-F1B5', tbo_hours: 2000, calendar_years: 12 },
  { model: 'O-540-F1B5 (Robinson)', tbo_hours: 2200, calendar_years: 12 },
  { model: 'IO-540-AE1A5', tbo_hours: 2000, calendar_years: 12 },
  { model: 'IO-540-AE1A5 (Robinson)', tbo_hours: 2200, calendar_years: 12 },
  { model: 'VO-540 Series', tbo_hours: 1200, calendar_years: 12 },
  { model: 'TVO, TIVO-540 Series', tbo_hours: 1200, calendar_years: 12 },
];

export const tboContinental: TBOEntry[] = [
  { model: 'O-200-A,-B', tbo_hours: 1800, calendar_years: 12 },
  { model: 'O-300-A,-C,-D', tbo_hours: 1800, calendar_years: 12 },
  { model: 'IO-346 Series', tbo_hours: 2000, calendar_years: 12 },
  { model: 'O-470 Series', tbo_hours: 1500, calendar_years: 12 },
  { model: 'IO-470 Series', tbo_hours: 1500, calendar_years: 12 },
  { model: 'IO-520 Series', tbo_hours: 1700, calendar_years: 12 },
  { model: 'IO-550 Series', tbo_hours: 2000, calendar_years: 12 },
  { model: 'TSIO-360 Series', tbo_hours: 1400, calendar_years: 12 },
  { model: 'TSIO-520 Series', tbo_hours: 1400, calendar_years: 12 },
  { model: 'TSIO-550 Series', tbo_hours: 2000, calendar_years: 12 },
];

export const tboPT6A: TBOEntry[] = [
  { model: 'PT6A-21', tbo_hours: 3600, hsi_hours: 1800, aircraft: 'King Air C90' },
  { model: 'PT6A-27', tbo_hours: 3600, hsi_hours: 1800, aircraft: 'Bandeirante, Xingu' },
  { model: 'PT6A-34', tbo_hours: 3600, hsi_hours: 1800, aircraft: 'Bandeirante' },
  { model: 'PT6A-42', tbo_hours: 3600, hsi_hours: 1800, aircraft: 'King Air B200' },
  { model: 'PT6A-60A', tbo_hours: 3600, hsi_hours: 1800, aircraft: 'King Air 350' },
  { model: 'PT6A-67P', tbo_hours: 5000, hsi_hours: 2500, aircraft: 'Pilatus PC-12' },
  { model: 'PT6A-114A', tbo_hours: 3600, hsi_hours: 1800, aircraft: 'Cessna Caravan' },
];

// ─── Default CTM Items (auto-populate on aircraft registration) ──

export interface DefaultCTMItem {
  name: string;
  category: string;
  control_by: 'hours' | 'date' | 'hours_and_date';
  interval_hours?: number;
  interval_months?: number;
  alert_hours?: number;
  alert_days?: number;
  is_grounding: boolean;
  notes?: string;
}

export const ctmItemsUniversal: DefaultCTMItem[] = [
  { name: 'Certificado de Aeronavegabilidade (CA)', category: 'documento', control_by: 'date', alert_days: 60, is_grounding: true },
  { name: 'Certificado de Matrícula', category: 'documento', control_by: 'date', alert_days: 60, is_grounding: true },
  { name: 'Seguro RETA', category: 'seguro', control_by: 'date', alert_days: 30, is_grounding: true },
  { name: 'Seguro Casco', category: 'seguro', control_by: 'date', alert_days: 30, is_grounding: false },
  { name: 'FIAM / Ficha de Inspeção Anual', category: 'documento', control_by: 'date', alert_days: 60, is_grounding: true },
  { name: 'ELT — validade bateria', category: 'equipamento', control_by: 'date', alert_days: 30, is_grounding: true },
  { name: 'ELT — teste 12 meses', category: 'equipamento', control_by: 'date', alert_days: 30, is_grounding: true },
  { name: 'Extintor — validade', category: 'equipamento', control_by: 'date', alert_days: 30, is_grounding: true },
  { name: 'Rádio — homologação ANATEL', category: 'certificado', control_by: 'date', alert_days: 60, is_grounding: false },
  { name: 'Transponder — teste 24 meses', category: 'equipamento', control_by: 'date', alert_days: 30, is_grounding: true },
  { name: 'Altímetro — teste 24 meses', category: 'equipamento', control_by: 'date', alert_days: 30, is_grounding: true },
  { name: 'Pitot-estática — teste 24 meses', category: 'equipamento', control_by: 'date', alert_days: 30, is_grounding: true },
  { name: 'Pesagem da aeronave', category: 'documento', control_by: 'date', alert_days: 60, is_grounding: false, notes: 'Obrigatória após modificação ou a cada 3 anos' },
  { name: 'Colete salva-vidas — validade', category: 'equipamento', control_by: 'date', alert_days: 30, is_grounding: false, notes: 'Obrigatório para voo sobre água' },
];

export const ctmItemsAirplanePiston: DefaultCTMItem[] = [
  { name: 'Inspeção 50h', category: 'inspecao_periodica', control_by: 'hours', interval_hours: 50, alert_hours: 5, is_grounding: true },
  { name: 'Inspeção 100h', category: 'inspecao_periodica', control_by: 'hours', interval_hours: 100, alert_hours: 10, is_grounding: true },
  { name: 'Inspeção Anual de Manutenção (IAM)', category: 'inspecao_periodica', control_by: 'date', interval_months: 12, alert_days: 30, is_grounding: true },
  { name: 'TBO Motor', category: 'componente', control_by: 'hours_and_date', alert_hours: 50, is_grounding: true },
  { name: 'TBO Hélice', category: 'componente', control_by: 'hours_and_date', alert_hours: 50, is_grounding: true },
  { name: 'Magneto esquerdo — inspeção 500h', category: 'componente', control_by: 'hours', interval_hours: 500, alert_hours: 25, is_grounding: false },
  { name: 'Magneto direito — inspeção 500h', category: 'componente', control_by: 'hours', interval_hours: 500, alert_hours: 25, is_grounding: false },
  { name: 'Velas de ignição — substituição', category: 'componente', control_by: 'hours', interval_hours: 100, alert_hours: 10, is_grounding: false },
  { name: 'Filtro de óleo', category: 'componente', control_by: 'hours', interval_hours: 50, alert_hours: 5, is_grounding: false },
  { name: 'Filtro de combustível', category: 'componente', control_by: 'hours', interval_hours: 100, alert_hours: 10, is_grounding: false },
  { name: 'Mangueiras de combustível — inspeção', category: 'componente', control_by: 'date', interval_months: 60, alert_days: 60, is_grounding: true, notes: 'Troca recomendada a cada 5 anos' },
  { name: 'Troca de óleo', category: 'componente', control_by: 'hours', interval_hours: 50, alert_hours: 5, is_grounding: false },
];

export const ctmItemsHelicopterExtra: DefaultCTMItem[] = [
  { name: 'Inspeção 25h', category: 'inspecao_periodica', control_by: 'hours', interval_hours: 25, alert_hours: 3, is_grounding: true, notes: 'Comum em helicópteros, principalmente Robinson' },
  { name: 'TBO Rotor Principal', category: 'componente', control_by: 'hours_and_date', alert_hours: 50, is_grounding: true },
  { name: 'TBO Rotor de Cauda', category: 'componente', control_by: 'hours_and_date', alert_hours: 50, is_grounding: true },
  { name: 'TBO Caixa de Transmissão Principal', category: 'componente', control_by: 'hours_and_date', alert_hours: 50, is_grounding: true },
  { name: 'TBO Caixa de Transmissão Cauda', category: 'componente', control_by: 'hours_and_date', alert_hours: 50, is_grounding: true },
  { name: 'TBO Eixo de Transmissão', category: 'componente', control_by: 'hours_and_date', alert_hours: 50, is_grounding: true },
  { name: 'TBO Embreagem / Clutch', category: 'componente', control_by: 'hours_and_date', alert_hours: 50, is_grounding: true },
  { name: 'Inspeção Hot Section (turbina)', category: 'inspecao_periodica', control_by: 'hours', alert_hours: 50, is_grounding: true, notes: 'Apenas helicópteros com motor turbina' },
];

export const ctmItemsTurbopropExtra: DefaultCTMItem[] = [
  { name: 'Inspeção Hot Section', category: 'inspecao_periodica', control_by: 'hours', alert_hours: 100, is_grounding: true },
  { name: 'TBO Motor Turbina', category: 'componente', control_by: 'hours', alert_hours: 100, is_grounding: true },
  { name: 'Inspeção 200h', category: 'inspecao_periodica', control_by: 'hours', interval_hours: 200, alert_hours: 20, is_grounding: true },
  { name: 'Inspeção 300h', category: 'inspecao_periodica', control_by: 'hours', interval_hours: 300, alert_hours: 30, is_grounding: true },
  { name: 'Inspeção 600h', category: 'inspecao_periodica', control_by: 'hours', interval_hours: 600, alert_hours: 50, is_grounding: true },
];

// ─── Helper: get default items for aircraft type ─────

export function getDefaultCTMItems(type: 'airplane' | 'helicopter', category?: string): DefaultCTMItem[] {
  const items = [...ctmItemsUniversal];

  if (type === 'airplane') {
    items.push(...ctmItemsAirplanePiston);
    if (category?.includes('turbo')) {
      items.push(...ctmItemsTurbopropExtra);
    }
  } else {
    items.push(...ctmItemsAirplanePiston.filter(i => !i.name.includes('Hélice'))); // shared items minus propeller
    items.push(...ctmItemsHelicopterExtra);
  }

  return items;
}

// NOTE: TBO values are RECOMMENDED by manufacturers, not legally mandatory
// (except when a specific AD/DA exists). The system should display:
// "TBO é referência do fabricante. Consulte seu programa de manutenção aprovado."
