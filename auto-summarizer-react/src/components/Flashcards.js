import React, { useEffect, useRef } from 'react';
import './Flashcards.css';
import * as THREE from 'three';
import HALO from 'vanta/dist/vanta.halo.min';

const Flashcards = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = HALO({
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
    <div className="flashcards-container">
      <div ref={vantaRef} className="vanta-background"></div>
      <div className="flashcards-content">
        <h1>Flashcards</h1>
        <p>Create and review your flashcards here...</p>
        <button>Create Flashcard</button>
      </div>
    </div>
  );
};

export default Flashcards;
