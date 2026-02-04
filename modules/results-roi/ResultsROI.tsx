import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingDown, 
  TrendingUp, 
  Users, 
  Banknote, 
  Timer, 
  X, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownRight,
  Info,
  LineChart as LineChartIcon,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell,
  LineChart,
  Line,
  ReferenceLine
} from 'recharts';

// --- MOCK DATA ---
const lossReductionData = [
  { month: 'Ene', sinIA: 20, conIA: 20 },
  { month: 'Feb', sinIA: 20.5, conIA: 19 },
  { month: 'Mar', sinIA: 19.8, conIA: 16 },
  { month: 'Abr', sinIA: 20.2, conIA: 13 },
  { month: 'May', sinIA: 20.1, conIA: 10 },
  { month: 'Jun', sinIA: 20.4, conIA: 7.5 },
];

const efficiencyData = [
  { name: 'Tradicional', value: 8, fill: '#64748b' },
  { name: 'SW DISICO', value: 60, fill: '#F48423' },
];

const roiData = [
  { month: 1, inversion: 10000, recuperacion: 0 },
  { month: 2, inversion: 12000, recuperacion: 1500 },
  { month: 3, inversion: 14000, recuperacion: 4000 },
  { month: 4, inversion: 16000, recuperacion: 8000 },
  { month: 5, inversion: 18000, recuperacion: 13000 },
  { month: 6, inversion: 20000, recuperacion: 19000 },
  { month: 7, inversion: 22000, recuperacion: 26000 }, // Break even point
  { month: 8, inversion: 24000, recuperacion: 35000 },
  { month: 9, inversion: 26000, recuperacion: 46000 },
  { month: 10, inversion: 28000, recuperacion: 58000 },
  { month: 11, inversion: 30000, recuperacion: 72000 },
  { month: 12, inversion: 32000, recuperacion: 88000 },
];

// --- COMPONENTS ---

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 border border-white/10 p-3 backdrop-blur-md rounded-lg shadow-xl">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs font-bold" style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const DetailModal = ({ isOpen, onClose, type, content }: any) => {
  if (!content) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
          />
          <motion.div
            layoutId={`kpi-${type}`}
            className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl z-10"
          >
            <div className="flex flex-col lg:flex-row h-full">
              {/* Sidebar Info */}
              <div className="w-full lg:w-1/3 p-8 border-b lg:border-b-0 lg:border-r border-white/5 bg-slate-950/40">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${content.accentBg}`}>
                  {React.createElement(content.icon, { className: `w-6 h-6 ${content.accentColor}` })}
                </div>
                <h3 className="text-2xl font-black text-white mb-2 leading-none uppercase tracking-tighter">{content.title}</h3>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-8">{content.subtitle}</p>
                <div className="space-y-4">
                  {content.insights.map((insight: string, i: number) => (
                    <div key={i} className="flex gap-3 items-start">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${content.accentColor}`} />
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart Area */}
              <div className="flex-1 p-8 min-h-[400px]">
                <div className="flex justify-between items-center mb-8">
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                     <Activity className="w-3 h-3" /> Visualización de Datos Certificados
                   </span>
                   <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                     <X className="w-5 h-5 text-gray-400 hover:text-white" />
                   </button>
                </div>

                <div className="w-full h-[300px]">
                  {type === 'loss' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={lossReductionData}>
                        <defs>
                          <linearGradient id="colorSinIA" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#64748b" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorConIA" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="month" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area name="Pérdidas Sin IA" type="monotone" dataKey="sinIA" stroke="#64748b" fillOpacity={1} fill="url(#colorSinIA)" />
                        <Area name="SW DISICO" type="monotone" dataKey="conIA" stroke="#10b981" fillOpacity={1} fill="url(#colorConIA)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}

                  {type === 'efficiency' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={efficiencyData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} width={100} />
                        <Tooltip cursor={{fill: 'rgba(255,255,255,0.02)'}} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '10px' }} />
                        <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={40}>
                          {efficiencyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}

                  {type === 'roi' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={roiData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="month" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} label={{ value: 'Meses', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#475569' }} />
                        <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '10px' }} />
                        <ReferenceLine x={7} stroke="#F48423" strokeDasharray="5 5" label={{ value: 'Break Even', position: 'top', fill: '#F48423', fontSize: 10, fontWeight: 'bold' }} />
                        <Line name="Costo Acumulado" type="monotone" dataKey="inversion" stroke="#475569" strokeWidth={2} dot={false} />
                        <Line name="Retorno Acumulado" type="monotone" dataKey="recuperacion" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}

                  {type === 'revenue' && (
                    <div className="overflow-hidden border border-white/5 rounded-2xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-white/5">
                            <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">Concepto</th>
                            <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">Escenario Base</th>
                            <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">Optimizado</th>
                            <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">Delta</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs">
                          <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="p-4 text-slate-300 font-bold">Energía Facturada</td>
                            <td className="p-4 text-slate-500 font-mono">$1.2M</td>
                            <td className="p-4 text-emerald-500 font-mono">$1.38M</td>
                            <td className="p-4 text-emerald-400 font-black">+15%</td>
                          </tr>
                          <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="p-4 text-slate-300 font-bold">Costo Inspecciones</td>
                            <td className="p-4 text-slate-500 font-mono">$240K</td>
                            <td className="p-4 text-emerald-500 font-mono">$120K</td>
                            <td className="p-4 text-emerald-400 font-black">-50%</td>
                          </tr>
                          <tr className="bg-emerald-500/5 transition-colors">
                            <td className="p-4 text-white font-black uppercase">Margen Operativo</td>
                            <td className="p-4 text-slate-500 font-mono">$960K</td>
                            <td className="p-4 text-emerald-400 font-mono font-black">$1.26M</td>
                            <td className="p-4">
                               <div className="flex items-center gap-1 text-emerald-500 font-black">
                                  <ArrowUpRight className="w-4 h-4" /> 31%
                               </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                   <Info className="w-4 h-4 text-emerald-500 shrink-0" />
                   <p className="text-[10px] text-emerald-500/80 font-medium leading-relaxed uppercase tracking-wider">
                     Cifras proyectadas basadas en despliegues reales de más de 100,000 medidores AMI. Los resultados pueden variar según el perfil de carga regional.
                   </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const ResultsROI: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const kpis = [
    {
      id: 'loss',
      title: "40-70%",
      label: "Reducción de Pérdidas",
      subLabel: "Efectividad Algorítmica",
      icon: TrendingDown,
      color: "text-brand-blue",
      accentColor: "text-brand-blue",
      accentBg: "bg-brand-blue/10",
      modalContent: {
        title: "Mitigación de NTL",
        subtitle: "Aplanamiento de la curva de pérdidas",
        icon: TrendingDown,
        accentColor: "text-brand-blue",
        accentBg: "bg-brand-blue/10",
        insights: [
          "Identificación de anomalías antes de que se vuelvan estructurales.",
          "Priorización de recuperación por volumen de energía detectada.",
          "Estabilización del flujo de ingresos en el primer trimestre."
        ]
      }
    },
    {
      id: 'efficiency',
      title: "-50%",
      label: "Gasto Operativo (OPEX)",
      subLabel: "Optimización de Inspecciones",
      icon: Users,
      color: "text-brand-orange",
      accentColor: "text-brand-orange",
      accentBg: "bg-brand-orange/10",
      modalContent: {
        title: "Eficiencia de Cuadrillas",
        subtitle: "Del 8% al 60% de efectividad",
        icon: Users,
        accentColor: "text-brand-orange",
        accentBg: "bg-brand-orange/10",
        insights: [
          "Reducción de combustible y horas hombre por visitas fallidas.",
          "Aumento de la seguridad de las cuadrillas mediante geolocalización precisa.",
          "Detección de manipulación de medidores sin apertura física necesaria."
        ]
      }
    },
    {
      id: 'revenue',
      title: "+15%",
      label: "Ingresos Brutos",
      subLabel: "Impacto en el Bottom Line",
      icon: Banknote,
      color: "text-emerald-500",
      accentColor: "text-emerald-500",
      accentBg: "bg-emerald-500/10",
      modalContent: {
        title: "Impacto en P&L",
        subtitle: "Cálculo de Recuperación de Caja",
        icon: Banknote,
        accentColor: "text-emerald-500",
        accentBg: "bg-emerald-500/10",
        insights: [
          "Conversión directa de energía recuperada en flujo de caja.",
          "Reducción de la cartera morosa mediante alertas de desconexión IA.",
          "Mejora del margen operativo neto superior al 30%."
        ]
      }
    },
    {
      id: 'roi',
      title: "< 12 m",
      label: "Retorno de Inversión",
      subLabel: "Break-even Garantizado",
      icon: Timer,
      color: "text-white",
      accentColor: "text-white",
      accentBg: "bg-white/10",
      modalContent: {
        title: "Cronograma de Valor",
        subtitle: "Timeline de Rentabilidad",
        icon: Timer,
        accentColor: "text-white",
        accentBg: "bg-white/10",
        insights: [
          "Punto de equilibrio alcanzado entre el mes 7 y 8.",
          "Modelo SaaS: Sin CAPEX inicial, la recuperación paga el servicio.",
          "Escalabilidad total desde el día 1 de integración."
        ]
      }
    }
  ];

  return (
    <section id="results" className="relative min-h-screen bg-slate-950 py-32 overflow-hidden flex flex-col items-center">
      <DetailModal 
        isOpen={!!activeModal} 
        onClose={() => setActiveModal(null)} 
        type={activeModal}
        content={activeModal ? kpis.find(k => k.id === activeModal)?.modalContent : null}
      />

      {/* Decorative Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-grid-pattern bg-grid [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-[9px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-8"
          >
            <LineChartIcon className="w-3 h-3" />
            Impacto Financiero Validado
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-none mb-8"
          >
            Recuperación de <span className="text-emerald-500">Capital</span> Superior al Costo
          </motion.h2>
          
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-slate-400 text-lg leading-relaxed italic"
          >
            "Diseñado para el CFO: SW DISICO no es un gasto, es un multiplicador de rentabilidad que se paga a sí mismo antes de un año."
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, idx) => (
            <motion.div
              key={kpi.id}
              layoutId={`kpi-${kpi.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setActiveModal(kpi.id)}
              className="group relative p-8 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] hover:border-emerald-500/40 transition-all cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className={`w-14 h-14 rounded-2xl ${kpi.accentBg} flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform`}>
                <kpi.icon className={`w-8 h-8 ${kpi.accentColor}`} />
              </div>

              <div className="space-y-1">
                 <h4 className={`text-4xl sm:text-5xl font-black ${kpi.color} tracking-tighter`}>{kpi.title}</h4>
                 <p className="text-white font-bold text-sm tracking-tight">{kpi.label}</p>
                 <p className="text-slate-500 font-mono text-[9px] uppercase tracking-widest">{kpi.subLabel}</p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ver Análisis ROI</span>
                <ChevronRight className={`w-4 h-4 ${kpi.accentColor}`} />
              </div>

              {/* Decorative scan effect */}
              <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent pointer-events-none -skew-x-12 opacity-0 group-hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>

        {/* Dynamic ROI Message */}
        <div className="mt-20 flex flex-col items-center">
           <div className="px-12 py-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-md max-w-2xl text-center">
              <p className="text-slate-400 text-sm leading-relaxed">
                <span className="text-emerald-500 font-black uppercase tracking-widest mr-2">Efecto Compuesto:</span>
                Por cada <span className="text-white font-bold">$1.00 USD</span> invertido en la suscripción de SW DISICO, nuestros clientes recuperan un promedio de <span className="text-emerald-500 font-black">$4.80 USD</span> en energía facturada y ahorro de OPEX durante los primeros 24 meses.
              </p>
           </div>
        </div>
      </div>
    </section>
  );
};