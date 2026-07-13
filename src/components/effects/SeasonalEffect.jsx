import React, { useRef, useEffect } from 'react';

const MAX_PARTICLES = 35;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createPetal(container) {
  const el = document.createElement('div');
  const size = randomBetween(6, 12);
  const x = randomBetween(0, window.innerWidth);
  const duration = randomBetween(3000, 5000);
  const swayAmp = randomBetween(30, 80);
  const swayFreq = randomBetween(0.002, 0.004);
  const isWhite = Math.random() > 0.5;
  const start = performance.now();

  el.style.cssText = `
    position: absolute;
    top: -20px;
    left: ${x}px;
    width: ${size}px;
    height: ${size * 0.7}px;
    background: ${isWhite ? '#fff' : '#ffb7c5'};
    border-radius: 50% 50% 50% 0;
    opacity: 0;
    pointer-events: none;
    transform: rotate(0deg);
    will-change: transform, opacity;
  `;

  container.appendChild(el);

  function animate(now) {
    const elapsed = now - start;
    const progress = elapsed / duration;

    if (progress >= 1) {
      el.remove();
      return;
    }

    const yPos = progress * (window.innerHeight + 40);
    const xSway = Math.sin(elapsed * swayFreq) * swayAmp;
    const rotation = elapsed * 0.05;
    const opacity = progress < 0.1 ? progress * 10 : progress > 0.8 ? (1 - progress) * 5 : 0.8;

    el.style.transform = `translate(${xSway}px, ${yPos}px) rotate(${rotation}deg)`;
    el.style.opacity = opacity;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
  return el;
}

function createSparkle(container) {
  const el = document.createElement('div');
  const size = randomBetween(2, 5);
  const x = randomBetween(0, window.innerWidth);
  const y = randomBetween(0, window.innerHeight);
  const duration = randomBetween(2000, 4000);
  const driftX = randomBetween(-20, 20);
  const driftY = randomBetween(-30, 30);
  const isYellow = Math.random() > 0.7;
  const start = performance.now();

  el.style.cssText = `
    position: absolute;
    top: ${y}px;
    left: ${x}px;
    width: ${size}px;
    height: ${size}px;
    background: ${isYellow ? '#ffd700' : '#fff'};
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
    box-shadow: 0 0 ${size * 2}px ${isYellow ? '#ffd700' : '#fff'};
    will-change: transform, opacity;
  `;

  container.appendChild(el);

  function animate(now) {
    const elapsed = now - start;
    const progress = elapsed / duration;

    if (progress >= 1) {
      el.remove();
      return;
    }

    const dx = driftX * progress;
    const dy = driftY * progress;
    const opacity = progress < 0.3 ? (progress / 0.3) * 0.7 : progress > 0.7 ? ((1 - progress) / 0.3) * 0.7 : 0.7;

    el.style.transform = `translate(${dx}px, ${dy}px)`;
    el.style.opacity = opacity;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
  return el;
}

function createLeaf(container) {
  const el = document.createElement('div');
  const size = randomBetween(8, 14);
  const x = randomBetween(0, window.innerWidth);
  const duration = randomBetween(2500, 4500);
  const swayAmp = randomBetween(40, 100);
  const swayFreq = randomBetween(0.003, 0.006);
  const colors = ['#ff8c00', '#ffb347', '#8b4513'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const start = performance.now();

  el.style.cssText = `
    position: absolute;
    top: -20px;
    left: ${x}px;
    width: ${size}px;
    height: ${size * 1.3}px;
    background: ${color};
    clip-path: polygon(50% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%);
    opacity: 0;
    pointer-events: none;
    will-change: transform, opacity;
  `;

  container.appendChild(el);

  function animate(now) {
    const elapsed = now - start;
    const progress = elapsed / duration;

    if (progress >= 1) {
      el.remove();
      return;
    }

    const yPos = progress * (window.innerHeight + 40);
    const xSway = Math.sin(elapsed * swayFreq) * swayAmp;
    const rotation = elapsed * 0.08;
    const opacity = progress < 0.1 ? progress * 10 : progress > 0.8 ? (1 - progress) * 5 : 0.85;

    el.style.transform = `translate(${xSway}px, ${yPos}px) rotate(${rotation}deg)`;
    el.style.opacity = opacity;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
  return el;
}

function createSnowflake(container) {
  const el = document.createElement('div');
  const size = randomBetween(3, 8);
  const x = randomBetween(0, window.innerWidth);
  const duration = randomBetween(3000, 5000);
  const swayAmp = randomBetween(20, 60);
  const swayFreq = randomBetween(0.002, 0.004);
  const start = performance.now();
  const opacity = randomBetween(0.5, 0.9);

  el.style.cssText = `
    position: absolute;
    top: -10px;
    left: ${x}px;
    width: ${size}px;
    height: ${size}px;
    background: #fff;
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
    box-shadow: 0 0 ${size}px rgba(255,255,255,0.5);
    will-change: transform, opacity;
  `;

  container.appendChild(el);

  function animate(now) {
    const elapsed = now - start;
    const progress = elapsed / duration;

    if (progress >= 1) {
      el.remove();
      return;
    }

    const yPos = progress * (window.innerHeight + 20);
    const xSway = Math.sin(elapsed * swayFreq) * swayAmp;
    const fadeOpacity = progress < 0.1 ? progress * 10 * opacity : progress > 0.85 ? ((1 - progress) / 0.15) * opacity : opacity;

    el.style.transform = `translate(${xSway}px, ${yPos}px)`;
    el.style.opacity = fadeOpacity;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
  return el;
}

const creators = {
  petals: createPetal,
  sparkles: createSparkle,
  leaves: createLeaf,
  snowflakes: createSnowflake,
};

export default function SeasonalEffect({ season }) {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!season?.effect || !creators[season.effect]) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const creator = creators[season.effect];
    const interval = season.effect === 'sparkles' ? 250 : 400;

    timerRef.current = setInterval(() => {
      if (particlesRef.current.length >= MAX_PARTICLES) return;

      const el = creator(container);
      particlesRef.current.push(el);

      const dur = season.effect === 'sparkles' ? 4000 : 5000;
      setTimeout(() => {
        particlesRef.current = particlesRef.current.filter((p) => p !== el);
      }, dur);
    }, interval);

    return () => {
      clearInterval(timerRef.current);
      particlesRef.current.forEach((el) => el.remove());
      particlesRef.current = [];
    };
  }, [season?.effect]);

  if (!season?.effect) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-[9998] overflow-hidden"
      ref={containerRef}
    />
  );
}
