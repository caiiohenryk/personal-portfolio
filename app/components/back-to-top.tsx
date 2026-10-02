'use client';

import { useEffect, useRef, useState } from 'react';
import { useT } from '@/app/components/language-provider';
import { PhIcon } from '@/app/components/ph-icon';

/**
 * Voltar-ao-topo com anel de progresso do scroll — HTML linhas 274–277 +
 * lógica 409–411/556–560: aparece após 320px; anel SVG r=120 pathLength=100
 * com stroke-dashoffset = 100 − progresso·100. Updates filtrados por
 * epsilon (linha 419).
 */
export function BackToTop() {
  const t = useT();
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const latest = useRef({ show: false, progress: 0 });

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const nextShow = y > 320;
      const nextProgress = h > 0 ? Math.min(1, y / h) : 0;
      if (
        nextShow !== latest.current.show ||
        Math.abs(nextProgress - latest.current.progress) > 0.003
      ) {
        latest.current = { show: nextShow, progress: nextProgress };
        setShow(nextShow);
        setProgress(nextProgress);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t.backTop}
      title={t.backTop}
      className="backtop"
      style={{
        position: 'fixed',
        right: 'clamp(16px, 3vw, 32px)',
        bottom: 'clamp(16px, 3vw, 32px)',
        zIndex: 60,
        width: 52,
        height: 52,
        borderRadius: 14,
        border: '1px solid var(--color-accent)',
        background: 'color-mix(in srgb, var(--color-bg) 82%, transparent)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        color: 'var(--color-accent)',
        fontSize: 20,
        display: 'grid',
        placeItems: 'center',
        cursor: 'pointer',
        boxShadow: '0 0 22px color-mix(in srgb, var(--color-accent) 22%, transparent), var(--shadow-md)',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <svg
        viewBox="0 0 256 256"
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, margin: 'auto', width: 50, height: 50, transform: 'rotate(-90deg)' }}
      >
        <circle cx="128" cy="128" r="120" fill="none" stroke="var(--color-accent-800)" strokeWidth="6" />
        <circle
          cx="128"
          cy="128"
          r="120"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="6"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="100"
          strokeDashoffset={100 - progress * 100}
        />
      </svg>
      <PhIcon name="ph-arrow-up" size={20} style={{ position: 'relative' }} />
    </button>
  );
}
