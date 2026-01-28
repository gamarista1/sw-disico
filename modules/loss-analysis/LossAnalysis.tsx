import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Globe, 
  Activity, 
  X, 
  Info, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Zap,
  Settings2,
  EyeOff,
  Banknote,
  Users,
  CheckCircle2
} from 'lucide-react';
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
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
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
          className={`relative w-[95%] sm:w-full ${fullWidth ? 'max-w-6xl' : 'max-w-lg'} h-auto max-h-[90vh] bg-slate-900 border border-brand-blue/30 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col`}
        >
          <div className="flex justify-between items-center p-4 sm:p-6 border-b border-white/5 bg-slate-900/50 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                <Globe className="w-4 h-4 sm:w-5 h-5 text-brand-blue" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">{title}</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors group">
              <X className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </button>
          </div>
          <div className="text-slate-300 flex-1 overflow-y-auto custom-scrollbar">
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

const NTL_CAUSES = [
  {
    title: "Fallas y Obsolescencia",
    subtitle: "Infraestructura",
    icon: Settings2,
    colorClass: "text-amber-400",
    bgClass: "bg-amber-400/10",
    description: "Deficiencias técnicas sin intención fraudulenta.",
    points: [
      "Averías y equipos rotos (medidores detenidos).",
      "Obsolescencia tecnológica (pérdida de precisión).",
      "Equipos mal configurados por el operador."
    ]
  },
  {
    title: "Consumo No Medido",
    subtitle: "Ausencia",
    icon: EyeOff,
    colorClass: "text-slate-400",
    bgClass: "bg-slate-400/10",
    description: "Energía entregada sin proceso de medición individual.",
    points: [
      "Alumbrado público y semáforos estimados.",
      "Asentamientos informales (conexiones directas).",
      "Suministros temporales (ferias, eventos)."
    ]
  },
  {
    title: "Pérdidas Accidentales",
    subtitle: "Operativas",
    icon: AlertTriangle,
    colorClass: "text-yellow-500",
    bgClass: "bg-yellow-500/10",
    description: "Errores involuntarios en la instalación física.",
    points: [
      "Errores de conexión (fases invertidas).",
      "Fallos en elementos del circuito.",
      "Errores operativos, no fraudulentos."
    ]
  },
  {
    title: "Naturaleza Financiera",
    subtitle: "Cartera",
    icon: Banknote,
    colorClass: "text-red-400",
    bgClass: "bg-red-400/10",
    description: "Energía facturada pero no cobrada.",
    points: [
      "Impago y Morosidad crítica.",
      "Cultura del no pago arraigada.",
      "Crisis económicas (inflación/desempleo)."
    ]
  },
  {
    title: "Socioeconómica",
    subtitle: "Causa Raíz",
    icon: Users,
    colorClass: "text-blue-400",
    bgClass: "bg-blue-400/10",
    description: "Factores estructurales y políticos.",
    points: [
      "Percepción de energía como derecho no mercantil.",
      "Clientelismo político (permisividad electoral).",
      "Baja calidad del servicio (desincentivo de pago)."
    ]
  }
];

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={(outerRadius || 0) + 6}
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
  const [currentCause, setCurrentCause] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  const sliderOffset = useMemo(() => (windowWidth < 1024 ? 130 : 160), [windowWidth]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const nextCause = () => setCurrentCause((prev) => (prev + 1) % NTL_CAUSES.length);
  const prevCause = () => setCurrentCause((prev) => (prev - 1 + NTL_CAUSES.length) % NTL_CAUSES.length);

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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">
          
          <div className="space-y-6 lg:space-y-8">
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
              className="text-3xl lg:text-5xl font-bold text-white leading-tight"
            >
              La fuga silenciosa de ingresos en el sector energético
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-base lg:text-lg leading-relaxed max-w-full break-words lg:max-w-xl"
            >
              Las pérdidas no técnicas (NTL) representan miles de millones en ingresos no facturados. SW DISICO utiliza IA para identificar estas anomalías con precisión milimétrica.
            </motion.p>

            <div className="flex flex-wrap gap-4 pt-4 lg:pt-6">
              <button 
                onClick={() => setActiveModal('causes')}
                className="px-6 py-2.5 rounded-lg border border-brand-blue/40 text-white font-medium hover:bg-brand-blue/10 transition-all flex items-center gap-2 group text-sm lg:text-base"
              >
                <Info className="w-4 h-4 text-brand-blue group-hover:scale-110 transition-transform" />
                Causas Principales
              </button>
              <button 
                onClick={() => setActiveModal('regional')}
                className="px-6 py-2.5 rounded-lg border border-brand-orange/40 text-white font-medium hover:bg-brand-orange/10 transition-all flex items-center gap-2 group text-sm lg:text-base"
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
            className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 lg:p-8 shadow-2xl relative lg:self-center h-fit w-full max-w-2xl mx-auto"
          >
            <div className="flex flex-col items-center">
              
              <div className="w-full flex justify-center items-center h-48 lg:h-52 relative mb-4 lg:mb-6">
                <PieChart width={windowWidth < 640 ? 240 : 280} height={windowWidth < 640 ? 200 : 240}>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={windowWidth < 640 ? 55 : 65}
                    outerRadius={windowWidth < 640 ? 75 : 85}
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
                            <tspan x={cx} dy="-0.2em" className="fill-white text-2xl lg:text-3xl font-bold tracking-tighter">
                              {percentage.toFixed(1)}%
                            </tspan>
                            <tspan x={cx} dy="1.5em" className="fill-slate-500 text-[9px] lg:text-[10px] uppercase tracking-[0.2em] font-bold">
                              Pérdidas NTL
                            </tspan>
                          </text>
                        );
                      }}
                    />
                  </Pie>
                </PieChart>
              </div>

              <div className="w-full relative pb-4 lg:pb-6" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
                <div className="flex items-center justify-center gap-2 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">
                  <MapPin className="w-3 h-3 text-brand-orange" />
                  <span>Referencia Regional Comparativa</span>
                </div>
                
                <div className="absolute left-0 right-0 top-[45%] -translate-y-1/2 flex justify-between px-0 z-30 pointer-events-none">
                  <button 
                    onClick={prevRegion}
                    className="p-2 lg:p-2.5 rounded-full bg-slate-800/80 border border-white/10 hover:bg-brand-blue hover:border-white/20 transition-all pointer-events-auto shadow-lg"
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>
                  <button 
                    onClick={nextRegion}
                    className="p-2 lg:p-2.5 rounded-full bg-slate-800/80 border border-white/10 hover:bg-brand-blue hover:border-white/20 transition-all pointer-events-auto shadow-lg"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>

                <div className="relative h-40 lg:h-36 flex items-center justify-center overflow-visible w-full">
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
                            x: adjustedDistance * sliderOffset,
                            scale: isActive ? 1.25 : 0.8,
                            opacity: isActive ? 1 : isVisible ? 0.3 : 0,
                            zIndex: isActive ? 20 : 10,
                          }}
                          transition={{ type: "spring", stiffness: 200, damping: 25 }}
                          className="absolute cursor-pointer"
                          onClick={() => setCurrentIndex(idx)}
                        >
                          <div className={`flex flex-col items-center p-4 lg:p-4 rounded-2xl border transition-all duration-500 min-w-[120px] lg:min-w-[140px] ${
                            isActive 
                              ? 'bg-brand-blue/30 border-brand-blue/80 shadow-[0_20px_40px_rgba(48,103,126,0.3)] backdrop-blur-md' 
                              : 'bg-white/5 border-white/5'
                          }`}>
                            <div className="relative w-10 h-7 lg:w-12 lg:h-8 mb-2 lg:mb-2 overflow-hidden rounded shadow-md border border-white/10">
                              <img src={region.flag} alt={region.name} className="w-full h-full object-cover" />
                            </div>
                            <span className={`text-[10px] lg:text-[11px] font-bold uppercase tracking-wider mb-1 ${isActive ? 'text-white' : 'text-slate-500'}`}>
                              {region.name}
                            </span>
                            <span className={`text-[8px] lg:text-[9px] font-mono font-bold ${isActive ? 'text-brand-orange' : 'text-slate-600'}`}>
                              {region.label}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="flex justify-center gap-1.5 mt-4">
                  {REGIONS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? 'w-6 lg:w-8 bg-brand-orange' : 'w-1.5 lg:w-2 bg-slate-800 hover:bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-center mt-2 space-y-1">
                <span className="text-slate-500 text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em]">Impacto Económico Estimado</span>
                <motion.div 
                  key={percentage}
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-xl lg:text-2xl font-mono font-bold text-[#EF4444] drop-shadow-[0_0_12px_rgba(239,68,68,0.2)]"
                >
                  {estimatedLoss} <span className="text-[10px] lg:text-xs font-sans font-bold text-slate-500">USD/año</span>
                </motion.div>
              </div>

              <p className="text-[8px] lg:text-[9px] text-slate-600 italic leading-relaxed pt-6 lg:pt-6 font-medium max-w-[280px] lg:max-w-[320px] text-center">
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
        <div className="relative p-6 min-h-[400px] sm:min-h-[350px] flex flex-col justify-between overflow-hidden">
          {/* Slider Content */}
          <div className="relative flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCause}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full h-full flex flex-col gap-6"
              >
                {/* Header: Icon + Info */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className={`w-14 h-14 rounded-xl ${NTL_CAUSES[currentCause].bgClass} flex items-center justify-center shrink-0 shadow-lg`}>
                    {React.createElement(NTL_CAUSES[currentCause].icon, { 
                      className: `w-8 h-8 ${NTL_CAUSES[currentCause].colorClass}` 
                    })}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-0.5">
                      {NTL_CAUSES[currentCause].subtitle}
                    </span>
                    <h4 className="text-xl font-bold text-white leading-tight">
                      {NTL_CAUSES[currentCause].title}
                    </h4>
                    <p className="text-sm text-slate-400 mt-1 italic">
                      {NTL_CAUSES[currentCause].description}
                    </p>
                  </div>
                </div>

                {/* Body: Points */}
                <div className="flex-1 space-y-3 px-2">
                  <h5 className="text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Zap className="w-3 h-3" /> Puntos Clave
                  </h5>
                  {NTL_CAUSES[currentCause].points.map((point, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + (i * 0.1) }}
                      className="flex gap-3 items-center group"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 group-hover:scale-125 transition-transform" />
                      <p className="text-sm text-slate-300 font-medium">{point}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex gap-2">
              <button 
                onClick={prevCause}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-brand-blue transition-all flex items-center justify-center group"
              >
                <ChevronLeft className="w-5 h-5 text-white group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button 
                onClick={nextCause}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-brand-blue transition-all flex items-center justify-center group"
              >
                <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1.5 block">
                Causa {currentCause + 1} de {NTL_CAUSES.length}
              </span>
              <div className="flex gap-1.5 justify-end">
                {NTL_CAUSES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentCause(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === currentCause ? 'w-6 bg-brand-orange' : 'w-1.5 bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={activeModal === 'regional'} 
        onClose={() => setActiveModal(null)} 
        title="Impacto Global NTL"
        fullWidth
      >
        <GlobalImpactGlobe />
      </Modal>
    </section>
  );
};