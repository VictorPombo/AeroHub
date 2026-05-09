# Prompt — Módulos Complementares AeroGest (M7 a M12 + LGPD)

> Cole este prompt no Antigravity. Contém schema, lógica, telas e integração com módulos existentes (M1-M6).
> Implementar DEPOIS dos Sprints 0, 1 e 2 estarem completos.

---

## Contexto

O AeroGest já possui: M1 Diário de Bordo, M2 Agendamento, M3 Controle Aeronaves, M4 Comunicação, M5 CTM, M6 Financeiro. Faltam módulos complementares que completam a operação e diferenciam dos concorrentes. Este prompt cobre tudo que falta.

---

## M7 — Gestão de Tripulação

### O que é

Controla a situação regulatória do piloto. Responde: "esse piloto PODE voar essa aeronave agora?"

O sistema cruza: aeronave liberada (CTM verde) + piloto habilitado (M7 verde) = voo autorizado. Se qualquer um dos dois estiver irregular, o sistema bloqueia o registro de voo no M1.

### Schema

```sql
create table pilot_credentials (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) not null,
  credential_type text not null check (credential_type in (
    'cma',
    'habilitacao_tipo',
    'habilitacao_classe',
    'habilitacao_ifr',
    'habilitacao_mlte',
    'habilitacao_instrucao',
    'proficiencia_linguistica',
    'checagem_proficiencia',
    'curso_egress',
    'curso_crm',
    'outro'
  )),
  description text not null,
  issued_date date,
  expiry_date date,
  issuing_authority text default 'ANAC',
  document_number text,
  document_url text,
  status text default 'valid' check (status in ('valid', 'expiring', 'expired')),
  alert_days integer default 30,
  is_blocking boolean default true,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

Tipos de credenciais:
- `cma` — Certificado Médico Aeronáutico. Obrigatório. Validade: 1 ano (<40 anos) ou 6 meses (>40 anos)
- `habilitacao_tipo` — habilitação de tipo (ex: CE-500, EMB-505). Obrigatória para aeronaves que exigem tipo
- `habilitacao_classe` — MNTE (monomotor terrestre), MLTE (multimotor terrestre), etc
- `habilitacao_ifr` — habilitação para voo por instrumentos
- `habilitacao_mlte` — habilitação multimotor
- `habilitacao_instrucao` — INVA (instrutor de voo avião) ou INVH (helicóptero)
- `proficiencia_linguistica` — ICAO nível 4+ (validade: 3 anos nível 4, 6 anos nível 5)
- `checagem_proficiencia` — verificação periódica de competência (obrigatória RBAC 135)
- `curso_egress` — saída de emergência (obrigatório RBAC 135)
- `curso_crm` — crew resource management

```sql
create table pilot_flight_hours (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) not null,
  aircraft_type text,
  total_hours numeric(10,2) default 0,
  pic_hours numeric(10,2) default 0,
  sic_hours numeric(10,2) default 0,
  night_hours numeric(10,2) default 0,
  ifr_hours numeric(10,2) default 0,
  instruction_hours numeric(10,2) default 0,
  last_24h_hours numeric(6,2) default 0,
  last_30d_hours numeric(6,2) default 0,
  last_90d_hours numeric(6,2) default 0,
  last_12m_hours numeric(8,2) default 0,
  last_flight_date date,
  updated_at timestamptz default now()
);
```

Limites RBAC 91/135 que o sistema deve validar:
- Máximo 11h de voo em 24h
- Máximo 35h em 7 dias consecutivos
- Máximo 90h em 30 dias
- Máximo 900h em 12 meses (RBAC 135)
- Descanso mínimo: 10h antes do próximo serviço (RBAC 135)

### Triggers

```
1. on_flight_log_inserted → ATUALIZAR pilot_flight_hours
   - Somar hours_flown aos totais e recalcular janelas (24h, 30d, 90d, 12m)
   - Se ultrapassar limite → notificar piloto e gestor

2. daily_cron → VERIFICAR vencimentos de pilot_credentials
   - Se (expiry_date - today) <= alert_days → status = 'expiring', notificar
   - Se expiry_date < today → status = 'expired', notificar + bloquear

3. on_flight_log_new (ANTES de inserir) → VALIDAR
   - Checar: piloto tem CMA válido?
   - Checar: piloto tem habilitação para o tipo da aeronave?
   - Checar: piloto não ultrapassou limite de horas?
   - Se qualquer check falhar → bloquear registro com mensagem específica
```

### Telas

```
/dashboard/pilot-profile        → painel do piloto (credenciais + horas)
/dashboard/pilot-profile/credentials → lista/CRUD credenciais
/dashboard/pilot-profile/hours  → resumo de horas com janelas regulatórias
/aircraft/[id]/members          → expandir para mostrar status piloto (verde/amarelo/vermelho)
```

Painel do piloto mostra:
- Status geral: apto / com restrição / inapto
- CMA: validade e dias restantes
- Habilitações ativas com vencimento
- Horas nas janelas regulatórias (24h, 30d, 90d, 12m) com barra de progresso
- Último voo realizado
- Próximos vencimentos

---

## M8 — Meteorologia (REDEMET)

### O que é

Exibe dados meteorológicos dentro do sistema, integrados à agenda e ao registro de voo. Não é planejamento de voo completo — é informação contextual que agrega valor.

### Integração com API REDEMET

```
Base URL: https://api-redemet.decea.mil.br/
Autenticação: chave API (cadastro gratuito em redemet.aer.mil.br)
```

Endpoints para integrar:

```json
{
  "metar": {
    "endpoint": "/mensagens/metar/{icao}",
    "params": "?api_key=KEY",
    "retorna": "METAR decodificado do aeródromo",
    "usar_em": "Tela de agendamento, tela de novo voo"
  },
  "taf": {
    "endpoint": "/mensagens/taf/{icao}",
    "params": "?api_key=KEY",
    "retorna": "Previsão aeronáutica (próximas 24-30h)",
    "usar_em": "Tela de agendamento ao selecionar data futura"
  },
  "sigmet": {
    "endpoint": "/mensagens/sigmet",
    "retorna": "Avisos de tempo severo ativos",
    "usar_em": "Banner de alerta no dashboard"
  },
  "aerodrome_status": {
    "endpoint": "/aerodromos/status",
    "params": "?api_key=KEY&localidade={icao}",
    "retorna": "Condição do aeródromo (aberto/fechado/restrito)",
    "usar_em": "Tela de agendamento"
  }
}
```

### Onde exibir no sistema

1. **Tela de agendamento** `/aircraft/[id]/schedule` — ao selecionar um slot, mostrar card com METAR atual do aeródromo base. Se data futura, mostrar TAF.

2. **Formulário novo voo** `/aircraft/[id]/logbook/new` — ao preencher origem e destino ICAO, carregar METAR de ambos. Exibir: vento, visibilidade, teto, temperatura. Ícone rápido: sol/nuvem/chuva/trovoada.

3. **Dashboard principal** — se houver SIGMET ativo na região do aeródromo base, exibir banner de alerta.

### Schema (cache local)

```sql
create table weather_cache (
  id uuid default gen_random_uuid() primary key,
  icao_code text not null,
  type text not null check (type in ('metar', 'taf', 'sigmet')),
  raw_message text not null,
  decoded_data jsonb,
  fetched_at timestamptz default now(),
  valid_until timestamptz
);
```

Cache METAR por 30 minutos. TAF por 6 horas. Evita requests excessivos à API.

---

## M9 — NOTAM

### O que é

NOTAMs (Notice to Airmen) são avisos sobre restrições, mudanças ou condições operacionais em aeródromos e espaço aéreo. Integrar isso no sistema evita que o piloto precise consultar o AIS Web separadamente.

### Fonte

```
AIS Web DECEA: https://aisweb.decea.mil.br/
Consulta por ICAO do aeródromo
```

### Schema

```sql
create table notam_cache (
  id uuid default gen_random_uuid() primary key,
  icao_code text not null,
  notam_id text not null,
  type text check (type in ('aerodrome', 'airspace', 'navigation', 'other')),
  raw_text text not null,
  effective_from timestamptz,
  effective_until timestamptz,
  is_permanent boolean default false,
  fetched_at timestamptz default now()
);
```

### Onde exibir

1. **Formulário novo voo** — listar NOTAMs ativos para origem e destino
2. **Tela de agendamento** — ícone de alerta se aeródromo base tem NOTAM ativo
3. **Painel da aeronave** — seção "NOTAMs do aeródromo base"

Implementação: web scraping ou fetch do AIS Web + parse. Atualizar cache a cada 12 horas via cron.

---

## M10 — Peso e Balanceamento (W&B)

### O que é

Cálculo automático de peso e centro de gravidade por voo. Usa dados da aeronave (peso vazio, braços, envelope de CG) + dados do voo (passageiros, bagagem, combustível).

### Schema

```sql
create table aircraft_weight_balance (
  id uuid default gen_random_uuid() primary key,
  aircraft_id uuid references aircraft(id) not null unique,
  empty_weight_kg numeric(8,2) not null,
  empty_cg_mm numeric(8,2) not null,
  mtow_kg numeric(8,2) not null,
  max_landing_weight_kg numeric(8,2),
  max_zero_fuel_weight_kg numeric(8,2),
  fuel_arm_mm numeric(8,2),
  front_seats_arm_mm numeric(8,2),
  rear_seats_arm_mm numeric(8,2),
  baggage_arm_mm numeric(8,2),
  baggage_max_kg numeric(6,2),
  cg_forward_limit_mm numeric(8,2),
  cg_aft_limit_mm numeric(8,2),
  fuel_density_kg_liter numeric(4,3) default 0.721,
  envelope_points jsonb,
  last_weighing_date date,
  notes text,
  updated_at timestamptz default now()
);

create table flight_weight_balance (
  id uuid default gen_random_uuid() primary key,
  flight_log_id uuid references flight_logs(id) not null,
  pilot_weight_kg numeric(5,1),
  copilot_weight_kg numeric(5,1),
  pax_rear_weight_kg numeric(5,1),
  baggage_weight_kg numeric(5,1),
  fuel_liters numeric(6,1),
  fuel_weight_kg numeric(6,1),
  total_weight_kg numeric(8,1),
  calculated_cg_mm numeric(8,2),
  within_envelope boolean,
  within_mtow boolean,
  notes text,
  created_at timestamptz default now()
);
```

### Lógica de cálculo

```
total_weight = empty_weight + pilot + copilot + pax + baggage + fuel_weight
total_moment = (empty_weight × empty_cg) + (pilot × front_arm) + (copilot × front_arm) 
             + (pax × rear_arm) + (baggage × baggage_arm) + (fuel × fuel_arm)
cg = total_moment / total_weight

within_envelope = cg >= cg_forward_limit AND cg <= cg_aft_limit
within_mtow = total_weight <= mtow
```

### Tela

Incluir no formulário de novo voo (`/aircraft/[id]/logbook/new`) como aba opcional "Peso e Balanceamento":

- Campos: peso piloto, copiloto, passageiros, bagagem, combustível
- Cálculo automático em tempo real
- Visualização gráfica do envelope de CG (ponto dentro ou fora)
- Se fora do envelope ou acima do MTOW: alerta vermelho, registro continua mas com flag

---

## M11 — Checklist Digital

### O que é

Checklists de pré-voo e pós-voo configuráveis por modelo de aeronave. Piloto executa no app marcando item por item. Registro fica vinculado ao voo no diário.

### Schema

```sql
create table checklist_templates (
  id uuid default gen_random_uuid() primary key,
  aircraft_model text not null,
  type text not null check (type in (
    'pre_flight',
    'before_engine_start',
    'engine_start',
    'before_takeoff',
    'after_takeoff',
    'cruise',
    'before_landing',
    'after_landing',
    'engine_shutdown',
    'post_flight',
    'emergency'
  )),
  name text not null,
  items jsonb not null,
  version integer default 1,
  is_default boolean default false,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);
```

Formato do `items` (jsonb):

```json
[
  {
    "order": 1,
    "item": "Documentos da aeronave",
    "action": "Verificar - a bordo e válidos",
    "category": "cabine",
    "is_critical": true
  },
  {
    "order": 2,
    "item": "Peso e balanceamento",
    "action": "Calculado - dentro dos limites",
    "category": "cabine",
    "is_critical": true
  },
  {
    "order": 3,
    "item": "Combustível",
    "action": "Verificar quantidade - suficiente com reserva",
    "category": "exterior",
    "is_critical": true
  }
]
```

```sql
create table checklist_executions (
  id uuid default gen_random_uuid() primary key,
  flight_log_id uuid references flight_logs(id),
  aircraft_id uuid references aircraft(id) not null,
  template_id uuid references checklist_templates(id) not null,
  pilot_id uuid references profiles(id) not null,
  type text not null,
  items_completed jsonb not null,
  all_items_checked boolean default false,
  started_at timestamptz default now(),
  completed_at timestamptz,
  notes text,
  photo_urls text[]
);
```

### Fluxo

1. Piloto abre app → seleciona aeronave (QR Code ou lista)
2. Seleciona tipo: pré-voo ou pós-voo
3. Sistema carrega template do modelo (Cessna 172, R44, etc)
4. Piloto marca cada item. Itens críticos não podem ser pulados
5. Ao completar, sistema registra execução vinculada ao próximo voo
6. Se item crítico não marcado, alerta no registro de voo
7. Operador/gestor vê histórico: quais checklists foram executados por voo

### Templates padrão a criar

Criar templates pré-voo para os 10 modelos da base de referência CTM (Cessna 172, 182, 206, Piper Cherokee, Seneca, Tupi, Corisco, R22, R44, Esquilo). Baseados nos POH (Pilot Operating Handbook) de cada modelo.

### Telas

```
/aircraft/[id]/checklist              → listar templates da aeronave
/aircraft/[id]/checklist/execute/[type] → executar checklist (tela mobile-first)
/aircraft/[id]/checklist/history       → histórico de execuções
```

---

## M12 — RCSV / Reporte de Segurança de Voo

### O que é

Sistema de reporte voluntário de ocorrências, integrado ao CENIPA (Centro de Investigação e Prevenção de Acidentes Aeronáuticos). Promove cultura de segurança.

### Schema

```sql
create table safety_reports (
  id uuid default gen_random_uuid() primary key,
  aircraft_id uuid references aircraft(id),
  flight_log_id uuid references flight_logs(id),
  reported_by uuid references profiles(id) not null,
  report_type text not null check (report_type in (
    'incidente',
    'incidente_grave',
    'ocorrencia_solo',
    'ocorrencia_anormal',
    'perigo_potencial',
    'sugestao_seguranca'
  )),
  date_occurred date not null,
  location_icao text,
  location_description text,
  phase_of_flight text check (phase_of_flight in (
    'pre_flight', 'taxi', 'takeoff', 'climb',
    'cruise', 'descent', 'approach', 'landing',
    'post_flight', 'ground'
  )),
  description text not null,
  contributing_factors text[],
  corrective_actions text,
  severity text check (severity in ('low', 'medium', 'high', 'critical')),
  status text default 'submitted' check (status in (
    'submitted', 'under_review', 'action_required', 'resolved', 'closed'
  )),
  is_anonymous boolean default false,
  photo_urls text[],
  reviewed_by uuid references profiles(id),
  reviewed_at timestamptz,
  review_notes text,
  cenipa_reported boolean default false,
  cenipa_report_date date,
  created_at timestamptz default now()
);
```

### Integração com M1 (Diário)

Quando piloto marca "ocorrência" no formulário de voo do M1:
- Sistema sugere criar safety_report vinculado ao flight_log
- Pré-preenche: aeronave, data, piloto, fase de voo, localização
- Piloto completa descrição e fatores contribuintes
- Se incidente grave: flag para gestão imediata

### Telas

```
/dashboard/safety                → painel de segurança (estatísticas, reportes abertos)
/dashboard/safety/new            → novo reporte
/dashboard/safety/[id]           → detalhe do reporte
/aircraft/[id]/safety            → reportes vinculados à aeronave
```

---

## LGPD — Compliance de Dados Pessoais

### Não é um módulo separado — é um requisito transversal

Implementar em TODAS as tabelas que contêm dados pessoais.

### Dados pessoais no sistema

| Tabela | Dados sensíveis | Classificação LGPD |
|--------|-----------------|-------------------|
| profiles | nome, CANAC, CPF, avatar | Dado pessoal |
| pilot_credentials | CMA, habilitações, documentos | Dado pessoal sensível (saúde) |
| pilot_flight_hours | horas de voo, último voo | Dado pessoal |
| flight_logs | quem voou, quando, para onde | Dado pessoal + dado regulatório |
| safety_reports | reportes de ocorrência | Dado pessoal sensível |
| bookings | reservas por pessoa | Dado pessoal |

### O que implementar

**1. Consentimento no cadastro**

```sql
alter table profiles add column lgpd_consent_at timestamptz;
alter table profiles add column lgpd_consent_version text;
alter table profiles add column lgpd_data_processing_agreed boolean default false;
```

Na tela de registro, antes de criar conta, exibir termos de uso e política de privacidade. Usuário marca checkbox. Registrar data e versão do consentimento.

**2. Política de retenção de dados**

```json
{
  "flight_logs": {
    "retention": "Vida útil da aeronave + 5 anos após cancelamento matrícula",
    "justificativa": "Obrigação regulatória ANAC — Resolução 457/2017",
    "pode_excluir": false,
    "pode_anonimizar": true,
    "notes": "Dado regulatório tem base legal de obrigação legal, não consentimento"
  },
  "pilot_credentials": {
    "retention": "Enquanto conta ativa + 2 anos após exclusão",
    "pode_excluir": true,
    "notes": "Excluir documentos e manter apenas registro de que existiram"
  },
  "profiles": {
    "retention": "Enquanto conta ativa",
    "pode_excluir": true,
    "notes": "Anonimizar em flight_logs ao excluir perfil — trocar nome por ID genérico"
  },
  "safety_reports": {
    "retention": "Permanente (obrigação de segurança operacional)",
    "pode_excluir": false,
    "pode_anonimizar": true,
    "notes": "Se report é anônimo, não vincula a profile"
  }
}
```

**3. Direito de exclusão (portal do titular)**

```
/dashboard/profile/privacy     → tela de privacidade do usuário
```

Funcionalidades:
- Ver todos os dados pessoais armazenados
- Exportar dados em JSON (portabilidade)
- Solicitar exclusão de conta
- Ao excluir: anonimizar registros de voo (trocar nome por "Piloto [hash]"), excluir credentials, excluir profile. Flight_logs permanecem com ID anonimizado (obrigação regulatória)
- Revogar consentimento (bloqueia acesso mas mantém dados regulatórios anonimizados)

**4. DPA para operadores (contratos B2B)**

Quando operador contrata plano Escola ou Operador, incluir DPA digital:
- AeroGest = processador de dados
- Operador = controlador de dados
- Definir finalidade, base legal, período de retenção
- Aceite digital no onboarding do plano empresarial

**5. Logs de acesso a dados pessoais**

```sql
create table lgpd_access_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id),
  accessed_table text not null,
  accessed_record_id uuid,
  action text check (action in ('view', 'export', 'delete', 'anonymize')),
  ip_address text,
  user_agent text,
  created_at timestamptz default now()
);
```

Registrar todo acesso a dados pessoais de terceiros (gestor vendo dados de piloto, admin acessando profile).

---

## Integrações com APIs externas — implementação

### REDEMET (meteorologia)

```typescript
// lib/redemet.ts
const REDEMET_API = 'https://api-redemet.decea.mil.br';
const API_KEY = process.env.REDEMET_API_KEY;

export async function getMetar(icao: string) {
  const res = await fetch(
    `${REDEMET_API}/mensagens/metar/${icao}?api_key=${API_KEY}`
  );
  return res.json();
}

export async function getTaf(icao: string) {
  const res = await fetch(
    `${REDEMET_API}/mensagens/taf/${icao}?api_key=${API_KEY}`
  );
  return res.json();
}

export async function getSigmet() {
  const res = await fetch(
    `${REDEMET_API}/mensagens/sigmet?api_key=${API_KEY}`
  );
  return res.json();
}
```

Cache no Supabase (tabela weather_cache): METAR 30min, TAF 6h. Server action verifica cache antes de chamar API.

### RAB ANAC (auto-preenchimento de aeronave)

```typescript
// lib/rab.ts
// O RAB não tem API REST oficial pública. 
// Opções de implementação:
// 1. Importar CSV dos dados abertos (atualizar mensalmente)
// 2. Web scraping da consulta RAB (menos confiável)
// 3. Tabela local rab_aircraft com os campos relevantes

// Recomendação: importar CSV e criar tabela local
// Download: https://www.gov.br/anac/pt-br/acesso-a-informacao/dados-abertos
```

```sql
create table rab_reference (
  id uuid default gen_random_uuid() primary key,
  registration text not null unique,
  manufacturer text,
  model text,
  type text,
  year_manufactured integer,
  serial_number text,
  mtow_kg numeric(8,2),
  owner text,
  operator text,
  airworthiness_status text,
  last_updated date default current_date
);
```

Ao cadastrar aeronave: usuário digita matrícula (PT-XXX), sistema busca no rab_reference e pré-preenche modelo, fabricante, ano, tipo. Reduz erro de cadastro.

---

## Novas rotas completas

```
-- M7 Tripulação
/dashboard/pilot-profile              → painel do piloto
/dashboard/pilot-profile/credentials  → credenciais CRUD
/dashboard/pilot-profile/hours        → horas regulatórias
/dashboard/pilot-profile/privacy      → LGPD portal do titular

-- M8 Meteorologia (embutido em telas existentes, sem rota própria)
-- Componente WeatherCard reutilizável em schedule e logbook/new

-- M9 NOTAM (embutido em telas existentes)
-- Componente NotamAlert reutilizável em schedule e logbook/new

-- M10 Peso e Balanceamento
/aircraft/[id]/logbook/new            → aba W&B no form de voo (expandir)
/aircraft/[id]/settings/weight-balance → configurar envelope CG da aeronave

-- M11 Checklist
/aircraft/[id]/checklist              → templates
/aircraft/[id]/checklist/execute/[type] → executar (mobile-first)
/aircraft/[id]/checklist/history      → histórico

-- M12 Segurança
/dashboard/safety                     → painel segurança
/dashboard/safety/new                 → novo reporte
/dashboard/safety/[id]                → detalhe
/aircraft/[id]/safety                 → reportes da aeronave
```

---

## Ordem de implementação

### Sprint 3 — junto com M4 e financeiro
- [ ] M7 Gestão de tripulação (schema + validação no M1)
- [ ] M11 Checklist digital (templates dos 10 modelos + execução)
- [ ] LGPD (consentimento + portal do titular + política retenção)

### Sprint 4 — integrações externas
- [ ] M8 REDEMET (API + cache + componente WeatherCard)
- [ ] M9 NOTAM (fetch + cache + componente NotamAlert)
- [ ] RAB ANAC (importar CSV + auto-preenchimento cadastro)
- [ ] M10 Peso e Balanceamento (config + cálculo + envelope visual)

### Sprint 5 — diferenciais
- [ ] M12 RCSV (reportes + integração M1 + painel segurança)
- [ ] Mapa da frota (GPS + posição em tempo real)
- [ ] Relatórios ANAC (RAO + documentação CA)
- [ ] API pública REST (documentação + endpoints)

---

## RLS policies

```sql
-- Pilot credentials: piloto vê os próprios, gestor vê da frota
create policy "credentials_own" on pilot_credentials for select using (
  user_id = auth.uid()
);
create policy "credentials_manager" on pilot_credentials for select using (
  user_id in (
    select am2.user_id from aircraft_members am1
    join aircraft_members am2 on am1.aircraft_id = am2.aircraft_id
    where am1.user_id = auth.uid() and am1.role = 'manager'
  )
);

-- Checklists: membros da aeronave
create policy "checklist_read" on checklist_executions for select using (
  aircraft_id in (select aircraft_id from aircraft_members where user_id = auth.uid() and active = true)
);

-- Safety reports: autor vê os próprios, gestor vê todos da aeronave
-- Reports anônimos: autor vê mas sem identificação para gestor
create policy "safety_own" on safety_reports for select using (
  reported_by = auth.uid() or
  aircraft_id in (select aircraft_id from aircraft_members where user_id = auth.uid() and role = 'manager')
);

-- LGPD access logs: somente super_admin
create policy "lgpd_logs_admin" on lgpd_access_logs for select using (
  auth.uid() in (select id from profiles where role = 'super_admin')
);

-- W&B: membros da aeronave
create policy "wb_read" on flight_weight_balance for select using (
  flight_log_id in (
    select fl.id from flight_logs fl
    join aircraft_members am on fl.aircraft_id = am.aircraft_id
    where am.user_id = auth.uid() and am.active = true
  )
);
```

---

## Checklist de entrega

### Sprint 3 ✓ quando:
- [ ] Piloto cadastra CMA e habilitações com vencimento
- [ ] Sistema bloqueia registro de voo se piloto com CMA vencido
- [ ] Sistema bloqueia se horas nas últimas 24h ultrapassam 11h
- [ ] Checklist pré-voo funcional com template do Cessna 172
- [ ] Execução de checklist vinculada ao voo
- [ ] Registro inclui consentimento LGPD
- [ ] Portal do titular permite exportar e solicitar exclusão

### Sprint 4 ✓ quando:
- [ ] METAR e TAF aparecem na tela de agendamento
- [ ] NOTAMs ativos aparecem no formulário de voo
- [ ] Cadastro de aeronave auto-preenche via RAB
- [ ] W&B calculado por voo com visualização do envelope
- [ ] Cache de meteorologia e NOTAM funcionando

### Sprint 5 ✓ quando:
- [ ] Safety report criável a partir de ocorrência no diário
- [ ] Painel de segurança com estatísticas
- [ ] Reports anônimos sem identificação para gestor
- [ ] API REST com pelo menos 3 endpoints documentados
