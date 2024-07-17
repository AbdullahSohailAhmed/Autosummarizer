import React, { useEffect, useRef } from 'react';
import './QnAGenerator.css';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

const QnA = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = NET({
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
    <div className="qna-container">
      <div ref={vantaRef} className="vanta-background"></div>
      <div className="qna-content">
        <h1>QnA</h1>
        <p>Ask your questions here...</p>
        <button>Ask</button>
      </div>
    </div>
  );
};

export default QnA;
