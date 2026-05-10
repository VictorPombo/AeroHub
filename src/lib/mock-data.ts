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
  PassengerManifest,
  FlightRoster,
  FlightTracking,
  DocumentGEDEC,
  AircraftPerformance,
  FlightPlan,
  CTMItem,
  CTMMaintenanceLog,
  CTMDiscrepancy,
  FinancialFixedCost,
  FinancialVariableCost,
  FinancialHourConfig,
} from "@/types/models";

// ─── Mock User (Authenticated) ──────────────────────

export const mockUser: User = {
  id: "usr_001",
  full_name: "Thiago Teste",
  email: "thiagoteste@gmail.com",
  role: "super_admin",
  canac: "123456",
  avatar_url: undefined,
  created_at: "2025-01-15T10:00:00Z",
};

// ─── Aircraft Fleet ─────────────────────────────────

export const mockAircraft: Aircraft[] = [
  {
    id: "acft_001",
    registration: "PT-KZM",
    manufacturer: "Cessna",
    model: "182 Skylane",
    serial_number: "182-12345",
    type: "airplane",
    year: 2019,
    status: "active",
    created_at: "2024-06-01T08:00:00Z",
  },
  {
    id: "acft_002",
    registration: "PT-RJB",
    manufacturer: "Cirrus Aircraft",
    model: "SR22",
    serial_number: "SR22-5432",
    type: "airplane",
    year: 2022,
    status: "active",
    created_at: "2024-03-15T14:00:00Z",
  },
  {
    id: "acft_003",
    registration: "PP-HEL",
    manufacturer: "Robinson Helicopter",
    model: "R44 Raven II",
    serial_number: "R44-1188",
    type: "helicopter",
    year: 2020,
    status: "maintenance",
    created_at: "2024-09-20T09:30:00Z",
  },
  {
    id: "acft_004",
    registration: "PT-WML",
    manufacturer: "Beechcraft",
    model: "Baron G58",
    serial_number: "TH-2500",
    type: "airplane",
    year: 2018,
    status: "active",
    created_at: "2023-11-10T16:00:00Z",
  },
];

// ─── Aircraft Hours ─────────────────────────────────

export const mockAircraftHours: Record<string, AircraftHours> = {
  acft_001: {
    aircraft_id: "acft_001",
    airframe_hours: 1847.3,
    engine_hours: 1420.8,
    prop_hours: 1420.8,
    updated_at: "2026-05-08T12:00:00Z",
  },
  acft_002: {
    aircraft_id: "acft_002",
    airframe_hours: 623.1,
    engine_hours: 623.1,
    prop_hours: 623.1,
    updated_at: "2026-05-07T18:30:00Z",
  },
  acft_003: {
    aircraft_id: "acft_003",
    airframe_hours: 980.5,
    engine_hours: 980.5,
    prop_hours: 0,
    main_rotor_hours: 980.5,
    tail_rotor_hours: 980.5,
    gearbox_hours: 980.5,
    updated_at: "2026-05-06T10:00:00Z",
  },
  acft_004: {
    aircraft_id: "acft_004",
    airframe_hours: 2310.7,
    engine_hours: 1850.2,
    prop_hours: 1850.2,
    updated_at: "2026-05-08T08:00:00Z",
  },
};

// ─── Maintenance Alerts ─────────────────────────────

export const mockMaintenanceAlerts: MaintenanceAlert[] = [
  {
    id: "mnt_001",
    aircraft_id: "acft_001",
    component: "Motor Lycoming IO-540",
    type: "100h",
    threshold_hours: 100,
    alert_at_hours: 10,
    current_hours: 1420.8,
    next_due_hours: 1500,
    status: "ok",
    notes: "Última revisão em março/2026",
  },
  {
    id: "mnt_002",
    aircraft_id: "acft_001",
    component: "Hélice McCauley",
    type: "50h",
    threshold_hours: 50,
    alert_at_hours: 5,
    current_hours: 1420.8,
    next_due_hours: 1425,
    status: "approaching",
    notes: "Faltam apenas 4.2h — agendar revisão",
  },
  {
    id: "mnt_003",
    aircraft_id: "acft_003",
    component: "Rotor Principal",
    type: "TBO",
    threshold_hours: 2200,
    alert_at_hours: 100,
    current_hours: 980.5,
    next_due_hours: 2200,
    status: "ok",
  },
  {
    id: "mnt_004",
    aircraft_id: "acft_004",
    component: "Motor Esquerdo TCM IO-550",
    type: "100h",
    threshold_hours: 100,
    alert_at_hours: 10,
    current_hours: 1850.2,
    next_due_hours: 1855,
    status: "due",
    notes: "VENCIDO — apenas 4.8h restantes. Manutenção urgente.",
  },
  {
    id: "mnt_005",
    aircraft_id: "acft_002",
    component: "Seguro Aeronáutico",
    type: "document",
    threshold_hours: 0,
    alert_at_hours: 0,
    current_hours: 0,
    next_due_hours: 0,
    status: "ok",
    notes: "Vence em 15/09/2026",
  },
];

// ─── Recent Flight Logs ─────────────────────────────

export const mockFlightLogs: FlightLog[] = [
  {
    id: "flt_001",
    aircraft_id: "acft_001",
    pilot_id: "usr_001",
    pilot_name: "Carlos E. Mendes",
    date: "2026-05-08",
    engine_start: "08:15",
    takeoff: "08:30",
    landing: "10:45",
    engine_stop: "10:55",
    hours_flown: 2.6, // (10:55 - 08:15) = 2.6
    day_hours: 2.6,
    night_hours: 0,
    ifr_hours: 2.6,
    vfr_hours: 0,
    origin_icao: "SBSP",
    destination_icao: "SBJD",
    pob: 2,
    nature: "Privado",
    landings: 1,
    fuel_used: 95,
    lubricant_used: 1,
    cargo_weight: 15,
    total_airframe_hours: 1847.3,
    occurrence: "Voo sem alterações. Sistema de navegação atualizado.",
    aircraft_condition: "normal",
    locked: true,
    hash: "a3f8c1d2e5b7...",
    created_at: "2026-05-08T10:50:00Z",
  },
  {
    id: "flt_002",
    aircraft_id: "acft_002",
    pilot_id: "usr_002",
    pilot_name: "Ana Paula Ribeiro",
    date: "2026-05-07",
    engine_start: "13:50",
    takeoff: "14:00",
    landing: "16:30",
    engine_stop: "16:40",
    hours_flown: 2.8,
    day_hours: 2.8,
    night_hours: 0,
    ifr_hours: 0,
    vfr_hours: 2.8,
    origin_icao: "SBGR",
    destination_icao: "SBRJ",
    pob: 4,
    nature: "Táxi Aéreo",
    landings: 1,
    fuel_used: 120,
    lubricant_used: 0,
    cargo_weight: 45,
    total_airframe_hours: 623.1,
    aircraft_condition: "normal",
    locked: true,
    hash: "b7e2f9a1c4d6...",
    created_at: "2026-05-07T16:35:00Z",
  },
  {
    id: "flt_003",
    aircraft_id: "acft_001",
    pilot_id: "usr_001",
    pilot_name: "Carlos E. Mendes",
    date: "2026-05-06",
    engine_start: "06:50",
    takeoff: "07:00",
    landing: "08:30",
    engine_stop: "08:40",
    hours_flown: 1.8,
    day_hours: 1.8,
    night_hours: 0,
    ifr_hours: 1.8,
    vfr_hours: 0,
    origin_icao: "SBJD",
    destination_icao: "SBSP",
    pob: 1,
    nature: "Translado",
    landings: 1,
    fuel_used: 65,
    lubricant_used: 0,
    cargo_weight: 0,
    total_airframe_hours: 1844.7,
    aircraft_condition: "normal",
    locked: true,
    hash: "c9d3e4f5a6b8...",
    created_at: "2026-05-06T08:35:00Z",
  },
  {
    id: "flt_004",
    aircraft_id: "acft_004",
    pilot_id: "usr_003",
    pilot_name: "Roberto Souza",
    date: "2026-05-05",
    engine_start: "09:45",
    takeoff: "10:00",
    landing: "13:15",
    engine_stop: "13:30",
    hours_flown: 3.7,
    day_hours: 3.7,
    night_hours: 0,
    ifr_hours: 3.7,
    vfr_hours: 0,
    origin_icao: "SBKP",
    destination_icao: "SBCF",
    pob: 3,
    nature: "Privado",
    landings: 1,
    fuel_used: 210,
    lubricant_used: 2,
    cargo_weight: 30,
    total_airframe_hours: 2310.7,
    occurrence: "Luz do alternador esquerdo piscou durante a descida.",
    aircraft_condition: "deferred",
    locked: true,
    hash: "d1a2b3c4e5f6...",
    created_at: "2026-05-05T13:20:00Z",
  },
];

// ─── Notifications ──────────────────────────────────

export const mockNotifications: Notification[] = [
  {
    id: "ntf_001",
    user_id: "usr_001",
    aircraft_id: "acft_001",
    type: "maintenance",
    title: "Revisão de Hélice Próxima",
    body: "PT-KZM: Hélice McCauley a 4.2h da próxima revisão de 50h.",
    read: false,
    created_at: "2026-05-08T09:00:00Z",
  },
  {
    id: "ntf_002",
    user_id: "usr_001",
    aircraft_id: "acft_004",
    type: "maintenance",
    title: "⚠️ Manutenção Urgente",
    body: "PT-WML: Motor esquerdo TCM IO-550 com apenas 4.8h para revisão de 100h.",
    read: false,
    created_at: "2026-05-08T08:00:00Z",
  },
  {
    id: "ntf_003",
    user_id: "usr_001",
    aircraft_id: "acft_001",
    type: "flight",
    title: "Voo Registrado",
    body: "Voo SBSP → SBJD registrado com sucesso. 2.25h voadas.",
    read: true,
    created_at: "2026-05-08T10:51:00Z",
  },
  {
    id: "ntf_004",
    user_id: "usr_001",
    aircraft_id: "acft_003",
    type: "system",
    title: "Aeronave em Manutenção",
    body: "PP-HEL (Robinson R44) está em manutenção programada.",
    read: true,
    created_at: "2026-05-07T15:00:00Z",
  },
];

// ─── Aircraft Members ───────────────────────────────

export const mockAircraftMembers: AircraftMember[] = [
  {
    aircraft_id: "acft_001",
    user_id: "usr_001",
    user_name: "Carlos E. Mendes",
    role: "owner_active",
    monthly_quota_hours: 30,
    hours_used: 12.5,
    active: true,
  },
  {
    aircraft_id: "acft_001",
    user_id: "usr_002",
    user_name: "Ana Paula Ribeiro",
    role: "pilot",
    monthly_quota_hours: 20,
    hours_used: 8.0,
    active: true,
  },
  {
    aircraft_id: "acft_002",
    user_id: "usr_001",
    user_name: "Carlos E. Mendes",
    role: "owner_active",
    monthly_quota_hours: 25,
    hours_used: 5.5,
    active: true,
  },
];

// ─── Dashboard KPIs ─────────────────────────────────

export const mockDashboardKPIs: DashboardKPI[] = [
  {
    label: "Total de Aeronaves",
    value: 4,
    icon: "Plane",
    color: "cyan",
    trend: "stable",
    href: "/dashboard/aircraft",
  },
  {
    label: "Horas Voadas (Mês)",
    value: "9.5h",
    icon: "Clock",
    color: "emerald",
    change: 12,
    trend: "up",
    href: "/dashboard/flights",
  },
  {
    label: "Alertas de Manutenção",
    value: 2,
    icon: "AlertTriangle",
    color: "amber",
    change: -1,
    trend: "down",
    href: "/dashboard/maintenance",
  },
  {
    label: "Próximo Voo",
    value: "Amanhã",
    unit: "08:00",
    icon: "Calendar",
    color: "cyan",
    href: "/dashboard/schedule",
  },
];

// ─── Pilot Credentials (M7) ─────────────────────────

export const mockPilotCredentials: PilotCredential[] = [
  {
    id: "cred_001",
    user_id: "usr_001",
    credential_type: "cma",
    description: "Certificado Médico Aeronáutico (1ª Classe)",
    issued_date: "2025-10-15",
    expiry_date: "2026-10-15",
    issuing_authority: "ANAC",
    document_number: "CMA-123456",
    status: "valid",
  },
  {
    id: "cred_002",
    user_id: "usr_001",
    credential_type: "habilitacao_tipo",
    description: "Habilitação de Tipo: C182",
    issued_date: "2020-05-10",
    expiry_date: "2028-05-10",
    issuing_authority: "ANAC",
    document_number: "HT-182-99",
    status: "valid",
  },
  {
    id: "cred_003",
    user_id: "usr_001",
    credential_type: "proficiencia_linguistica",
    description: "Proficiência Linguística ICAO",
    issued_date: "2024-01-10",
    expiry_date: "2027-01-10",
    issuing_authority: "ANAC",
    status: "valid",
    language_level: 4,
  },
];

export const mockPilotFlightHours: PilotFlightHours = {
  user_id: "usr_001",
  total_hours: 1450.5,
  last_24h_hours: 2.6,
  last_30d_hours: 15.2,
  last_90d_hours: 45.8,
  last_12m_hours: 180.4,
  last_flight_date: "2026-05-08",
  takeoffs_day_90d: 12,
  takeoffs_night_90d: 4,
  landings_day_90d: 12,
  landings_night_90d: 4,
  ifr_approaches_6m: 8,
  ifr_hold_entries_6m: 3,
};

// ─── Safety Reports (M12) ───────────────────────────

export const mockSafetyReports: SafetyReport[] = [
  {
    id: "sr_001",
    aircraft_id: "acft_001",
    reported_by: "usr_001",
    report_type: "ocorrencia_anormal",
    date_occurred: "2026-05-05",
    location_icao: "SBSP",
    description:
      "Pássaro atingiu o trem de pouso durante a aproximação, sem danos aparentes na inspeção visual.",
    severity: "low",
    status: "under_review",
    is_anonymous: false,
    created_at: "2026-05-06T10:00:00Z",
  },
  {
    id: "sr_002",
    reported_by: "usr_002",
    report_type: "perigo_potencial",
    date_occurred: "2026-05-01",
    description:
      "Marcação apagada na taxiway B do aeroporto base, risco de incursão em pista.",
    severity: "medium",
    status: "submitted",
    is_anonymous: true,
    created_at: "2026-05-01T15:30:00Z",
  },
];

// ─── Checklists (M11) ───────────────────────────────

export const mockChecklistTemplates: ChecklistTemplate[] = [
  {
    id: "chk_001",
    aircraft_model: "Cessna 182 Skylane",
    type: "pre_flight",
    name: "Pré-voo C182 (Padrão)",
    items: [
      {
        order: 1,
        item: "Documentos da aeronave",
        action: "A bordo e válidos",
        category: "Cabine",
        is_critical: true,
      },
      {
        order: 2,
        item: "Master Switch",
        action: "Ligar",
        category: "Cabine",
        is_critical: false,
      },
      {
        order: 3,
        item: "Quantidade de combustível",
        action: "Verificar nos visores",
        category: "Cabine",
        is_critical: true,
      },
      {
        order: 4,
        item: "Flaps",
        action: "Baixar totalmente",
        category: "Cabine",
        is_critical: false,
      },
      {
        order: 5,
        item: "Master Switch",
        action: "Desligar",
        category: "Cabine",
        is_critical: false,
      },
      {
        order: 6,
        item: "Tubo de Pitot",
        action: "Remover capa, verificar desobstrução",
        category: "Asa Esquerda",
        is_critical: true,
      },
    ],
  },
];

// ─── Coordination (Sprint 4) ────────────────────────

export const mockPassengerManifests: PassengerManifest[] = [
  {
    id: "man_001",
    aircraft_id: "acft_002",
    date: "2026-05-15",
    origin: "SBSP",
    destination: "SBBR",
    passengers: [
      {
        name: "Dr. Roberto Almeida",
        document: "123.456.789-00",
        weight: 85,
        baggage_weight: 15,
      },
      {
        name: "Sra. Mariana Almeida",
        document: "987.654.321-11",
        weight: 65,
        baggage_weight: 20,
      },
    ],
    total_pax_weight: 150,
    total_baggage_weight: 35,
    status: "confirmed",
  },
];

export const mockFlightRosters: FlightRoster[] = [
  {
    id: "rost_001",
    date: "2026-05-15",
    aircraft_id: "acft_002",
    origin: "SBSP",
    destination: "SBBR",
    pic_id: "usr_001",
    pic_name: "Carlos E. Mendes",
    status: "scheduled",
  },
];

export const mockFlightTracking: FlightTracking[] = [
  {
    id: "trk_001",
    aircraft_id: "acft_001",
    registration: "PT-KZM",
    status: "on_ground",
    latitude: -23.6273, // Congonhas (SBSP)
    longitude: -46.6566,
    altitude: 0,
    heading: 0,
    speed: 0,
    last_updated: "2026-05-10T14:30:00Z",
  },
  {
    id: "trk_002",
    aircraft_id: "acft_002",
    registration: "PT-RJB",
    status: "in_flight",
    latitude: -23.195, // Near Jundiai
    longitude: -46.885,
    altitude: 12500,
    heading: 340,
    speed: 180,
    last_updated: "2026-05-10T14:30:00Z",
  },
  {
    id: "trk_003",
    aircraft_id: "acft_003",
    registration: "PP-HEL",
    status: "on_ground",
    latitude: -23.5074, // Campo de Marte (SBMT)
    longitude: -46.6358,
    altitude: 0,
    heading: 0,
    speed: 0,
    last_updated: "2026-05-10T14:30:00Z",
  },
  {
    id: "trk_004",
    aircraft_id: "acft_004",
    registration: "PT-WML",
    status: "in_flight",
    latitude: -22.805, // Near Campinas (SBKP)
    longitude: -47.065,
    altitude: 9500,
    heading: 120,
    speed: 195,
    last_updated: "2026-05-10T14:30:00Z",
  },
];

export const mockDocumentsGEDEC: DocumentGEDEC[] = [
  {
    id: "doc_001",
    title: "Ordem de Missão - Voo BSB",
    type: "ordem_missao",
    aircraft_id: "acft_002",
    url: "#",
    created_at: "2026-05-10T10:00:00Z",
  },
];

export const mockAircraftPerformance: AircraftPerformance[] = [
  {
    aircraft_id: "acft_001", // Cessna 182
    cruise_speed_kts: 140,
    fuel_burn_ph: 55,
    max_range_nm: 800,
  },
  {
    aircraft_id: "acft_002", // Cirrus SR22
    cruise_speed_kts: 180,
    fuel_burn_ph: 65,
    max_range_nm: 1000,
  },
];

export const mockFlightPlans: FlightPlan[] = [
  {
    id: "fpl_001",
    aircraft_id: "acft_002",
    date: "2026-05-15",
    origin: "SBSP",
    destination: "SBBR",
    alternate: "SBGO",
    distance_nm: 472,
    estimated_time_enroute: 2.6,
    fuel_required_liters: 170,
    route_text: "DCT BGC UW2",
    status: "draft",
  },
];

// ═══════════════════════════════════════════════════════
// M5 — CTM Mock Data
// ═══════════════════════════════════════════════════════

export const mockCTMItems: CTMItem[] = [
  // ── acft_001 (PT-KZM, Cessna 182) ──
  {
    id: "ctm_001",
    aircraft_id: "acft_001",
    category: "inspecao_periodica",
    name: "Inspeção 50h",
    limit_hours: 50,
    last_done_at_hours: 1400,
    next_due_hours: 1450,
    alert_threshold_hours: 10,
    alert_threshold_days: 30,
    status: "ok",
    is_grounding_item: true,
    applicable_to: "both",
  },
  {
    id: "ctm_002",
    aircraft_id: "acft_001",
    category: "inspecao_periodica",
    name: "Inspeção 100h",
    limit_hours: 100,
    last_done_at_hours: 1400,
    next_due_hours: 1500,
    alert_threshold_hours: 10,
    alert_threshold_days: 30,
    status: "alert",
    is_grounding_item: true,
    applicable_to: "both",
    notes: "Faltam ~79h — Agendar com antecedência",
  },
  {
    id: "ctm_003",
    aircraft_id: "acft_001",
    category: "inspecao_periodica",
    name: "Inspeção Anual / IAM",
    last_done_date: "2025-11-15",
    next_due_date: "2026-11-15",
    alert_threshold_hours: 10,
    alert_threshold_days: 60,
    status: "ok",
    is_grounding_item: true,
    applicable_to: "both",
  },
  {
    id: "ctm_004",
    aircraft_id: "acft_001",
    category: "componente",
    name: "TBO Motor Lycoming IO-540",
    limit_hours: 2000,
    last_done_at_hours: 0,
    next_due_hours: 2000,
    alert_threshold_hours: 100,
    alert_threshold_days: 30,
    status: "ok",
    is_grounding_item: true,
    applicable_to: "airplane",
    part_number: "IO-540-AB1A5",
  },
  {
    id: "ctm_005",
    aircraft_id: "acft_001",
    category: "componente",
    name: "TBO Hélice McCauley",
    limit_hours: 2000,
    last_done_at_hours: 0,
    next_due_hours: 2000,
    alert_threshold_hours: 50,
    alert_threshold_days: 30,
    status: "ok",
    is_grounding_item: true,
    applicable_to: "airplane",
    part_number: "B2D34C235/90DKB-8",
  },
  {
    id: "ctm_006",
    aircraft_id: "acft_001",
    category: "documento",
    name: "Certificado de Aeronavegabilidade (CA)",
    last_done_date: "2025-06-01",
    next_due_date: "2027-06-01",
    alert_threshold_hours: 0,
    alert_threshold_days: 90,
    status: "ok",
    is_grounding_item: true,
    applicable_to: "both",
  },
  {
    id: "ctm_007",
    aircraft_id: "acft_001",
    category: "seguro",
    name: "Seguro RETA",
    last_done_date: "2025-09-01",
    next_due_date: "2026-09-01",
    alert_threshold_hours: 0,
    alert_threshold_days: 30,
    status: "ok",
    is_grounding_item: true,
    applicable_to: "both",
    notes: "Vence em 01/09/2026",
  },
  {
    id: "ctm_008",
    aircraft_id: "acft_001",
    category: "equipamento",
    name: "ELT (validade)",
    last_done_date: "2025-03-10",
    next_due_date: "2027-03-10",
    alert_threshold_hours: 0,
    alert_threshold_days: 60,
    status: "ok",
    is_grounding_item: true,
    applicable_to: "both",
  },
  {
    id: "ctm_009",
    aircraft_id: "acft_001",
    category: "ad",
    name: "AD 2024-15-08 — Inspeção tubo Pitot",
    limit_hours: 200,
    last_done_at_hours: 1400,
    next_due_hours: 1600,
    alert_threshold_hours: 20,
    alert_threshold_days: 30,
    status: "ok",
    is_grounding_item: true,
    applicable_to: "airplane",
  },

  // ── acft_004 (PT-WML, Baron G58) — one overdue item ──
  {
    id: "ctm_020",
    aircraft_id: "acft_004",
    category: "inspecao_periodica",
    name: "Inspeção 100h",
    limit_hours: 100,
    last_done_at_hours: 1750,
    next_due_hours: 1850,
    alert_threshold_hours: 10,
    alert_threshold_days: 30,
    status: "grounding",
    is_grounding_item: true,
    applicable_to: "both",
    notes: "VENCIDO — horas atuais ultrapassaram o limite.",
  },
  {
    id: "ctm_021",
    aircraft_id: "acft_004",
    category: "componente",
    name: "TBO Motor Esquerdo TCM IO-550",
    limit_hours: 1800,
    last_done_at_hours: 0,
    next_due_hours: 1800,
    alert_threshold_hours: 100,
    alert_threshold_days: 30,
    status: "overdue",
    is_grounding_item: true,
    applicable_to: "airplane",
    notes: "Motor já ultrapassou TBO recomendado.",
  },
];

export const mockCTMMaintenanceLogs: CTMMaintenanceLog[] = [
  {
    id: "ctml_001",
    aircraft_id: "acft_001",
    ctm_item_id: "ctm_001",
    type: "inspecao",
    description: "Inspeção 50h completa — sem discrepâncias encontradas.",
    performed_at_hours: 1400,
    performed_date: "2026-03-23",
    next_due_hours: 1450,
    cost: 4500,
    mechanic_name: "João da Silva",
    mechanic_canac: "CHM-789012",
    shop_name: "Naves Aviação",
    work_order_number: "OS-2026-0312",
    created_at: "2026-03-23T16:00:00Z",
  },
  {
    id: "ctml_002",
    aircraft_id: "acft_001",
    type: "corretiva",
    description:
      "Substituição do regulador de voltagem — defeito intermitente.",
    performed_at_hours: 1380,
    performed_date: "2026-02-10",
    cost: 2800,
    mechanic_name: "Pedro Martins",
    mechanic_canac: "CHM-654321",
    shop_name: "Naves Aviação",
    work_order_number: "OS-2026-0198",
    created_at: "2026-02-10T14:00:00Z",
  },
];

export const mockCTMDiscrepancies: CTMDiscrepancy[] = [
  {
    id: "disc_001",
    aircraft_id: "acft_001",
    flight_log_id: "flt_001",
    reported_by: "usr_001",
    description:
      "Pitot tube com leitura irregular durante cruzeiro. Velocímetro oscilando ±5kt.",
    severity: "grounding",
    status: "open",
    created_at: "2026-05-08T11:00:00Z",
  },
  {
    id: "disc_002",
    aircraft_id: "acft_001",
    reported_by: "usr_002",
    description: "Luz de navegação esquerda intermitente durante voo noturno.",
    severity: "defer",
    status: "deferred",
    deferred_until: "2026-05-23",
    created_at: "2026-05-05T20:00:00Z",
  },
  {
    id: "disc_003",
    aircraft_id: "acft_004",
    flight_log_id: "flt_004",
    reported_by: "usr_003",
    description:
      "Luz do alternador esquerdo piscou durante a descida para SBCF.",
    severity: "defer",
    status: "open",
    created_at: "2026-05-05T13:30:00Z",
  },
];

// ═══════════════════════════════════════════════════════
// M6 — Financial Mock Data
// ═══════════════════════════════════════════════════════

export const mockFixedCosts: FinancialFixedCost[] = [
  // ── acft_001 ──
  {
    id: "fc_001",
    aircraft_id: "acft_001",
    category: "hangar",
    description: "Hangar SBJD — Vaga coberta",
    monthly_amount: 3500,
    start_date: "2025-01-01",
    active: true,
  },
  {
    id: "fc_002",
    aircraft_id: "acft_001",
    category: "tripulacao",
    description: "Piloto contratado — Carlos Mendes",
    monthly_amount: 8000,
    start_date: "2025-01-01",
    active: true,
  },
  {
    id: "fc_003",
    aircraft_id: "acft_001",
    category: "seguro",
    description: "Seguro RETA + Casco — parcela mensal",
    monthly_amount: 4200,
    start_date: "2025-09-01",
    active: true,
  },
  {
    id: "fc_004",
    aircraft_id: "acft_001",
    category: "administracao",
    description: "Taxa de administração operacional",
    monthly_amount: 2500,
    start_date: "2025-01-01",
    active: true,
  },
  {
    id: "fc_005",
    aircraft_id: "acft_001",
    category: "atualizacao_software_painel",
    description: "Cartas Jeppesen + GPS Garmin",
    monthly_amount: 800,
    start_date: "2025-06-01",
    active: true,
  },
  {
    id: "fc_006",
    aircraft_id: "acft_001",
    category: "outros",
    description: "Taxa associação de hangar",
    monthly_amount: 1000,
    start_date: "2025-01-01",
    active: true,
  },

  // ── acft_004 ──
  {
    id: "fc_010",
    aircraft_id: "acft_004",
    category: "hangar",
    description: "Hangar SBKP — Box individual",
    monthly_amount: 4500,
    start_date: "2024-01-01",
    active: true,
  },
  {
    id: "fc_011",
    aircraft_id: "acft_004",
    category: "tripulacao",
    description: "Piloto + Copiloto (bimotor)",
    monthly_amount: 12000,
    start_date: "2024-01-01",
    active: true,
  },
  {
    id: "fc_012",
    aircraft_id: "acft_004",
    category: "seguro",
    description: "Seguro completo — RETA + Casco + RC",
    monthly_amount: 7000,
    start_date: "2024-06-01",
    active: true,
  },
  {
    id: "fc_013",
    aircraft_id: "acft_004",
    category: "administracao",
    description: "Gestão operacional + contabilidade",
    monthly_amount: 3500,
    start_date: "2024-01-01",
    active: true,
  },
  {
    id: "fc_014",
    aircraft_id: "acft_004",
    category: "atualizacao_software_painel",
    description: "Garmin G1000 + cartas",
    monthly_amount: 1500,
    start_date: "2024-01-01",
    active: true,
  },
  {
    id: "fc_015",
    aircraft_id: "acft_004",
    category: "outros",
    description: "Estacionamento + lavagem",
    monthly_amount: 2000,
    start_date: "2024-01-01",
    active: true,
  },
];

export const mockVariableCosts: FinancialVariableCost[] = [
  {
    id: "vc_001",
    aircraft_id: "acft_001",
    flight_log_id: "flt_001",
    category: "combustivel",
    description: "AvGas 100LL — 95L",
    amount: 1425,
    date: "2026-05-08",
    hours_reference: 2.6,
  },
  {
    id: "vc_002",
    aircraft_id: "acft_001",
    flight_log_id: "flt_001",
    category: "taxas_aeroportuarias",
    description: "Taxa pouso SBJD",
    amount: 120,
    date: "2026-05-08",
  },
  {
    id: "vc_003",
    aircraft_id: "acft_001",
    flight_log_id: "flt_003",
    category: "combustivel",
    description: "AvGas 100LL — 65L",
    amount: 975,
    date: "2026-05-06",
    hours_reference: 1.8,
  },
  {
    id: "vc_004",
    aircraft_id: "acft_001",
    category: "reserva_manutencao",
    description: "Provisão overhaul motor — maio",
    amount: 1320,
    date: "2026-05-01",
    hours_reference: 4.4,
    notes: "R$300/h × 4.4h voadas",
  },
  {
    id: "vc_005",
    aircraft_id: "acft_004",
    flight_log_id: "flt_004",
    category: "combustivel",
    description: "AvGas 100LL — 210L",
    amount: 3150,
    date: "2026-05-05",
    hours_reference: 3.7,
  },
  {
    id: "vc_006",
    aircraft_id: "acft_004",
    flight_log_id: "flt_004",
    category: "taxas_aeroportuarias",
    description: "Taxa pouso SBCF + handling",
    amount: 350,
    date: "2026-05-05",
  },
  {
    id: "vc_007",
    aircraft_id: "acft_004",
    flight_log_id: "flt_004",
    category: "pernoite",
    description: "Pernoite SBCF — 1 noite",
    amount: 180,
    date: "2026-05-05",
  },
];

export const mockHourConfigs: Record<string, FinancialHourConfig> = {
  acft_001: {
    aircraft_id: "acft_001",
    avg_fuel_cost_per_hour: 450,
    avg_maintenance_cost_per_hour: 280,
    overhaul_reserve_per_hour: 300,
    avg_fees_per_hour: 85,
  },
  acft_004: {
    aircraft_id: "acft_004",
    avg_fuel_cost_per_hour: 850,
    avg_maintenance_cost_per_hour: 420,
    overhaul_reserve_per_hour: 500,
    avg_fees_per_hour: 150,
  },
};

// ═══════════════════════════════════════════════════════
// SPRINT 5 — Tripulação Avançada (Mock Data)
// ═══════════════════════════════════════════════════════

import type {
  CrewDutyPeriod,
  CrewCheckin,
  PilotExperienceEvent,
  PilotHoursByType,
  TrainingRecord,
} from "@/types/models";

export const mockDutyPeriods: CrewDutyPeriod[] = [
  {
    id: "duty_001",
    user_id: "usr_001",
    duty_start: "2026-05-10T07:00:00Z",
    presentation_time: "2026-05-10T07:00:00Z",
    duty_type: "single_pilot_vfr",
    flight_time_minutes: 0,
    standby_minutes: 0,
    ground_time_minutes: 60,
    positioning_minutes: 0,
    waiting_minutes: 0,
    max_duty_hours: 10,
    max_flight_hours: 8,
    rest_before_minutes: 840, // 14 hours rest before this duty
    rest_compliant: true,
    exceeded_limit: false,
    status: "open",
    created_at: "2026-05-10T07:00:00Z",
  },
  {
    id: "duty_002",
    user_id: "usr_001",
    duty_start: "2026-05-08T07:00:00Z",
    duty_end: "2026-05-08T12:00:00Z",
    presentation_time: "2026-05-08T07:00:00Z",
    release_time: "2026-05-08T12:00:00Z",
    total_duty_minutes: 300, // 5 hours
    duty_type: "single_pilot_ifr",
    flight_time_minutes: 156, // 2.6h
    standby_minutes: 0,
    ground_time_minutes: 144,
    positioning_minutes: 0,
    waiting_minutes: 0,
    max_duty_hours: 10,
    max_flight_hours: 8,
    rest_before_minutes: 1200,
    rest_after_minutes: 2580, // 43 hours until duty_001
    rest_compliant: true,
    exceeded_limit: false,
    status: "closed",
    created_at: "2026-05-08T07:00:00Z",
  },
];

export const mockExperienceEvents: PilotExperienceEvent[] = [
  {
    id: "exp_001",
    user_id: "usr_001",
    flight_log_id: "flt_001",
    event_type: "landing_day_full_stop",
    quantity: 1,
    airport_icao: "SBJD",
    event_date: "2026-05-08",
    created_at: "2026-05-08T10:50:00Z",
  },
  {
    id: "exp_002",
    user_id: "usr_001",
    flight_log_id: "flt_001",
    event_type: "ifr_approach",
    quantity: 1,
    airport_icao: "SBJD",
    event_date: "2026-05-08",
    created_at: "2026-05-08T10:50:00Z",
  },
  {
    id: "exp_003",
    user_id: "usr_001",
    event_type: "landing_night_full_stop",
    quantity: 3,
    airport_icao: "SBSP",
    event_date: "2026-04-20",
    notes: "Treinamento noturno para manter experiência recente",
    created_at: "2026-04-20T22:00:00Z",
  },
];

export const mockHoursByType: PilotHoursByType[] = [
  {
    id: "hbt_001",
    user_id: "usr_001",
    aircraft_model: "Cessna 182 Skylane",
    aircraft_category: "sel",
    total_hours: 850.5,
    pic_hours: 800.0,
    sic_hours: 0,
    dual_hours: 50.5,
    night_hours: 120.0,
    ifr_hours: 210.5,
    last_flown_date: "2026-05-08",
    updated_at: "2026-05-08T12:00:00Z",
  },
  {
    id: "hbt_002",
    user_id: "usr_001",
    aircraft_model: "Cirrus SR22",
    aircraft_category: "sel",
    total_hours: 320.0,
    pic_hours: 300.0,
    sic_hours: 0,
    dual_hours: 20.0,
    night_hours: 45.0,
    ifr_hours: 150.0,
    last_flown_date: "2026-04-15",
    updated_at: "2026-04-15T12:00:00Z",
  },
  {
    id: "hbt_003",
    user_id: "usr_001",
    aircraft_model: "Beechcraft Baron G58",
    aircraft_category: "mel",
    total_hours: 280.0,
    pic_hours: 250.0,
    sic_hours: 0,
    dual_hours: 30.0,
    night_hours: 80.0,
    ifr_hours: 180.0,
    last_flown_date: "2026-03-10",
    updated_at: "2026-03-10T12:00:00Z",
  },
];

export const mockTrainingRecords: TrainingRecord[] = [
  {
    id: "tr_001",
    user_id: "usr_001",
    training_type: "crm",
    course_name: "CRM Inicial - Corporate",
    provider: "FlightSafety International",
    start_date: "2025-06-15",
    end_date: "2025-06-17",
    expiry_date: "2026-06-15", // Expires in ~1 month from mock date
    hours_completed: 16,
    grade: "pass",
    status: "expiring",
    alert_days: 30,
    certificate_number: "CRM-2025-8842",
    created_at: "2025-06-18T10:00:00Z",
  },
  {
    id: "tr_002",
    user_id: "usr_001",
    training_type: "emergency_egress",
    course_name: "Sobrevivência na Selva e Mar",
    provider: "AeroTraining Brasil",
    start_date: "2024-03-10",
    end_date: "2024-03-12",
    expiry_date: "2026-03-10", // Expired
    hours_completed: 24,
    grade: "pass",
    status: "expired",
    alert_days: 30,
    certificate_number: "SURV-8821",
    notes: "Precisa renovar antes do próximo voo para a Amazônia.",
    created_at: "2024-03-15T10:00:00Z",
  },
  {
    id: "tr_003",
    user_id: "usr_001",
    training_type: "recurrent",
    course_name: "Recorrente IFR C182",
    provider: "Aeroclube",
    instructor_name: "Cmte. Ribeiro",
    start_date: "2025-11-20",
    expiry_date: "2026-11-20",
    hours_completed: 4,
    grade: "pass",
    status: "valid",
    alert_days: 30,
    created_at: "2025-11-20T18:00:00Z",
  },
];

// ═══════════════════════════════════════════════════════
// SPRINT 6 — CTM Avançado (Mock Data)
// ═══════════════════════════════════════════════════════

import type {
  ServiceBulletin,
  AircraftComponent,
  WorkOrder,
  WorkOrderItem,
  AircraftModification,
  TechnicalDocument,
} from "@/types/models";

export const mockServiceBulletins: ServiceBulletin[] = [
  {
    id: "sb_001",
    aircraft_id: "acft_001",
    sb_number: "SB05-4B",
    ad_number: "AD 2024-15-08",
    title: "Inspeção do Tubo de Pitot",
    description:
      "Inspeção visual e teste de aquecimento obrigatórios a cada 200h.",
    mandatory: true,
    status: "pending",
    due_hours: 1600,
    created_at: "2025-10-10T00:00:00Z",
  },
  {
    id: "sb_002",
    aircraft_id: "acft_001",
    sb_number: "SEB-10-02",
    title: "Substituição de parafusos do profundor",
    description: "Substituição recomendada por novo part number.",
    mandatory: false,
    status: "applied",
    applied_hours: 1400,
    applied_date: "2026-03-23",
    created_at: "2025-11-15T00:00:00Z",
  },
];

export const mockAircraftComponents: AircraftComponent[] = [
  {
    id: "comp_eng1",
    aircraft_id: "acft_001",
    name: "Motor",
    category: "engine",
    part_number: "IO-540-AB1A5",
    serial_number: "L-12345-48E",
    install_date: "2020-01-15",
    install_hours: 0,
    tbo_hours: 2000,
    tbo_months: 144, // 12 years
    current_tsn: 1420.8,
    current_tso: 1420.8,
    status: "ok",
    created_at: "2024-06-01T08:00:00Z",
  },
  {
    id: "comp_cyl1",
    aircraft_id: "acft_001",
    parent_component_id: "comp_eng1",
    name: "Cilindro #1",
    category: "engine",
    part_number: "AEC63139",
    serial_number: "C-998877",
    install_date: "2023-05-10",
    install_hours: 1000,
    current_tsn: 420.8,
    current_tso: 420.8,
    status: "ok",
    created_at: "2024-06-01T08:00:00Z",
  },
  {
    id: "comp_prop1",
    aircraft_id: "acft_001",
    name: "Hélice",
    category: "propeller",
    part_number: "B2D34C235/90DKB-8",
    serial_number: "P-554433",
    install_date: "2020-01-15",
    install_hours: 0,
    tbo_hours: 2000,
    tbo_months: 72,
    current_tsn: 1420.8,
    current_tso: 1420.8,
    status: "warning",
    created_at: "2024-06-01T08:00:00Z",
  },
];

export const mockWorkOrders: WorkOrder[] = [
  {
    id: "wo_001",
    aircraft_id: "acft_001",
    work_order_number: "OS-2026-0312",
    title: "Inspeção Programada de 50h",
    status: "closed",
    type: "scheduled",
    mechanic_id: "mech_01",
    mechanic_name: "João da Silva",
    mechanic_license: "CHM-789012",
    shop_name: "Naves Aviação",
    open_date: "2026-03-22T08:00:00Z",
    close_date: "2026-03-23T16:00:00Z",
    aircraft_hours_in: 1400.0,
    total_cost: 4500.0,
    notes: "Inspeção padrão concluída sem grandes novidades.",
    created_at: "2026-03-22T08:00:00Z",
  },
  {
    id: "wo_002",
    aircraft_id: "acft_001",
    work_order_number: "OS-2026-0501",
    title: "Falha no Pitot + Substituição de Pneus",
    status: "in_progress",
    type: "unscheduled",
    shop_name: "Líder Aviação",
    open_date: "2026-05-08T12:00:00Z",
    aircraft_hours_in: 1420.8,
    created_at: "2026-05-08T12:00:00Z",
  },
];

export const mockWorkOrderItems: WorkOrderItem[] = [
  {
    id: "woi_001",
    work_order_id: "wo_001",
    description: "Inspeção 50h conforme checklist do manual",
    cost: 3000.0,
    ctm_item_id: "ctm_001",
    status: "completed",
  },
  {
    id: "woi_002",
    work_order_id: "wo_001",
    description: "Troca de óleo e filtro",
    cost: 1500.0,
    status: "completed",
  },
  {
    id: "woi_003",
    work_order_id: "wo_002",
    description: "Investigação de oscilação do velocímetro",
    discrepancy_id: "disc_001",
    status: "pending",
  },
  {
    id: "woi_004",
    work_order_id: "wo_002",
    description: "Substituição pneu principal direito",
    cost: 1200.0,
    status: "completed",
  },
];

export const mockAircraftModifications: AircraftModification[] = [
  {
    id: "mod_001",
    aircraft_id: "acft_001",
    stc_number: "SA01234SE",
    title: "Instalação de VGs (Vortex Generators)",
    description:
      "Micro Aerodynamics VG Kit para melhoria de performance em baixa velocidade.",
    installation_date: "2022-10-15",
    installed_by: "Naves Aviação",
    notes: "Aumentou o peso vazio em 1.2 lbs.",
  },
];

export const mockTechnicalDocuments: TechnicalDocument[] = [
  {
    id: "doc_tech_001",
    aircraft_id: "acft_001",
    category: "poh",
    title: "Pilot Operating Handbook (POH)",
    url: "#",
    version: "Rev 5",
    release_date: "2019-01-01",
    is_current: true,
  },
  {
    id: "doc_tech_002",
    aircraft_id: "acft_001",
    category: "manual",
    title: "Cessna 182 Service Manual",
    url: "#",
    version: "Rev 12",
    release_date: "2023-05-10",
    is_current: true,
  },
];

// ═══════════════════════════════════════════════════════
// SPRINT 7 — Suprimentos e Estoque (Mock Data)
// ═══════════════════════════════════════════════════════

import type {
  InventoryItem,
  InventoryMovement,
  Supplier,
  PurchaseOrder,
} from "@/types/models";

export const mockInventoryItems: InventoryItem[] = [
  {
    id: "inv_001",
    part_number: "15W50-AS",
    description: "Óleo Motor Aeroshell 15W50",
    category: "consumable",
    unit_of_measure: "l",
    minimum_quantity: 12,
    current_quantity: 4, // Below minimum to show alert
    average_unit_cost: 65.0,
    location: "Prateleira A1",
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2026-05-08T14:00:00Z",
  },
  {
    id: "inv_002",
    part_number: "CH48110-1",
    description: "Filtro de Óleo Champion",
    category: "consumable",
    unit_of_measure: "un",
    minimum_quantity: 2,
    current_quantity: 5,
    average_unit_cost: 250.0,
    location: "Prateleira B2",
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2026-05-01T09:00:00Z",
  },
  {
    id: "inv_003",
    part_number: "066-01127-1101",
    description: "Bendix King KX-155A NAV/COM",
    category: "avionics",
    unit_of_measure: "un",
    minimum_quantity: 0,
    current_quantity: 1,
    average_unit_cost: 15000.0,
    location: "Armário Seguro",
    notes: "Unidade reserva rotativa (Rotatable)",
    created_at: "2025-06-15T10:00:00Z",
    updated_at: "2025-06-15T10:00:00Z",
  },
];

export const mockInventoryMovements: InventoryMovement[] = [
  {
    id: "mov_001",
    item_id: "inv_001", // Óleo
    movement_type: "out",
    quantity: 8,
    unit_cost: 65.0,
    date: "2026-05-08T14:30:00Z",
    work_order_id: "wo_001", // Consumed in the 50h inspection
    performed_by: "João da Silva",
    notes: "Troca de óleo C182 PT-KZM",
  },
  {
    id: "mov_002",
    item_id: "inv_002", // Filtro
    movement_type: "out",
    quantity: 1,
    unit_cost: 250.0,
    date: "2026-05-08T14:35:00Z",
    work_order_id: "wo_001",
    performed_by: "João da Silva",
  },
  {
    id: "mov_003",
    item_id: "inv_001", // Óleo
    movement_type: "in",
    quantity: 24,
    unit_cost: 62.5,
    date: "2026-04-10T09:00:00Z",
    purchase_order_id: "po_001",
    performed_by: "Almoxarife",
  },
];

export const mockSuppliers: Supplier[] = [
  {
    id: "sup_001",
    name: "AeroParts Brasil",
    cnpj: "12.345.678/0001-90",
    contact_name: "Roberto Vendas",
    email: "vendas@aeroparts.com.br",
    phone: "(11) 98765-4321",
    category: "parts",
    active: true,
  },
  {
    id: "sup_002",
    name: "Líder Aviação",
    trade_name: "Líder Táxi Aéreo S/A",
    cnpj: "98.765.432/0001-10",
    category: "maintenance",
    active: true,
  },
];

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: "po_001",
    po_number: "PO-2026-0401",
    supplier_id: "sup_001",
    status: "received",
    total_amount: 1500.0,
    date_created: "2026-04-01T10:00:00Z",
    date_received: "2026-04-10T09:00:00Z",
    requested_by: "Manutenção",
    notes: "Caixa de Óleo Aeroshell (24 unidades)",
  },
  {
    id: "po_002",
    po_number: "PO-2026-0509",
    supplier_id: "sup_001",
    status: "approved",
    total_amount: 780.0,
    date_created: "2026-05-09T14:00:00Z",
    date_expected: "2026-05-15T00:00:00Z",
    requested_by: "Almoxarifado",
    notes: "Reposição urgente de Óleo Aeroshell 15W50 (12 unidades)",
  },
];

// ═══════════════════════════════════════════════════════
// SPRINT 8 — Operações Aéreas (Mock Data)
// ═══════════════════════════════════════════════════════

import type {
  Aerodrome,
  FuelRecord,
  TravelDocument,
  OperationalContact,
  OperationalChecklist,
} from "@/types/models";

export const mockAerodromes: Aerodrome[] = [
  {
    id: "ad_001",
    icao: "SBSP",
    iata: "CGH",
    name: "Aeroporto de Congonhas",
    city: "São Paulo",
    state: "SP",
    country: "Brasil",
    runway_surface: "asphalt",
    runway_length_meters: 1940,
    fuel_available: ["jeta1", "avgas"],
    operating_hours: "06:00 - 23:00",
    notes: "Restrição de ruído aplicável. Slots obrigatórios.",
  },
  {
    id: "ad_002",
    icao: "SBJH",
    name: "São Paulo Catarina Aeroporto Executivo",
    city: "São Roque",
    state: "SP",
    country: "Brasil",
    runway_surface: "asphalt",
    runway_length_meters: 2470,
    fuel_available: ["jeta1", "avgas"],
    operating_hours: "H24",
    notes: "Exclusivo para aviação executiva. FBO Internacional.",
  },
];

export const mockFuelRecords: FuelRecord[] = [
  {
    id: "fuel_001",
    aircraft_id: "acft_001",
    aerodrome_icao: "SBSP",
    date: "2026-05-09T18:30:00Z",
    fuel_type: "avgas",
    quantity: 120,
    unit: "l",
    unit_price: 18.5,
    total_cost: 2220.0,
    provider: "BR Aviation",
    pilot_id: "usr_002",
  },
  {
    id: "fuel_002",
    aircraft_id: "acft_002",
    aerodrome_icao: "SBJH",
    date: "2026-05-10T08:15:00Z",
    fuel_type: "jeta1",
    quantity: 850,
    unit: "l",
    unit_price: 9.8,
    total_cost: 8330.0,
    provider: "AirBP",
    pilot_id: "usr_002",
  },
];

export const mockTravelDocuments: TravelDocument[] = [
  {
    id: "doc_trav_001",
    person_type: "pilot",
    person_id: "usr_002",
    person_name: "Comandante Silva",
    document_type: "passport",
    document_number: "FX887766",
    issue_country: "Brasil",
    issue_date: "2019-03-15",
    expiry_date: "2029-03-15",
  },
  {
    id: "doc_trav_002",
    person_type: "pilot",
    person_id: "usr_002",
    person_name: "Comandante Silva",
    document_type: "visa_us",
    document_number: "V-12345678",
    issue_country: "EUA",
    issue_date: "2016-08-20",
    expiry_date: "2026-08-20", // Vencendo em breve!
    notes: "Visto B1/B2 Múltiplas entradas",
  },
];

export const mockOperationalContacts: OperationalContact[] = [
  {
    id: "cnt_op_001",
    aerodrome_icao: "SBJH",
    name: "JHSF FBO",
    category: "fbo",
    phone: "+55 11 4136-1234",
    email: "fbo@catarina.com.br",
    frequency: "131.950",
    notes: "Sala VIP, coordenação de embarque internacional.",
  },
  {
    id: "cnt_op_002",
    aerodrome_icao: "SBSP",
    name: "Líder Handling",
    category: "handling",
    phone: "+55 11 5090-0000",
    frequency: "130.200",
  },
];

export const mockOperationalChecklists: OperationalChecklist[] = [
  {
    id: "chk_001",
    title: "Before Takeoff",
    category: "normal",
    items: [
      { id: "i1", challenge: "Flight Controls", response: "FREE & CORRECT" },
      { id: "i2", challenge: "Flight Instruments", response: "CHECKED & SET" },
      { id: "i3", challenge: "Fuel Quantity", response: "CHECKED" },
      { id: "i4", challenge: "Mixture", response: "RICH (or SET)" },
      { id: "i5", challenge: "Flaps", response: "SET FOR TAKEOFF" },
    ],
  },
  {
    id: "chk_002",
    title: "Engine Failure During Flight",
    category: "emergency",
    items: [
      { id: "e1", challenge: "Airspeed", response: "65 KIAS" },
      { id: "e2", challenge: "Carburetor Heat", response: "ON" },
      { id: "e3", challenge: "Fuel Selector Valve", response: "BOTH" },
      { id: "e4", challenge: "Mixture", response: "RICH" },
      {
        id: "e5",
        challenge: "Ignition Switch",
        response: "BOTH (or START if prop stopped)",
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════
// SPRINT 9 — Financeiro Avançado (Mock Data)
// ═══════════════════════════════════════════════════════

import type {
  FinancialTransaction,
  Invoice,
  OwnerStatement,
  AircraftStatementSummary,
} from "@/types/models";

export const mockFinancialTransactions: FinancialTransaction[] = [
  {
    id: "txn_001",
    type: "expense",
    category: "fuel",
    amount: 8330.0,
    date: "2026-05-10T10:00:00Z",
    status: "paid",
    description: "Abastecimento JET A1 - SBJH",
    aircraft_id: "acft_002", // King Air
    payment_method: "Cartão Corporativo",
  },
  {
    id: "txn_002",
    type: "expense",
    category: "maintenance",
    amount: 4500.0,
    date: "2026-05-08T15:00:00Z",
    status: "pending",
    description: "Inspeção de 50h C182",
    aircraft_id: "acft_001", // C182
    related_entity_type: "work_order",
    related_entity_id: "wo_001",
  },
  {
    id: "txn_003",
    type: "income",
    category: "flight_revenue",
    amount: 25000.0,
    date: "2026-05-11T09:00:00Z",
    status: "paid",
    description: "Fretamento São Paulo - Rio de Janeiro",
    aircraft_id: "acft_002", // King Air
    related_entity_type: "invoice",
    related_entity_id: "inv_001",
  },
  {
    id: "txn_004",
    type: "expense",
    category: "hangar",
    amount: 3500.0,
    date: "2026-05-01T08:00:00Z",
    status: "paid",
    description: "Mensalidade Hangar Jundiaí",
    aircraft_id: "acft_001",
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: "inv_001",
    invoice_number: "INV-2026-0012",
    client_name: "XP Investimentos",
    client_document: "02.332.886/0001-04",
    amount: 25000.0,
    issue_date: "2026-05-05T10:00:00Z",
    due_date: "2026-05-15T23:59:59Z",
    payment_date: "2026-05-11T09:00:00Z",
    status: "paid",
    flight_id: "flt_002",
    notes: "Voo executivo diretoria SP-RJ ida e volta.",
  },
  {
    id: "inv_002",
    invoice_number: "INV-2026-0013",
    client_name: "Agropecuária Vale Verde",
    amount: 18500.0,
    issue_date: "2026-05-09T14:00:00Z",
    due_date: "2026-05-20T23:59:59Z",
    status: "sent",
    flight_id: "flt_003",
  },
];

export const mockOwnerStatements: OwnerStatement[] = [
  {
    id: "stmt_001",
    aircraft_id: "acft_001", // C182 (Propriedade Compartilhada)
    owner_name: "Dr. Roberto Almeida",
    month: 5,
    year: 2026,
    fraction_percentage: 50, // 50% owner
    flight_hours_used: 12.5,
    fixed_costs_share: 1750.0, // Half of 3500 hangar
    variable_costs_share: 3250.0, // Based on his 12.5 hours
    management_fee: 1000.0,
    total_due: 6000.0,
    status: "sent",
  },
  {
    id: "stmt_002",
    aircraft_id: "acft_001",
    owner_name: "Eng. Carlos Souza",
    month: 5,
    year: 2026,
    fraction_percentage: 50,
    flight_hours_used: 4.0, // Flew much less
    fixed_costs_share: 1750.0,
    variable_costs_share: 1040.0,
    management_fee: 1000.0,
    total_due: 3790.0,
    status: "paid",
  },
];

export const mockAircraftStatementSummaries: AircraftStatementSummary[] = [
  {
    aircraft_id: "acft_002", // King Air
    month: 5,
    year: 2026,
    total_flight_hours: 32.5,
    total_revenue: 125000.0,
    fixed_costs: 28000.0,
    variable_costs: 45500.0,
    gross_profit: 51500.0,
  },
  {
    aircraft_id: "acft_001", // C182
    month: 5,
    year: 2026,
    total_flight_hours: 16.5,
    total_revenue: 0.0, // Not used for charter, only owners
    fixed_costs: 3500.0,
    variable_costs: 4290.0,
    gross_profit: -7790.0, // Owners pay for this
  },
];
