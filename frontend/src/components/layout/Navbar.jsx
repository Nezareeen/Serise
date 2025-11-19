import React, { useState } from 'react';

export default function Navbar(){
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container">
        <div style={{display:'flex',alignItems:'center'}}>

          <div className="brand">
            <span className="brand-logo">Serise</span>
          </div>
        </div>

        <nav id="main-navigation" aria-label="Main navigation">
          {/* future nav links go here; kept empty to match screenshot */}
        </nav>
      </div>
    </header>
  );
}
