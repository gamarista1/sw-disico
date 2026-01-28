import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ComposableMap, Geographies, Geography, Marker, Sphere, Graticule } from 'react-simple-maps';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  DollarSign, 
  Globe2, 
  Zap, 
  Info, 
  TrendingUp,
  MapPin
} from 'lucide-react';
import { scaleLinear } from 'd3-scale';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface CountryData {
  id: string;
  name: string;
  loss: number;
  status: 'CRÍTICO' | 'OPORTUNIDAD' | 'EFICIENTE';
  insight: string;
  potential: string;
  flag: string;
  coordinates: [number, number]; // [lon, lat]
}

const GLOBAL_DATASET: CountryData[] = [
  { id: "COL", name: "Colombia", loss: 15.1, status: "OPORTUNIDAD", insight: "Alta subnormalidad eléctrica en zonas costeras (Air-e/Afinia).", potential: "$150M", flag: "https://flagcdn.com/w80/co.png", coordinates: [-74.3, 4.57] },
  { id: "BRA", name: "Brasil", loss: 16.0, status: "OPORTUNIDAD", insight: "Mercado gigante. 40% de pérdidas en zonas de favelas.", potential: "$420M", flag: "https://flagcdn.com/w80/br.png", coordinates: [-51.92, -14.23] },
  { id: "IND", name: "India", loss: 70.0, status: "CRÍTICO", insight: "Volatilidad extrema. Estados como Arunachal Pradesh pierden >50%.", potential: "$240M", flag: "https://flagcdn.com/w80/in.png", coordinates: [78.96, 20.59] },
  { id: "HTI", name: "Haití", loss: 60.0, status: "CRÍTICO", insight: "Colapso de red. Prioridad: Detección masiva de fraude.", potential: "$12M", flag: "https://flagcdn.com/w80/ht.png", coordinates: [-72.28, 18.97] },
  { id: "VEN", name: "Venezuela", loss: 33.0, status: "CRÍTICO", insight: "Infraestructura deteriorada y falta de medición.", potential: "$180M", flag: "https://flagcdn.com/w80/ve.png", coordinates: [-66.58, 6.42] },
  { id: "ARG", name: "Argentina", loss: 17.0, status: "OPORTUNIDAD", insight: "Desafíos tarifarios e inversión en red.", potential: "$110M", flag: "https://flagcdn.com/w80/ar.png", coordinates: [-63.61, -38.41] },
  { id: "PER", name: "Perú", loss: 10.0, status: "EFICIENTE", insight: "Caso de éxito tras reforma regulatoria.", potential: "$45M", flag: "https://flagcdn.com/w80/pe.png", coordinates: [-75.01, -9.19] },
  { id: "CHL", name: "Chile", loss: 5.0, status: "EFICIENTE", insight: "Líder regional. Benchmark de eficiencia.", potential: "$60M", flag: "https://flagcdn.com/w80/cl.png", coordinates: [-71.54, -35.67] }
];

const colorScale = scaleLinear<string>()
  .domain([0, 10, 20, 60])
  .range(["#30677E", "#30677E", "#F48423", "#EF4444"]);

export const GlobalImpactGlobe: React.FC = () => {
  // Sync Engine State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState<[number, number, number]>([-75, -5, 0]);
  const [isRotating, setIsRotating] = useState(false);

  const activeCountry = GLOBAL_DATASET[currentIndex];

  // Logic to move the globe smoothly to coordinates
  useEffect(() => {
    const [lon, lat] = activeCountry.coordinates;
    setRotation([-lon, -lat, 0]);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % GLOBAL_DATASET.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + GLOBAL_DATASET.length) % GLOBAL_DATASET.length);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[85vh] lg:h-[700px] w-full bg-slate-900 border border-white/5 overflow-hidden">
      
      {/* PANEL IZQUIERDO: EL GLOBO (CAMARA VIRTUAL) */}
      <div className="relative flex-[1.2] bg-slate-950 overflow-hidden border-r border-white/5">
        {/* Glow atmosférico */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-blue/5 blur-[120px]" />
        </div>

        {/* Indicador de Proyección */}
        <div className="absolute top-6 left-6 z-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10"
          >
            <Globe2 className="w-4 h-4 text-brand-blue animate-spin-slow" />
            <div className="flex flex-col">
               <span className="text-[10px] font-black text-white uppercase tracking-widest">Cámara Virtual Orbitante</span>
               <span className="text-[9px] text-brand-blue font-bold uppercase">Proyección Ortográfica</span>
            </div>
          </motion.div>
        </div>

        <ComposableMap 
          projection="geoOrthographic"
          projectionConfig={{ scale: 320, rotate: rotation }}
          className="w-full h-full outline-none relative z-10"
        >
          <Sphere stroke="#30677E20" strokeWidth={1} fill="#030712" />
          <Graticule stroke="#30677E10" strokeWidth={0.5} />
          
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryId = geo.id || geo.properties.iso_a3;
                const match = GLOBAL_DATASET.find(d => d.id === countryId);
                const isActive = match?.id === activeCountry.id;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={match ? colorScale(match.loss) : "#111827"}
                    stroke={isActive ? "#ffffff" : "#030712"}
                    strokeWidth={isActive ? 1.5 : 0.2}
                    style={{
                      default: { outline: 'none', transition: 'all 800ms cubic-bezier(0.23, 1, 0.32, 1)' },
                      hover: { outline: 'none', cursor: match ? 'pointer' : 'default' },
                    }}
                    onClick={() => {
                      if (match) {
                        const index = GLOBAL_DATASET.findIndex(d => d.id === countryId);
                        setCurrentIndex(index);
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Marcadores con Ripple Effect para el activo */}
          {GLOBAL_DATASET.map((data, idx) => {
            const isActive = idx === currentIndex;
            return (
              <Marker key={data.id} coordinates={data.coordinates}>
                {isActive && (
                  <motion.circle
                    r={15}
                    fill="none"
                    stroke={colorScale(data.loss)}
                    strokeWidth={2}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: [0, 2], opacity: [1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <circle
                  r={isActive ? 6 : 3}
                  fill={isActive ? "#ffffff" : colorScale(data.loss)}
                  stroke="#ffffff"
                  strokeWidth={isActive ? 2 : 0}
                  className="transition-all duration-500"
                />
              </Marker>
            );
          })}
        </ComposableMap>

        {/* Etiqueta Flotante sobre el globo (Nombre del país actual) */}
        <div className="absolute bottom-10 left-10 z-20">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeCountry.id}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-2xl"
             >
                <img src={activeCountry.flag} className="w-10 h-7 rounded shadow-lg object-cover" />
                <span className="text-xl font-black text-white tracking-tighter uppercase">{activeCountry.name}</span>
             </motion.div>
           </AnimatePresence>
        </div>
      </div>

      {/* PANEL DERECHO: LISTA + DETALLE (THE DATA SYNC) */}
      <div className="w-full lg:w-[500px] flex flex-col bg-slate-900">
        
        {/* Superior: La "Tabla" / Lista de Países */}
        <div className="flex items-center gap-2 p-4 bg-slate-950/50 border-b border-white/5 overflow-x-auto no-scrollbar">
          {GLOBAL_DATASET.map((data, idx) => (
            <button
              key={data.id}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                idx === currentIndex 
                  ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' 
                  : 'bg-white/5 text-slate-500 hover:bg-white/10'
              }`}
            >
              {data.name}
            </button>
          ))}
        </div>

        {/* Centro: Detalle del País (Data Card) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCountry.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="space-y-8"
            >
              {/* Header Info */}
              <div className="flex items-start justify-between">
                <div>
                   <span className="text-[10px] text-brand-blue font-black tracking-[0.3em] uppercase mb-2 block">Diagnóstico Detallado</span>
                   <h2 className="text-4xl font-black text-white tracking-tighter leading-none mb-4">{activeCountry.name}</h2>
                   <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      activeCountry.status === 'CRÍTICO' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                      activeCountry.status === 'OPORTUNIDAD' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20'
                    }`}>
                      {activeCountry.status === 'CRÍTICO' ? <AlertCircle className="w-3.5 h-3.5" /> : 
                       activeCountry.status === 'OPORTUNIDAD' ? <TrendingDown className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                      {activeCountry.status}
                    </div>
                </div>
                <div className="relative">
                  <motion.img 
                    src={activeCountry.flag} 
                    className="w-20 h-14 rounded-2xl shadow-2xl border border-white/10 object-cover" 
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }} 
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -inset-1 bg-white/5 rounded-2xl -z-10" 
                  />
                </div>
              </div>

              {/* Grid de Impacto */}
              <div className="grid grid-cols-2 gap-5">
                 <div className="bg-white/5 border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
                    <span className="text-[10px] text-slate-500 font-black uppercase mb-3 block">Pérdidas Totales</span>
                    <div className="text-4xl font-mono font-black text-white leading-none">
                       {activeCountry.loss}<span className="text-lg text-slate-500 ml-1">%</span>
                    </div>
                    <TrendingUp className="absolute -bottom-4 -right-4 w-16 h-16 text-white/5 group-hover:scale-110 transition-transform" />
                 </div>
                 <div className="bg-brand-orange/10 border border-brand-orange/20 p-6 rounded-3xl relative overflow-hidden group">
                    <span className="text-[10px] text-brand-orange font-black uppercase mb-3 block">Impacto Recuperable</span>
                    <div className="text-3xl font-mono font-black text-white leading-none flex items-baseline gap-1">
                       <span className="text-brand-orange text-xl">~</span>{activeCountry.potential}
                    </div>
                    <span className="text-[9px] text-brand-orange/60 font-black mt-2 block">EST. USD / AÑO</span>
                    <DollarSign className="absolute -bottom-4 -right-4 w-16 h-16 text-brand-orange/5 group-hover:scale-110 transition-transform" />
                 </div>
              </div>

              {/* Insight Card */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                   <Info className="w-4 h-4 text-brand-blue" />
                   <h4 className="text-[11px] text-slate-500 font-black uppercase tracking-widest">Análisis de Oportunidad</h4>
                </div>
                <div className="p-7 rounded-3xl bg-slate-800/50 border border-white/5 relative overflow-hidden group">
                  <p className="text-lg text-slate-300 leading-relaxed font-medium italic">
                    "{activeCountry.insight}"
                  </p>
                  <MapPin className="absolute -bottom-4 -right-4 w-20 h-20 text-brand-blue/5 -rotate-12 group-hover:scale-125 transition-transform duration-1000" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Inferior: El "Slider" Control */}
        <div className="p-6 bg-slate-950 border-t border-white/5 flex items-center justify-between">
           <div className="flex gap-4">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-brand-blue transition-all flex items-center justify-center group"
              >
                <ChevronLeft className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-brand-blue transition-all flex items-center justify-center group"
              >
                <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </button>
           </div>

           <div className="text-right">
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Navegación Circular</div>
              <div className="flex gap-1.5 justify-end">
                 {GLOBAL_DATASET.map((_, i) => (
                   <div 
                     key={i} 
                     className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-brand-orange' : 'w-1.5 bg-slate-800'}`} 
                   />
                 ))}
              </div>
           </div>
        </div>

        {/* Call to Action Sticky Button */}
        <div className="px-6 pb-6">
           <button className="w-full py-5 bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-3 group">
              <Zap className="w-4 h-4 text-brand-orange animate-pulse" />
              Solicitar Auditoría para {activeCountry.name}
           </button>
        </div>

      </div>
    </div>
  );
};