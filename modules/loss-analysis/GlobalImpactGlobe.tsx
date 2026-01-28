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

const BRAND_ORANGE_ACTIVE = "#D24E1A";

export const GlobalImpactGlobe: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState<[number, number, number]>([-75, -5, 0]);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeCountry = GLOBAL_DATASET[currentIndex];

  useEffect(() => {
    const [lon, lat] = activeCountry.coordinates;
    setRotation([-lon, -lat, 0]);
  }, [currentIndex]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % GLOBAL_DATASET.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + GLOBAL_DATASET.length) % GLOBAL_DATASET.length);

  const globeScale = windowWidth < 640 ? 280 : windowWidth < 1024 ? 320 : 300;

  return (
    <div className="flex flex-col lg:flex-row h-full w-full bg-slate-900 border border-white/5 overflow-hidden min-h-[500px]">
      
      {/* PANEL IZQUIERDO: GLOBO + MINI CARDS - 50% MOBILE */}
      <div className="relative h-[50%] lg:h-full lg:flex-[1.2] bg-slate-950 overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col">
        {/* Glow atmosférico */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-brand-blue/5 blur-[60px] sm:blur-[100px]" />
        </div>

        {/* Cámara Indicator */}
        <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-2xl border border-white/10 shadow-lg"
          >
            <Globe2 className="w-3 h-3 sm:w-4 h-4 text-brand-blue" />
            <div className="flex flex-col">
               <span className="text-[7px] sm:text-[10px] font-black text-white uppercase tracking-widest">Enfoque</span>
               <span className="text-[6px] sm:text-[9px] text-brand-blue font-bold uppercase">Georeferenciado</span>
            </div>
          </motion.div>
        </div>

        {/* Contenedor del Mapa */}
        <div className="flex-1 relative">
          <ComposableMap 
            projection="geoOrthographic"
            projectionConfig={{ scale: globeScale, rotate: rotation }}
            className="w-full h-full outline-none relative z-10"
          >
            <Sphere id="rsm-sphere" stroke="#30677E20" strokeWidth={0.5} fill="#030712" />
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
                      fill={isActive ? BRAND_ORANGE_ACTIVE : (match ? colorScale(match.loss) : "#111827")}
                      stroke={isActive ? "#ffffff" : "#030712"}
                      strokeWidth={isActive ? 1.5 : 0.2}
                      style={{
                        default: { outline: 'none', transition: 'all 600ms cubic-bezier(0.23, 1, 0.32, 1)' },
                        hover: { 
                          fill: isActive ? BRAND_ORANGE_ACTIVE : (match ? "#4a8ca8" : "#111827"),
                          outline: 'none', 
                          cursor: match ? 'pointer' : 'default' 
                        },
                        pressed: { outline: 'none' }
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

            {GLOBAL_DATASET.map((data, idx) => {
              const isActive = idx === currentIndex;
              return (
                <Marker key={data.id} coordinates={data.coordinates}>
                  {isActive && (
                    <motion.circle
                      r={windowWidth < 640 ? 10 : 12}
                      fill="none"
                      stroke={colorScale(data.loss)}
                      strokeWidth={1.5}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: [0, 2], opacity: [1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <circle
                    r={isActive ? (windowWidth < 640 ? 4 : 5) : 2.5}
                    fill={isActive ? "#ffffff" : colorScale(data.loss)}
                    stroke="#ffffff"
                    strokeWidth={isActive ? 1.5 : 0}
                    className="transition-all duration-500"
                  />
                </Marker>
              );
            })}
          </ComposableMap>

          {/* Nombre del País Flotante - Ajustado */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20">
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeCountry.id}
                 initial={{ opacity: 0, y: 5 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -5 }}
                 className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-white/10 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl shadow-xl"
               >
                  <img src={activeCountry.flag} className="w-6 h-4 sm:w-8 sm:h-5 rounded shadow object-cover" />
                  <span className="text-xs sm:text-base font-black text-white tracking-tighter uppercase">{activeCountry.name}</span>
               </motion.div>
             </AnimatePresence>
          </div>
        </div>

        {/* MINI CARDS DE DATOS - Debajo del Globo */}
        <div className="px-3 sm:px-6 pb-4 sm:pb-6 relative z-30">
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <motion.div 
              key={`loss-${activeCountry.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-2 sm:p-3 rounded-xl sm:rounded-2xl"
            >
              <span className="text-[7px] sm:text-[9px] text-slate-500 font-bold uppercase mb-0.5 sm:mb-1 block">Pérdidas NTL</span>
              <div className="text-sm sm:text-xl font-mono font-black text-white leading-none">
                {activeCountry.loss}<span className="text-[10px] sm:text-xs text-slate-500 ml-0.5">%</span>
              </div>
            </motion.div>
            <motion.div 
              key={`pot-${activeCountry.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 backdrop-blur-md border border-brand-orange/10 p-2 sm:p-3 rounded-xl sm:rounded-2xl"
            >
              <span className="text-[7px] sm:text-[9px] text-brand-orange font-bold uppercase mb-0.5 sm:mb-1 block">Recuperable</span>
              <div className="text-sm sm:text-xl font-mono font-black text-white leading-none flex items-baseline gap-0.5">
                <span className="text-brand-orange text-xs">~</span>{activeCountry.potential}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* PANEL DERECHO: DETALLES + NAV - 50% MOBILE */}
      <div className="flex-1 flex flex-col bg-slate-900 h-[50%] lg:h-full lg:w-[450px] shrink-0">
        
        {/* Lista Horizontal de Selección */}
        <div className="flex items-center gap-1.5 p-2 sm:p-4 bg-slate-950/50 border-b border-white/5 overflow-x-auto no-scrollbar scroll-smooth">
          {GLOBAL_DATASET.map((data, idx) => (
            <button
              key={data.id}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-[8px] sm:text-[10px] font-bold uppercase tracking-widest transition-all ${
                idx === currentIndex 
                  ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' 
                  : 'bg-white/5 text-slate-500 hover:bg-white/10'
              }`}
            >
              {data.name}
            </button>
          ))}
        </div>

        {/* Contenido de Detalle */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCountry.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="flex items-start justify-between">
                <div>
                   <span className="text-[8px] sm:text-[9px] text-brand-blue font-black tracking-widest uppercase mb-0.5 sm:mb-1 block">Análisis Local</span>
                   <h2 className="text-lg sm:text-3xl font-black text-white tracking-tighter leading-none mb-2">{activeCountry.name}</h2>
                   <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[7px] sm:text-[9px] font-black uppercase tracking-wider ${
                      activeCountry.status === 'CRÍTICO' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                      activeCountry.status === 'OPORTUNIDAD' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20'
                    }`}>
                      {activeCountry.status === 'CRÍTICO' ? <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : 
                       activeCountry.status === 'OPORTUNIDAD' ? <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                      {activeCountry.status}
                    </div>
                </div>
              </div>

              {/* Insight Text */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                   <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-blue" />
                   <h4 className="text-[8px] sm:text-[10px] text-slate-500 font-black uppercase tracking-widest">Oportunidad Estratégica</h4>
                </div>
                <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-800/50 border border-white/5 relative overflow-hidden">
                  <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-medium italic">
                    "{activeCountry.insight}"
                  </p>
                  <MapPin className="absolute -bottom-2 -right-2 w-10 h-10 text-brand-blue/5 -rotate-12" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controles de Navegación Inferiores */}
        <div className="p-3 sm:p-6 bg-slate-950 border-t border-white/5">
           <div className="flex items-center justify-between">
              <div className="flex gap-2">
                 <button 
                   onClick={handlePrev}
                   className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-slate-800 hover:bg-brand-blue transition-all flex items-center justify-center"
                 >
                   <ChevronLeft className="w-4 h-4 sm:w-5 h-5 text-white" />
                 </button>
                 <button 
                   onClick={handleNext}
                   className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-slate-800 hover:bg-brand-blue transition-all flex items-center justify-center"
                 >
                   <ChevronRight className="w-4 h-4 sm:w-5 h-5 text-white" />
                 </button>
              </div>

              <div className="text-right">
                 <div className="text-[7px] sm:text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">País {currentIndex + 1} de {GLOBAL_DATASET.length}</div>
                 <div className="flex gap-1 justify-end">
                    {GLOBAL_DATASET.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-4 sm:w-6 bg-brand-orange' : 'w-1 sm:w-1 bg-slate-800'}`} 
                      />
                    ))}
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};