import React from 'react';
import './styles/globals.css';
import Navbar from './components/layout/Navbar';
import Hero from './components/Hero';

export default function App(){
  return (
    <div>
      <Navbar />
      <main className="container">
        <Hero />
        <h1 style={{marginTop:40}}>Welcome to Serise (placeholder)</h1>
        <p className="muted">Home page will be rendered here.</p>
      </main>
    </div>
  );
}
