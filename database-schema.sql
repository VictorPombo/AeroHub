-- ========================================================================================
-- AEROGEST ENTERPRISE: DATABASE SCHEMA DRAFT (SUPABASE / POSTGRESQL)
-- ========================================================================================
-- Este arquivo contém a modelagem arquitetural perfeita para a Aviação Geral.
-- Ele inclui RLS (Row Level Security), Audit Logs (Histórico), Triggers e Chaves Estrangeiras.
-- Não rode este arquivo ainda; guarde-o para o "Sprint 0" da conexão com Supabase.
-- ========================================================================================

-- 1. Habilitar Extensão de UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================================================================
-- 📦 CORE ENTITIES
-- ========================================================================================

-- 1. Empresas / Operadores (Suporte a Múltiplos CNPJs/Operadores no mesmo sistema)
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  cnpj TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Perfis de Usuário (Estendendo a tabela auth.users do Supabase)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id),
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'dov', 'pilot', 'mechanic', 'owner')),
  anac_code TEXT UNIQUE, -- CANAC
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Aeronaves
CREATE TABLE aircraft (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) NOT NULL,
  registration TEXT NOT NULL UNIQUE, -- Matrícula (Ex: PT-KZM)
  model TEXT NOT NULL,
  total_airframe_hours NUMERIC(10, 2) DEFAULT 0,
  total_engine_hours NUMERIC(10, 2) DEFAULT 0,
  total_cycles INTEGER DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('active', 'maintenance', 'grounded')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================================================
-- ✈️ OPERAÇÕES & DIÁRIO DE BORDO
-- ========================================================================================

-- 4. Logbook (Diário de Bordo Eletrônico)
CREATE TABLE flight_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  aircraft_id UUID REFERENCES aircraft(id) NOT NULL,
  pic_id UUID REFERENCES profiles(id) NOT NULL,
  sic_id UUID REFERENCES profiles(id),
  date DATE NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  engine_start TIMESTAMPTZ NOT NULL,
  takeoff TIMESTAMPTZ NOT NULL,
  landing TIMESTAMPTZ NOT NULL,
  engine_stop TIMESTAMPTZ NOT NULL,
  total_flight_hours NUMERIC(5, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'signed', 'audited')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================================================
-- 🔧 CTM E MANUTENÇÃO
-- ========================================================================================

-- 5. Itens Controlados (CTM)
CREATE TABLE ctm_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  aircraft_id UUID REFERENCES aircraft(id) NOT NULL,
  name TEXT NOT NULL,
  part_number TEXT,
  serial_number TEXT,
  installation_date DATE,
  installation_hours NUMERIC(10, 2),
  limit_hours NUMERIC(10, 2),
  limit_date DATE,
  is_grounding_item BOOLEAN DEFAULT false,
  status TEXT NOT NULL CHECK (status IN ('ok', 'alert', 'overdue')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================================================
-- 🚨 AUDIT LOG (O CORAÇÃO DA RASTREABILIDADE AERONÁUTICA)
-- ========================================================================================

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
  old_data JSONB,
  new_data JSONB,
  changed_by UUID REFERENCES profiles(id),
  changed_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT
);

-- Função de Trigger para alimentar o Audit Log Automaticamente
CREATE OR REPLACE FUNCTION log_audit_event() RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'UPDATE') THEN
    INSERT INTO audit_logs (table_name, record_id, action, old_data, new_data, changed_by)
    VALUES (TG_TABLE_NAME, NEW.id, 'UPDATE', row_to_json(OLD)::jsonb, row_to_json(NEW)::jsonb, auth.uid());
    RETURN NEW;
  ELSIF (TG_OP = 'DELETE') THEN
    INSERT INTO audit_logs (table_name, record_id, action, old_data, changed_by)
    VALUES (TG_TABLE_NAME, OLD.id, 'DELETE', row_to_json(OLD)::jsonb, auth.uid());
    RETURN OLD;
  ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO audit_logs (table_name, record_id, action, new_data, changed_by)
    VALUES (TG_TABLE_NAME, NEW.id, 'INSERT', row_to_json(NEW)::jsonb, auth.uid());
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Atachando o Trigger na tabela Aircraft (Exemplo Crítico)
CREATE TRIGGER aircraft_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON aircraft
FOR EACH ROW EXECUTE FUNCTION log_audit_event();

-- Atachando o Trigger na tabela Flight Logs (Exemplo Crítico)
CREATE TRIGGER flight_logs_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON flight_logs
FOR EACH ROW EXECUTE FUNCTION log_audit_event();

-- ========================================================================================
-- 🔒 ROW LEVEL SECURITY (RLS)
-- ========================================================================================
-- Garante que um piloto só feche diário se for ele mesmo, e que empresas não vejam dados de outras.

ALTER TABLE aircraft ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Empresa só vê seus próprios aviões" 
ON aircraft FOR SELECT 
USING (company_id IN (SELECT company_id FROM profiles WHERE id = auth.uid()));

ALTER TABLE flight_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Piloto só pode assinar voos onde ele é tripulante" 
ON flight_logs FOR UPDATE 
USING (pic_id = auth.uid() OR sic_id = auth.uid());
