import { PilotCredential, CTMItem, Aircraft } from '@/types/models';

export interface ValidationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
}

export const RulesEngine = {
  /**
   * Avalia um plano de voo antes do despacho verificando:
   * 1. Se a aeronave possui itens de CTM que causam "Grounding" vencidos.
   * 2. Se a documentação crítica do piloto (Ex: CMA) está vencida.
   */
  validateFlight: (
    aircraft: Aircraft,
    ctmItems: CTMItem[],
    picCredentials: PilotCredential[]
  ): ValidationResult => {
    const result: ValidationResult = { passed: true, errors: [], warnings: [] };

    // ─── 1. VALIDAÇÃO DA AERONAVE (M5 - CTM) ───
    if (aircraft.status === 'grounded' || aircraft.status === 'maintenance') {
      result.passed = false;
      result.errors.push(`A aeronave ${aircraft.registration} está indisponível para voo (Status: ${aircraft.status.toUpperCase()}).`);
    }

    // Busca itens de CTM vencidos que impedem voo (is_grounding_item = true)
    const groundingItems = ctmItems.filter(
      item => item.aircraft_id === aircraft.id && item.is_grounding_item && item.status === 'overdue'
    );
    
    if (groundingItems.length > 0) {
      result.passed = false;
      groundingItems.forEach(item => {
        result.errors.push(`CTM CRÍTICO VENCIDO: ${item.name} (AOG). Despacho bloqueado.`);
      });
    }

    // Busca itens de CTM próximos ao vencimento para gerar alertas
    const approachingItems = ctmItems.filter(
      item => item.aircraft_id === aircraft.id && item.status === 'alert'
    );
    
    if (approachingItems.length > 0) {
      approachingItems.forEach(item => {
        result.warnings.push(`Aviso de Manutenção: O item "${item.name}" está se aproximando do vencimento.`);
      });
    }

    // ─── 2. VALIDAÇÃO DA TRIPULAÇÃO (M7) ───
    const cma = picCredentials.find(c => c.credential_type === 'cma');
    if (!cma) {
      result.passed = false;
      result.errors.push(`Piloto em Comando (PIC) não possui registro de CMA.`);
    } else if (cma.status === 'expired') {
      result.passed = false;
      result.errors.push(`CMA do Piloto em Comando (PIC) encontra-se VENCIDO. Voo bloqueado por violação regulatória.`);
    } else if (cma.status === 'expiring') {
      result.warnings.push(`CMA do Piloto em Comando (PIC) expira em menos de 30 dias.`);
    }

    // Checagem de proficiência em simulador (exemplo)
    const proficiencia = picCredentials.find(c => c.credential_type === 'checagem_proficiencia');
    if (proficiencia && proficiencia.status === 'expired') {
       result.passed = false;
       result.errors.push(`Cheque de Proficiência (IFR/Tipo) do PIC VENCIDO.`);
    }

    return result;
  }
};
