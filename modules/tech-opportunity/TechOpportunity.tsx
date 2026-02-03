import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ShieldCheck, Activity, Database, LineChart, Cpu, ArrowRight, Zap, Target } from 'lucide-react';

const NeuralCore = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
      {/* Atmósfera de Resplandor Base */}
      <motion.div 
        animate={{ 
          scale: isActive ? [1, 1.2, 1] : [1, 1.05, 1],
          opacity: isActive ? [0.4, 0.7, 0.4] : [0.2, 0.4, 0.2],
          filter: isActive ? 'blur(100px)' : 'blur(80px)'
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-brand-blue/30 rounded-full"
      />
      
      {/* Contenedor de Animación Lottie */}
      <div className="relative z-10 w-full h-full flex items-center justify-center scale-125 sm:scale-150">
        {/* @ts-ignore - Componente Web de Lottie */}
        <dotlottie-wc 
          src="https://lottie.host/61a0df9f-7237-459a-acd8-afbd1b6d1b3c/UbxvHlTqmg.lottie" 
          autoplay 
          loop 
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Pulsos de Partículas para Feedback de Interacción */}
      {isActive && Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 2.5, opacity: [0, 1, 0] }}
          transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
          className="absolute w-20 h-20 border border-brand-orange/40 rounded-full pointer-events-none"
        />
      ))}

      {/* Anillos HUD Estáticos Decorativos */}
      <div className="absolute inset-0 border border-white/5 rounded-full scale-110 opacity-20" />
      <div className="absolute inset-0 border border-white/5 rounded-full scale-125 opacity-10" />
    </div>
  );
};

const InteractiveNode = ({ icon: Icon, title, description, delay = 0 }: any) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!nodeRef.current) return;
    const rect = nodeRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={nodeRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      animate={{ x: mousePos.x, y: mousePos.y }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group relative p-6 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl hover:border-brand-blue/50 transition-colors cursor-pointer"
    >
      <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <div className={`w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-brand-blue" />
      </div>
      <h4 className="text-white font-bold mb-2 group-hover:text-brand-blue transition-colors uppercase tracking-wider text-sm">{title}</h4>
      <p className="text-slate-400 text-xs leading-relaxed">{description}</p>
      
      {/* Corner Accents */}
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10 rounded-tr-xl group-hover:border-brand-blue/50" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/10 rounded-bl-xl group-hover:border-brand-blue/50" />
    </motion.div>
  );
};

export const TechOpportunity: React.FC = () => {
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0.3, 0.6], [0, -50]);
  const opacityRange = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);

  return (
    <section className="relative min-h-screen bg-slate-950 py-32 overflow-hidden flex flex-col items-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(48,103,126,0.1)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-10 bg-grid-pattern bg-grid scale-150 -rotate-12" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-brand-blue/30 bg-brand-blue/5 text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue mb-8"
          >
            <ShieldCheck className="w-3 h-3" />
            Infraestructura de Datos Inteligente
          </motion.div>

          <motion.h2
            onMouseEnter={() => setIsHeroHovered(true)}
            onMouseLeave={() => setIsHeroHovered(false)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl lg:text-6xl font-black text-white max-w-4xl leading-tight mb-8 cursor-default"
          >
            IA: El Motor de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-white to-brand-orange">Eficiencia Operativa</span>
          </motion.h2>

          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed italic">
            "Transformamos sistemas pasivos en redes neuronales que detectan, aprenden y optimizan cada vatio inyectado."
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Central AI Nucleus con Lottie */}
          <div className="flex justify-center relative">
            <NeuralCore isActive={isHeroHovered} />
            {/* HUD Indicators around core */}
            <div className="absolute -top-10 -left-10 hidden sm:block">
              <div className="text-[10px] font-mono text-brand-blue/60 mb-2">SCANNING_PROTOCOL_v4.2</div>
              <div className="w-32 h-[1px] bg-gradient-to-r from-brand-blue/60 to-transparent" />
            </div>
            <div className="absolute -bottom-10 -right-10 hidden sm:block text-right">
              <div className="w-32 h-[1px] bg-gradient-to-l from-brand-orange/40 to-transparent mb-2" />
              <div className="text-[10px] font-mono text-brand-orange/60">ANOMALY_DETECTION: READY</div>
            </div>
          </div>

          {/* Efficiency Matrix HUD */}
          <div className="space-y-10">
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <InteractiveNode 
                  icon={Activity} 
                  title="Anomalías" 
                  description="Detección de patrones de consumo irregulares mediante clustering avanzado."
                  delay={0.1}
                />
                <InteractiveNode 
                  icon={Database} 
                  title="Big Data" 
                  description="Procesamiento de millones de eventos por segundo en tiempo real."
                  delay={0.2}
                />
                <InteractiveNode 
                  icon={LineChart} 
                  title="Predictivo" 
                  description="Modelos de forecasting que anticipan picos de demanda y fallos."
                  delay={0.3}
                />
             </div>

             {/* HUD Table Section */}
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md"
             >
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Matriz de Eficiencia IA</h3>
                   <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[9px] font-mono text-green-500/80">LIVE_METRICS</span>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="flex justify-between items-center py-4 border-b border-white/5 group hover:bg-white/5 transition-colors px-2 rounded-lg">
                      <span className="text-slate-300 text-sm font-medium">Precisión de Detección</span>
                      <span className="text-brand-blue font-mono font-bold">98.42%</span>
                   </div>
                   <div className="flex justify-between items-center py-4 border-b border-white/5 group hover:bg-white/5 transition-colors px-2 rounded-lg">
                      <span className="text-slate-300 text-sm font-medium">Latencia de Respuesta</span>
                      <span className="text-slate-100 font-mono font-bold">&lt; 150ms</span>
                   </div>
                   <div className="space-y-3 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300 text-sm font-medium">Retorno de Inversión (ROI)</span>
                        <span className="text-brand-orange font-mono font-bold">MENOS DE 12 MESES</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: '85%' }}
                           transition={{ duration: 1.5, ease: "easeOut" }}
                           className="h-full bg-gradient-to-r from-brand-blue to-brand-orange" 
                         />
                      </div>
                   </div>
                </div>

                <button className="w-full mt-10 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-xs uppercase tracking-widest hover:bg-brand-blue hover:border-brand-blue transition-all flex items-center justify-center gap-3 group">
                  Explorar Protocolos Técnicos
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};