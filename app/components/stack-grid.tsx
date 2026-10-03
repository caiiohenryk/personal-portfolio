'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useLang, useT } from '@/app/components/language-provider';
import { PhIcon } from '@/app/components/ph-icon';
import { Reveal } from '@/app/components/reveal';
import { SKILLS } from '@/app/lib/content';

export function StackGrid() {
  const t = useT();
  const { lang } = useLang();
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
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="skills"
      style={{ position: 'relative', padding: 'clamp(64px, 10vw, 128px) 0 clamp(48px, 7vw, 88px)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 72px)' }}>
        <Reveal delay={0} style={{ marginBottom: 'clamp(36px, 6vw, 56px)' }}>
          <span className="kicker">
            <span className="kicker-rule" />
            {t.skillsKicker}
          </span>
          <h2 className="section-h2">{t.skillsTitle}</h2>
          <p style={{ margin: '12px 0 0', maxWidth: '56ch', fontSize: '15.5px', color: 'color-mix(in srgb, var(--color-text) 72%, transparent)' }}>
            {t.skillsSub}
          </p>
        </Reveal>

        <div ref={ref} className={'stack-grid' + (live ? ' stack-live' : '')}>
          {SKILLS.map((s, i) => (
            <article key={s.name} className="stack-tile" style={{ '--i': i } as CSSProperties}>
              <div className="stack-head">
                <span className="stack-icon">
                  <PhIcon name={s.icon} size={22} />
                </span>
                <span className="stack-cat">{s[lang].cat}</span>
              </div>
              <h3 className="stack-name">{lang === 'en' && s.nameEn ? s.nameEn : s.name}</h3>
              <p className="stack-line">{s[lang].line}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
