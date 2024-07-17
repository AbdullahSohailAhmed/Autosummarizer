import React, { useEffect, useRef } from 'react';
import './Contact.css';
import * as THREE from 'three';
import RINGS from 'vanta/dist/vanta.rings.min';

const Contact = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = RINGS({
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
    <div ref={vantaRef} style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <div style={{ position: 'relative', zIndex: 1, padding: '2rem' }}>
        <h1>Contact Us</h1>
        <p>This is the contact page.</p>
      </div>
    </div>
  );
};

export default Contact;
