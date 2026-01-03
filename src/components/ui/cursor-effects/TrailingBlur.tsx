'use client';

import { rand } from '@/utils/math';
import { useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

interface StarConfig {
  starAnimationDuration: number;
  minimumTimeBetweenStars: number;
  minimumDistanceBetweenStars: number;
  glowDuration: number;
  maximumGlowPointSpacing: number;
  colors: string[];
  sizes: string[];
  animations: string[];
}

export function TrailingBlur() {
  const containerRef = useRef<HTMLDivElement>(null);
  const state = useRef({
    startTime: new Date().getTime(),
    lastStarTimestamp: new Date().getTime(),
    lastStarPosition: { x: 0, y: 0 },
    lastMousePosition: { x: 0, y: 0 },
    count: 0,
  });

  useEffect(() => {
    const config: StarConfig = {
      starAnimationDuration: 1500,
      minimumTimeBetweenStars: 250,
      minimumDistanceBetweenStars: 150,
      glowDuration: 75,
      maximumGlowPointSpacing: 10,
      colors: ['var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)'],
      sizes: ['1.4rem', '1rem', '0.6rem'],
      animations: ['fall-1', 'fall-2', 'fall-3'],
    };

    // Generic to infer return type based on input array
    const selectRandom = (items: string[]): string => items[rand(0, items.length - 1)]!;

    const px = (value: number) => `${value}px`;
    const ms = (value: number) => `${value}ms`;

    const calcDistance = (a: Position, b: Position) => {
      const diffX = b.x - a.x;
      const diffY = b.y - a.y;
      return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    };

    const calcElapsedTime = (start: number, end: number) => end - start;

    const appendElement = (element: HTMLElement) => {
      if (containerRef.current) {
        containerRef.current.appendChild(element);
      }
    };

    const removeElement = (element: HTMLElement, delay: number) => {
      setTimeout(() => {
        if (containerRef.current && containerRef.current.contains(element)) {
          containerRef.current.removeChild(element);
        }
      }, delay);
    };

    // --- Particle Logic ---

    const createStar = (position: Position) => {
      const star = document.createElement('div');
      const color = selectRandom(config.colors);

      // Using tailwind class string
      star.className = 'absolute pointer-events-none z-10 flex items-center justify-center';

      star.innerHTML = `
        <svg viewBox="0 0 512 512" fill="currentColor" width="1em" height="1em">
          <path d="M284.3 11.7c-15.6-15.6-40.9-15.6-56.6 0l-216 216c-15.6 15.6-15.6 40.9 0 56.6l216 216c15.6 15.6 40.9 15.6 56.6 0l216-216c15.6-15.6 15.6-40.9 0-56.6l-216-216z"/>
        </svg>
      `;

      star.style.left = px(position.x);
      star.style.top = px(position.y);
      star.style.fontSize = selectRandom(config.sizes);
      star.style.color = color;
      star.style.textShadow = `0px 0px 1.5rem color-mix(in srgb, ${color}, transparent 50%)`;
      star.style.animationName = config.animations[state.current.count++ % config.animations.length] ?? 'fall-1';
      star.style.animationDuration = ms(config.starAnimationDuration);
      star.style.animationFillMode = 'forwards';

      appendElement(star);
      removeElement(star, config.starAnimationDuration);
    };

    const createGlowPoint = (position: Position) => {
      const glow = document.createElement('div');

      glow.className = 'absolute pointer-events-none z-10 w-[1px] h-[1px] rounded-full';

      glow.style.left = px(position.x);
      glow.style.top = px(position.y);
      glow.style.boxShadow = '0rem 0rem 1.2rem 0.6rem var(--chart-3)';

      appendElement(glow);
      removeElement(glow, config.glowDuration);
    };

    const createGlow = (last: Position, current: Position) => {
      const distance = calcDistance(last, current);
      const quantity = Math.max(Math.floor(distance / config.maximumGlowPointSpacing), 1);

      const dx = (current.x - last.x) / quantity;
      const dy = (current.y - last.y) / quantity;

      Array.from(Array(quantity)).forEach((_, index) => {
        const x = last.x + dx * index;
        const y = last.y + dy * index;
        createGlowPoint({ x, y });
      });
    };

    const updateLastStar = (position: Position) => {
      state.current.lastStarTimestamp = new Date().getTime();
      state.current.lastStarPosition = position;
    };

    const updateLastMousePosition = (position: Position) => {
      state.current.lastMousePosition = position;
    };

    const adjustLastMousePosition = (position: Position) => {
      if (state.current.lastMousePosition.x === 0 && state.current.lastMousePosition.y === 0) {
        state.current.lastMousePosition = position;
      }
    };

    // --- Event Handler ---

    const handleOnMove = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;

      if ('touches' in e) {
        const touch = e.touches[0];
        if (!touch) return;
        clientX = touch.clientX;
        clientY = touch.clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      const currentPosition = { x: clientX, y: clientY };

      adjustLastMousePosition(currentPosition);

      const now = new Date().getTime();
      const hasMovedFarEnough =
        calcDistance(state.current.lastStarPosition, currentPosition) >= config.minimumDistanceBetweenStars;
      const hasBeenLongEnough = calcElapsedTime(state.current.lastStarTimestamp, now) > config.minimumTimeBetweenStars;

      if (hasMovedFarEnough || hasBeenLongEnough) {
        createStar(currentPosition);
        updateLastStar(currentPosition);
      }

      createGlow(state.current.lastMousePosition, currentPosition);
      updateLastMousePosition(currentPosition);
    };

    const handleMouseLeave = () => {
      // Reset logic can go here if needed, or we just leave the last trail fading out
      // state.current.lastMousePosition = { x: 0, y: 0 };
    };

    // Use specific event casting for addEventListener to satisfy TypeScript strictness
    window.addEventListener('mousemove', handleOnMove);
    window.addEventListener('touchmove', handleOnMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleOnMove);
      window.removeEventListener('touchmove', handleOnMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      <style>{`
        @keyframes fall-1 {
          0% { transform: translate(0px, 0px) rotateX(45deg) rotateY(30deg) rotateZ(0deg) scale(0.25); opacity: 0; }
          5% { transform: translate(10px, -10px) rotateX(45deg) rotateY(30deg) rotateZ(0deg) scale(1); opacity: 1; }
          100% { transform: translate(25px, 200px) rotateX(180deg) rotateY(270deg) rotateZ(90deg) scale(1); opacity: 0; }
        }
        @keyframes fall-2 {
          0% { transform: translate(0px, 0px) rotateX(-20deg) rotateY(10deg) scale(0.25); opacity: 0; }
          10% { transform: translate(-10px, -5px) rotateX(-20deg) rotateY(10deg) scale(1); opacity: 1; }
          100% { transform: translate(-10px, 160px) rotateX(-90deg) rotateY(45deg) scale(0.25); opacity: 0; }
        }
        @keyframes fall-3 {
          0% { transform: translate(0px, 0px) rotateX(0deg) rotateY(45deg) scale(0.5); opacity: 0; }
          15% { transform: translate(7px, 5px) rotateX(0deg) rotateY(45deg) scale(1); opacity: 1; }
          100% { transform: translate(20px, 120px) rotateX(-180deg) rotateY(-90deg) scale(0.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
