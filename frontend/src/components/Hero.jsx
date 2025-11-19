import React from 'react';

export default function Hero(){
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-row">
        <div className="hero-left">
          <p className="eyebrow">Small steps. <span className="emph">Stronger</span> Conversations.</p>
          <h2 id="hero-title" className="hero-title"> </h2>
        </div>

        <div className="hero-right">
          <a href="#" className="cta-link" aria-label="Take your step now">
            <span>Take your <strong>step</strong> right now.</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
