import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  glow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  glow = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-brand-orange text-white hover:bg-[#d6731e]",
    secondary: "bg-brand-blue text-white hover:bg-[#255266]",
    outline: "border border-brand-blue text-brand-blue hover:bg-brand-blue/10"
  };

  const glowStyle = glow ? "shadow-[0_0_20px_rgba(244,132,35,0.5)] hover:shadow-[0_0_30px_rgba(244,132,35,0.7)]" : "";

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${glowStyle} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};