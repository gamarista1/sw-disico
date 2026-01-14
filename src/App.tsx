import React from 'react';
import { HeroHeader } from './modules/recovery-hero/HeroHeader';

function App() {
  return (
    <div className="antialiased text-white bg-slate-950 min-h-screen">
      <HeroHeader />
      
      {/* Placeholder for future sections based on Screaming Architecture */}
      <div id="loss-analysis"></div>
      <div id="ia-engine"></div>
      <div id="roi-calculator"></div>
      <div id="lead-capture"></div>
    </div>
  );
}

export default App;