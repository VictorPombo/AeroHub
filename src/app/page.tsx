'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plane, BarChart3, Globe, Shield, Zap, ArrowRight, CheckCircle2, Navigation, PlaneTakeoff, MapPin, Search, Star, Clock, Users, DollarSign, Check } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

export default function LandingPage() {
  const handleConsultantClick = () => {
    toast.success('Solicitação Enviada', { description: 'Nosso time de especialistas entrará em contato em até 15 minutos.' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-aero-cyan/30 flex flex-col font-sans overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-aero-cyan/20 blur-[120px] mix-blend-screen opacity-40 animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[150px] mix-blend-screen opacity-30" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
      </div>

      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-aero-cyan to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(45,212,191,0.5)]">
              <Plane className="w-5 h-5 text-slate-950" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Aero<span className="text-aero-cyan">Gest</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#plataforma" className="hover:text-white transition-colors">Plataforma</a>
            <a href="#solucoes" className="hover:text-white transition-colors">Soluções</a>
            <a href="#depoimentos" className="hover:text-white transition-colors">Clientes</a>
            <a href="#precos" className="hover:text-white transition-colors">Planos</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-slate-300 hover:text-white transition-colors hidden sm:block">
              Entrar
            </Link>
            <Link href="/login">
              <Button className="bg-white text-slate-950 hover:bg-slate-200 font-bold rounded-full px-6 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all">
                Acessar Sistema
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10 pt-32 lg:pt-40">
        
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 mb-20 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-aero-cyan/30 bg-aero-cyan/10 text-aero-cyan text-sm font-bold mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aero-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-aero-cyan"></span>
            </span>
            O Maior Hub de Operações Aéreas do Brasil
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tight mb-8 animate-fade-in-up [animation-delay:100ms] leading-[1.1]">
            Gestão impecável para <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aero-cyan via-blue-400 to-indigo-400">
              Aviação Executiva.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-in-up [animation-delay:200ms] leading-relaxed font-medium">
            CTM inteligente, escala de tripulação, painel financeiro e venda direta de fretamentos em uma única plataforma cloud ultra-rápida.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up [animation-delay:300ms]">
            <Link href="/login">
              <Button className="w-full sm:w-auto h-14 px-10 bg-aero-cyan hover:bg-aero-cyan-light text-slate-950 font-extrabold rounded-full text-lg gap-2 group transition-all duration-300 shadow-[0_0_30px_rgba(45,212,191,0.3)] hover:shadow-[0_0_40px_rgba(45,212,191,0.5)] hover:-translate-y-1">
                Iniciar Teste Grátis <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto h-14 px-10 border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-white font-bold rounded-full text-lg transition-all duration-300 hover:-translate-y-1"
              onClick={handleConsultantClick}
            >
              Agendar Demonstração
            </Button>
          </div>
        </section>

        {/* DASHBOARD MOCKUP SHOWCASE */}
        <section className="max-w-7xl mx-auto px-6 mb-32 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 pointer-events-none" />
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-2 sm:p-4 shadow-2xl backdrop-blur-sm animate-fade-in-up [animation-delay:400ms] relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" />
            
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[16/9] relative flex items-center justify-center">
              <Image 
                src="/dashboard-preview.png" 
                alt="AeroGest Dashboard Interface" 
                fill
                priority
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </section>

        {/* LOGOS / SOCIAL PROOF */}
        <section className="border-y border-white/5 bg-slate-900/30 py-10 mb-32">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-sm font-bold tracking-widest text-slate-500 uppercase mb-8">
              Confiado por operadores aéreos de excelência
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 font-bold text-xl"><Plane className="w-6 h-6"/> LiderJet</div>
              <div className="flex items-center gap-2 font-bold text-xl"><Globe className="w-6 h-6"/> VoeGlobal</div>
              <div className="flex items-center gap-2 font-bold text-xl"><Shield className="w-6 h-6"/> PrimeAir</div>
              <div className="flex items-center gap-2 font-bold text-xl"><Navigation className="w-6 h-6"/> AeroClub Br</div>
            </div>
          </div>
        </section>

        {/* FEATURES BENTO GRID */}
        <section id="plataforma" className="max-w-7xl mx-auto px-6 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">A tríade da aviação executiva.</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
              A única plataforma que não separa o avião do passageiro. Operação, financeiro e comercial trabalhando sincronizados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1: ERP Técnico */}
            <div className="md:col-span-2 rounded-3xl border border-slate-800 bg-slate-900/40 p-8 flex flex-col relative overflow-hidden group hover:border-aero-cyan/50 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                <PlaneTakeoff className="w-48 h-48 text-aero-cyan" />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-aero-cyan/10 border border-aero-cyan/20 flex items-center justify-center mb-6 relative z-10">
                <Shield className="w-7 h-7 text-aero-cyan" />
              </div>
              <h3 className="text-3xl font-bold mb-3 relative z-10 text-white">Controle Técnico Mestre (CTM)</h3>
              <p className="text-slate-400 mb-8 max-w-lg relative z-10 text-lg">
                Seu compliance em piloto automático. Diário de Bordo 100% digitalizado, previsão de revisões, gestão de componentes e jornada da tripulação (RBAC 135/91).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto relative z-10">
                {[
                  'Alertas de Vencimento de TBO', 
                  'Gestão de Diretrizes (AD)', 
                  'Controle de Fadiga da Tripulação', 
                  'Ordens de Serviço Integradas'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-950/50 p-3 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-aero-cyan shrink-0" />
                    <span className="text-sm font-semibold text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature 2: B2C Portal */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 flex flex-col relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 relative z-10">
                <Globe className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3 relative z-10 text-white">Máquina de Vendas</h3>
              <p className="text-slate-400 mb-6 relative z-10">
                Pare de perder tempo cotando voos no WhatsApp. Tenha um link público pro cliente reservar e pagar no cartão de crédito via Stripe.
              </p>
              
              <div className="mt-auto rounded-xl border border-slate-700/50 bg-slate-950/80 p-5 relative z-10 flex flex-col gap-3 shadow-lg shadow-emerald-500/5">
                 <div className="flex items-center gap-3 bg-slate-900 rounded-lg p-3 border border-slate-800">
                   <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                   <div className="flex flex-col gap-1 w-full">
                     <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Origem</span>
                     <div className="h-3 w-16 bg-slate-700 rounded-sm" />
                   </div>
                 </div>
                 <div className="flex items-center gap-3 bg-slate-900 rounded-lg p-3 border border-slate-800">
                   <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                   <div className="flex flex-col gap-1 w-full">
                     <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Destino</span>
                     <div className="h-3 w-24 bg-slate-700 rounded-sm" />
                   </div>
                 </div>
                 <Button className="mt-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-10 shadow-lg shadow-emerald-500/20">
                   <Search className="w-4 h-4 mr-2" /> Buscar Aeronaves
                 </Button>
              </div>
            </div>

            {/* Feature 3: Financial */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 flex flex-col relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
               <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 relative z-10">
                <BarChart3 className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 relative z-10 text-white">Engenharia Financeira</h3>
              <p className="text-slate-400 mb-6 relative z-10">
                O único sistema que calcula dinamicamente sua reserva de manutenção (Overhaul) a cada hora voadada.
              </p>
               <div className="mt-auto flex flex-col gap-3 relative z-10">
                 {['Gestão de Margem de Lucro', 'Separação Automática de Custos', 'Cobrança Automatizada'].map((item, i) => (
                    <div key={i} className="rounded-lg bg-slate-950 border border-slate-800 p-4 flex items-center justify-between group-hover:border-indigo-500/30 transition-colors">
                       <span className="text-sm text-slate-300 font-bold">{item}</span>
                       <DollarSign className="w-4 h-4 text-indigo-400" />
                    </div>
                 ))}
               </div>
            </div>

            {/* Feature 4: Tracking */}
            <div className="md:col-span-2 rounded-3xl border border-slate-800 bg-slate-900/40 p-8 flex flex-col relative overflow-hidden group hover:border-blue-500/50 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                <Navigation className="w-48 h-48 text-blue-500" />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 relative z-10">
                <Navigation className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold mb-3 relative z-10 text-white">Monitoramento de Frota (Ao Vivo)</h3>
              <p className="text-slate-400 mb-6 max-w-lg relative z-10 text-lg">
                Integração via satélite com os principais hardwares do mercado. Saiba onde sua aeronave está, altitude, ETA e status do voo em um mapa interativo premium.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-auto relative z-10">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-center">
                  <span className="block text-2xl font-black text-blue-400 font-mono">Real-time</span>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Telemetria</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-center">
                  <span className="block text-2xl font-black text-white font-mono">&lt; 1s</span>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Latência</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* METRICS & BENEFITS */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="rounded-3xl bg-aero-cyan/5 border border-aero-cyan/20 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold">Menos papelada. Mais voos faturados.</h2>
              <p className="text-lg text-slate-400 font-medium leading-relaxed">
                Empresas que migram para o AeroGest reduzem o tempo gasto em administração técnica e aumentam o faturamento direto via Cotação Online.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="p-1.5 bg-aero-cyan/20 rounded-full"><Check className="w-5 h-5 text-aero-cyan" /></div>
                  <span className="text-white font-semibold">Setup rápido com importação de dados</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-1.5 bg-aero-cyan/20 rounded-full"><Check className="w-5 h-5 text-aero-cyan" /></div>
                  <span className="text-white font-semibold">Suporte 24/7 especializado em aviação</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-6 w-full">
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl text-center shadow-lg">
                <span className="text-5xl font-black text-aero-cyan block mb-2">-45%</span>
                <span className="text-sm font-bold text-slate-400">Tempo de Gestão Técnica</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl text-center shadow-lg">
                <span className="text-5xl font-black text-emerald-500 block mb-2">+30%</span>
                <span className="text-sm font-bold text-slate-400">Aumento em Fretamentos</span>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="precos" className="max-w-7xl mx-auto px-6 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Planos escaláveis.</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
              Escolha o plano ideal para o tamanho da sua frota. Sem taxas ocultas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Plan 1 */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 flex flex-col hover:border-slate-600 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Startup</h3>
              <p className="text-slate-400 text-sm mb-6 h-10">Perfeito para proprietários únicos ou recém homologados.</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-white">R$ 499</span><span className="text-slate-500">/mês</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-slate-300 font-medium"><Check className="w-4 h-4 text-aero-cyan" /> Até 2 Aeronaves</li>
                <li className="flex items-center gap-3 text-sm text-slate-300 font-medium"><Check className="w-4 h-4 text-aero-cyan" /> CTM Básico</li>
                <li className="flex items-center gap-3 text-sm text-slate-300 font-medium"><Check className="w-4 h-4 text-aero-cyan" /> 5 Tripulantes</li>
              </ul>
              <Button variant="outline" className="w-full border-slate-700 bg-transparent hover:bg-slate-800 text-white font-bold h-12" onClick={handleConsultantClick}>
                Escolher Startup
              </Button>
            </div>

            {/* Plan 2 */}
            <div className="rounded-3xl border-2 border-aero-cyan bg-slate-900/80 p-8 flex flex-col relative shadow-[0_0_30px_rgba(45,212,191,0.15)] transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-aero-cyan text-slate-950 font-bold text-xs uppercase tracking-widest py-1 px-4 rounded-b-lg">Mais Escolhido</div>
              <h3 className="text-xl font-bold text-white mb-2 mt-2">Operador</h3>
              <p className="text-slate-400 text-sm mb-6 h-10">O pacote completo para empresas de táxi aéreo.</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-white">R$ 1.299</span><span className="text-slate-500">/mês</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-slate-300 font-medium"><Check className="w-4 h-4 text-aero-cyan" /> Até 10 Aeronaves</li>
                <li className="flex items-center gap-3 text-sm text-slate-300 font-medium"><Check className="w-4 h-4 text-aero-cyan" /> CTM Avançado + Portal B2C</li>
                <li className="flex items-center gap-3 text-sm text-slate-300 font-medium"><Check className="w-4 h-4 text-aero-cyan" /> Tripulantes Ilimitados</li>
                <li className="flex items-center gap-3 text-sm text-slate-300 font-medium"><Check className="w-4 h-4 text-aero-cyan" /> Gestão Financeira</li>
              </ul>
              <Button className="w-full bg-aero-cyan hover:bg-aero-cyan-light text-slate-950 font-bold h-12" onClick={handleConsultantClick}>
                Assinar Agora
              </Button>
            </div>

            {/* Plan 3 */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 flex flex-col hover:border-slate-600 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-slate-400 text-sm mb-6 h-10">Para grandes frotas e operações complexas.</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-white">Sob Consulta</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-slate-300 font-medium"><Check className="w-4 h-4 text-aero-cyan" /> Aeronaves Ilimitadas</li>
                <li className="flex items-center gap-3 text-sm text-slate-300 font-medium"><Check className="w-4 h-4 text-aero-cyan" /> Telemetria em Tempo Real</li>
                <li className="flex items-center gap-3 text-sm text-slate-300 font-medium"><Check className="w-4 h-4 text-aero-cyan" /> API Privada</li>
                <li className="flex items-center gap-3 text-sm text-slate-300 font-medium"><Check className="w-4 h-4 text-aero-cyan" /> Gerente de Conta VIP</li>
              </ul>
              <Button variant="outline" className="w-full border-slate-700 bg-transparent hover:bg-slate-800 text-white font-bold h-12" onClick={handleConsultantClick}>
                Falar com Consultor
              </Button>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="cta" className="max-w-5xl mx-auto px-6 mb-32">
          <div className="rounded-3xl border border-aero-cyan/20 bg-gradient-to-br from-slate-900 to-slate-950 p-12 text-center relative overflow-hidden shadow-[0_0_50px_rgba(45,212,191,0.1)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-aero-cyan to-transparent opacity-50" />
            
            <PlaneTakeoff className="w-14 h-14 text-aero-cyan mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Sua operação pronta para o futuro.</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 font-medium">
              Junte-se às operadoras de elite que já rodam 100% cloud. O setup inicial é guiado pela nossa equipe.
            </p>
            <Link href="/login">
              <Button className="h-14 px-12 bg-white hover:bg-slate-200 text-slate-950 font-black rounded-full text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Acessar Plataforma AeroGest
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-70">
            <Plane className="w-6 h-6" />
            <span className="font-bold tracking-tight text-lg">AeroGest</span>
          </div>
          <div className="text-sm text-slate-500 font-medium">
            © {new Date().getFullYear()} AeroGest. Tecnologia para Aviação Executiva.
          </div>
          <div className="flex gap-8 text-sm font-semibold text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); handleConsultantClick(); }}>Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
