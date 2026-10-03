'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useT } from '@/app/components/language-provider';
import { Reveal } from '@/app/components/reveal';
import { EXP_TAGS } from '@/app/lib/content';

export function Experience() {
  const t = useT();
  const ref = useRef<HTMLDivElement | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setLive(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="experiencia">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(56px, 8vw, 104px) clamp(20px, 5vw, 72px)' }}>
        <Reveal delay={0} style={{ marginBottom: 44 }}>
          <span className="kicker">
            <span className="kicker-rule" />
            {t.expKicker}
          </span>
          <h2 className="section-h2">{t.expTitle}</h2>
        </Reveal>

        <div
          ref={ref}
          className={'timeline' + (live ? ' timeline-live' : '')}
          style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}
        >
          <div aria-hidden="true" className="timeline-rail" />
          {t.experience.map((e, i) => (
            <div
              key={e.period}
              className="timeline-item"
              style={{
                position: 'relative',
                padding: '0 0 44px 36px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px 40px',
                '--i': i,
              } as CSSProperties}
            >
              <span aria-hidden="true" className="timeline-node" />
              <p className="mono timeline-period">{e.period}</p>
              <div style={{ flex: '1 1 320px', minWidth: 0 }}>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: 20,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {e.role}
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: 15, color: 'color-mix(in srgb, var(--color-text) 66%, transparent)' }}>
                  {e.company}
                </p>
                <p style={{ margin: '14px 0 0', maxWidth: '62ch', fontSize: '15.5px', lineHeight: 1.7, color: 'color-mix(in srgb, var(--color-text) 82%, transparent)' }}>
                  {e.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
                  {(EXP_TAGS[i] ?? []).map((tg) => (
                    <span key={tg} className="tag tag-outline">
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
