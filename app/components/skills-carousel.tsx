'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLang, useT } from '@/app/components/language-provider';
import { PhIcon } from '@/app/components/ph-icon';
import { Reveal } from '@/app/components/reveal';
import { SKILLS } from '@/app/lib/content';

const TRACK_PAD = 'max(clamp(20px, 5vw, 72px), calc((100% - 1200px) / 2 + clamp(20px, 5vw, 72px)))';

/**
 * Carrossel de skills — HTML linhas 99–147 + lógica 443–452/532–541:
 * trilho scroll-snap com drag de mouse (limiar 4px desliga o snap), botões
 * prev/next (scrollBy cardWidth+16) e barra-espelho com thumb proporcional.
 */
export function SkillsCarousel() {
  const t = useT();
  const { lang } = useLang();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef<{ x: number; sl: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [skillThumb, setSkillThumb] = useState(0.3);
  const [skillProg, setSkillProg] = useState(0);

  const measureSkills = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setSkillThumb(Math.min(1, el.clientWidth / el.scrollWidth));
    setSkillProg(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    const onResize = () => measureSkills();
    window.addEventListener('resize', onResize);
    const id = setTimeout(() => measureSkills(), 300); // como componentDidMount do design (linha 432)
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(id);
    };
  }, [measureSkills]);

  const scrollSkills = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('article');
    el.scrollBy({ left: dir * ((card ? card.offsetWidth : 320) + 16), behavior: 'smooth' });
  };

  return (
    <section
      id="skills"
      style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(64px, 10vw, 128px) 0 clamp(48px, 7vw, 88px)' }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(to right, color-mix(in srgb, var(--color-text) 5%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-text) 5%, transparent) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent 80%)',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent 80%)',
        }}
      />

      {/* Cabeçalho */}
      <Reveal
        delay={0}
        style={{
          position: 'relative',
          maxWidth: 1200,
          margin: '0 auto 36px',
          padding: '0 clamp(20px, 5vw, 72px)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <div>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 13,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              margin: '0 0 16px',
            }}
          >
            <span style={{ width: 28, height: 1, background: 'var(--color-accent)' }} />
            {t.skillsKicker}
          </span>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              fontSize: 'clamp(30px, 4vw, 44px)',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
            }}
          >
            {t.skillsTitle}
          </h2>
          <p style={{ margin: '12px 0 0', fontSize: '15.5px', color: 'color-mix(in srgb, var(--color-text) 72%, transparent)' }}>
            {t.skillsSub}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            className="btn btn-secondary btn-icon"
            onClick={() => scrollSkills(-1)}
            aria-label={t.prev}
            style={{ width: 44, height: 44, fontSize: 18 }}
          >
            <PhIcon name="ph-arrow-left" size={18} />
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-icon"
            onClick={() => scrollSkills(1)}
            aria-label={t.next}
            style={{ width: 44, height: 44, fontSize: 18 }}
          >
            <PhIcon name="ph-arrow-right" size={18} />
          </button>
        </div>
      </Reveal>

      {/* Trilho */}
      <div
        ref={trackRef}
        onScroll={measureSkills}
        onPointerDown={(e) => {
          if (e.pointerType !== 'mouse') return;
          const el = trackRef.current;
          if (!el) return;
          drag.current = { x: e.clientX, sl: el.scrollLeft };
        }}
        onPointerMove={(e) => {
          if (!drag.current || !trackRef.current) return;
          const dx = e.clientX - drag.current.x;
          if (Math.abs(dx) > 4 && !dragging) setDragging(true);
          trackRef.current.scrollLeft = drag.current.sl - dx;
        }}
        onPointerUp={() => {
          if (!drag.current) return;
          drag.current = null;
          if (dragging) setDragging(false);
        }}
        onPointerLeave={() => {
          if (!drag.current) return;
          drag.current = null;
          if (dragging) setDragging(false);
        }}
        className="no-scrollbar"
        style={{
          position: 'relative',
          display: 'flex',
          gap: 16,
          overflowX: 'auto',
          scrollSnapType: dragging ? 'none' : 'x mandatory',
          padding: `8px ${TRACK_PAD} 12px`,
          scrollPaddingInline: TRACK_PAD,
          cursor: dragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 24px, black calc(100% - 64px), transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 24px, black calc(100% - 64px), transparent)',
        }}
      >
        {SKILLS.map((k, i) => (
          <Reveal
            key={k.name}
            as="article"
            delay={Math.min(i, 3) * 90}
            className="card skill-card"
            style={{
              flex: '0 0 min(320px, 80vw)',
              scrollSnapAlign: 'start',
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              border: '1px solid var(--color-neutral-800)',
              background:
                'linear-gradient(180deg, color-mix(in srgb, var(--color-surface) 92%, transparent), color-mix(in srgb, var(--color-bg) 90%, transparent))',
              transition: 'border-color .25s, transform .25s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  display: 'grid',
                  placeItems: 'center',
                  background: 'var(--color-accent-900)',
                  border: '1px solid var(--color-accent-800)',
                  color: 'var(--color-accent-300)',
                  fontSize: 22,
                }}
              >
                <PhIcon name={k.icon} size={22} />
              </span>
              <span className="tag tag-neutral">{k[lang].cat}</span>
            </div>
            <div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 500,
                  fontSize: 24,
                  letterSpacing: '-0.01em',
                }}
              >
                {lang === 'en' && k.nameEn ? k.nameEn : k.name}
              </h3>
            </div>
            <div style={{ height: 1, background: 'linear-gradient(to right, var(--color-neutral-700), transparent)' }} />
            <div>
              <p
                style={{
                  margin: '0 0 12px',
                  fontSize: 12,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'color-mix(in srgb, var(--color-text) 60%, transparent)',
                }}
              >
                {t.whatIKnow}
              </p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {k[lang].points.map((pt) => (
                  <li
                    key={pt}
                    style={{ display: 'flex', gap: 10, fontSize: '14.5px', lineHeight: 1.5, color: 'color-mix(in srgb, var(--color-text) 86%, transparent)' }}
                  >
                    <PhIcon name="ph-check" size={15} style={{ color: 'var(--color-accent)', marginTop: 3, flex: 'none' }} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Barra-espelho */}
      <div style={{ position: 'relative', maxWidth: 1200, margin: '20px auto 0', padding: '0 clamp(20px, 5vw, 72px)' }}>
        <div style={{ height: 2, borderRadius: 1, background: 'var(--color-neutral-800)', overflow: 'hidden', maxWidth: 320 }}>
          <div
            style={{
              height: '100%',
              borderRadius: 1,
              background: 'var(--color-accent)',
              width: skillThumb * 100 + '%',
              marginLeft: skillProg * (1 - skillThumb) * 100 + '%',
              transition: 'margin-left .1s linear',
            }}
          />
        </div>
      </div>
    </section>
  );
}
