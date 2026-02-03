import React from 'react';
import { HeroHeader } from './modules/recovery-hero/HeroHeader';
import { LossAnalysis } from './modules/loss-analysis/LossAnalysis';
import { TechOpportunity } from './modules/tech-opportunity/TechOpportunity';
import { TheSolution } from './modules/the-solution/TheSolution';
import { OperationalProcess } from './modules/operational-process/OperationalProcess';
import { ResultsROI } from './modules/results-roi/ResultsROI';

function App() {
  return (
    <div className="antialiased text-white bg-slate-950 min-h-screen">
      <HeroHeader />
      
      <LossAnalysis />

      <TechOpportunity />

      <TheSolution />

      <OperationalProcess />

      <ResultsROI />
      
      {/* Marcadores para secciones futuras (Screaming Architecture) */}
      <div id="lead-capture"></div>
    </div>
  );
}

export default App;