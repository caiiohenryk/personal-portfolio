'use client';

import { useT } from '@/app/components/language-provider';
import { Reveal } from '@/app/components/reveal';
import { EXP_TAGS } from '@/app/lib/content';

export function Experience() {
  const t = useT();
  return (
    <section id="experiencia">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(56px, 8vw, 104px) clamp(20px, 5vw, 72px)' }}>
        <Reveal delay={0} style={{ marginBottom: 40 }}>
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
            {t.expKicker}
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
            {t.expTitle}
          </h2>
        </Reveal>

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 5,
              top: 8,
              bottom: 8,
              width: 1,
              background:
                'linear-gradient(to bottom, var(--color-accent-600), var(--color-neutral-700) 70%, transparent)',
            }}
          />
          {t.experience.map((e, i) => (
            <Reveal
              key={e.period}
              delay={i * 80}
              style={{ position: 'relative', padding: '0 0 44px 36px', display: 'flex', flexWrap: 'wrap', gap: '8px 40px' }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 6,
                  width: 11,
                  height: 11,
                  borderRadius: '50%',
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-accent)',
                  boxShadow: '0 0 12px color-mix(in srgb, var(--color-accent) 45%, transparent)',
                }}
              />
              <p
                style={{
                  margin: 0,
                  flex: '0 0 180px',
                  fontSize: 14,
                  color: 'var(--color-accent-300)',
                  fontFeatureSettings: "'tnum' 1",
                  paddingTop: 2,
                }}
              >
                {e.period}
              </p>
              <div style={{ flex: '1 1 320px', minWidth: 0 }}>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-heading)',
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
