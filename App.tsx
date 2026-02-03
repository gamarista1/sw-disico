import React from 'react';
import { HeroHeader } from './modules/recovery-hero/HeroHeader';
import { LossAnalysis } from './modules/loss-analysis/LossAnalysis';
import { TechOpportunity } from './modules/tech-opportunity/TechOpportunity';
import { TheSolution } from './modules/the-solution/TheSolution';
import { OperationalProcess } from './modules/operational-process/OperationalProcess';
import { ResultsROI } from './modules/results-roi/ResultsROI';
import { CompetitiveAdvantages } from './modules/competitive-advantages/CompetitiveAdvantages';
import { CallToAction } from './modules/cta/CallToAction';

function App() {
  return (
    <div className="antialiased text-white bg-slate-950 min-h-screen">
      <HeroHeader />
      
      <LossAnalysis />

      <TechOpportunity />

      <TheSolution />

      <OperationalProcess />

      <ResultsROI />

      <CompetitiveAdvantages />

      <CallToAction />
    </div>
  );
}

export default App;