import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import { Button } from '../../shared/components/ui/Button';
import Lightning from '../../shared/components/ui/Lightning';

const AudioVisualizer: React.FC = () => {
  const bars = [40, 65, 45, 70, 85, 60, 75, 90, 65, 80];

  return (
    <div className="h-32 flex items-end justify-between gap-1.5 px-1 relative z-20">
      {bars.map((h, i) => (
        <motion.div 
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          whileHover={{ 
            scaleY: 1.2,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
          style={{ originY: 1 }} // Asegura que el crecimiento sea hacia arriba
          transition={{ 
            duration: 0.6, 
            delay: 0.8 + (i * 0.08),
            ease: "easeOut" 
          }}
          className="w-full rounded-t-[2px] cursor-pointer relative group/bar transition-all duration-300
                     bg-cyan-500/20 border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]
                     hover:bg-gradient-to-t hover:from-orange-600 hover:via-orange-500 hover:to-amber-400 
                     hover:border-orange-400/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:z-30"
        >
          {/* Tooltip con el porcentaje individual */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded text-[8px] text-white opacity-0 group-hover/bar:opacity-100 transition-all font-bold bg-brand-orange shadow-lg whitespace-nowrap z-40">
            {h}% Recup.
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const HeroHeader: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      
      {/* Background Layer 1: Electricity / Lightning Effect */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-screen">
        <Lightning hue={198} speed={0.4} intensity={0.6} size={0.5} xOffset={-0.5} />
      </div>
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen overflow-hidden scale-150 rotate-12 translate-x-1/4">
        <Lightning hue={20} speed={0.2} intensity={0.4} size={0.8} xOffset={0.2} />
      </div>

      {/* Background Layer 2: Grid & Gradient */}
      <div className="absolute inset-0 z-0 opacity-20 bg-grid-pattern bg-grid pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-blue/30 via-slate-950/80 to-slate-950 pointer-events-none" />
      
      {/* Floating Particles/Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 z-10 relative grid lg:grid-cols-2 gap-12 items-center pt-20 lg:pt-0">
        
        {/* Text Content */}
        <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/30 backdrop-blur-sm"
          >
            <ShieldCheck className="w-4 h-4 text-brand-orange" />
            <span className="text-[10px] lg:text-sm font-medium text-gray-300 uppercase tracking-widest">Tecnología de Grado Utility</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[clamp(1.75rem,5vw,3.75rem)] font-bold tracking-tight text-white leading-[1.1]"
          >
            Transforme sus datos en <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-blue">Energía Recuperada</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
          >
            Detección de pérdidas NTL con Inteligencia Artificial, sin inversión inicial en infraestructura y un <span className="text-white font-semibold">ROI &lt; 12 meses</span>.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button variant="primary" glow className="group px-8 py-4">
              Solicitar Demo Personalizada
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="px-8 py-4">
              Ver Análisis de Caso
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center gap-6 justify-center lg:justify-start pt-4 text-gray-500 text-[10px] lg:text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Algoritmo Activo
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-orange" />
              Integration Ready (DLMS)
            </div>
          </motion.div>
        </div>

        {/* Visual Element / Dashboard Preview with complex layering */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative hidden lg:block perspective-1000"
        >
          <motion.div 
            whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative z-10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-default overflow-hidden"
          >
            {/* Layer 1: Fondo del Recuadro (Base) */}
            <div className="absolute inset-0 z-0 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl pointer-events-none" />

            {/* Layer 2: Logo de producto de fondo (Sobre el recuadro, bajo las métricas) */}
            <div 
              className="absolute inset-0 z-10 opacity-[0.12] bg-center bg-no-repeat bg-contain scale-90 pointer-events-none"
              style={{ backgroundImage: 'url(https://disico.com.co/logo-swdisico.png)' }}
            />

            {/* Layer 3: Contenido Real (Sobre el logo de fondo) */}
            <div className="relative z-20 space-y-8">
              {/* Header del Dashboard */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex gap-2">
                  <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-red-500/50 cursor-pointer" />
                  <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-yellow-500/50 cursor-pointer" />
                  <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-green-500/50 cursor-pointer" />
                </div>
                <div className="text-[10px] text-brand-blue font-mono tracking-[0.2em] uppercase">SW DISICO AI ENGINE v2.5</div>
              </div>

              {/* Grid de Estadísticas con Hover individual */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05, borderColor: 'rgba(48, 103, 126, 0.6)', backgroundColor: 'rgba(48, 103, 126, 0.25)' }}
                  className="bg-brand-blue/15 p-4 rounded-xl border border-brand-blue/20 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="text-gray-400 text-[10px] uppercase tracking-wider mb-1 font-semibold">Precisión del Modelo</div>
                  <div className="text-2xl font-bold text-white tracking-tight">98.4%</div>
                  <div className="text-green-400 text-xs flex items-center gap-1 mt-1 font-medium">
                    <TrendingUp className="w-3 h-3" /> +2.1%
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05, borderColor: 'rgba(244, 132, 35, 0.6)', backgroundColor: 'rgba(244, 132, 35, 0.25)' }}
                  className="bg-brand-orange/15 p-4 rounded-xl border border-brand-orange/20 relative overflow-hidden transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="text-gray-400 text-[10px] uppercase tracking-wider mb-1 font-semibold">Recuperación Media</div>
                  <div className="text-2xl font-bold text-brand-orange tracking-tight">40-70%</div>
                  <div className="text-brand-orange/80 text-[10px] mt-1 font-bold">REDUCCIÓN NTL</div>
                  <motion.div 
                    className="absolute -bottom-4 -right-4 w-12 h-12 bg-brand-orange/30 rounded-full blur-xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
              </div>

              {/* AudioVisualizer Component */}
              <AudioVisualizer />

              {/* Footer del Dashboard */}
              <div className="mt-5 flex justify-between items-center text-[9px] text-gray-500 font-mono tracking-widest border-t border-white/5 pt-3">
                 <div className="flex items-center gap-1.5">
                   <div className="w-1 h-1 rounded-full bg-brand-blue" />
                   <span>ANÁLISIS DE CARGA</span>
                 </div>
                 <div className="flex items-center gap-1.5 text-brand-orange/80 font-bold">
                   <Zap className="w-2.5 h-2.5" />
                   <span>DETECCIÓN EN TIEMPO REAL</span>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Sombras y elementos decorativos flotantes */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -right-12 w-32 h-32 border border-brand-blue/20 rounded-full -z-10 blur-sm" 
          />
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-12 -left-12 w-24 h-24 border border-brand-orange/10 rounded-full -z-10 blur-sm" 
          />
          
          <div className="absolute -top-5 -right-5 w-full h-full border border-brand-blue/10 rounded-2xl -z-10 translate-x-2 translate-y-2 opacity-50" />
          <div className="absolute -top-10 -right-10 w-full h-full border border-brand-blue/5 rounded-2xl -z-20 translate-x-4 translate-y-4 opacity-30" />
        </motion.div>

      </div>
    </section>
  );
};