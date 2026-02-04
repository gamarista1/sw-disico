import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Rocket, 
  Calendar, 
  ShieldCheck, 
  Cloud, 
  Cpu, 
  X, 
  Send, 
  CheckCircle2, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { Button } from '../../shared/components/ui/Button';

const MagneticButton = ({ children, className = "", variant = "primary" as any, onClick }: any) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    setPosition({ x: (clientX - centerX) * 0.2, y: (clientY - centerY) * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className="relative"
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        <Button variant={variant} glow={variant === 'primary'} className={className} onClick={onClick}>
          {children}
        </Button>
      </motion.div>
    </div>
  );
};

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulación de envío a Supabase en el futuro
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl z-10"
          >
            <div className="p-8 sm:p-12">
              <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-500" />
              </button>

              {!submitted ? (
                <>
                  <div className="mb-8">
                    <h3 className="text-3xl font-black text-white tracking-tighter mb-2">Configure su Protocolo</h3>
                    <p className="text-slate-400 text-sm">Inicie la recuperación de activos con soporte experto.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nombre Completo</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="Ej. Ing. Juan Pérez" 
                        className="w-full bg-slate-950 border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-brand-blue outline-none transition-colors font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Corporativo</label>
                      <input 
                        required 
                        type="email" 
                        placeholder="jperez@utility.com" 
                        className="w-full bg-slate-950 border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-brand-blue outline-none transition-colors font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Empresa / Utility</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="Nombre de la Distribuidora" 
                        className="w-full bg-slate-950 border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-brand-blue outline-none transition-colors font-medium"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-5 bg-gradient-to-r from-brand-orange to-red-600 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-[0_10px_30px_rgba(244,132,35,0.3)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 mt-4"
                    >
                      Solicitar Acceso PoC
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                   <motion.div 
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-8"
                   >
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                   </motion.div>
                   <h3 className="text-2xl font-black text-white mb-2">Solicitud Enviada</h3>
                   <p className="text-slate-400">Un arquitecto de soluciones se pondrá en contacto en menos de 24h.</p>
                </div>
              )}
            </div>
            <div className="h-1.5 w-full bg-gradient-to-r from-brand-orange to-brand-blue" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const CallToAction: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="contact" className="relative min-h-[90vh] bg-slate-950 flex flex-col items-center justify-center overflow-hidden py-32">
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Aurora Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[80%] bg-brand-orange/20 rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 50, 0],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-brand-blue/20 rounded-full blur-[150px]" 
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-orange/30 bg-brand-orange/5 text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange mb-12"
          >
            <Zap className="w-3 h-3" />
            Ejecución Inmediata
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-8xl font-black text-white tracking-tighter leading-none mb-10"
          >
            Transforme sus Pérdidas en <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-white to-brand-blue">Capital Operativo</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl lg:text-2xl text-slate-400 mb-16 leading-relaxed font-medium max-w-2xl mx-auto"
          >
            La tecnología está lista. La infraestructura existe. Solo falta su decisión para detener la fuga de ingresos hoy mismo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <MagneticButton className="px-10 py-5 text-sm uppercase tracking-[0.2em] font-black" onClick={() => setIsModalOpen(true)}>
              Iniciar Prueba de Concepto (PoC)
              <Rocket className="w-5 h-5 ml-2" />
            </MagneticButton>

            <MagneticButton variant="outline" className="px-10 py-5 text-sm uppercase tracking-[0.2em] font-black" onClick={() => setIsModalOpen(true)}>
              Agendar Demo Técnica
              <Calendar className="w-5 h-5 ml-2" />
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-24 pt-12 border-t border-white/5 flex flex-wrap justify-center gap-8 sm:gap-16"
          >
            {[
              { icon: ShieldCheck, label: "ISO 27001", sub: "Security" },
              { icon: Cloud, label: "AWS Partner", sub: "Infrastructure" },
              { icon: Cpu, label: "DLMS Ready", sub: "Compatibility" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-default group">
                <item.icon className="w-6 h-6 text-white group-hover:text-brand-blue" />
                <div className="text-left">
                  <div className="text-xs font-black text-white uppercase tracking-wider leading-none">{item.label}</div>
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{item.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Simplified Footer */}
      <footer className="absolute bottom-10 left-0 right-0 z-20">
         <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em]">
            <div>© 2026 DISICO S.A. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-8">
               <a href="#" className="hover:text-white transition-colors">Privacidad</a>
               <a href="#" className="hover:text-white transition-colors">Términos</a>
               <a href="#" className="hover:text-white transition-colors">SLA</a>
            </div>
         </div>
      </footer>
    </section>
  );
};