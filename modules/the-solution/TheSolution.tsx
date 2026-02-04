import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  Workflow, 
  BrainCircuit, 
  PlugZap, 
  X, 
  ChevronRight, 
  Database, 
  Cpu, 
  Layers, 
  ShieldCheck,
  Search,
  Settings,
  Code2,
  Activity
} from 'lucide-react';

const SolutionModal = ({ isOpen, onClose, data }: { isOpen: boolean, onClose: () => void, data: any }) => {
  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl"
          />
          <motion.div
            layoutId={`card-${data.id}`}
            className="relative w-full max-w-4xl bg-slate-900 border border-brand-blue/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(48,103,126,0.2)] z-10 flex flex-col lg:flex-row min-h-[500px]"
          >
            {/* Sidebar Decorator */}
            <div className="w-full lg:w-1/3 bg-slate-950/50 p-8 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center mb-6 border border-brand-blue/20">
                  <data.icon className="w-8 h-8 text-brand-blue" />
                </div>
                <h3 className="text-2xl font-black text-white tracking-tighter mb-2">{data.title}</h3>
                <p className="text-brand-blue font-mono text-[10px] uppercase tracking-[0.3em] font-black">{data.tag}</p>
              </div>
              
              <div className="mt-8 space-y-4">
                 <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Status del Módulo</span>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                       <span className="text-xs text-green-500 font-mono">OPERATIVO_v2.5</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 lg:p-12 overflow-y-auto custom-scrollbar">
              <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors group">
                <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </button>

              <div className="space-y-8">
                <section>
                  <h4 className="text-xs font-black text-brand-orange uppercase tracking-widest mb-4 flex items-center gap-2">
                    <div className="w-4 h-[1px] bg-brand-orange" /> RESUMEN EJECUTIVO
                  </h4>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    {data.fullContent.overview}
                  </p>
                </section>

                <div className="grid sm:grid-cols-2 gap-6">
                  {data.fullContent.details.map((detail: any, i: number) => (
                    <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-blue/30 transition-colors">
                      <h5 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                        <ChevronRight className="w-3 h-3 text-brand-blue" />
                        {detail.label}
                      </h5>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        {detail.value}
                      </p>
                    </div>
                  ))}
                </div>

                {data.fullContent.technicalSpecs && (
                  <section className="pt-4">
                     <h4 className="text-xs font-black text-brand-blue uppercase tracking-widest mb-4 flex items-center gap-2">
                      <div className="w-4 h-[1px] bg-brand-blue" /> ESPECIFICACIONES TÉCNICAS
                    </h4>
                    <div className="bg-slate-950 rounded-xl p-4 font-mono text-[11px] text-brand-blue/80 space-y-2 border border-brand-blue/10">
                       {data.fullContent.technicalSpecs.map((spec: string, i: number) => (
                         <div key={i} className="flex gap-2">
                            <span className="text-slate-700">[{i+1}]</span>
                            <span>{spec}</span>
                         </div>
                       ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const TechLayer = ({ index, total, isHovered, label }: { index: number, total: number, isHovered: boolean, label: string }) => {
  const yOffset = (index - total / 2) * 40;
  return (
    <motion.div
      animate={{ 
        y: isHovered ? yOffset * 1.5 : yOffset,
        rotateX: 45,
        rotateZ: -45,
        scale: isHovered ? 1.1 : 1,
        opacity: isHovered ? 1 : 0.6
      }}
      className="absolute w-48 h-48 sm:w-64 sm:h-64 border-2 border-brand-blue/30 bg-brand-blue/5 backdrop-blur-sm rounded-xl flex items-center justify-center"
      style={{ zIndex: total - index }}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <span className="absolute bottom-4 right-4 text-[8px] font-mono text-brand-blue/40 uppercase tracking-widest">{label}</span>
      {index === 0 && <Cpu className="w-12 h-12 text-brand-blue opacity-50" />}
      {index === 1 && <Workflow className="w-12 h-12 text-brand-blue opacity-50" />}
      {index === 2 && <Database className="w-12 h-12 text-brand-blue opacity-50" />}
    </motion.div>
  );
};

export const TheSolution: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [hoveredLayer, setHoveredLayer] = useState(false);

  const solutionCards = [
    {
      id: 'definition',
      icon: Box,
      title: "Plataforma SaaS de Inteligencia",
      tag: "CORE ENGINE",
      fullContent: {
        overview: "Solución integral en la nube potenciada con IA para detectar pérdidas no técnicas en tiempo real, eliminando el CAPEX mediante un modelo de suscripción.",
        details: [
          { label: "Modelo de Negocio", value: "Suscripción mensual (SaaS) escalable según volumen de medidores." },
          { label: "Enfoque Operativo", value: "Priorización de órdenes de trabajo basadas en probabilidad de éxito." },
          { label: "Actualizaciones", value: "Despliegue continuo de mejoras algorítmicas sin interrupciones." }
        ],
        technicalSpecs: ["Multi-tenant architecture", "SLA 99.9% availability", "SOC2 Type II Compliance"]
      }
    },
    {
      id: 'architecture',
      icon: Workflow,
      title: "Pipeline de Procesamiento AMI",
      tag: "DATA PIPELINE",
      fullContent: {
        overview: "Arquitectura Lambda diseñada para ingerir flujos masivos de datos AMI, normalizarlos y transformarlos en insights accionables.",
        details: [
          { label: "Fase de Ingesta", value: "Recolección agnóstica de lecturas y eventos de red." },
          { label: "Feature Extraction", value: "Limpieza profunda y selección de atributos críticos de consumo." },
          { label: "Consolidación", value: "Capa de procesamiento por lotes para históricos masivos." }
        ],
        technicalSpecs: ["Real-time Stream Processing", "Elastic Scaling", "Automated Data Quality Checks"]
      }
    },
    {
      id: 'machine-learning',
      icon: BrainCircuit,
      title: "Tríada de Modelos Predictivos",
      tag: "AI & ML MODELS",
      fullContent: {
        overview: "Uso de modelos avanzados para clasificación y detección de anomalías en curvas de carga que superan la capacidad de análisis humano.",
        details: [
          { label: "SVM / Random Forest", value: "Clasificación binaria robusta para detectar fraude en alta dimensionalidad." },
          { label: "CNN Deep Learning", value: "Análisis visual de patrones en curvas de carga para detectar manipulaciones." },
          { label: "Reinforcement Learning", value: "El sistema aprende y se calibra con los resultados de inspecciones en campo." }
        ],
        technicalSpecs: ["Hyperparameter Auto-tuning", "Cross-validation 10-fold", "LSTM Recurrent Networks"]
      }
    },
    {
      id: 'compatibility',
      icon: PlugZap,
      title: "Interoperabilidad Universal",
      tag: "COMPATIBILITY",
      fullContent: {
        overview: "Integración nativa con cualquier infraestructura de medición inteligente bajo estándares globales sin necesidad de cambiar hardware.",
        details: [
          { label: "Estándar DLMS/COSEM", value: "Lectura nativa de medidores de múltiples marcas y fabricantes." },
          { label: "Conectores ERP", value: "Integración bidireccional lista para SAP, Oracle y sistemas SCADA." },
          { label: "Agnosticismo Físico", value: "Actúa como una capa de inteligencia superior sobre su red actual." }
        ],
        technicalSpecs: ["RESTful / GraphQL APIs", "IEC 61968 Standards", "AES-256 Data Encryption"]
      }
    }
  ];

  return (
    <section id="solution" className="relative min-h-screen bg-slate-950 py-32 overflow-hidden flex flex-col items-center">
      <SolutionModal 
        isOpen={!!activeModal} 
        onClose={() => setActiveModal(null)} 
        data={activeModal ? solutionCards.find(c => c.id === activeModal) : null} 
      />

      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-grid-pattern bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-blue font-black uppercase tracking-[0.4em] text-[10px] block mb-6"
          >
            SOLUCIÓN INTEGRAL SaaS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-none mb-8"
          >
            Arquitectura de Precisión para la <span className="text-brand-blue">Recuperación</span> de Energía
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-slate-400 text-lg leading-relaxed italic"
          >
            "SW DISICO no es solo software; es un ecosistema de inteligencia que orquesta la detección y gestión de pérdidas desde la nube."
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
          
          {/* Central Blueprint Engine */}
          <div 
            className="relative w-full lg:w-1/2 h-[400px] sm:h-[600px] flex items-center justify-center perspective-1000"
            onMouseEnter={() => setHoveredLayer(true)}
            onMouseLeave={() => setHoveredLayer(false)}
          >
            <TechLayer index={0} total={3} isHovered={hoveredLayer} label="Intelligence Layer (IA)" />
            <TechLayer index={1} total={3} isHovered={hoveredLayer} label="Logic Layer (API)" />
            <TechLayer index={2} total={3} isHovered={hoveredLayer} label="Data Layer (Storage)" />
            
            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
               <motion.path 
                 animate={{ opacity: hoveredLayer ? 0.3 : 0.1 }}
                 d="M 50% 50% L 100% 0%" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="5,5" />
            </svg>
          </div>

          {/* Cards Grid */}
          <div className="w-full lg:w-1/2 grid sm:grid-cols-2 gap-6">
            {solutionCards.map((card, idx) => (
              <motion.div
                key={card.id}
                layoutId={`card-${card.id}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setActiveModal(card.id)}
                className="group relative p-8 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl hover:border-brand-blue/40 transition-all cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-brand-blue/20">
                  <card.icon className="w-6 h-6 text-brand-blue" />
                </div>
                
                <h4 className="text-white font-bold text-lg mb-2 leading-tight group-hover:text-brand-blue transition-colors">
                  {card.title}
                </h4>
                <p className="text-brand-blue font-mono text-[9px] uppercase tracking-widest font-black mb-4">
                  {card.tag}
                </p>
                
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">
                  Ver Ficha Técnica
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Decorative scanning line */}
                <motion.div 
                  animate={{ y: ["0%", "100%", "0%"] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[1px] bg-brand-blue/20 blur-[1px] pointer-events-none"
                />
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Final Blueprint Decoration Section */}
      <div className="mt-32 w-full max-w-5xl px-4">
         <div className="border-t border-white/5 pt-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
               <div className="text-2xl font-black text-white mb-1">SaaS</div>
               <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Modelo de Despliegue</div>
            </div>
            <div className="text-center">
               <div className="text-2xl font-black text-white mb-1">99.9%</div>
               <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Disponibilidad SLA</div>
            </div>
            <div className="text-center">
               <div className="text-2xl font-black text-white mb-1">256-bit</div>
               <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Encriptación Militar</div>
            </div>
            <div className="text-center">
               <div className="text-2xl font-black text-white mb-1">REST</div>
               <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Arquitectura API</div>
            </div>
         </div>
      </div>
    </section>
  );
};