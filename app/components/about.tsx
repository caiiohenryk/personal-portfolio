'use client';

import { useT } from '@/app/components/language-provider';
import { Reveal } from '@/app/components/reveal';

export function About() {
  const t = useT();
  return (
    <section id="sobre">
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(56px, 9vw, 112px) clamp(20px, 5vw, 72px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '32px clamp(40px, 6vw, 96px)',
        }}
      >
        <Reveal delay={0}>
          <span className="kicker">
            <span className="kicker-rule" />
            {t.aboutKicker}
          </span>
          <Reveal
            as="h2"
            variant="mask"
            delay={90}
            className="section-h2"
            style={{ maxWidth: '16ch' }}
          >
            {t.aboutTitle}
          </Reveal>
        </Reveal>
        <Reveal
          delay={140}
          style={{ display: 'flex', flexDirection: 'column', gap: 18, fontSize: '16.5px', lineHeight: 1.7, color: 'color-mix(in srgb, var(--color-text) 82%, transparent)' }}
        >
          <p style={{ margin: 0 }}>{t.about1}</p>
          <p style={{ margin: 0 }}>{t.about2}</p>
        </Reveal>
      </div>
    </section>
  );
}
