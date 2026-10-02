'use client';

import { useEffect, useState } from 'react';
import { useLang, useT } from '@/app/components/language-provider';
import { PhIcon } from '@/app/components/ph-icon';
import { IDS, LANGS, LANG_GROUP_LABEL, SOCIALS } from '@/app/lib/content';

/**
 * Drawer de navegação + FAB hambúrguer — HTML linhas 233–272 + lógica
 * 402–428: overlay, painel lateral com stagger dos links, scroll-spy
 * (IntersectionObserver rootMargin '-45% 0px -50%'), seletor pt/EN,
 * sociais, Esc fecha, body overflow trava enquanto aberto.
 */
export function MenuDrawer() {
  const t = useT();
  const { lang, setLang } = useLang();
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState<string>('inicio');

  // Scroll-spy (linhas 427–428)
  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, []);

  // Esc fecha (linha 422)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menu) setMenu(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  // Trava o scroll do body; restaura ao fechar E ao desmontar (pitfall 15)
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
  }, [menu]);
  useEffect(
    () => () => {
      document.body.style.overflow = '';
    },
    [],
  );

  const close = () => setMenu(false);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={close}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 70,
          background: 'color-mix(in srgb, var(--color-bg) 55%, transparent)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          opacity: menu ? 1 : 0,
          pointerEvents: menu ? 'auto' : 'none',
          transition: 'opacity .4s',
        }}
      />

      {/* Painel */}
      <aside
        aria-label="Menu"
        aria-hidden={!menu}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 80,
          width: 'min(440px, 100vw)',
          padding: 'clamp(80px, 14vh, 104px) clamp(24px, 5vw, 40px) 28px',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          transform: menu ? 'translateX(0)' : 'translateX(105%)',
          transition: 'transform .55s cubic-bezier(.7,0,.2,1)',
          background:
            'linear-gradient(165deg, color-mix(in srgb, var(--color-accent-700) 42%, transparent) 0%, color-mix(in srgb, var(--color-section) 58%, transparent) 45%, color-mix(in srgb, var(--color-bg) 72%, transparent) 100%)',
          backdropFilter: 'blur(28px) saturate(150%)',
          WebkitBackdropFilter: 'blur(28px) saturate(150%)',
          borderLeft: '1px solid color-mix(in srgb, var(--color-accent-300) 20%, transparent)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div
            style={{
              position: 'absolute',
              top: -120,
              right: -120,
              width: 360,
              height: 360,
              borderRadius: '50%',
              background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 35%, transparent), transparent 65%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--color-text) 10%, transparent) 1px, transparent 0)',
              backgroundSize: '22px 22px',
              WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 70%)',
              maskImage: 'linear-gradient(to bottom, black, transparent 70%)',
            }}
          />
        </div>

        <p
          style={{
            position: 'relative',
            margin: '0 0 20px',
            fontSize: 12,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-accent-300)',
          }}
        >
          {t.menu}
        </p>

        <nav style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
          {t.nav.map((label, i) => (
            <a
              key={IDS[i]}
              href={'#' + IDS[i]}
              onClick={close}
              className="menu-link"
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 16,
                padding: 'clamp(8px, 1.6vh, 12px) 0',
                minHeight: 44,
                borderBottom: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)',
                color:
                  active === IDS[i]
                    ? 'var(--color-accent-200)'
                    : 'color-mix(in srgb, var(--color-text) 78%, transparent)',
                opacity: menu ? 1 : 0,
                transform: menu ? 'none' : 'translateX(24px)',
                transition: 'opacity .5s, transform .5s cubic-bezier(.2,.7,.2,1), color .2s',
                transitionDelay: menu ? 120 + i * 55 + 'ms' : '0ms',
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontFeatureSettings: "'tnum' 1",
                  color: 'var(--color-accent-300)',
                  width: 20,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 500,
                  fontSize: 'clamp(26px, 6vw, 32px)',
                  letterSpacing: '-0.02em',
                  flex: 1,
                }}
              >
                {label}
              </span>
              <PhIcon name="ph-arrow-up-right" size={18} style={{ opacity: 0.6 }} />
            </a>
          ))}
        </nav>

        <div style={{ flex: 1, minHeight: 24 }} />

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <p
              style={{
                margin: '0 0 10px',
                fontSize: 12,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'color-mix(in srgb, var(--color-text) 64%, transparent)',
              }}
            >
              {t.language}
            </p>
            <div
              role="group"
              aria-label={LANG_GROUP_LABEL}
              style={{
                display: 'inline-flex',
                padding: 3,
                gap: 3,
                borderRadius: 10,
                border: '1px solid color-mix(in srgb, var(--color-text) 14%, transparent)',
                background: 'color-mix(in srgb, var(--color-bg) 40%, transparent)',
              }}
            >
              {LANGS.map((lg) => (
                <button
                  key={lg.code}
                  type="button"
                  onClick={() => setLang(lg.code)}
                  aria-pressed={lg.code === lang}
                  style={{
                    border: 0,
                    cursor: 'pointer',
                    font: 'inherit',
                    fontSize: 13,
                    fontWeight: 500,
                    padding: '9px 14px',
                    minHeight: 40,
                    borderRadius: 7,
                    background: lg.code === lang ? 'var(--color-accent-800)' : 'transparent',
                    color:
                      lg.code === lang
                        ? 'var(--color-accent-100)'
                        : 'color-mix(in srgb, var(--color-text) 70%, transparent)',
                    transition: 'background .2s, color .2s',
                  }}
                >
                  {lg.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener"
                aria-label={s.label}
                className="drawer-social"
                style={{
                  width: 44,
                  height: 44,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 10,
                  border: '1px solid color-mix(in srgb, var(--color-text) 14%, transparent)',
                  background: 'color-mix(in srgb, var(--color-bg) 30%, transparent)',
                  color: 'var(--color-text)',
                  fontSize: 20,
                }}
              >
                <PhIcon name={s.icon} size={20} />
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* FAB hambúrguer */}
      <button
        type="button"
        onClick={() => setMenu((m) => !m)}
        aria-label={menu ? t.close : t.open}
        aria-expanded={menu}
        className="menu-fab"
        style={{
          position: 'fixed',
          top: 'clamp(16px, 3vw, 28px)',
          right: 'clamp(16px, 3vw, 32px)',
          zIndex: 90,
          width: 52,
          height: 52,
          borderRadius: 14,
          cursor: 'pointer',
          border: '1px solid color-mix(in srgb, var(--color-accent) 45%, transparent)',
          background:
            'linear-gradient(150deg, color-mix(in srgb, var(--color-accent-700) 40%, transparent), color-mix(in srgb, var(--color-surface) 55%, transparent))',
          backdropFilter: 'blur(14px) saturate(140%)',
          WebkitBackdropFilter: 'blur(14px) saturate(140%)',
          boxShadow: '0 0 24px color-mix(in srgb, var(--color-accent) 22%, transparent), var(--shadow-md)',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <span style={{ position: 'relative', width: 20, height: 12, display: 'block' }}>
          <span
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 1.5,
              borderRadius: 1,
              background: 'var(--color-text)',
              transform: menu ? 'translateY(5.25px) rotate(45deg)' : 'none',
              transition: 'transform .4s cubic-bezier(.7,0,.2,1)',
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 1.5,
              borderRadius: 1,
              background: 'var(--color-text)',
              transform: menu ? 'translateY(-5.25px) rotate(-45deg)' : 'none',
              transition: 'transform .4s cubic-bezier(.7,0,.2,1)',
            }}
          />
        </span>
      </button>
    </>
  );
}
