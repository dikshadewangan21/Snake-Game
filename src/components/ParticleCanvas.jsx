import React, { useEffect, useRef } from 'react';

export const ParticleCanvas = ({ triggerBurst }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!triggerBurst) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const originX = (triggerBurst.x / 20) * rect.width + rect.width / 40;
    const originY = (triggerBurst.y / 20) * rect.height + rect.height / 40;

    const count = triggerBurst.count || 16;
    const color = triggerBurst.color || '#00f5ff';

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 3 + 2;
      particlesRef.current.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: Math.random() * 4 + 2,
        alpha: 1,
        life: 0.95
      });
    }
  }, [triggerBurst]);

  useEffect(() => {
    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0.05);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha *= p.life;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      width={440}
      height={440}
    />
  );
};
