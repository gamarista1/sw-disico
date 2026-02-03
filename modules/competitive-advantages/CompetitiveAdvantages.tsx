import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CloudCog, 
  Network, 
  LayoutDashboard, 
  TrendingUp, 
  X, 
  CheckCircle2, 
  ChevronRight, 
  Zap,
  ShieldCheck,
  Smartphone,
  BarChart3,
  UserCheck,
  Server
} from 'lucide-react';
import MagicBento from '../../shared/components/ui/MagicBento';

const AdvantageModal = ({ isOpen, onClose, data }: { isOpen: boolean, onClose: () => void, data: any }) => {
  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl z-10"
          >
            <div className="p-10">
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-5">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-brand-blue/10 border border-brand-blue/20`}>
                    <data.icon className="w-8 h-8 text-brand-blue" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-brand-blue uppercase tracking-[0.3em] block mb-1">Diferencial Estratégico</span>
                    <h3 className="text-3xl font-black text-white tracking-tighter leading-none">{data.title}</h3>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors group">
                  <X className="w-6 h-6 text-slate-500 group-hover:text-white" />
                </button>
              </div>

              <div className="space-y-8">
                <section>
                  <p className="text-lg text-slate-300 leading-relaxed font-medium italic">
                    "{data.argument}"
                  </p>
                </section>

                <div className="grid gap-4">
                   <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                     <Zap className="w-3 h-3" /> Puntos Clave de Valor
                   </h4>
                   {data.points.map((point: string, i: number) => (
                     <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-blue/30 transition-all">
                       <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                       <p className="text-sm text-slate-300 font-semibold">{point}</p>
                     </div>
                   ))}
                </div>

                {data.roles && (
                  <div className="pt-4 grid grid-cols-3 gap-4">
                    {data.roles.map((role: any, i: number) => (
                      <div key={i} className="text-center">
                         <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-2 border border-white/5">
                            <role.icon className="w-5 h-5 text-brand-blue" />
                         </div>
                         <p className="text-[9px] font-black text-white uppercase tracking-wider">{role.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-12 flex justify-center">
                 <button 
                  onClick={onClose}
                  className="px-10 py-4 bg-brand-blue/10 border border-brand-blue/20 rounded-2xl text-brand-blue font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-blue hover:text-white transition-all"
                 >
                   Entendido
                 </button>
              </div>
            </div>
            <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-50" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const CompetitiveAdvantages: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const ADVANTAGES_CONTENT: any = {
    'saas': {
      id: 'saas',
      icon: CloudCog,
      title: "Modelo SaaS Zero-Capex",
      description: "Sin inversión en hardware. Suscripción mensual modular adaptada a su crecimiento.",
      label: "ZERO CAPEX",
      color: "#0f172a",
      argument: "Elimine el riesgo financiero. Transforme grandes inversiones de capital (CAPEX) en costos operativos manejables (OPEX).",
      points: [
        "Implementación en semanas, no meses.",
        "Actualizaciones automáticas (siempre tiene la última versión).",
        "Infraestructura elástica que crece con su base de clientes."
      ]
    },
    'integration': {
      id: 'integration',
      icon: Network,
      title: "API First & SUI",
      description: "Conexión nativa con SAP, Oracle y sistemas legados para reporte automático.",
      label: "INTEROPERABILIDAD",
      color: "#0f172a",
      argument: "SW DISICO se integra silenciosamente con su ERP comercial y sistemas SCADA existentes, garantizando flujo de datos bidireccional.",
      points: [
        "Bi-direccional: Lee facturación, escribe órdenes de servicio.",
        "Normativa: Reportes automáticos listos para el SUI.",
        "Seguridad: Túneles VPN encriptados AES-256."
      ]
    },
    'dashboards': {
      id: 'dashboards',
      icon: LayoutDashboard,
      title: "Vistas por Rol",
      description: "Interfaces especializadas para Directivos, Técnicos y Operarios de campo.",
      label: "UX/UI ADAPTATIVA",
      color: "#0f172a",
      argument: "La información solo es útil si se entiende. Entregamos la vista correcta a la persona correcta en el momento justo.",
      points: [
        "CEO/CFO: Vista de ROI y pérdidas monetizadas.",
        "Ingeniería: Mapa de calor de pérdidas técnicas vs NTL.",
        "Operarios: App móvil con rutas georreferenciadas."
      ],
      roles: [
        { name: "Directivo", icon: BarChart3 },
        { name: "Ingeniero", icon: Server },
        { name: "Operador", icon: Smartphone }
      ]
    },
    'escalability': {
      id: 'escalability',
      icon: TrendingUp,
      title: "Escalabilidad & Soporte",
      description: "Procesamiento masivo de datos con soporte local experto en utilities.",
      label: "GROWTH READY",
      color: "#0f172a",
      argument: "Diseñado para procesar desde 10,000 hasta 10 millones de puntos de medida sin degradación de servicio.",
      points: [
        "Arquitectura de microservicios auto-escalables.",
        "Soporte técnico local especializado en Utilities.",
        "Alta disponibilidad (99.9% Uptime SLA)."
      ]
    }
  };

  const bentoData = Object.values(ADVANTAGES_CONTENT).map((item: any) => ({
    ...item,
    onClick: () => setActiveModal(item.id)
  }));

  return (
    <section className="relative min-h-screen bg-slate-950 py-32 overflow-hidden flex flex-col items-center">
      <AdvantageModal 
        isOpen={!!activeModal} 
        onClose={() => setActiveModal(null)} 
        data={activeModal ? ADVANTAGES_CONTENT[activeModal] : null} 
      />

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-grid-pattern bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-blue/30 bg-brand-blue/5 text-[9px] font-black uppercase tracking-[0.3em] text-brand-blue mb-8"
          >
            <ShieldCheck className="w-3 h-3" />
            Diferenciales Competitivos
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-none mb-8"
          >
            ¿Por qué <span className="text-brand-blue">SW DISICO</span> es la elección estratégica?
          </motion.h2>
          
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-slate-400 text-lg leading-relaxed italic"
          >
            "No entregamos solo software; entregamos solidez empresarial y una plataforma que evoluciona con la complejidad de su red."
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto">
          <MagicBento 
            cardData={bentoData}
            textAutoHide={true}
            enableStars
            enableSpotlight
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect
            spotlightRadius={400}
            particleCount={12}
            glowColor="48, 103, 126"
            disableAnimations={false}
          />
        </div>

        {/* Floating Trust Indicator */}
        <div className="mt-20 flex justify-center">
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="flex items-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
           >
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Integración con:</div>
              <div className="text-xl font-black text-white tracking-tighter">SAP</div>
              <div className="text-xl font-black text-white tracking-tighter">ORACLE</div>
              <div className="text-xl font-black text-white tracking-tighter">SUI</div>
              <div className="text-xl font-black text-white tracking-tighter">AMI</div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};