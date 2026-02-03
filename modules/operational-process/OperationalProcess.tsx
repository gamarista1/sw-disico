import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DatabaseZap, 
  Binary, 
  BrainCircuit, 
  MapPinCheck, 
  X, 
  ChevronRight, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Search,
  Settings,
  Activity,
  BarChart3
} from 'lucide-react';

interface ProcessStep {
  id: string;
  icon: any;
  title: string;
  label: string;
  shortDesc: string;
  modalContent: {
    title: string;
    description: string;
    details: string[];
    visualLabel: string;
  };
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'ingestion',
    icon: DatabaseZap,
    title: "Recolección",
    label: "Ingesta Multi-Fuente",
    shortDesc: "Conexión AMI/MDM agnóstica.",
    modalContent: {
      title: "Ingesta de Datos Agnóstica",
      description: "Capa de interoperabilidad capaz de dialogar con cualquier AMI (Advanced Metering Infrastructure). Transforma protocolos propietarios en un flujo estandarizado de eventos.",
      details: [
        "Lectura de curvas de carga cada 15 min.",
        "Captura de 'Eventos de Medidor' (apertura de tapa, corte de neutro).",
        "Integración nativa con sistemas comerciales y de facturación."
      ],
      visualLabel: "PROTOCOL_CONVERTER_READY"
    }
  },
  {
    id: 'refining',
    icon: Binary,
    title: "Preprocesamiento",
    label: "Normalización & Limpieza",
    shortDesc: "Motor ETL de alta fidelidad.",
    modalContent: {
      title: "Motor de Calidad de Datos (ETL)",
      description: "Antes de que la IA procese la información, los datos pasan por una refinación profunda para eliminar el ruido estadístico y asegurar la integridad del análisis.",
      details: [
        "Imputación inteligente de datos faltantes (Gaps).",
        "Sincronización horaria (Time-alignment) multi-zona.",
        "Detección de outliers de comunicación vs. fallas reales."
      ],
      visualLabel: "DATA_INTEGRITY_SYNC_v3"
    }
  },
  {
    id: 'prediction',
    icon: BrainCircuit,
    title: "Predicción",
    label: "Scoring de Anomalías",
    shortDesc: "IA profunda para fraude.",
    modalContent: {
      title: "Generación de Alertas Predictivas",
      description: "El núcleo de IA asigna un 'Score de Probabilidad de Fraude' (0-100%) a cada cliente mediante el análisis de comportamientos invisibles al ojo humano.",
      details: [
        "Análisis comparativo (Peer-to-Peer) entre perfiles similares.",
        "Detección de caídas de consumo no correlacionadas con clima.",
        "Priorización automática por impacto económico (Pareto)."
      ],
      visualLabel: "NEURAL_ANALYSIS_ACTIVE"
    }
  },
  {
    id: 'validation',
    icon: MapPinCheck,
    title: "Validación",
    label: "Despliegue Operativo",
    shortDesc: "Acción en campo georeferenciada.",
    modalContent: {
      title: "Gestión de Cuadrillas y Cierre",
      description: "Transformamos la alerta digital en una recuperación física tangible, cerrando el ciclo con la inspección y el re-entrenamiento del modelo.",
      details: [
        "Generación automática de Órdenes de Servicio (OS).",
        "Georreferenciación de objetivos para ruta óptima.",
        "Feedback Loop: El resultado de campo calibra la IA."
      ],
      visualLabel: "FIELD_OPERATION_SUCCESS"
    }
  }
];

const StepModal = ({ isOpen, onClose, step }: { isOpen: boolean, onClose: () => void, step: ProcessStep | null }) => {
  if (!step) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-lg bg-slate-900 border border-brand-blue/30 rounded-[2.5rem] overflow-hidden shadow-2xl z-10"
          >
            {/* Modal Header */}
            <div className="p-8 pb-4 flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center border border-brand-blue/20">
                  <step.icon className="w-8 h-8 text-brand-blue" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white leading-none">{step.modalContent.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                    <span className="text-[10px] font-mono text-brand-orange uppercase tracking-widest font-bold">
                      {step.modalContent.visualLabel}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors group">
                <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 pt-4 space-y-6">
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {step.modalContent.description}
              </p>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-4 h-[1px] bg-slate-700" /> DETALLES DE PROCESO
                </h4>
                {step.modalContent.details.map((detail, i) => (
                  <div key={i} className="flex gap-4 items-start p-4 rounded-xl bg-white/5 border border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300 font-medium leading-snug">{detail}</p>
                  </div>
                ))}
              </div>

              <button 
                onClick={onClose}
                className="w-full py-4 bg-brand-blue/10 border border-brand-blue/20 rounded-xl text-brand-blue font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-blue hover:text-white transition-all"
              >
                Cerrar Protocolo
              </button>
            </div>

            <div className="h-1 w-full bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-30" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const OperationalProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState<ProcessStep | null>(null);

  return (
    <section className="relative min-h-screen bg-slate-950 py-32 overflow-hidden flex flex-col items-center">
      <StepModal 
        isOpen={!!activeStep} 
        onClose={() => setActiveStep(null)} 
        step={activeStep} 
      />

      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-grid-pattern bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-32 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-orange/30 bg-brand-orange/5 text-[9px] font-black uppercase tracking-[0.3em] text-brand-orange mb-8"
          >
            <Zap className="w-3 h-3" />
            Workflow Automatizado
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-none mb-8"
          >
            Del <span className="text-brand-orange">Dato Crudo</span> a la Acción de Campo
          </motion.h2>
          
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-slate-400 text-lg leading-relaxed italic"
          >
            "Trazabilidad completa del ciclo de vida de la pérdida. SW DISICO orquesta cada milisegundo desde la lectura del medidor hasta la inspección física."
          </motion.p>
        </div>

        {/* The Pipeline Container */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-0">
          
          {/* Animated SVG Path (Desktop) */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 hidden md:block px-12 z-0">
             <svg className="w-full h-24 overflow-visible" viewBox="0 0 1000 100">
                <motion.path 
                  d="M 50 50 L 950 50" 
                  stroke="rgba(48,103,126,0.1)" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeDasharray="10 10"
                />
                <motion.path 
                  d="M 50 50 L 950 50" 
                  stroke="url(#lineGradient)" 
                  strokeWidth="3" 
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <defs>
                   <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#30677E" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#30677E" />
                      <stop offset="100%" stopColor="#F48423" />
                   </linearGradient>
                </defs>
                {/* Traveling Particles */}
                {[0, 1, 2].map((i) => (
                  <motion.circle
                    key={i}
                    r="4"
                    fill="#30677E"
                    animate={{ cx: [50, 950] }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "linear", 
                      delay: i * 1.33 
                    }}
                    style={{ filter: 'blur(2px)' }}
                  />
                ))}
             </svg>
          </div>

          {/* Vertical Path (Mobile) */}
          <div className="absolute left-[2.5rem] top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-blue/20 via-brand-blue to-brand-orange/20 md:hidden z-0">
            <motion.div 
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 -translate-x-1/2 w-2 h-12 bg-white/40 blur-[4px] rounded-full"
            />
          </div>

          {/* Nodes */}
          {PROCESS_STEPS.map((step, idx) => (
            <div key={step.id} className="relative z-10 w-full md:w-auto flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2 }}
                onClick={() => setActiveStep(step)}
                className="group relative cursor-pointer"
              >
                {/* Node Orb */}
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-900 border-2 border-white/5 flex items-center justify-center group-hover:border-brand-blue/50 group-hover:bg-brand-blue/10 transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(48,103,126,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <step.icon className={`w-8 h-8 md:w-10 md:h-10 text-slate-500 group-hover:text-brand-blue transition-colors group-hover:scale-110 duration-500`} />
                </motion.div>

                {/* Number Indicator */}
                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center text-[10px] font-black text-slate-500 group-hover:text-brand-orange group-hover:border-brand-orange transition-colors">
                  0{idx + 1}
                </div>
                
                {/* Pulsing Ring */}
                <motion.div 
                   animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                   transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                   className="absolute inset-0 rounded-full border border-brand-blue/20 pointer-events-none"
                />
              </motion.div>

              {/* Text Labels */}
              <div className="mt-6 text-center md:absolute md:top-full md:mt-10 md:w-48">
                <h4 className="text-white font-black text-sm uppercase tracking-widest mb-1">{step.title}</h4>
                <p className="text-brand-blue font-mono text-[9px] uppercase tracking-widest mb-3">{step.label}</p>
                <p className="text-slate-500 text-[10px] leading-tight max-w-[150px] mx-auto opacity-0 md:group-hover:opacity-100 transition-opacity">
                  {step.shortDesc}
                </p>
                
                <button 
                  onClick={() => setActiveStep(step)}
                  className="md:hidden mt-4 px-4 py-2 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-white"
                >
                  Ver Protocolo
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Final Conversion Summary */}
        <div className="mt-64 flex flex-col items-center">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="p-1 sm:p-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-md flex flex-wrap justify-center gap-4 sm:gap-12 px-8 sm:px-16"
           >
              <div className="flex items-center gap-3 py-4">
                 <div className="w-2 h-2 rounded-full bg-green-500" />
                 <span className="text-[10px] sm:text-xs font-mono text-slate-400">INPUT: RAW_AMI_DATA</span>
              </div>
              <div className="flex items-center gap-3 py-4 border-l border-white/5 pl-4 sm:pl-12">
                 <ArrowRight className="w-4 h-4 text-brand-orange" />
              </div>
              <div className="flex items-center gap-3 py-4 border-l border-white/5 pl-4 sm:pl-12">
                 <div className="w-2 h-2 rounded-full bg-brand-orange" />
                 <span className="text-[10px] sm:text-xs font-mono text-white font-bold">OUTPUT: REVENUE_RECOVERY</span>
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};
