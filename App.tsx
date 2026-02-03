import React from 'react';
import { HeroHeader } from './modules/recovery-hero/HeroHeader';
import { LossAnalysis } from './modules/loss-analysis/LossAnalysis';
import { TechOpportunity } from './modules/tech-opportunity/TechOpportunity';

function App() {
  return (
    <div className="antialiased text-white bg-slate-950 min-h-screen">
      <HeroHeader />
      
      <LossAnalysis />

      <TechOpportunity />
      
      {/* Marcadores para secciones futuras (Screaming Architecture) */}
      <div id="ia-engine"></div>
      <div id="roi-calculator"></div>
      <div id="lead-capture"></div>
    </div>
  );
}

export default App;