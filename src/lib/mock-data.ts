// ═══════════════════════════════════════════════════════
// AeroGest — Mock Data (Local-First MVP)
// ═══════════════════════════════════════════════════════

import type {
  User,
  Aircraft,
  AircraftHours,
  MaintenanceAlert,
  FlightLog,
  Notification,
  AircraftMember,
  DashboardKPI,
  PilotCredential,
  PilotFlightHours,
  SafetyReport,
  ChecklistTemplate,
} from '@/types/models';

// ─── Mock User (Authenticated) ──────────────────────

export const mockUser: User = {
  id: 'usr_001',
  full_name: 'Carlos Eduardo Mendes',
  email: 'carlos@aerogest.app',
  role: 'owner_active',
  canac: '123456',
  avatar_url: undefined,
  created_at: '2025-01-15T10:00:00Z',
};

// ─── Aircraft Fleet ─────────────────────────────────

export const mockAircraft: Aircraft[] = [
  {
    id: 'acft_001',
    registration: 'PT-KZM',
    model: 'Cessna 182 Skylane',
    type: 'airplane',
    year: 2019,
    status: 'active',
    created_at: '2024-06-01T08:00:00Z',
  },
  {
    id: 'acft_002',
    registration: 'PT-RJB',
    model: 'Cirrus SR22',
    type: 'airplane',
    year: 2022,
    status: 'active',
    created_at: '2024-03-15T14:00:00Z',
  },
  {
    id: 'acft_003',
    registration: 'PP-HEL',
    model: 'Robinson R44 Raven II',
    type: 'helicopter',
    year: 2020,
    status: 'maintenance',
    created_at: '2024-09-20T09:30:00Z',
  },
  {
    id: 'acft_004',
    registration: 'PT-WML',
    model: 'Beechcraft Baron G58',
    type: 'airplane',
    year: 2018,
    status: 'active',
    created_at: '2023-11-10T16:00:00Z',
  },
];

// ─── Aircraft Hours ─────────────────────────────────

export const mockAircraftHours: Record<string, AircraftHours> = {
  acft_001: {
    aircraft_id: 'acft_001',
    airframe_hours: 1847.3,
    engine_hours: 1420.8,
    prop_hours: 1420.8,
    updated_at: '2026-05-08T12:00:00Z',
  },
  acft_002: {
    aircraft_id: 'acft_002',
    airframe_hours: 623.1,
    engine_hours: 623.1,
    prop_hours: 623.1,
    updated_at: '2026-05-07T18:30:00Z',
  },
  acft_003: {
    aircraft_id: 'acft_003',
    airframe_hours: 980.5,
    engine_hours: 980.5,
    prop_hours: 0,
    main_rotor_hours: 980.5,
    tail_rotor_hours: 980.5,
    gearbox_hours: 980.5,
    updated_at: '2026-05-06T10:00:00Z',
  },
  acft_004: {
    aircraft_id: 'acft_004',
    airframe_hours: 2310.7,
    engine_hours: 1850.2,
    prop_hours: 1850.2,
    updated_at: '2026-05-08T08:00:00Z',
  },
};

// ─── Maintenance Alerts ─────────────────────────────

export const mockMaintenanceAlerts: MaintenanceAlert[] = [
  {
    id: 'mnt_001',
    aircraft_id: 'acft_001',
    component: 'Motor Lycoming IO-540',
    type: '100h',
    threshold_hours: 100,
    alert_at_hours: 10,
    current_hours: 1420.8,
    next_due_hours: 1500,
    status: 'ok',
    notes: 'Última revisão em março/2026',
  },
  {
    id: 'mnt_002',
    aircraft_id: 'acft_001',
    component: 'Hélice McCauley',
    type: '50h',
    threshold_hours: 50,
    alert_at_hours: 5,
    current_hours: 1420.8,
    next_due_hours: 1425,
    status: 'approaching',
    notes: 'Faltam apenas 4.2h — agendar revisão',
  },
  {
    id: 'mnt_003',
    aircraft_id: 'acft_003',
    component: 'Rotor Principal',
    type: 'TBO',
    threshold_hours: 2200,
    alert_at_hours: 100,
    current_hours: 980.5,
    next_due_hours: 2200,
    status: 'ok',
  },
  {
    id: 'mnt_004',
    aircraft_id: 'acft_004',
    component: 'Motor Esquerdo TCM IO-550',
    type: '100h',
    threshold_hours: 100,
    alert_at_hours: 10,
    current_hours: 1850.2,
    next_due_hours: 1855,
    status: 'due',
    notes: 'VENCIDO — apenas 4.8h restantes. Manutenção urgente.',
  },
  {
    id: 'mnt_005',
    aircraft_id: 'acft_002',
    component: 'Seguro Aeronáutico',
    type: 'document',
    threshold_hours: 0,
    alert_at_hours: 0,
    current_hours: 0,
    next_due_hours: 0,
    status: 'ok',
    notes: 'Vence em 15/09/2026',
  },
];

// ─── Recent Flight Logs ─────────────────────────────

export const mockFlightLogs: FlightLog[] = [
  {
    id: 'flt_001',
    aircraft_id: 'acft_001',
    pilot_id: 'usr_001',
    pilot_name: 'Carlos E. Mendes',
    date: '2026-05-08',
    engine_start: '08:15',
    takeoff: '08:30',
    landing: '10:45',
    engine_stop: '10:55',
    hours_flown: 2.6, // (10:55 - 08:15) = 2.6
    day_hours: 2.6,
    night_hours: 0,
    ifr_hours: 2.6,
    vfr_hours: 0,
    origin_icao: 'SBSP',
    destination_icao: 'SBJD',
    pob: 2,
    fuel_used: 95,
    total_airframe_hours: 1847.3,
    occurrence: 'Voo sem alterações. Sistema de navegação atualizado.',
    aircraft_condition: 'normal',
    locked: true,
    hash: 'a3f8c1d2e5b7...',
    created_at: '2026-05-08T10:50:00Z',
  },
  {
    id: 'flt_002',
    aircraft_id: 'acft_002',
    pilot_id: 'usr_002',
    pilot_name: 'Ana Paula Ribeiro',
    date: '2026-05-07',
    engine_start: '13:50',
    takeoff: '14:00',
    landing: '16:30',
    engine_stop: '16:40',
    hours_flown: 2.8,
    day_hours: 2.8,
    night_hours: 0,
    ifr_hours: 0,
    vfr_hours: 2.8,
    origin_icao: 'SBGR',
    destination_icao: 'SBRJ',
    pob: 4,
    fuel_used: 120,
    total_airframe_hours: 623.1,
    aircraft_condition: 'normal',
    locked: true,
    hash: 'b7e2f9a1c4d6...',
    created_at: '2026-05-07T16:35:00Z',
  },
  {
    id: 'flt_003',
    aircraft_id: 'acft_001',
    pilot_id: 'usr_001',
    pilot_name: 'Carlos E. Mendes',
    date: '2026-05-06',
    engine_start: '06:50',
    takeoff: '07:00',
    landing: '08:30',
    engine_stop: '08:40',
    hours_flown: 1.8,
    day_hours: 1.8,
    night_hours: 0,
    ifr_hours: 1.8,
    vfr_hours: 0,
    origin_icao: 'SBJD',
    destination_icao: 'SBSP',
    pob: 1,
    fuel_used: 65,
    total_airframe_hours: 1844.7,
    aircraft_condition: 'normal',
    locked: true,
    hash: 'c9d3e4f5a6b8...',
    created_at: '2026-05-06T08:35:00Z',
  },
  {
    id: 'flt_004',
    aircraft_id: 'acft_004',
    pilot_id: 'usr_003',
    pilot_name: 'Roberto Souza',
    date: '2026-05-05',
    engine_start: '09:45',
    takeoff: '10:00',
    landing: '13:15',
    engine_stop: '13:30',
    hours_flown: 3.7,
    day_hours: 3.7,
    night_hours: 0,
    ifr_hours: 3.7,
    vfr_hours: 0,
    origin_icao: 'SBKP',
    destination_icao: 'SBCF',
    pob: 3,
    fuel_used: 210,
    total_airframe_hours: 2310.7,
    occurrence: 'Luz do alternador esquerdo piscou durante a descida.',
    aircraft_condition: 'deferred',
    locked: true,
    hash: 'd1a2b3c4e5f6...',
    created_at: '2026-05-05T13:20:00Z',
  },
];

// ─── Notifications ──────────────────────────────────

export const mockNotifications: Notification[] = [
  {
    id: 'ntf_001',
    user_id: 'usr_001',
    aircraft_id: 'acft_001',
    type: 'maintenance',
    title: 'Revisão de Hélice Próxima',
    body: 'PT-KZM: Hélice McCauley a 4.2h da próxima revisão de 50h.',
    read: false,
    created_at: '2026-05-08T09:00:00Z',
  },
  {
    id: 'ntf_002',
    user_id: 'usr_001',
    aircraft_id: 'acft_004',
    type: 'maintenance',
    title: '⚠️ Manutenção Urgente',
    body: 'PT-WML: Motor esquerdo TCM IO-550 com apenas 4.8h para revisão de 100h.',
    read: false,
    created_at: '2026-05-08T08:00:00Z',
  },
  {
    id: 'ntf_003',
    user_id: 'usr_001',
    aircraft_id: 'acft_001',
    type: 'flight',
    title: 'Voo Registrado',
    body: 'Voo SBSP → SBJD registrado com sucesso. 2.25h voadas.',
    read: true,
    created_at: '2026-05-08T10:51:00Z',
  },
  {
    id: 'ntf_004',
    user_id: 'usr_001',
    aircraft_id: 'acft_003',
    type: 'system',
    title: 'Aeronave em Manutenção',
    body: 'PP-HEL (Robinson R44) está em manutenção programada.',
    read: true,
    created_at: '2026-05-07T15:00:00Z',
  },
];

// ─── Aircraft Members ───────────────────────────────

export const mockAircraftMembers: AircraftMember[] = [
  {
    aircraft_id: 'acft_001',
    user_id: 'usr_001',
    user_name: 'Carlos E. Mendes',
    role: 'owner_active',
    monthly_quota_hours: 30,
    hours_used: 12.5,
    active: true,
  },
  {
    aircraft_id: 'acft_001',
    user_id: 'usr_002',
    user_name: 'Ana Paula Ribeiro',
    role: 'pilot',
    monthly_quota_hours: 20,
    hours_used: 8.0,
    active: true,
  },
  {
    aircraft_id: 'acft_002',
    user_id: 'usr_001',
    user_name: 'Carlos E. Mendes',
    role: 'owner_active',
    monthly_quota_hours: 25,
    hours_used: 5.5,
    active: true,
  },
];

// ─── Dashboard KPIs ─────────────────────────────────

export const mockDashboardKPIs: DashboardKPI[] = [
  {
    label: 'Total de Aeronaves',
    value: 4,
    icon: 'Plane',
    color: 'cyan',
    trend: 'stable',
    href: '/dashboard/aircraft',
  },
  {
    label: 'Horas Voadas (Mês)',
    value: '9.5h',
    icon: 'Clock',
    color: 'emerald',
    change: 12,
    trend: 'up',
    href: '/dashboard/flights',
  },
  {
    label: 'Alertas de Manutenção',
    value: 2,
    icon: 'AlertTriangle',
    color: 'amber',
    change: -1,
    trend: 'down',
    href: '/dashboard/maintenance',
  },
  {
    label: 'Próximo Voo',
    value: 'Amanhã',
    unit: '08:00',
    icon: 'Calendar',
    color: 'cyan',
    href: '/dashboard/schedule',
  },
];

// ─── Pilot Credentials (M7) ─────────────────────────

export const mockPilotCredentials: PilotCredential[] = [
  {
    id: 'cred_001',
    user_id: 'usr_001',
    credential_type: 'cma',
    description: 'Certificado Médico Aeronáutico (1ª Classe)',
    issued_date: '2025-10-15',
    expiry_date: '2026-10-15',
    issuing_authority: 'ANAC',
    document_number: 'CMA-123456',
    status: 'valid',
  },
  {
    id: 'cred_002',
    user_id: 'usr_001',
    credential_type: 'habilitacao_tipo',
    description: 'Habilitação de Tipo: C182',
    issued_date: '2020-05-10',
    expiry_date: '2028-05-10',
    issuing_authority: 'ANAC',
    document_number: 'HT-182-99',
    status: 'valid',
  },
];

export const mockPilotFlightHours: PilotFlightHours = {
  user_id: 'usr_001',
  total_hours: 1450.5,
  last_24h_hours: 2.6,
  last_30d_hours: 15.2,
  last_90d_hours: 45.8,
  last_12m_hours: 180.4,
  last_flight_date: '2026-05-08',
};

// ─── Safety Reports (M12) ───────────────────────────

export const mockSafetyReports: SafetyReport[] = [
  {
    id: 'sr_001',
    aircraft_id: 'acft_001',
    reported_by: 'usr_001',
    report_type: 'ocorrencia_anormal',
    date_occurred: '2026-05-05',
    location_icao: 'SBSP',
    description: 'Pássaro atingiu o trem de pouso durante a aproximação, sem danos aparentes na inspeção visual.',
    severity: 'low',
    status: 'under_review',
    is_anonymous: false,
    created_at: '2026-05-06T10:00:00Z',
  },
  {
    id: 'sr_002',
    reported_by: 'usr_002',
    report_type: 'perigo_potencial',
    date_occurred: '2026-05-01',
    description: 'Marcação apagada na taxiway B do aeroporto base, risco de incursão em pista.',
    severity: 'medium',
    status: 'submitted',
    is_anonymous: true,
    created_at: '2026-05-01T15:30:00Z',
  }
];

// ─── Checklists (M11) ───────────────────────────────

export const mockChecklistTemplates: ChecklistTemplate[] = [
  {
    id: 'chk_001',
    aircraft_model: 'Cessna 182 Skylane',
    type: 'pre_flight',
    name: 'Pré-voo C182 (Padrão)',
    items: [
      { order: 1, item: 'Documentos da aeronave', action: 'A bordo e válidos', category: 'Cabine', is_critical: true },
      { order: 2, item: 'Master Switch', action: 'Ligar', category: 'Cabine', is_critical: false },
      { order: 3, item: 'Quantidade de combustível', action: 'Verificar nos visores', category: 'Cabine', is_critical: true },
      { order: 4, item: 'Flaps', action: 'Baixar totalmente', category: 'Cabine', is_critical: false },
      { order: 5, item: 'Master Switch', action: 'Desligar', category: 'Cabine', is_critical: false },
      { order: 6, item: 'Tubo de Pitot', action: 'Remover capa, verificar desobstrução', category: 'Asa Esquerda', is_critical: true },
    ]
  }
];
