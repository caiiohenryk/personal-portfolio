'use client';

import { useCallback, type CSSProperties, type ElementType, type ReactNode } from 'react';

/**
 * Scroll-reveal fiel ao `setupReveal()` do design (HTML linhas 469–490):
 * IntersectionObserver próprio (threshold .12, rootMargin '0px 0px -40px'),
 * reveal único com transitionDelay = delay, transição .7s
 * cubic-bezier(.2,.7,.2,1) de opacity/transform.
 *
 * O servidor renderiza o elemento visível (bom p/ SEO e no-JS); o
 * escondimento acontece no ref callback — que roda na fase de commit, ANTES
 * do primeiro paint do cliente — então não há flash nem divergência de
 * hidratação. Sob prefers-reduced-motion o elemento permanece visível
 * (linhas 471/484 do design).
 */
export function Reveal({
  as: Tag = 'div',
  delay = 0,
  style,
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  delay?: number;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
} & Record<string, unknown>) {
  const attach = useCallback(
    (el: HTMLElement | null) => {
      if (!el) return;
      if (
        typeof window.matchMedia !== 'function' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }
      const base = el.style.transition ? el.style.transition + ', ' : '';
      el.style.transition =
        base + 'opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1)';
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';

      let clearTimer: ReturnType<typeof setTimeout> | undefined;
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            io.unobserve(el);
            el.style.transitionDelay = delay + 'ms';
            el.style.opacity = '1';
            el.style.transform = '';
            clearTimer = setTimeout(() => {
              el.style.transitionDelay = '';
            }, delay + 800);
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
      );
      io.observe(el);
      return () => {
        io.disconnect();
        if (clearTimer) clearTimeout(clearTimer);
      };
    },
    [delay],
  );

  return (
    <Tag ref={attach} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}
