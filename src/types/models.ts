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
  manufacturer?: string;   // ex: Cessna
  model: string;
  serial_number?: string;  // SN de fábrica
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
  
  // Operations & ANAC Details
  nature?: string; // Natureza do Voo (Instrução, Privado, etc)
  landings?: number; // Pousos
  fuel_used?: number; // Combustível consumido
  lubricant_used?: number; // Óleo lubrificante abastecido
  cargo_weight?: number; // Peso da Carga/Bagagem
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
  language_level?: 4 | 5 | 6; // For ICAO proficiency
}

export interface PilotFlightHours {
  user_id: string;
  total_hours: number;
  last_24h_hours: number;
  last_30d_hours: number;
  last_90d_hours: number;
  last_12m_hours: number;
  last_flight_date: string;
  
  // Recent Experience (Sprint 5)
  takeoffs_day_90d?: number;
  takeoffs_night_90d?: number;
  landings_day_90d?: number;
  landings_night_90d?: number;
  ifr_approaches_6m?: number;
  ifr_hold_entries_6m?: number;
  tailwheel_landings_90d?: number;
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

// ─── Coordination (Sprint 4) ─────────────────────────

export interface PassengerManifest {
  id: string;
  flight_log_id?: string;
  aircraft_id: string;
  date: string;
  origin: string;
  destination: string;
  passengers: {
    name: string;
    document: string;
    weight: number;
    baggage_weight: number;
  }[];
  total_pax_weight: number;
  total_baggage_weight: number;
  status: 'draft' | 'confirmed' | 'flown';
}

export interface FlightRoster {
  id: string;
  date: string;
  aircraft_id: string;
  origin: string;
  destination: string;
  pic_id: string;
  pic_name: string;
  sic_id?: string;
  sic_name?: string;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
}

export interface FlightTracking {
  id: string;
  aircraft_id: string;
  registration: string;
  status: 'on_ground' | 'in_flight' | 'maintenance' | 'unknown';
  latitude?: number;
  longitude?: number;
  altitude?: number;
  heading?: number;
  speed?: number;
  last_updated: string;
}

export interface DocumentGEDEC {
  id: string;
  title: string;
  type: 'ordem_missao' | 'manual' | 'procedimento' | 'licenca' | 'outro';
  aircraft_id?: string;
  url: string;
  valid_until?: string;
  created_at: string;
}

export interface AircraftPerformance {
  aircraft_id: string;
  cruise_speed_kts: number;
  fuel_burn_ph: number; // liters per hour or lbs per hour (we'll assume liters for mock)
  max_range_nm: number;
}

export interface FlightPlan {
  id: string;
  aircraft_id: string;
  date: string;
  origin: string;
  destination: string;
  alternate?: string;
  distance_nm: number;
  estimated_time_enroute: number; // decimal hours
  fuel_required_liters: number;
  route_text?: string;
  status: 'draft' | 'filed' | 'completed';
}

// ═══════════════════════════════════════════════════════
// SPRINT 5 — Tripulação Avançada
// ═══════════════════════════════════════════════════════

export interface CrewDutyPeriod {
  id: string;
  user_id: string;
  aircraft_id?: string;
  flight_log_id?: string;
  duty_start: string;
  duty_end?: string;
  presentation_time?: string;
  release_time?: string;
  total_duty_minutes?: number;
  flight_time_minutes: number;
  standby_minutes: number;
  ground_time_minutes: number;
  positioning_minutes: number;
  waiting_minutes: number;
  rest_before_minutes?: number;
  rest_after_minutes?: number;
  rest_compliant?: boolean;
  duty_type: 'single_pilot_vfr' | 'single_pilot_ifr' | 'multi_crew' | 'standby_home' | 'standby_airport' | 'positioning' | 'training' | 'administrative';
  max_duty_hours?: number;
  max_flight_hours?: number;
  exceeded_limit: boolean;
  exceeded_reason?: string;
  status: 'open' | 'closed' | 'approved';
  approved_by?: string;
  notes?: string;
  created_at: string;
}

export interface CrewCheckin {
  id: string;
  user_id: string;
  flight_log_id?: string;
  booking_id?: string;
  aircraft_id: string;
  role: 'pic' | 'sic' | 'instructor' | 'observer';
  scheduled_time?: string;
  checkin_time?: string;
  status: 'pending' | 'checked_in' | 'late' | 'no_show' | 'cancelled';
  fit_for_duty?: boolean;
  fit_declaration_notes?: string;
  location_lat?: number;
  location_lon?: number;
  created_at: string;
}

export interface PilotExperienceEvent {
  id: string;
  user_id: string;
  flight_log_id?: string;
  event_type: 'takeoff_day' | 'takeoff_night' | 'landing_day_full_stop' | 'landing_night_full_stop' | 'landing_touch_and_go' | 'ifr_approach' | 'ifr_hold' | 'autorotation' | 'hovering' | 'night_flight' | 'cross_country';
  quantity: number;
  airport_icao?: string;
  event_date: string;
  notes?: string;
  created_at: string;
}

export interface PilotHoursByType {
  id: string;
  user_id: string;
  aircraft_model: string;
  aircraft_category: 'sel' | 'mel' | 'ses' | 'mes' | 'helo_single' | 'helo_multi';
  total_hours: number;
  pic_hours: number;
  sic_hours: number;
  dual_hours: number;
  night_hours: number;
  ifr_hours: number;
  last_flown_date?: string;
  updated_at: string;
}

export interface TrainingRecord {
  id: string;
  user_id: string;
  training_type: 'initial' | 'recurrent' | 'transition' | 'upgrade' | 'special' | 'crm' | 'dangerous_goods' | 'first_aid' | 'emergency_egress' | 'fire_fighting' | 'security' | 'ground_school';
  course_name: string;
  provider?: string;
  instructor_name?: string;
  start_date: string;
  end_date?: string;
  expiry_date?: string;
  hours_completed?: number;
  grade?: 'pass' | 'fail' | 'incomplete' | 'na';
  certificate_number?: string;
  certificate_url?: string;
  status: 'valid' | 'expiring' | 'expired';
  alert_days: number;
  notes?: string;
  created_at: string;
}

// ═══════════════════════════════════════════════════════
// SPRINT 6 — CTM Avançado
// ═══════════════════════════════════════════════════════

export interface ServiceBulletin {
  id: string;
  aircraft_id: string;
  sb_number: string;
  ad_number?: string;
  title: string;
  description?: string;
  mandatory: boolean;
  status: 'pending' | 'applied' | 'na';
  due_hours?: number;
  due_date?: string;
  applied_hours?: number;
  applied_date?: string;
  notes?: string;
  created_at: string;
}

export interface AircraftComponent {
  id: string;
  aircraft_id: string;
  parent_component_id?: string; // Para hierarquia (ex: cilindro dentro do motor)
  name: string;
  category: 'engine' | 'propeller' | 'avionics' | 'landing_gear' | 'structural' | 'accessory';
  part_number?: string;
  serial_number?: string;
  install_date?: string;
  install_hours: number;
  tbo_hours?: number;
  tbo_months?: number;
  current_tsn: number; // Time Since New
  current_tso: number; // Time Since Overhaul
  status: 'ok' | 'warning' | 'due' | 'removed';
  created_at: string;
}

export interface WorkOrder {
  id: string;
  aircraft_id: string;
  work_order_number: string;
  title: string;
  status: 'open' | 'in_progress' | 'closed' | 'cancelled';
  type: 'scheduled' | 'unscheduled' | 'ad_sb' | 'stc' | 'inspection';
  mechanic_id?: string;
  mechanic_name?: string;
  mechanic_license?: string;
  shop_name?: string;
  open_date: string;
  close_date?: string;
  aircraft_hours_in: number;
  total_cost?: number;
  notes?: string;
  created_at: string;
}

export interface WorkOrderItem {
  id: string;
  work_order_id: string;
  description: string;
  cost?: number;
  ctm_item_id?: string;
  discrepancy_id?: string;
  status: 'pending' | 'completed' | 'deferred' | 'na';
}

export interface AircraftModification {
  id: string;
  aircraft_id: string;
  stc_number: string;
  title: string;
  description?: string;
  installation_date: string;
  installed_by?: string;
  notes?: string;
}

export interface TechnicalDocument {
  id: string;
  aircraft_id: string;
  category: 'manual' | 'ipc' | 'wiring_diagram' | 'poh' | 'other';
  title: string;
  url: string;
  version?: string;
  release_date?: string;
  is_current: boolean;
}

// ═══════════════════════════════════════════════════════
// SPRINT 7 — Suprimentos e Estoque
// ═══════════════════════════════════════════════════════

export interface InventoryItem {
  id: string;
  part_number: string;
  alt_part_number?: string;
  description: string;
  category: 'consumable' | 'rotatable' | 'tool' | 'hardware' | 'avionics';
  unit_of_measure: 'un' | 'l' | 'kg' | 'm' | 'cx';
  minimum_quantity: number;
  current_quantity: number;
  average_unit_cost: number;
  location?: string; // Prateleira, hangar
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface InventoryMovement {
  id: string;
  item_id: string;
  movement_type: 'in' | 'out' | 'adjustment';
  quantity: number;
  unit_cost?: number;
  date: string;
  work_order_id?: string; // Relaciona saída com OS do CTM
  purchase_order_id?: string; // Relaciona entrada com Compra
  performed_by: string;
  notes?: string;
}

export interface Supplier {
  id: string;
  name: string;
  trade_name?: string;
  cnpj?: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  category: 'parts' | 'maintenance' | 'fuel' | 'services' | 'other';
  notes?: string;
  active: boolean;
}

export interface PurchaseOrder {
  id: string;
  po_number: string;
  supplier_id: string;
  status: 'draft' | 'quoted' | 'approved' | 'shipped' | 'received' | 'cancelled';
  total_amount?: number;
  date_created: string;
  date_expected?: string;
  date_received?: string;
  requested_by: string;
  notes?: string;
}

// ═══════════════════════════════════════════════════════
// SPRINT 8 — Operações Aéreas
// ═══════════════════════════════════════════════════════

export interface Aerodrome {
  id: string;
  icao: string; // Ex: SBSP
  iata?: string; // Ex: CGH
  name: string;
  city: string;
  state: string;
  country: string;
  runway_surface: 'asphalt' | 'concrete' | 'dirt' | 'grass' | 'gravel' | 'water' | 'helipad';
  runway_length_meters?: number;
  fuel_available: ('jeta1' | 'avgas' | 'none')[];
  operating_hours?: string;
  notes?: string;
}

export interface FuelRecord {
  id: string;
  aircraft_id: string;
  aerodrome_icao: string;
  date: string;
  fuel_type: 'jeta1' | 'avgas';
  quantity: number;
  unit: 'l' | 'gal';
  unit_price: number;
  total_cost: number;
  provider?: string;
  receipt_url?: string;
  pilot_id?: string;
  notes?: string;
}

export interface TravelDocument {
  id: string;
  person_type: 'pilot' | 'passenger';
  person_id: string; // Reference to Pilot or Passenger
  person_name: string; // Denormalized for easy display
  document_type: 'passport' | 'visa_us' | 'visa_eu' | 'vaccine_yellow_fever' | 'other';
  document_number: string;
  issue_country: string;
  issue_date: string;
  expiry_date: string;
  file_url?: string;
  notes?: string;
}

export interface OperationalContact {
  id: string;
  aerodrome_icao?: string;
  name: string;
  category: 'fbo' | 'handling' | 'catering' | 'transport' | 'security' | 'other';
  phone?: string;
  email?: string;
  frequency?: string; // Radio frequency
  notes?: string;
}

export interface OperationalChecklist {
  id: string;
  title: string;
  aircraft_model?: string; // If specific to a model
  category: 'normal' | 'emergency' | 'abnormal' | 'sop' | 'ground';
  items: {
    id: string;
    challenge: string;
    response: string;
  }[];
}

// ═══════════════════════════════════════════════════════
// SPRINT 9 — Financeiro Avançado
// ═══════════════════════════════════════════════════════

export interface FinancialTransaction {
  id: string;
  type: 'income' | 'expense';
  category: 'fuel' | 'maintenance' | 'salary' | 'flight_revenue' | 'hangar' | 'insurance' | 'taxes' | 'other';
  amount: number;
  date: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  description: string;
  aircraft_id?: string; // If the cost/revenue is tied to a specific tail
  related_entity_type?: 'work_order' | 'purchase_order' | 'flight' | 'invoice';
  related_entity_id?: string;
  payment_method?: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  client_name: string;
  client_document?: string; // CPF or CNPJ
  amount: number;
  issue_date: string;
  due_date: string;
  payment_date?: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  flight_id?: string; // If this invoice is for a specific charter flight
  notes?: string;
}

export interface OwnerStatement {
  id: string;
  aircraft_id: string;
  owner_name: string;
  month: number;
  year: number;
  fraction_percentage: number;
  flight_hours_used: number;
  fixed_costs_share: number;
  variable_costs_share: number;
  management_fee?: number;
  total_due: number;
  status: 'draft' | 'sent' | 'paid';
}

export interface AircraftStatementSummary {
  aircraft_id: string;
  month: number;
  year: number;
  total_flight_hours: number;
  total_revenue: number;
  fixed_costs: number;
  variable_costs: number;
  gross_profit: number; // Revenue - (Fixed + Variable)
}
