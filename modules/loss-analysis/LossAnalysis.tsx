import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Globe, Activity, X, Info, MapPin, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, Label, Sector } from 'recharts';
import { GlobalImpactGlobe } from './GlobalImpactGlobe';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, fullWidth = false }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`relative w-full ${fullWidth ? 'max-w-6xl' : 'max-w-lg'} bg-slate-900 border border-brand-blue/30 rounded-3xl overflow-hidden shadow-2xl z-10`}
        >
          <div className="flex justify-between items-center p-6 border-b border-white/5 bg-slate-900/50 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors group">
              <X className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </button>
          </div>
          <div className="text-slate-300">
            {children}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const REGIONS = [
  { name: 'Turquía', flag: 'https://flagcdn.com/w320/tr.png', value: 73, label: '4% - 73%' },
  { name: 'India', flag: 'https://flagcdn.com/w320/in.png', value: 70, label: 'Hasta 70%' },
  { name: 'Brasil', flag: 'https://flagcdn.com/w320/br.png', value: 40, label: '3% - 40%' },
  { name: 'Ruanda', flag: 'https://flagcdn.com/w320/rw.png', value: 18, label: '18%' },
  { name: 'África', flag: 'https://flagcdn.com/w320/za.png', value: 18.5, label: '18% Avg' },
  { name: 'LatAm', flag: 'https://flagcdn.com/w320/ar.png', value: 12, label: '9% - 12%' },
];

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={(outerRadius || 0) + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={6}
      />
    </g>
  );
};

export const LossAnalysis: React.FC = () => {
  const [percentage, setPercentage] = useState(20.0);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const chartData = useMemo(() => [
    { name: 'Pérdidas', value: percentage, fill: '#EF4444' },
    { name: 'Operación', value: 100 - percentage, fill: '#30677E' },
  ], [percentage]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REGIONS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    setPercentage(REGIONS[currentIndex].value);
  }, [currentIndex]);

  const estimatedLoss = (percentage * 10000000).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const glowIntensity = Math.min((percentage - 10) / 60, 1);

  const nextRegion = () => setCurrentIndex((prev) => (prev + 1) % REGIONS.length);
  const prevRegion = () => setCurrentIndex((prev) => (prev - 1 + REGIONS.length) % REGIONS.length);

  return (
    <section id="loss-analysis" className="relative py-24 bg-slate-950 overflow-hidden transition-colors duration-500">
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{ 
          background: `radial-gradient(circle at 50% 50%, rgba(239, 68, 68, ${glowIntensity * 0.15}) 0%, transparent 70%)`,
          opacity: glowIntensity > 0 ? 1 : 0
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand-orange font-bold tracking-[0.2em] text-sm uppercase block"
            >
              EL DESAFÍO OPERATIVO
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold text-white leading-tight"
            >
              La fuga silenciosa de ingresos en el sector energético
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg leading-relaxed max-w-xl"
            >
              Las pérdidas no técnicas (NTL) representan miles de millones en ingresos no facturados. SW DISICO utiliza IA para identificar estas anomalías con precisión milimétrica.
            </motion.p>

            <div className="flex flex-wrap gap-4 pt-6">
              <button 
                onClick={() => setActiveModal('causes')}
                className="px-6 py-2.5 rounded-lg border border-brand-blue/40 text-white font-medium hover:bg-brand-blue/10 transition-all flex items-center gap-2 group"
              >
                <Info className="w-4 h-4 text-brand-blue group-hover:scale-110 transition-transform" />
                Causas Principales
              </button>
              <button 
                onClick={() => setActiveModal('regional')}
                className="px-6 py-2.5 rounded-lg border border-brand-orange/40 text-white font-medium hover:bg-brand-orange/10 transition-all flex items-center gap-2 group"
              >
                <Globe className="w-4 h-4 text-brand-orange group-hover:rotate-12 transition-transform" />
                Impacto Global
              </button>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl relative"
          >
            <div className="flex flex-col items-center">
              
              <div className="w-full flex justify-center items-center h-64 relative mb-6">
                <PieChart width={300} height={256}>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                    activeIndex={0}
                    activeShape={renderActiveShape}
                    startAngle={90}
                    endAngle={450}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    <Label
                      position="center"
                      content={({ viewBox }) => {
                        const { cx, cy } = viewBox as any;
                        return (
                          <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan x={cx} dy="-0.2em" className="fill-white text-3xl font-bold tracking-tighter">
                              {percentage.toFixed(1)}%
                            </tspan>
                            <tspan x={cx} dy="1.5em" className="fill-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                              Pérdidas NTL
                            </tspan>
                          </text>
                        );
                      }}
                    />
                  </Pie>
                </PieChart>
              </div>

              <div className="w-full relative pb-6" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
                <div className="flex items-center justify-center gap-2 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">
                  <MapPin className="w-3 h-3 text-brand-orange" />
                  <span>Referencia Regional Comparativa</span>
                </div>
                
                <div className="absolute left-0 right-0 top-[45%] -translate-y-1/2 flex justify-between px-0 z-30 pointer-events-none">
                  <button 
                    onClick={prevRegion}
                    className="p-3 rounded-full bg-slate-800/80 border border-white/10 hover:bg-brand-blue hover:border-white/20 transition-all pointer-events-auto shadow-lg"
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>
                  <button 
                    onClick={nextRegion}
                    className="p-3 rounded-full bg-slate-800/80 border border-white/10 hover:bg-brand-blue hover:border-white/20 transition-all pointer-events-auto shadow-lg"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>

                <div className="relative h-44 flex items-center justify-center overflow-visible w-full">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {REGIONS.map((region, idx) => {
                      const distance = idx - currentIndex;
                      let adjustedDistance = distance;
                      if (distance > REGIONS.length / 2) adjustedDistance -= REGIONS.length;
                      if (distance < -REGIONS.length / 2) adjustedDistance += REGIONS.length;
                      
                      const isActive = idx === currentIndex;
                      const isVisible = Math.abs(adjustedDistance) <= 1;

                      return (
                        <motion.div
                          key={region.name}
                          initial={false}
                          animate={{ 
                            x: adjustedDistance * 170,
                            scale: isActive ? 1.25 : 0.8,
                            opacity: isActive ? 1 : isVisible ? 0.3 : 0,
                            zIndex: isActive ? 20 : 10,
                          }}
                          transition={{ type: "spring", stiffness: 200, damping: 25 }}
                          className="absolute cursor-pointer"
                          onClick={() => setCurrentIndex(idx)}
                        >
                          <div className={`flex flex-col items-center p-5 rounded-2xl border transition-all duration-500 min-w-[145px] ${
                            isActive 
                              ? 'bg-brand-blue/30 border-brand-blue/80 shadow-[0_20px_40px_rgba(48,103,126,0.3)] backdrop-blur-md' 
                              : 'bg-white/5 border-white/5'
                          }`}>
                            <div className="relative w-14 h-9 mb-3 overflow-hidden rounded shadow-md border border-white/10">
                              <img src={region.flag} alt={region.name} className="w-full h-full object-cover" />
                            </div>
                            <span className={`text-[12px] font-bold uppercase tracking-wider mb-1 ${isActive ? 'text-white' : 'text-slate-500'}`}>
                              {region.name}
                            </span>
                            <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-brand-orange' : 'text-slate-600'}`}>
                              {region.label}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="flex justify-center gap-2 mt-4">
                  {REGIONS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? 'w-8 bg-brand-orange' : 'w-2 bg-slate-800 hover:bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-center mt-4 space-y-1">
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">Impacto Económico Estimado</span>
                <motion.div 
                  key={percentage}
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl lg:text-3xl font-mono font-bold text-[#EF4444] drop-shadow-[0_0_12px_rgba(239,68,68,0.2)]"
                >
                  {estimatedLoss} <span className="text-xs font-sans font-bold text-slate-500">USD/año</span>
                </motion.div>
              </div>

              <p className="text-[9px] text-slate-600 italic leading-relaxed pt-10 font-medium max-w-[320px] text-center">
                * Estimación técnica basada en benchmark de mercado y volumen de inyección regional promediado.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Modal 
        isOpen={activeModal === 'causes'} 
        onClose={() => setActiveModal(null)} 
        title="Naturaleza de las Pérdidas NTL"
      >
        <div className="p-6">
          <ul className="space-y-4">
            <li className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
               <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center shrink-0">
                 <AlertTriangle className="w-5 h-5 text-brand-orange" />
               </div>
               <div>
                 <h4 className="text-white font-bold text-sm">Manipulación Directa</h4>
                 <p className="text-xs text-slate-400 mt-1">Intervención física en sistemas de medición para sub-registrar el consumo real.</p>
               </div>
            </li>
            <li className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
               <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0">
                 <Zap className="w-5 h-5 text-brand-blue" />
               </div>
               <div>
                 <h4 className="text-white font-bold text-sm">Derivaciones Ilegales</h4>
                 <p className="text-xs text-slate-400 mt-1">Conexiones a la red de baja tensión que evitan completamente los puntos de medida.</p>
               </div>
            </li>
            <li className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
               <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                 <Activity className="w-5 h-5 text-slate-400" />
               </div>
               <div>
                 <h4 className="text-white font-bold text-sm">Ineficiencias Administrativas</h4>
                 <p className="text-xs text-slate-400 mt-1">Errores en el censo de carga o fallos en los procesos de facturación cíclica.</p>
               </div>
            </li>
          </ul>
        </div>
      </Modal>

      <Modal 
        isOpen={activeModal === 'regional'} 
        onClose={() => setActiveModal(null)} 
        title="Diagnóstico Planetario Interactivo"
        fullWidth
      >
        <GlobalImpactGlobe />
      </Modal>
    </section>
  );
};