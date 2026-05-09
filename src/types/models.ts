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

// ─── Maintenance ─────────────────────────────────────

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

