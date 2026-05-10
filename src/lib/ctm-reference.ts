// ═══════════════════════════════════════════════════════
// AeroGest — CTM Reference Database
// Aircraft templates, TBO tables, default items, ICAO codes
// Sources: Lycoming SI 1009BE, Continental SIL 98-9,
//          Robinson SL, FAA TCDS, ANAC RAB
// ═══════════════════════════════════════════════════════

// ─── Aircraft Templates (Top 20 Brazil GA) ───────────

export interface AircraftTemplate {
  model: string;
  type: 'airplane' | 'helicopter';
  category: string;
  seats: number;
  mtow_kg: number;
  fuel_type: string;
  fuel_capacity_liters: number;
  avg_fuel_burn_liters_hour: number;
  cruise_speed_kt: number;
  engine: {
    manufacturer: string;
    model: string;
    horsepower: number;
    quantity?: number;
    tbo_hours: number;
    tbo_calendar_years?: number | null;
    hot_section_inspection_hours?: number;
    source?: string;
  };
  propeller?: {
    manufacturer: string;
    model: string;
    type: string;
    tbo_hours: number | null;
    tbo_calendar_years?: number | null;
    notes?: string;
  };
  main_rotor?: { tbo_hours: number | null; tbo_calendar_years?: number; blades: number; on_condition?: boolean; notes?: string };
  tail_rotor?: { tbo_hours: number | null; tbo_calendar_years?: number; blades: number; on_condition?: boolean };
  gearbox?: { tbo_hours?: number; tbo_calendar_years?: number; main_gearbox_tbo_hours?: number; tail_gearbox_tbo_hours?: number };
  inspections_default: string[];
  notes?: string;
}

export const aircraftTemplates: AircraftTemplate[] = [
  // ── MONOMOTOR PISTÃO ──
  {
    model: 'Cessna 172 / 172S Skyhawk', type: 'airplane', category: 'monomotor_pistao',
    seats: 4, mtow_kg: 1111, fuel_type: 'avgas_100ll', fuel_capacity_liters: 212,
    avg_fuel_burn_liters_hour: 34, cruise_speed_kt: 122,
    engine: { manufacturer: 'Lycoming', model: 'IO-360-L2A', horsepower: 180, tbo_hours: 2000, tbo_calendar_years: 12, source: 'Lycoming SI 1009BE' },
    propeller: { manufacturer: 'McCauley', model: '1C235/LFA7570', type: 'constant_speed', tbo_hours: 2000, tbo_calendar_years: 10 },
    inspections_default: ['50h', '100h', 'anual'],
  },
  {
    model: 'Cessna 152', type: 'airplane', category: 'monomotor_pistao',
    seats: 2, mtow_kg: 757, fuel_type: 'avgas_100ll', fuel_capacity_liters: 98,
    avg_fuel_burn_liters_hour: 23, cruise_speed_kt: 107,
    engine: { manufacturer: 'Lycoming', model: 'O-235-L2C', horsepower: 110, tbo_hours: 2400, tbo_calendar_years: 12, source: 'Lycoming SI 1009BE' },
    propeller: { manufacturer: 'McCauley', model: '1A103/TCM6958', type: 'fixed_pitch', tbo_hours: null, notes: 'Hélice passo fixo — sem TBO definido' },
    inspections_default: ['50h', '100h', 'anual'],
  },
  {
    model: 'Cessna 182 Skylane', type: 'airplane', category: 'monomotor_pistao',
    seats: 4, mtow_kg: 1406, fuel_type: 'avgas_100ll', fuel_capacity_liters: 326,
    avg_fuel_burn_liters_hour: 49, cruise_speed_kt: 145,
    engine: { manufacturer: 'Lycoming', model: 'O-470-U', horsepower: 230, tbo_hours: 1500, tbo_calendar_years: 12, source: 'Continental SIL 98-9' },
    propeller: { manufacturer: 'McCauley', model: '2A36C23/82NE-8', type: 'constant_speed', tbo_hours: 2000, tbo_calendar_years: 10 },
    inspections_default: ['50h', '100h', 'anual'],
  },
  {
    model: 'Cessna 206 Stationair', type: 'airplane', category: 'monomotor_pistao',
    seats: 6, mtow_kg: 1633, fuel_type: 'avgas_100ll', fuel_capacity_liters: 340,
    avg_fuel_burn_liters_hour: 57, cruise_speed_kt: 150,
    engine: { manufacturer: 'Continental', model: 'IO-520-F', horsepower: 300, tbo_hours: 1700, tbo_calendar_years: 12, source: 'Continental SIL 98-9' },
    propeller: { manufacturer: 'McCauley', model: '3A32C409', type: 'constant_speed', tbo_hours: 2000, tbo_calendar_years: 10 },
    inspections_default: ['50h', '100h', 'anual'],
  },
  {
    model: 'Piper PA-28 Cherokee / Warrior / Archer', type: 'airplane', category: 'monomotor_pistao',
    seats: 4, mtow_kg: 1107, fuel_type: 'avgas_100ll', fuel_capacity_liters: 189,
    avg_fuel_burn_liters_hour: 34, cruise_speed_kt: 128,
    engine: { manufacturer: 'Lycoming', model: 'O-360-A4M', horsepower: 180, tbo_hours: 2000, tbo_calendar_years: 12, source: 'Lycoming SI 1009BE' },
    propeller: { manufacturer: 'Sensenich', model: '76EM8S5-0-60', type: 'fixed_pitch', tbo_hours: null, notes: 'Passo fixo — sem TBO' },
    inspections_default: ['50h', '100h', 'anual'],
  },
  {
    model: 'Piper PA-34 Seneca', type: 'airplane', category: 'bimotor_pistao',
    seats: 6, mtow_kg: 2155, fuel_type: 'avgas_100ll', fuel_capacity_liters: 410,
    avg_fuel_burn_liters_hour: 76, cruise_speed_kt: 190,
    engine: { manufacturer: 'Continental', model: 'TSIO-360-E (x2)', horsepower: 200, quantity: 2, tbo_hours: 1400, tbo_calendar_years: 12, source: 'Continental SIL 98-9' },
    propeller: { manufacturer: 'Hartzell', model: 'HC-C2YK-2C', type: 'constant_speed_feathering', tbo_hours: 2400, tbo_calendar_years: 10 },
    inspections_default: ['50h', '100h', 'anual'],
  },
  {
    model: 'Embraer EMB-712 Tupi', type: 'airplane', category: 'monomotor_pistao',
    seats: 4, mtow_kg: 1089, fuel_type: 'avgas_100ll', fuel_capacity_liters: 189,
    avg_fuel_burn_liters_hour: 34, cruise_speed_kt: 123,
    engine: { manufacturer: 'Lycoming', model: 'O-360-A4M', horsepower: 180, tbo_hours: 2000, tbo_calendar_years: 12, source: 'Lycoming SI 1009BE' },
    propeller: { manufacturer: 'Sensenich', model: '76EM8S5-0-60', type: 'fixed_pitch', tbo_hours: null },
    inspections_default: ['50h', '100h', 'anual'],
  },
  {
    model: 'Embraer EMB-711 Corisco', type: 'airplane', category: 'monomotor_pistao',
    seats: 4, mtow_kg: 1210, fuel_type: 'avgas_100ll', fuel_capacity_liters: 227,
    avg_fuel_burn_liters_hour: 42, cruise_speed_kt: 157,
    engine: { manufacturer: 'Lycoming', model: 'IO-360-C1A', horsepower: 200, tbo_hours: 2000, tbo_calendar_years: 12, source: 'Lycoming SI 1009BE' },
    propeller: { manufacturer: 'Hartzell', model: 'HC-C2YK-1BF', type: 'constant_speed', tbo_hours: 2400, tbo_calendar_years: 10 },
    inspections_default: ['50h', '100h', 'anual'],
  },
  {
    model: 'Beechcraft Bonanza A36', type: 'airplane', category: 'monomotor_pistao',
    seats: 6, mtow_kg: 1656, fuel_type: 'avgas_100ll', fuel_capacity_liters: 310,
    avg_fuel_burn_liters_hour: 53, cruise_speed_kt: 172,
    engine: { manufacturer: 'Continental', model: 'IO-550-B', horsepower: 300, tbo_hours: 1700, tbo_calendar_years: 12, source: 'Continental SIL 98-9' },
    propeller: { manufacturer: 'Hartzell', model: 'PHC-C3YF-2UF', type: 'constant_speed', tbo_hours: 2400, tbo_calendar_years: 6 },
    inspections_default: ['50h', '100h', 'anual'],
  },
  {
    model: 'Cirrus SR22', type: 'airplane', category: 'monomotor_pistao',
    seats: 4, mtow_kg: 1542, fuel_type: 'avgas_100ll', fuel_capacity_liters: 337,
    avg_fuel_burn_liters_hour: 49, cruise_speed_kt: 185,
    engine: { manufacturer: 'Continental', model: 'IO-550-N', horsepower: 310, tbo_hours: 2000, tbo_calendar_years: 12, source: 'Continental SIL 98-9' },
    propeller: { manufacturer: 'Hartzell', model: 'PHC-J3YF-1RF', type: 'constant_speed', tbo_hours: 2400, tbo_calendar_years: 6 },
    inspections_default: ['50h', '100h', 'anual'],
  },
  // ── TURBOÉLICE ──
  {
    model: 'Pilatus PC-12', type: 'airplane', category: 'monomotor_turboelice',
    seats: 9, mtow_kg: 4740, fuel_type: 'jet_a1', fuel_capacity_liters: 1292,
    avg_fuel_burn_liters_hour: 220, cruise_speed_kt: 280,
    engine: { manufacturer: 'Pratt & Whitney Canada', model: 'PT6A-67P', horsepower: 1200, tbo_hours: 5000, hot_section_inspection_hours: 2500, source: "P&WC Maintenance Manual" },
    propeller: { manufacturer: 'Hartzell', model: 'HC-E4A-3I', type: 'constant_speed_reversible', tbo_hours: 4000, tbo_calendar_years: 6 },
    inspections_default: ['100h', '200h', '300h', '600h', 'anual', 'hot_section'],
  },
  {
    model: 'King Air B200', type: 'airplane', category: 'bimotor_turboelice',
    seats: 9, mtow_kg: 5670, fuel_type: 'jet_a1', fuel_capacity_liters: 1930,
    avg_fuel_burn_liters_hour: 340, cruise_speed_kt: 290,
    engine: { manufacturer: 'Pratt & Whitney Canada', model: 'PT6A-42 (x2)', horsepower: 850, quantity: 2, tbo_hours: 3600, hot_section_inspection_hours: 1800, source: "P&WC Maintenance Manual" },
    propeller: { manufacturer: 'Hartzell', model: 'HC-B4TN-3', type: 'constant_speed_reversible_feathering', tbo_hours: 3600, tbo_calendar_years: 6 },
    inspections_default: ['100h', '200h', '300h', '600h', 'anual', 'hot_section'],
  },
  // ── HELICÓPTEROS ──
  {
    model: 'Robinson R22 Beta II', type: 'helicopter', category: 'helicoptero_pistao',
    seats: 2, mtow_kg: 622, fuel_type: 'avgas_100ll', fuel_capacity_liters: 72,
    avg_fuel_burn_liters_hour: 30, cruise_speed_kt: 96,
    engine: { manufacturer: 'Lycoming', model: 'O-360-J2A', horsepower: 145, tbo_hours: 2200, tbo_calendar_years: 12, source: 'Lycoming SI 1009BE Table 2' },
    main_rotor: { tbo_hours: 2200, tbo_calendar_years: 12, blades: 2 },
    tail_rotor: { tbo_hours: 2200, tbo_calendar_years: 12, blades: 2 },
    gearbox: { tbo_hours: 2200, tbo_calendar_years: 12 },
    inspections_default: ['100h', 'anual', '2200h_overhaul'],
    notes: 'Robinson exige overhaul completo (motor + célula) em 2200h ou 12 anos.',
  },
  {
    model: 'Robinson R44 Raven II', type: 'helicopter', category: 'helicoptero_pistao',
    seats: 4, mtow_kg: 1134, fuel_type: 'avgas_100ll', fuel_capacity_liters: 121,
    avg_fuel_burn_liters_hour: 57, cruise_speed_kt: 110,
    engine: { manufacturer: 'Lycoming', model: 'IO-540-AE1A5', horsepower: 260, tbo_hours: 2200, tbo_calendar_years: 12, source: 'Lycoming SI 1009BE Table 2' },
    main_rotor: { tbo_hours: 2200, tbo_calendar_years: 12, blades: 2 },
    tail_rotor: { tbo_hours: 2200, tbo_calendar_years: 12, blades: 2 },
    gearbox: { tbo_hours: 2200, tbo_calendar_years: 12 },
    inspections_default: ['100h', 'anual', '2200h_overhaul'],
    notes: 'Overhaul obrigatório em 2200h/12 anos.',
  },
  {
    model: 'Robinson R66 Turbine', type: 'helicopter', category: 'helicoptero_turbina',
    seats: 4, mtow_kg: 1225, fuel_type: 'jet_a1', fuel_capacity_liters: 282,
    avg_fuel_burn_liters_hour: 91, cruise_speed_kt: 118,
    engine: { manufacturer: 'Rolls-Royce', model: 'RR300', horsepower: 300, tbo_hours: 3000, hot_section_inspection_hours: 1500, source: 'RR Maintenance Manual' },
    main_rotor: { tbo_hours: 2200, tbo_calendar_years: 12, blades: 2 },
    tail_rotor: { tbo_hours: 2200, tbo_calendar_years: 12, blades: 2 },
    gearbox: { tbo_hours: 2200, tbo_calendar_years: 12 },
    inspections_default: ['100h', '300h', 'anual', '1500h_hot_section', '2200h_overhaul'],
  },
  {
    model: 'Airbus H125 / AS350 Esquilo', type: 'helicopter', category: 'helicoptero_turbina',
    seats: 6, mtow_kg: 2250, fuel_type: 'jet_a1', fuel_capacity_liters: 540,
    avg_fuel_burn_liters_hour: 180, cruise_speed_kt: 130,
    engine: { manufacturer: 'Safran / Turbomeca', model: 'Arriel 2D', horsepower: 847, tbo_hours: 3500, hot_section_inspection_hours: 1750, source: 'Safran/Airbus Helicopters CMM' },
    main_rotor: { tbo_hours: null, blades: 3, on_condition: true, notes: 'On-condition — sem TBO fixo para pás compostas' },
    tail_rotor: { tbo_hours: null, blades: 2, on_condition: true },
    gearbox: { main_gearbox_tbo_hours: 3500, tail_gearbox_tbo_hours: 6000 },
    inspections_default: ['50h', '100h', '300h', '600h', 'anual', '1750h_hot_section'],
    notes: 'Programa de manutenção modulado. Muitos componentes on-condition.',
  },
  {
    model: 'Bell 206 JetRanger', type: 'helicopter', category: 'helicoptero_turbina',
    seats: 5, mtow_kg: 1451, fuel_type: 'jet_a1', fuel_capacity_liters: 288,
    avg_fuel_burn_liters_hour: 120, cruise_speed_kt: 120,
    engine: { manufacturer: 'Rolls-Royce', model: '250-C20J', horsepower: 420, tbo_hours: 3500, hot_section_inspection_hours: 1750, source: 'RR M250 Maintenance Manual' },
    main_rotor: { tbo_hours: 4800, blades: 2 },
    tail_rotor: { tbo_hours: 2400, blades: 2 },
    gearbox: { main_gearbox_tbo_hours: 3500, tail_gearbox_tbo_hours: 3500 },
    inspections_default: ['25h', '100h', '300h', '600h', 'anual', '1750h_hot_section'],
  },
];

// ─── ICAO Aerodrome Codes (Brazil GA) ────────────────

export interface ICAOAerodrome {
  icao: string;
  name: string;
  city: string;
  state: string;
}

export const icaoAerodromes: ICAOAerodrome[] = [
  { icao: 'SBSP', name: 'Congonhas', city: 'São Paulo', state: 'SP' },
  { icao: 'SBGR', name: 'Guarulhos', city: 'Guarulhos', state: 'SP' },
  { icao: 'SBKP', name: 'Viracopos', city: 'Campinas', state: 'SP' },
  { icao: 'SDCO', name: 'Sorocaba', city: 'Sorocaba', state: 'SP' },
  { icao: 'SDJD', name: 'Jundiaí', city: 'Jundiaí', state: 'SP' },
  { icao: 'SDIM', name: 'Itanhaém', city: 'Itanhaém', state: 'SP' },
  { icao: 'SDAG', name: 'Americana', city: 'Americana', state: 'SP' },
  { icao: 'SDPK', name: 'Bragança Paulista', city: 'Bragança Paulista', state: 'SP' },
  { icao: 'SBBU', name: 'Bauru', city: 'Bauru', state: 'SP' },
  { icao: 'SBSR', name: 'São José do Rio Preto', city: 'São José do Rio Preto', state: 'SP' },
  { icao: 'SBRJ', name: 'Santos Dumont', city: 'Rio de Janeiro', state: 'RJ' },
  { icao: 'SBGL', name: 'Galeão', city: 'Rio de Janeiro', state: 'RJ' },
  { icao: 'SBJR', name: 'Jacarepaguá', city: 'Rio de Janeiro', state: 'RJ' },
  { icao: 'SDTK', name: 'Maricá', city: 'Maricá', state: 'RJ' },
  { icao: 'SBBH', name: 'Pampulha', city: 'Belo Horizonte', state: 'MG' },
  { icao: 'SBCF', name: 'Confins', city: 'Belo Horizonte', state: 'MG' },
  { icao: 'SBBR', name: 'Brasília', city: 'Brasília', state: 'DF' },
  { icao: 'SBCT', name: 'Bacacheri', city: 'Curitiba', state: 'PR' },
  { icao: 'SBFL', name: 'Florianópolis', city: 'Florianópolis', state: 'SC' },
  { icao: 'SBPA', name: 'Porto Alegre', city: 'Porto Alegre', state: 'RS' },
  { icao: 'SBGO', name: 'Goiânia', city: 'Goiânia', state: 'GO' },
  { icao: 'SBRP', name: 'Ribeirão Preto', city: 'Ribeirão Preto', state: 'SP' },
  { icao: 'SBUL', name: 'Uberlândia', city: 'Uberlândia', state: 'MG' },
];
