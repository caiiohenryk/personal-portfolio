'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useT } from '@/app/components/language-provider';
import { PhIcon } from '@/app/components/ph-icon';
import { Reveal } from '@/app/components/reveal';
import { PROFILE, SOCIALS } from '@/app/lib/content';

function useTypingEffect(roles: string[]): string {
  const [typed, setTyped] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    let charIdx = 0;
    let deleting = false;
    let roleIdx = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      const word = roles[roleIdx % roles.length];
      let delay = deleting ? 40 : 75;
      if (!deleting) {
        charIdx++;
        if (charIdx >= word.length) {
          charIdx = word.length;
          deleting = true;
          delay = 2200;
        }
      } else {
        charIdx--;
        if (charIdx <= 0) {
          charIdx = 0;
          deleting = false;
          delay = 350;
          roleIdx++;
        }
      }
      setTyped(word.slice(0, charIdx));
      timer.current = setTimeout(tick, delay);
    };

    setTyped('');
    timer.current = setTimeout(tick, 0);
    return () => {
      cancelled = true;
      if (timer.current) clearTimeout(timer.current);
    };
  }, [roles]);

  return typed;
}

export function Hero() {
  const t = useT();
  const typed = useTypingEffect(t.roles);

  return (
    <section
      id="inicio"
      style={{ position: 'relative', overflow: 'hidden', minHeight: '100svh', display: 'flex', alignItems: 'center' }}
    >
      {}
      <div
        aria-hidden="true"
        className="glow-drift"
        style={{
          position: 'absolute',
          right: '-10%',
          top: '-20%',
          width: '60vw',
          maxWidth: '760px',
          aspectRatio: '1',
          borderRadius: '50%',
          pointerEvents: 'none',
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-accent-700) 35%, transparent), transparent 62%)',
          filter: 'blur(20px)',
        }}
      />

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(96px, 14vh, 140px) clamp(20px, 5vw, 72px) clamp(64px, 10vh, 112px)',
          display: 'grid',
          gap: 'clamp(40px, 6vw, 88px)',
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, order: 1 }}>
          <Reveal
            as="p"
            delay={60}
            style={{ margin: '0 0 10px', fontSize: '17px', color: 'color-mix(in srgb, var(--color-text) 70%, transparent)' }}
          >
            {t.greet}
          </Reveal>
          <Reveal
            as="h1"
            delay={120}
            style={{
              margin: '0 0 0 -0.05em',
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              fontSize: 'clamp(44px, 6vw, 88px)',
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              whiteSpace: 'nowrap',
            }}
          >
            {PROFILE.name}
          </Reveal>
          <Reveal
            as="p"
            delay={200}
            style={{
              margin: '14px 0 0',
              minHeight: '1.3em',
              lineHeight: 1.3,
              fontSize: 'clamp(20px, 2.4vw, 28px)',
              letterSpacing: '-0.01em',
              color: 'var(--color-accent)',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span>{typed || '\u200b'}</span>
            <span
              aria-hidden="true"
              className="caret-blink"
              style={{ display: 'inline-block', width: '2px', height: '1.1em', background: 'var(--color-accent)' }}
            />
          </Reveal>
          <Reveal
            as="p"
            delay={280}
            style={{ margin: '24px 0 0', maxWidth: '52ch', fontSize: '17px', lineHeight: 1.65, color: 'color-mix(in srgb, var(--color-text) 82%, transparent)' }}
          >
            {t.heroSub}
          </Reveal>
          <Reveal
            delay={360}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}
          >
            <a href="#projetos" className="btn btn-primary" style={{ minHeight: 44, gap: 8, display: 'inline-flex', alignItems: 'center' }}>
              {t.ctaProjects} <PhIcon name="ph-arrow-down" size={16} />
            </a>
          </Reveal>
          <Reveal delay={440} style={{ display: 'flex', gap: 8, marginTop: 28 }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener"
                aria-label={s.label}
                title={s.label}
                className="social-tile"
                style={{
                  width: 44,
                  height: 44,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 8,
                  border: '1px solid var(--color-neutral-700)',
                  background: 'color-mix(in srgb, var(--color-bg) 60%, transparent)',
                  color: 'var(--color-text)',
                  fontSize: 20,
                }}
              >
                <PhIcon name={s.icon} size={20} />
              </a>
            ))}
          </Reveal>
        </div>

        {}
        <Reveal
          delay={160}
          className="hero-photo"
          style={{
            position: 'relative',
          }}
        >
          <div
            aria-hidden="true"
            className="hero-orbit"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '132%',
              aspectRatio: '1',
              transform: 'translate(-50%,-50%)',
              borderRadius: '50%',
              border: '1px solid var(--color-neutral-800)',
              pointerEvents: 'none',
            }}
          />
          {}
          <div
            aria-hidden="true"
            className="orbit-spin hero-orbit"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '160%',
              aspectRatio: '1',
              transform: 'translate(-50%,-50%)',
              borderRadius: '50%',
              border: '1px dashed var(--color-accent-800)',
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '14.6%',
                left: '14.6%',
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--color-accent)',
                boxShadow: '0 0 12px var(--color-accent)',
                transform: 'translate(-50%,-50%)',
              }}
            />
          </div>
          <div
            aria-hidden="true"
            className="hero-orbit"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '190%',
              aspectRatio: '1',
              transform: 'translate(-50%,-50%)',
              borderRadius: '50%',
              border: '1px solid color-mix(in srgb, var(--color-neutral-800) 60%, transparent)',
              pointerEvents: 'none',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: '-1px',
              borderRadius: 24,
              background:
                'linear-gradient(160deg, var(--color-accent-500), transparent 42%, transparent 62%, var(--color-accent-800))',
            }}
          />
          <div
            style={{ position: 'relative', margin: 1, aspectRatio: '4 / 5', borderRadius: 23, overflow: 'hidden', background: 'var(--color-surface)' }}
          >
            <Image
              src={PROFILE.photo}
              alt={PROFILE.photoAlt}
              fill
              priority
              sizes="(max-width: 899px) 68vw, 420px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: -14,
              bottom: 24,
              padding: '9px 13px',
              borderRadius: 8,
              background: 'color-mix(in srgb, var(--color-surface) 80%, transparent)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid var(--color-neutral-700)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 13,
            }}
          >
            <PhIcon name="ph-map-pin" size={16} style={{ color: 'var(--color-accent)' }} />
            <span>{t.location}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
