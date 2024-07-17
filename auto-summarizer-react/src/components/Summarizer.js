import React, { useEffect, useRef } from 'react';
import './Summarizer.css';
import * as THREE from 'three';
import BIRDS from 'vanta/dist/vanta.birds.min';

const Summarizer = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = BIRDS({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div className="summarizer-container">
      <div ref={vantaRef} className="vanta-background"></div>
      <div className="summarizer-content">
        <h1>Summarizer</h1>
        <p>Summarize your text here...</p>
        <button>Summarize</button>
      </div>
    </div>
  );
};

export default Summarizer;
