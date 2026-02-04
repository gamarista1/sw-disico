import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import { Button } from '../../shared/components/ui/Button';
import Lightning from '../../shared/components/ui/Lightning';

const AudioVisualizer: React.FC = () => {
  const bars = [40, 65, 45, 70, 85, 60, 75, 90, 65, 80];

  return (
    <div className="h-20 sm:h-32 flex items-end justify-between gap-1 px-0.5 sm:px-1 relative z-30">
      {bars.map((h, i) => (
        <motion.div 
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          whileHover={{ 
            scaleY: 1.2,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
          style={{ originY: 1 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.8 + (i * 0.08),
            ease: "easeOut" 
          }}
          className="w-full rounded-t-[1px] sm:rounded-t-[2px] cursor-pointer relative group/bar transition-all duration-300
                     bg-cyan-500/30 border border-cyan-400/40 shadow-[0_0_10px_rgba(34,211,238,0.1)]
                     hover:bg-gradient-to-t hover:from-orange-600 hover:via-orange-500 hover:to-amber-400 
                     hover:border-orange-400/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:z-40"
        >
          <div className="absolute -top-6 sm:top-[-1.75rem] left-1/2 -translate-x-1/2 px-1 py-0.5 rounded text-[7px] sm:text-[8px] text-white opacity-0 group-hover/bar:opacity-100 transition-all font-bold bg-brand-orange shadow-lg whitespace-nowrap z-50">
            {h}%
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const HeroHeader: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-24 pb-16 lg:py-0">
      
      {/* Capa de Rayos / Electricidad */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none mix-blend-screen">
        <Lightning hue={198} speed={0.4} intensity={0.6} size={0.5} xOffset={-0.5} />
      </div>
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none mix-blend-screen overflow-hidden scale-150 rotate-12 translate-x-1/4">
        <Lightning hue={20} speed={0.2} intensity={0.4} size={0.8} xOffset={0.2} />
      </div>

      {/* Grid y Gradientes de Fondo */}
      <div className="absolute inset-0 z-0 opacity-20 bg-grid-pattern bg-grid pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-blue/30 via-slate-950/80 to-slate-950 pointer-events-none" />
      
      {/* Brillos Flotantes */}
      <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-brand-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-brand-orange/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 z-10 relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Contenido de Texto */}
        <div className="space-y-6 lg:space-y-8 text-center lg:text-left order-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-brand-blue/10 border border-brand-blue/30 backdrop-blur-sm mx-auto lg:mx-0"
          >
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 h-4 text-brand-orange" />
            <span className="text-[9px] sm:text-xs lg:text-sm font-medium text-gray-300 uppercase tracking-widest">Tecnología de Grado Utility</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[clamp(2rem,7vw,3.75rem)] font-bold tracking-tight text-white leading-[1.1]"
          >
            Transforme sus datos en <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-blue">Energía Recuperada</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
          >
            Detección de pérdidas NTL con Inteligencia Artificial, sin inversión inicial en infraestructura y un <span className="text-white font-semibold">ROI &lt; 12 meses</span>.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
          >
            <Button variant="primary" glow className="group px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm">
              Solicitar Demo Personalizada
              <ArrowRight className="w-4 h-4 sm:w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm">
              Ver Análisis de Caso
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center gap-4 sm:gap-6 justify-center lg:justify-start pt-2 sm:pt-4 text-[9px] sm:text-xs lg:text-sm font-medium text-gray-500"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Algoritmo Activo
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-brand-orange" />
              Integration Ready (DLMS)
            </div>
          </motion.div>
        </div>

        {/* Vista Previa del Dashboard - Visible en móvil con ajustes */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative block order-2 lg:order-2 perspective-1000 mt-4 sm:mt-8 lg:mt-0 max-w-lg mx-auto w-full"
        >
          <motion.div 
            whileHover={{ y: -5, rotateX: 1, rotateY: -1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative z-10 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] cursor-default overflow-hidden border border-white/10"
          >
            {/* Capa 1: Fondo Base del Recuadro */}
            <div className="absolute inset-0 z-0 bg-slate-900/80 backdrop-blur-2xl pointer-events-none" />

            {/* Capa 2: Logo del Producto (Z-10) */}
            <div 
              className="absolute inset-0 z-10 opacity-30 sm:opacity-45 bg-center bg-no-repeat bg-contain scale-75 sm:scale-90 pointer-events-none"
              style={{ backgroundImage: 'url(https://disico.com.co/logo-swdisico.png)' }}
            />

            {/* Capa 3: Contenido Real */}
            <div className="relative z-20 space-y-4 sm:space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2 sm:pb-4">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-[8px] sm:text-[10px] text-brand-blue font-mono tracking-[0.1em] sm:tracking-[0.2em] uppercase font-bold">AI ENGINE v2.5</div>
              </div>

              {/* Grid de Métricas */}
              <div className="grid grid-cols-2 gap-2 sm:gap-4 relative z-30">
                <motion.div 
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(48, 103, 126, 0.3)' }}
                  className="bg-brand-blue/20 p-2.5 sm:p-4 rounded-lg sm:rounded-xl border border-brand-blue/30 backdrop-blur-md transition-all duration-300"
                >
                  <div className="text-gray-400 text-[7px] sm:text-[9px] lg:text-[10px] uppercase tracking-wider mb-0.5 sm:mb-1 font-bold">Precisión</div>
                  <div className="text-lg sm:text-2xl font-black text-white tracking-tight">98.4%</div>
                  <div className="text-green-400 text-[8px] sm:text-xs flex items-center gap-1 mt-0.5 sm:mt-1 font-bold">
                    <TrendingUp className="w-2.5 h-2.5 sm:w-3 h-3" /> +2.1%
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(244, 132, 35, 0.3)' }}
                  className="bg-brand-orange/20 p-2.5 sm:p-4 rounded-lg sm:rounded-xl border border-brand-orange/30 backdrop-blur-md transition-all duration-300 relative overflow-hidden"
                >
                  <div className="text-gray-400 text-[7px] sm:text-[9px] lg:text-[10px] uppercase tracking-wider mb-0.5 sm:mb-1 font-bold">Recuperación</div>
                  <div className="text-lg sm:text-2xl font-black text-brand-orange tracking-tight">40-70%</div>
                  <div className="text-brand-orange/80 text-[7px] sm:text-[9px] lg:text-[10px] mt-0.5 sm:mt-1 font-black uppercase">REDUCCIÓN NTL</div>
                  <motion.div 
                    className="absolute -bottom-4 -right-4 w-10 sm:w-12 h-10 sm:h-12 bg-brand-orange/30 rounded-full blur-xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </motion.div>
              </div>

              {/* Visualizador de Barras */}
              <AudioVisualizer />

              {/* Footer */}
              <div className="mt-2 sm:mt-5 flex justify-between items-center text-[7px] sm:text-[9px] text-gray-500 font-mono tracking-widest border-t border-white/5 pt-2 sm:pt-3">
                 <div className="flex items-center gap-1 sm:gap-1.5">
                   <div className="w-1 h-1 rounded-full bg-brand-blue" />
                   <span className="hidden sm:inline">ANÁLISIS DE CARGA</span>
                   <span className="sm:hidden">CARGA</span>
                 </div>
                 <div className="flex items-center gap-1 sm:gap-1.5 text-brand-orange font-black">
                   <Zap className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                   <span className="hidden sm:inline">DETECCIÓN REAL TIME</span>
                   <span className="sm:hidden">REAL TIME</span>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Sombras y Decoración */}
          <div className="absolute -top-5 -right-5 w-full h-full border border-brand-blue/10 rounded-xl sm:rounded-2xl -z-10 translate-x-1 translate-y-1 opacity-40" />
          
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -bottom-10 sm:-bottom-20 -left-10 sm:-left-20 w-40 sm:w-64 h-40 sm:h-64 bg-brand-blue/10 rounded-full blur-[60px] sm:blur-[100px] -z-10" 
          />
        </motion.div>

      </div>
    </section>
  );
};