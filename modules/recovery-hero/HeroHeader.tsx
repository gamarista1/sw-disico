import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import { Button } from '../../shared/components/ui/Button';
import Lightning from '../../shared/components/ui/Lightning';

const AudioVisualizer: React.FC = () => {
  const bars = [40, 65, 45, 70, 85, 60, 75, 90, 65, 80];

  return (
    <div className="h-32 flex items-end justify-between gap-1.5 px-1 relative z-30">
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
          className="w-full rounded-t-[2px] cursor-pointer relative group/bar transition-all duration-300
                     bg-cyan-500/30 border border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.2)]
                     hover:bg-gradient-to-t hover:from-orange-600 hover:via-orange-500 hover:to-amber-400 
                     hover:border-orange-400/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:z-40"
        >
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded text-[8px] text-white opacity-0 group-hover/bar:opacity-100 transition-all font-bold bg-brand-orange shadow-lg whitespace-nowrap z-50">
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
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 z-10 relative grid lg:grid-cols-2 gap-12 items-center pt-20 lg:pt-0">
        
        {/* Contenido de Texto */}
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

        {/* Vista Previa del Dashboard con capas de profundidad mejoradas */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative hidden lg:block perspective-1000"
        >
          <motion.div 
            whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative z-10 rounded-2xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)] cursor-default overflow-hidden border border-white/10"
          >
            {/* Capa 1: Fondo Base del Recuadro (Z-0) */}
            <div className="absolute inset-0 z-0 bg-slate-900/80 backdrop-blur-2xl pointer-events-none" />

            {/* Capa 2: Logo del Producto (Z-10) - Delante del fondo, detrás del contenido */}
            <div 
              className="absolute inset-0 z-10 opacity-[0.15] bg-center bg-no-repeat bg-contain scale-90 pointer-events-none mix-blend-overlay"
              style={{ backgroundImage: 'url(https://disico.com.co/logo-swdisico.png)' }}
            />

            {/* Capa 3: Contenido Real (Z-20) */}
            <div className="relative z-20 space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-[10px] text-brand-blue font-mono tracking-[0.2em] uppercase font-bold">SW DISICO AI ENGINE v2.5</div>
              </div>

              {/* Grid de Métricas */}
              <div className="grid grid-cols-2 gap-4 relative z-30">
                <motion.div 
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(48, 103, 126, 0.3)' }}
                  className="bg-brand-blue/20 p-4 rounded-xl border border-brand-blue/30 backdrop-blur-md transition-all duration-300"
                >
                  <div className="text-gray-400 text-[10px] uppercase tracking-wider mb-1 font-bold">Precisión del Modelo</div>
                  <div className="text-2xl font-black text-white tracking-tight">98.4%</div>
                  <div className="text-green-400 text-xs flex items-center gap-1 mt-1 font-bold">
                    <TrendingUp className="w-3 h-3" /> +2.1%
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(244, 132, 35, 0.3)' }}
                  className="bg-brand-orange/20 p-4 rounded-xl border border-brand-orange/30 backdrop-blur-md transition-all duration-300 relative overflow-hidden"
                >
                  <div className="text-gray-400 text-[10px] uppercase tracking-wider mb-1 font-bold">Recuperación Media</div>
                  <div className="text-2xl font-black text-brand-orange tracking-tight">40-70%</div>
                  <div className="text-brand-orange/80 text-[10px] mt-1 font-black">REDUCCIÓN NTL</div>
                  <motion.div 
                    className="absolute -bottom-4 -right-4 w-12 h-12 bg-brand-orange/30 rounded-full blur-xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </motion.div>
              </div>

              {/* Visualizador de Barras */}
              <AudioVisualizer />

              {/* Footer */}
              <div className="mt-5 flex justify-between items-center text-[9px] text-gray-500 font-mono tracking-widest border-t border-white/5 pt-3">
                 <div className="flex items-center gap-1.5">
                   <div className="w-1 h-1 rounded-full bg-brand-blue" />
                   <span>ANÁLISIS DE CARGA</span>
                 </div>
                 <div className="flex items-center gap-1.5 text-brand-orange font-black">
                   <Zap className="w-2.5 h-2.5" />
                   <span>DETECCIÓN EN TIEMPO REAL</span>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Sombras y Decoración Detrás del Recuadro Principal */}
          <div className="absolute -top-10 -right-10 w-full h-full border border-brand-blue/10 rounded-2xl -z-10 translate-x-2 translate-y-2 opacity-40" />
          <div className="absolute -top-20 -right-20 w-full h-full border border-brand-blue/5 rounded-2xl -z-20 translate-x-4 translate-y-4 opacity-20" />
          
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-blue/10 rounded-full blur-[100px] -z-10" 
          />
        </motion.div>

      </div>
    </section>
  );
};