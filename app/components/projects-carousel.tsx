'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useT } from '@/app/components/language-provider';
import { PhIcon } from '@/app/components/ph-icon';
import { PROJ_TAGS, PROJECT_LINKS } from '@/app/lib/content';

/**
 * Seção Projetos com pinning por scroll — HTML linhas 179–228 + lógica
 * 412–417/503–507: altura da seção = n·100svh, conteúdo sticky a 100svh;
 * progresso p = clamp(-rect.top / (rect.height - vh)); projIdx = floor(p·n).
 * Atualizações de state são filtradas por epsilon (0.003, linha 419) para
 * não brigar com o smooth-scroll.
 */
export function ProjectsCarousel() {
  const t = useT();
  const n = t.projects.length;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [wide, setWide] = useState(true);
  const [proj, setProj] = useState({ idx: 0, prog: 0 });
  const latest = useRef(proj);

  useEffect(() => {
    const onResize = () => setWide(window.innerWidth >= 900);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? Math.min(0.9999, Math.max(0, -r.top / span)) : 0;
      const idx = Math.floor(p * n);
      if (latest.current.idx !== idx || Math.abs(latest.current.prog - p) > 0.003) {
        latest.current = { idx, prog: p };
        setProj(latest.current);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [n]);

  const scrollToProject = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (span * (i + 0.5)) / n, behavior: 'smooth' });
  };

  const projNum = String(proj.idx + 1).padStart(2, '0');
  const projTotal = String(n).padStart(2, '0');

  return (
    <section id="projetos" ref={sectionRef} style={{ position: 'relative', height: `${n * 100}svh` }}>
      <div style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Numeral fantasma */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-2vw',
            bottom: '-6vw',
            fontFamily: 'var(--font-heading)',
            fontWeight: 500,
            fontSize: 'clamp(200px, 34vw, 480px)',
            lineHeight: 1,
            letterSpacing: '-0.05em',
            color: 'transparent',
            WebkitTextStroke: '1px var(--color-neutral-800)',
            pointerEvents: 'none',
            fontFeatureSettings: "'tnum' 1",
          }}
        >
          {projNum}
        </div>

        {/* Cabeçalho + contador + dots */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
            padding: 'clamp(28px, 6vh, 64px) clamp(20px, 5vw, 72px) 0',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 16,
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
                margin: '0 0 12px',
              }}
            >
              <span style={{ width: 28, height: 1, background: 'var(--color-accent)' }} />
              {t.projKicker}
            </span>
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-heading)',
                fontWeight: 500,
                fontSize: 'clamp(26px, 3.4vw, 40px)',
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
              }}
            >
              {t.projTitle}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span
              style={{
                fontSize: 14,
                fontFeatureSettings: "'tnum' 1",
                color: 'color-mix(in srgb, var(--color-text) 70%, transparent)',
              }}
            >
              <span style={{ color: 'var(--color-text)' }}>{projNum}</span> / {projTotal}
            </span>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {t.projects.map((p, i) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => scrollToProject(i)}
                  aria-label={`${t.goTo} ${i + 1}`}
                  style={{
                    border: 0,
                    padding: 0,
                    cursor: 'pointer',
                    height: 8,
                    width: i === proj.idx ? 28 : 8,
                    borderRadius: 4,
                    background: i === proj.idx ? 'var(--color-accent)' : 'var(--color-neutral-700)',
                    transition: 'width .4s cubic-bezier(.2,.7,.2,1), background .3s',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Palco de cards */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            minHeight: 0,
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
            padding: 'clamp(20px, 4vh, 40px) clamp(20px, 5vw, 72px) clamp(24px, 6vh, 64px)',
          }}
        >
          <div style={{ position: 'relative', height: '100%' }}>
            {t.projects.map((p, i) => {
              const active = i === proj.idx;
              const links = PROJECT_LINKS[i];
              return (
                <article
                  key={p.title}
                  aria-hidden={!active}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'grid',
                    gridTemplateColumns: wide ? 'minmax(0, 5fr) minmax(0, 7fr)' : 'minmax(0, 1fr)',
                    gridTemplateRows: wide ? '1fr' : 'minmax(0, 1fr) auto',
                    gap: 'clamp(20px, 4vw, 56px)',
                    alignItems: 'center',
                    opacity: active ? 1 : 0,
                    transform: active ? 'none' : i < proj.idx ? 'translateY(-40px) scale(.98)' : 'translateY(40px) scale(.98)',
                    pointerEvents: active ? 'auto' : 'none',
                    transition: 'opacity .6s cubic-bezier(.2,.7,.2,1), transform .6s cubic-bezier(.2,.7,.2,1)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 14,
                      minWidth: 0,
                      order: wide ? 1 : 2,
                    }}
                  >
                    <p style={{ margin: 0, fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-accent-300)' }}>
                      {p.kind}
                    </p>
                    <h3
                      style={{
                        margin: 0,
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 500,
                        fontSize: 'clamp(26px, 3.6vw, 48px)',
                        lineHeight: 1.08,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        maxWidth: '46ch',
                        fontSize: 'clamp(15px, 1.3vw, 17px)',
                        lineHeight: 1.65,
                        color: 'color-mix(in srgb, var(--color-text) 80%, transparent)',
                      }}
                    >
                      {p.desc}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {(PROJ_TAGS[i] ?? []).map((tg) => (
                        <span key={tg} className="tag tag-accent">
                          {tg}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                      {links.codeUrl ? (
                        <a
                          href={links.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-ghost"
                          style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                        >
                          <PhIcon name="ph-github-logo" size={16} /> {t.code}
                        </a>
                      ) : null}
                      <a
                        href={links.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                      >
                        {t.demo} <PhIcon name="ph-arrow-up-right" size={16} />
                      </a>
                    </div>
                  </div>
                  <div
                    style={{
                      position: 'relative',
                      minWidth: 0,
                      height: '100%',
                      maxHeight: 560,
                      alignSelf: 'center',
                      order: wide ? 2 : 1,
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: '-1px',
                        borderRadius: 16,
                        background:
                          'linear-gradient(150deg, var(--color-accent-600), transparent 40%, transparent 70%, var(--color-accent-800))',
                      }}
                    />
                    <div
                      className="lighten"
                      style={{ position: 'absolute', inset: 0, margin: 1, borderRadius: 15, overflow: 'hidden', background: 'var(--color-neutral-900)' }}
                    >
                      {links.image ? (
                        <Image
                          src={links.image}
                          alt={p.title}
                          fill
                          sizes="(max-width: 899px) 90vw, 560px"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'grid',
                            placeItems: 'center',
                            alignContent: 'center',
                            gap: 12,
                            color: 'color-mix(in srgb, var(--color-text) 40%, transparent)',
                          }}
                        >
                          <PhIcon name="ph-image" size={44} />
                          <span style={{ fontSize: 13 }}>{t.projPlaceholder}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Barra de progresso inferior */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, background: 'var(--color-neutral-900)' }}>
          <div
            style={{
              height: '100%',
              width: proj.prog * 100 + '%',
              background: 'linear-gradient(to right, var(--color-accent-700), var(--color-accent))',
            }}
          />
        </div>
      </div>
    </section>
  );
}
