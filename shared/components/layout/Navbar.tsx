import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

const navLinks = [
  { name: 'Problema', href: '#loss-analysis' },
  { name: 'Tecnología', href: '#tech-opportunity' },
  { name: 'Solución', href: '#solution' },
  { name: 'Proceso', href: '#process' },
  { name: 'Resultados', href: '#results' },
  { name: 'Ventajas', href: '#advantages' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-1 group">
          <span className="text-xl sm:text-2xl font-black tracking-tighter text-white">SW</span>
          <span className="text-xl sm:text-2xl font-black tracking-tighter text-brand-blue group-hover:text-brand-orange transition-colors">DISICO</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="relative text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand-orange transition-colors group"
            >
              {link.name}
              <motion.div 
                className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-orange"
                whileHover={{ width: '100%' }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <a href="#contact">
              <Button variant="primary" className="px-5 py-2.5 text-[10px] font-black uppercase tracking-widest">
                Agendar Demo
              </Button>
            </a>
          </div>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed inset-0 top-[60px] bg-slate-950 z-40 lg:hidden flex flex-col p-8"
          >
            <div className="flex flex-col gap-8 mt-12">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-black text-white hover:text-brand-orange transition-colors tracking-tighter"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            
            <div className="mt-auto pb-12">
              <a href="#contact" onClick={() => setIsOpen(false)}>
                <Button variant="primary" className="w-full py-5 text-sm font-black uppercase tracking-[0.2em]">
                  Agendar Demo Técnica
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
