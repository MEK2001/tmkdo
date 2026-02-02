'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';
import styles from './InteractiveCursorBackground.module.css';

interface Particle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  rotation: number;
  shape: 'circle' | 'square' | 'line';
}

export default function InteractiveCursorBackground() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false });
  const animationRef = useRef<number | undefined>(undefined);
  const [, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      const particleCount = 12;
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 150 + Math.random() * 100;
        particlesRef.current.push({
          id: i,
          x: canvas.width / 2,
          y: canvas.height / 2,
          targetX: canvas.width / 2 + Math.cos(angle) * distance,
          targetY: canvas.height / 2 + Math.sin(angle) * distance,
          vx: 0,
          vy: 0,
          size: 2 + Math.random() * 4,
          opacity: 0.3 + Math.random() * 0.4,
          rotation: Math.random() * Math.PI * 2,
          shape: ['circle', 'square', 'line'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'line',
        });
      }
    };
    initParticles();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isMoving = true;
      setMousePos({ x: e.clientX, y: e.clientY });

      // Update particle targets based on cursor
      particlesRef.current.forEach((particle, index) => {
        const angle = (index / particlesRef.current.length) * Math.PI * 2;
        const distance = 100 + Math.random() * 80;
        particle.targetX = mouseRef.current.x + Math.cos(angle) * distance;
        particle.targetY = mouseRef.current.y + Math.sin(angle) * distance;
      });
    };

    const handleMouseLeave = () => {
      mouseRef.current.isMoving = false;
      // Reset particles to original positions
      particlesRef.current.forEach((particle, index) => {
        const angle = (index / particlesRef.current.length) * Math.PI * 2;
        const distance = 150 + Math.random() * 100;
        particle.targetX = canvas.width / 2 + Math.cos(angle) * distance;
        particle.targetY = canvas.height / 2 + Math.sin(angle) * distance;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Draw shapes
    const drawShape = (
      particle: Particle,
      isDark: boolean
    ) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;

      const color = isDark ? 'rgba(100, 150, 255, 1)' : 'rgba(80, 120, 240, 1)';
      ctx.strokeStyle = color;
      ctx.fillStyle = color;

      switch (particle.shape) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.stroke();
          break;
        case 'square':
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation);
          ctx.strokeRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
          break;
        case 'line':
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation);
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(-particle.size * 2, 0);
          ctx.lineTo(particle.size * 2, 0);
          ctx.stroke();
          break;
      }

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(255, 255, 255, 0)';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = theme === 'dark';

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Calculate velocity towards target
        const dx = particle.targetX - particle.x;
        const dy = particle.targetY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Smooth tracking
        const speed = mouseRef.current.isMoving ? 0.08 : 0.04;
        particle.vx += dx * speed;
        particle.vy += dy * speed;

        // Apply friction
        particle.vx *= 0.92;
        particle.vy *= 0.92;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Smooth rotation
        particle.rotation += (particle.vx + particle.vy) * 0.01;

        // Draw particle
        drawShape(particle, isDark);

        // Draw connecting lines to nearest particles
        particlesRef.current.forEach((otherParticle) => {
          if (particle.id < otherParticle.id) {
            const ddx = otherParticle.x - particle.x;
            const ddy = otherParticle.y - particle.y;
            const dist = Math.sqrt(ddx * ddx + ddy * ddy);

            if (dist < 200) {
              const lineColor = isDark
                ? `rgba(100, 150, 255, ${0.1 * (1 - dist / 200)})`
                : `rgba(80, 120, 240, ${0.08 * (1 - dist / 200)})`;

              ctx.strokeStyle = lineColor;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  return (
    <div ref={containerRef} className={styles.cursorContainer}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
