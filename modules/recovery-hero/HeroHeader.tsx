import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import { Button } from '../../shared/components/ui/Button';

export const HeroHeader: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Fondo con Grid y Gradiente */}
      <div className="absolute inset-0 z-0 opacity-20 bg-grid-pattern bg-grid pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-blue/20 via-slate-950 to-slate-950 pointer-events-none" />
      
      {/* Efectos de Brillo */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 z-10 relative grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Contenido de Texto */}
        <div className="space-y-8 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/30 backdrop-blur-sm"
          >
            <ShieldCheck className="w-4 h-4 text-brand-orange" />
            <span className="text-sm font-medium text-gray-300">Tecnología de Grado Utility</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight"
          >
            Transforme sus datos en <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-blue">Energía Recuperada</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
          >
            Detección de pérdidas NTL con Inteligencia Artificial, sin inversión inicial en infraestructura y un <span className="text-white font-semibold">ROI &lt; 12 meses</span>.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button variant="primary" glow className="group">
              Solicitar Demo Personalizada
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline">
              Ver Análisis de Caso
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center gap-8 justify-center lg:justify-start pt-4 text-gray-500 text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Algoritmo Activo
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Integration Ready (DLMS)
            </div>
          </motion.div>
        </div>

        {/* Visualización del Dashboard (Simulación) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 bg-slate-900/40 backdrop-blur-md border border-brand-blue/20 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="text-xs text-brand-blue font-mono tracking-wider uppercase">SW DISICO AI ENGINE</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-brand-blue/10 p-4 rounded-xl border border-brand-blue/20">
                <div className="text-gray-400 text-xs mb-1">Precisión</div>
                <div className="text-2xl font-bold text-white">98.4%</div>
                <div className="text-green-400 text-xs flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> +2.1%
                </div>
              </div>
              <div className="bg-brand-orange/10 p-4 rounded-xl border border-brand-orange/20 relative overflow-hidden">
                <div className="text-gray-400 text-xs mb-1">Recuperación</div>
                <div className="text-2xl font-bold text-brand-orange">40-70%</div>
                <div className="text-brand-orange/80 text-xs mt-1 font-semibold">REDUCCIÓN NTL</div>
              </div>
            </div>

            <div className="h-32 flex items-end justify-between gap-1 px-2">
              {[40, 65, 45, 70, 85, 60, 75, 90, 65, 80].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.5, delay: 1 + (i * 0.1) }}
                  className="w-full bg-gradient-to-t from-brand-blue/50 to-brand-blue rounded-t-sm opacity-80"
                />
              ))}
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-full h-full border border-brand-blue/10 rounded-2xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};