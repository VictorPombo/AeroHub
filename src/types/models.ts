// ═══════════════════════════════════════════════════════
// AeroGest — Type Definitions
// ═══════════════════════════════════════════════════════

export type UserRole = 'pilot' | 'owner_active' | 'owner_investor' | 'manager' | 'super_admin';

export type AircraftType = 'airplane' | 'helicopter';

export type AircraftStatus = 'active' | 'maintenance' | 'grounded';

export type MaintenanceStatus = 'ok' | 'approaching' | 'due' | 'overdue';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

// ─── User / Auth ─────────────────────────────────────

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  canac?: string;
  avatar_url?: string;
  created_at: string;
}

// ─── Aircraft ────────────────────────────────────────

export interface Aircraft {
  id: string;
  registration: string;    // PT-XXX
  model: string;
  type: AircraftType;
  year: number;
  status: AircraftStatus;
  image_url?: string;
  owner_org_id?: string;
  created_at: string;
}

// ─── Aircraft Hours ──────────────────────────────────

export interface AircraftHours {
  aircraft_id: string;
  airframe_hours: number;
  engine_hours: number;
  prop_hours: number;
  main_rotor_hours?: number;
  tail_rotor_hours?: number;
  gearbox_hours?: number;
  updated_at: string;
}

// ═══════════════════════════════════════════════════════
// M5 — CTM (Controle Técnico de Manutenção)
// ═══════════════════════════════════════════════════════

export type CTMCategory =
  | 'inspecao_periodica'
  | 'componente'
  | 'ad'
  | 'documento'
  | 'certificado'
  | 'seguro'
  | 'equipamento';

export type CTMItemStatus = 'ok' | 'alert' | 'overdue' | 'grounding';

export type DiscrepancySeverity = 'mel' | 'defer' | 'grounding' | 'info';
export type DiscrepancyStatus = 'open' | 'deferred' | 'resolved' | 'cancelled';

export type MaintenanceLogType =
  | 'preventiva'
  | 'corretiva'
  | 'ad_cumprida'
  | 'inspecao'
  | 'overhaul'
  | 'troca_componente'
  | 'reparo';

export interface CTMItem {
  id: string;
  aircraft_id: string;
  category: CTMCategory;
  name: string;
  // Controle por HORAS
  limit_hours?: number;
  last_done_at_hours?: number;
  next_due_hours?: number;
  alert_threshold_hours: number;
  // Controle por DATA
  last_done_date?: string;
  next_due_date?: string;
  alert_threshold_days: number;
  // Controle por CICLOS
  limit_cycles?: number;
  current_cycles?: number;
  next_due_cycles?: number;
  // Status
  status: CTMItemStatus;
  is_grounding_item: boolean;
  applicable_to: 'airplane' | 'helicopter' | 'both';
  component_location?: string;
  part_number?: string;
  serial_number?: string;
  notes?: string;
}

export interface CTMMaintenanceLog {
  id: string;
  aircraft_id: string;
  ctm_item_id?: string;
  type: MaintenanceLogType;
  description: string;
  performed_at_hours?: number;
  performed_date: string;
  next_due_hours?: number;
  next_due_date?: string;
  cost?: number;
  mechanic_name?: string;
  mechanic_canac?: string;
  shop_name?: string;
  work_order_number?: string;
  notes?: string;
  created_at: string;
}

export interface CTMDiscrepancy {
  id: string;
  aircraft_id: string;
  flight_log_id?: string;
  reported_by?: string;
  description: string;
  severity: DiscrepancySeverity;
  status: DiscrepancyStatus;
  deferred_until?: string;
  resolved_at?: string;
  resolution_notes?: string;
  created_at: string;
}

// ═══════════════════════════════════════════════════════
// M6 — Controle Financeiro
// ═══════════════════════════════════════════════════════

export type FixedCostCategory =
  | 'hangar'
  | 'tripulacao'
  | 'seguro'
  | 'administracao'
  | 'atualizacao_software_painel'
  | 'outros';

export type VariableCostCategory =
  | 'combustivel'
  | 'reserva_manutencao'
  | 'taxas_aeroportuarias'
  | 'pouso'
  | 'pernoite'
  | 'catering'
  | 'handling'
  | 'outros';

export interface FinancialFixedCost {
  id: string;
  aircraft_id: string;
  category: FixedCostCategory;
  description: string;
  monthly_amount: number;
  start_date: string;
  end_date?: string;
  active: boolean;
  notes?: string;
}

export interface FinancialVariableCost {
  id: string;
  aircraft_id: string;
  flight_log_id?: string;
  category: VariableCostCategory;
  description?: string;
  amount: number;
  date: string;
  hours_reference?: number;
  notes?: string;
}

export interface FinancialHourConfig {
  aircraft_id: string;
  avg_fuel_cost_per_hour: number;
  avg_maintenance_cost_per_hour: number;
  overhaul_reserve_per_hour: number;
  avg_fees_per_hour: number;
  notes?: string;
}

// ─── Legacy (kept for backwards compat) ──────────────

export type MaintenanceStatus = 'ok' | 'approaching' | 'due' | 'overdue';

export interface MaintenanceAlert {
  id: string;
  aircraft_id: string;
  component: string;
  type: '50h' | '100h' | 'TBO' | 'annual' | 'document';
  threshold_hours: number;
  alert_at_hours: number;
  current_hours: number;
  next_due_hours: number;
  status: MaintenanceStatus;
  notes?: string;
}

// ─── Flight Log ──────────────────────────────────────

export interface FlightLog {
  id: string;
  aircraft_id: string;
  
  // Times
  date: string;
  engine_start: string; // Partida
  takeoff: string;      // Decolagem
  landing: string;      // Pouso
  engine_stop: string;  // Corte
  
  // Computed Hours (engine_stop - engine_start)
  hours_flown: number;
  
  // Conditions
  day_hours: number;
  night_hours: number;
  ifr_hours: number;
  vfr_hours: number;
  
  // Route
  origin_icao: string;
  destination_icao: string;
  
  // Crew & Pax
  pilot_id: string; // PIC
  pilot_name: string;
  sic_id?: string;  // SIC
  sic_name?: string;
  pob: number;
  
  // Operations
  fuel_used?: number;
  total_airframe_hours: number;
  occurrence?: string;
  aircraft_condition: 'normal' | 'deferred' | 'grounded';
  
  // Security
  locked: boolean;
  hash?: string;
  created_at: string;
}

// ─── Booking ─────────────────────────────────────────

export interface Booking {
  id: string;
  aircraft_id: string;
  member_id: string;
  member_name: string;
  start_at: string;
  end_at: string;
  status: BookingStatus;
  hours_reserved: number;
  notes?: string;
}

// ─── Notification ────────────────────────────────────

export interface Notification {
  id: string;
  user_id: string;
  aircraft_id?: string;
  type: 'maintenance' | 'booking' | 'flight' | 'system';
  title: string;
  body: string;
  read: boolean;
  created_at: string;
}

// ─── Aircraft Member ─────────────────────────────────

export interface AircraftMember {
  aircraft_id: string;
  user_id: string;
  user_name: string;
  role: UserRole;
  monthly_quota_hours: number;
  hours_used: number;
  active: boolean;
}

// ─── Dashboard KPI ───────────────────────────────────

export interface DashboardKPI {
  label: string;
  value: string | number;
  unit?: string;
  change?: number;        // percentage change
  trend?: 'up' | 'down' | 'stable';
  icon: string;           // lucide icon name
  color: 'cyan' | 'amber' | 'emerald' | 'rose';
  href?: string;
}

// ─── Pilot Credentials (M7) ──────────────────────────

export interface PilotCredential {
  id: string;
  user_id: string;
  credential_type: 'cma' | 'habilitacao_tipo' | 'habilitacao_classe' | 'habilitacao_ifr' | 'habilitacao_mlte' | 'habilitacao_instrucao' | 'proficiencia_linguistica' | 'checagem_proficiencia' | 'curso_egress' | 'curso_crm' | 'outro';
  description: string;
  issued_date: string;
  expiry_date: string;
  issuing_authority: string;
  document_number?: string;
  status: 'valid' | 'expiring' | 'expired';
}

export interface PilotFlightHours {
  user_id: string;
  total_hours: number;
  last_24h_hours: number;
  last_30d_hours: number;
  last_90d_hours: number;
  last_12m_hours: number;
  last_flight_date: string;
}

// ─── Safety Reports (M12) ────────────────────────────

export interface SafetyReport {
  id: string;
  aircraft_id?: string;
  reported_by: string;
  report_type: 'incidente' | 'incidente_grave' | 'ocorrencia_solo' | 'ocorrencia_anormal' | 'perigo_potencial' | 'sugestao_seguranca';
  date_occurred: string;
  location_icao?: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'submitted' | 'under_review' | 'action_required' | 'resolved' | 'closed';
  is_anonymous: boolean;
  created_at: string;
}

// ─── Checklists (M11) ────────────────────────────────

export interface ChecklistItem {
  order: number;
  item: string;
  action: string;
  category: string;
  is_critical: boolean;
}

export interface ChecklistTemplate {
  id: string;
  aircraft_model: string;
  type: 'pre_flight' | 'post_flight' | 'emergency';
  name: string;
  items: ChecklistItem[];
}

