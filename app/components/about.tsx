'use client';

import { useT } from '@/app/components/language-provider';
import { Reveal } from '@/app/components/reveal';

const kickerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  fontSize: 13,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--color-accent)',
  margin: '0 0 16px',
};

const kickerMark: React.CSSProperties = { width: 28, height: 1, background: 'var(--color-accent)' };

const h2Style: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--font-heading)',
  fontWeight: 500,
  fontSize: 'clamp(30px, 4vw, 44px)',
  lineHeight: 1.12,
  letterSpacing: '-0.02em',
};

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
          <span style={kickerStyle}>
            <span style={kickerMark} />
            {t.aboutKicker}
          </span>
          <h2 style={{ ...h2Style, maxWidth: '16ch' }}>{t.aboutTitle}</h2>
        </Reveal>
        <Reveal
          delay={120}
          style={{ display: 'flex', flexDirection: 'column', gap: 18, fontSize: '16.5px', lineHeight: 1.7, color: 'color-mix(in srgb, var(--color-text) 82%, transparent)' }}
        >
          <p style={{ margin: 0 }}>{t.about1}</p>
          <p style={{ margin: 0 }}>{t.about2}</p>
        </Reveal>
      </div>
    </section>
  );
}
