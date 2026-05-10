# Mapa Geral dos 38 Itens Faltantes do AeroGest (Sprints 5 a 10)

| Sprint | Foco | Itens | Qtd |
|--------|------|-------|-----|
| S5 | Tripulação avançada | Jornada/fadiga, check-in, experiência recente, horas por modelo, proficiência linguística, treinamentos | 6 |
| S6 | CTM avançado | Boletins de serviço, mapa de componentes, OS completa, grandes modificações, biblioteca técnica | 5 |
| S7 | Suprimentos e estoque | Estoque peças, componentes, histórico, fornecedores, compras/cotações, OS materiais | 6 |
| S8 | Operações aéreas | Aeródromos, abastecimento/preço combustível, checklist, contatos operacionais, assinaturas digitais, passaportes/vistos, interrupção programada | 7 |
| S9 | Financeiro avançado | Demonstrativos, faturamento, pagamentos, rateio proprietários, contas pagar/receber, fluxo de caixa, portal do cliente | 7 |
| S10 | Coordenação + qualidade + admin | Passageiros, manifesto carga, etapas canceladas, ficha de voo, disponibilidade mensal, auditorias, não conformidades, KPIs, ISBAO, contratos, CRM, RH, gestão treinamentos | 7 |

---

## Sprint 5 — Tripulação Avançada

### 5.1 Controle de jornada e fadiga
Jornada = todo o período de trabalho: apresentação → espera → voo → pouso → liberação.
(Esquema: crew_duty_periods)

### 5.2 Check-in da tripulação
(Esquema: crew_checkins)

### 5.3 Experiência recente detalhada
(Esquemas: pilot_experience_events, pilot_flight_hours expandido)

### 5.4 Horas por modelo de aeronave
(Esquema: pilot_hours_by_type)

### 5.5 Proficiência linguística ICAO
(Incluir em pilot_credentials)

### 5.6 Controle de treinamentos
(Esquemas: training_records, training_requirements)

### Rotas Sprint 5
- `/dashboard/pilot-profile/duty`
- `/dashboard/pilot-profile/experience`
- `/dashboard/pilot-profile/hours-by-type`
- `/dashboard/pilot-profile/training`
- `/aircraft/[id]/logbook/new` (expandido)

---

## Sprint 6 — CTM Avançado

### 6.1 Boletins de serviço (SB)
(Esquema: service_bulletins)

### 6.2 Mapa de componentes instalados
(Esquemas: aircraft_components, component_history)

### 6.3 Ordem de serviço completa (OS)
(Esquemas: maintenance_work_orders, work_order_items)

### 6.4 Grandes modificações (STC)
(Esquema: aircraft_modifications)

### 6.5 Biblioteca técnica
(Esquema: technical_library)

### Rotas Sprint 6
- `/aircraft/[id]/ctm/service-bulletins`
- `/aircraft/[id]/ctm/components`
- `/aircraft/[id]/ctm/work-orders`
- `/aircraft/[id]/ctm/modifications`
- `/aircraft/[id]/ctm/library`

---

## Sprint 7 — Suprimentos e Estoque
(Esquemas: inventory_items, inventory_movements, suppliers, purchase_orders)

## Sprint 8 — Operações Aéreas
(Esquemas: aerodromes, fuel_records, fuel_prices, operational_checklists, checklist_executions, operational_contacts, digital_signatures, travel_documents, scheduled_interruptions)

## Sprint 9 — Financeiro Avançado
(Esquemas: financial_statement (view), aircraft_revenues, invoices, financial_transactions, owner_statements)

## Sprint 10 — Coordenação Avançada + Qualidade + Admin
(Esquemas: passengers, flight_passengers, cargo_manifests, flight_briefings, cancelled_flights, monthly_availability (view), audits, non_conformities, quality_kpis, risk_assessments, contracts, crm_contacts)

---

**Nota de Implementação (Antigravity):**
Respeitar a ordem S5 → S6 → S7 → S8 → S9 → S10 porque cada sprint depende dos anteriores. O Sprint 6 (CTM avançado com OS completa) é o mais crítico — sem ele, suprimentos e financeiro avançado ficam desconectados. Sprint 5 (tripulação) pode rodar em paralelo com S6 porque são independentes. Não começar S9 (financeiro) antes de S6 estar sólido.
