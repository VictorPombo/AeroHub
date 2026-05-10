'use client';

import { useState, use } from 'react';
import { MOCK_AIRPORTS, QuotationEngine, CommercialPricing } from '@/lib/quotation-engine';
import { Plane, Calendar, Users, MapPin, ArrowRight, CreditCard, CheckCircle2, Clock, Check } from 'lucide-react';

const mockPricing: CommercialPricing = {
  hourly_rate: 2500,
  margin_percentage: 25,
  min_hours: 2.0,
  cruise_speed_kts: 180, // Cirrus SR22
};

export default function PublicBookingPage({ params }: { params: Promise<{ company: string }> }) {
  const resolvedParams = use(params);
  const [step, setStep] = useState(1);
  
  // Search State
  const [originIcao, setOriginIcao] = useState('SBSP');
  const [destIcao, setDestIcao] = useState('SBRJ');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');
  const [pax, setPax] = useState(1);

  // Quote Result State
  const [quote, setQuote] = useState<any>(null);

  function handleSearch() {
    const origin = MOCK_AIRPORTS.find(a => a.icao === originIcao);
    const dest = MOCK_AIRPORTS.find(a => a.icao === destIcao);

    if (origin && dest) {
      const result = QuotationEngine.calculateQuote(origin, dest, mockPricing);
      setQuote({ origin, dest, ...result });
      setStep(2);
    } else {
      alert("Aeroporto não encontrado no Mock (Use SBSP, SBJD, SBRJ, SBBR, SBPA, SBFL, SBCF)");
    }
  }

  function handleCheckout() {
    setStep(3);
  }

  return (
    <div className="space-y-8 animate-fade-in relative z-10">
      
      {/* Decorative Background Glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-aero-cyan/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center space-y-6 py-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-black border border-white/10 shadow-xl shadow-aero-cyan/10">
            <Plane className="w-7 h-7 text-aero-cyan" />
          </div>
          <span className="text-3xl font-bold tracking-tight text-white">
            Aero<span className="text-aero-cyan">Gest</span> <span className="font-light text-muted-foreground ml-2">Charter</span>
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
          O Seu Jato Particular. <br/> <span className="text-aero-cyan font-light">Sob Demanda.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
          Cotação e reserva instantânea em tempo real. Frota exclusiva da operadora <strong className="text-white font-medium capitalize">{resolvedParams.company.replace('-', ' ')}</strong>.
        </p>
      </div>

      {step === 1 && (
        <div className="glass-card p-8 rounded-3xl border-white/10 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-aero-cyan to-blue-600"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div className="space-y-2 lg:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 ml-1">
                <MapPin className="w-3.5 h-3.5 text-aero-cyan" /> De onde você parte?
              </label>
              <div className="relative">
                <select 
                  value={originIcao}
                  onChange={e => setOriginIcao(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-base text-white focus:border-aero-cyan/50 focus:ring-1 focus:ring-aero-cyan/50 outline-none appearance-none transition-all cursor-pointer" 
                >
                  {MOCK_AIRPORTS.map(a => (
                    <option key={a.icao} value={a.icao}>{a.city} ({a.name}) - {a.icao}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">▼</div>
              </div>
            </div>

            <div className="space-y-2 lg:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 ml-1">
                <MapPin className="w-3.5 h-3.5 text-blue-500" /> Para onde vamos?
              </label>
              <div className="relative">
                <select 
                  value={destIcao}
                  onChange={e => setDestIcao(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-base text-white focus:border-aero-cyan/50 focus:ring-1 focus:ring-aero-cyan/50 outline-none appearance-none transition-all cursor-pointer" 
                >
                  {MOCK_AIRPORTS.map(a => (
                    <option key={a.icao} value={a.icao}>{a.city} ({a.name}) - {a.icao}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">▼</div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 ml-1">
                <Users className="w-3.5 h-3.5" /> Passageiros
              </label>
              <div className="relative">
                <select 
                  value={pax}
                  onChange={e => setPax(Number(e.target.value))}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-base text-white focus:border-aero-cyan/50 focus:ring-1 focus:ring-aero-cyan/50 outline-none appearance-none transition-all cursor-pointer"
                >
                  {[1,2,3,4,5,6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Passageiro' : 'Passageiros'}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">▼</div>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
             <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 ml-1">
                  <Calendar className="w-3.5 h-3.5" /> Data do Voo
                </label>
                <input 
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-base text-white focus:border-aero-cyan/50 focus:ring-1 focus:ring-aero-cyan/50 outline-none transition-all [color-scheme:dark]" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 ml-1">
                  <Clock className="w-3.5 h-3.5" /> Horário Desejado (Decolagem)
                </label>
                <input 
                  type="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-base text-white focus:border-aero-cyan/50 focus:ring-1 focus:ring-aero-cyan/50 outline-none transition-all [color-scheme:dark]" 
                />
              </div>
          </div>

          <div className="pt-4">
            <button 
              onClick={handleSearch}
              className="w-full btn-primary h-14 text-lg font-bold bg-aero-cyan text-black hover:bg-aero-cyan/90 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 rounded-xl shadow-lg shadow-aero-cyan/20"
            >
              Buscar Aeronaves Disponíveis <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && quote && (
        <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-2xl font-bold text-white tracking-tight">Opções de Fretamento</h3>
             <button onClick={() => setStep(1)} className="text-sm text-aero-cyan hover:underline font-medium">Refazer busca</button>
          </div>

          <div className="glass-card p-6 rounded-3xl border-white/10 hover:border-emerald-500/30 transition-colors flex flex-col md:flex-row items-center gap-8 shadow-xl">
            <div className="w-40 h-40 bg-gradient-to-br from-black to-white/5 rounded-2xl flex items-center justify-center border border-white/10 shrink-0 shadow-inner">
               <Plane className="w-16 h-16 text-muted-foreground opacity-50" />
            </div>
            
            <div className="flex-1 space-y-4 w-full">
               <div>
                 <div className="flex items-center justify-between">
                   <h4 className="text-3xl font-bold text-white tracking-tight">Cirrus SR22</h4>
                   <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full uppercase tracking-wider">
                     Disponível
                   </span>
                 </div>
                 <p className="text-muted-foreground font-medium mt-1">{quote.origin.city} ({quote.origin.icao}) ➔ {quote.dest.city} ({quote.dest.icao})</p>
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                 <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                   <span className="block text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Capacidade</span>
                   <span className="font-semibold text-white">Até 3 Pax</span>
                 </div>
                 <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                   <span className="block text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Velocidade</span>
                   <span className="font-semibold text-white">{Math.round(mockPricing.cruise_speed_kts)} kts</span>
                 </div>
                 <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                   <span className="block text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Distância</span>
                   <span className="font-semibold text-white">{quote.distanceNm} NM</span>
                 </div>
                 <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
                   <span className="block text-[10px] text-emerald-500 uppercase font-bold tracking-wider mb-1">Tempo Voo</span>
                   <span className="font-bold text-emerald-500 text-lg">{quote.flightTimeHours.toFixed(1)}h</span>
                 </div>
               </div>
            </div>
            
            <div className="md:border-l border-white/10 md:pl-8 py-2 space-y-6 shrink-0 w-full md:w-auto text-center md:text-right">
               <div className="space-y-1">
                 <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Custo Total da Missão</p>
                 <p className="text-5xl font-bold text-white tracking-tight">R$ {(quote.finalPrice).toLocaleString('pt-BR')}</p>
                 <p className="text-xs text-muted-foreground/80 mt-2 flex items-center justify-center md:justify-end gap-1">
                   <Check className="w-3 h-3 text-emerald-500" /> Todas as taxas inclusas
                 </p>
               </div>
               <button 
                 onClick={handleCheckout}
                 className="w-full md:w-56 btn-primary bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-14 text-lg rounded-xl shadow-lg shadow-emerald-500/20"
               >
                 Reservar
               </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && quote && (
        <div className="glass-card p-8 rounded-2xl max-w-xl mx-auto space-y-8 animate-fade-in border-blue-500/20">
          <div className="text-center space-y-2">
             <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
               <CreditCard className="w-8 h-8" />
             </div>
             <h3 className="text-2xl font-bold text-white">Checkout Seguro (Stripe Mock)</h3>
             <p className="text-sm text-muted-foreground">Voo: {quote.origin.name} ➔ {quote.dest.name}</p>
          </div>
          
          <div className="bg-black/40 p-6 rounded-xl border border-border/50 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Total a pagar:</span>
              <span className="text-xl font-bold font-mono text-white">R$ {(quote.finalPrice).toLocaleString('pt-BR')}</span>
            </div>
          </div>

          <div className="space-y-4">
            <input className="w-full bg-black/40 border border-border/50 rounded-lg px-4 py-3 text-sm focus:border-blue-500/50 outline-none" placeholder="Nome Completo" />
            <input className="w-full bg-black/40 border border-border/50 rounded-lg px-4 py-3 text-sm focus:border-blue-500/50 outline-none" placeholder="E-mail" />
            <input className="w-full bg-black/40 border border-border/50 rounded-lg px-4 py-3 text-sm focus:border-blue-500/50 outline-none" placeholder="Número do Cartão de Crédito" />
          </div>

          <button 
            onClick={() => setStep(4)}
            className="w-full btn-primary h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
          >
            Confirmar Pagamento
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="glass-card p-12 rounded-2xl max-w-xl mx-auto text-center space-y-6 border-emerald-500/30 bg-emerald-500/5 animate-fade-in">
          <CheckCircle2 className="w-24 h-24 text-emerald-500 mx-auto" />
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-white">Voo Confirmado!</h3>
            <p className="text-muted-foreground">
              Seu pagamento foi processado com sucesso. A reserva já foi despachada para o sistema operacional (AeroGest ERP) da nossa empresa e nosso setor de coordenação de voos entrará em contato.
            </p>
          </div>
          <button 
            onClick={() => setStep(1)}
            className="btn-primary mt-4 bg-white/10 hover:bg-white/20 text-white"
          >
            Fazer Nova Reserva
          </button>
        </div>
      )}

    </div>
  );
}
