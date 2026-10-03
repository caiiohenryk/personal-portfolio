'use client';

import { useCallback, type CSSProperties, type ElementType, type ReactNode } from 'react';

type Variant = 'rise' | 'mask' | 'fade';

const EASE = 'cubic-bezier(.2,.7,.2,1)';

export function Reveal({
  as: Tag = 'div',
  delay = 0,
  variant = 'rise',
  style,
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  delay?: number;
  variant?: Variant;
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

      if (variant === 'mask') {
        el.style.clipPath = 'inset(0 100% 0 0)';
        el.style.transition = `clip-path .95s ${EASE}`;
      } else if (variant === 'fade') {
        el.style.opacity = '0';
        el.style.transition = `opacity .95s ${EASE}`;
      } else {
        el.style.opacity = '0';
        el.style.transform = 'translateY(22px)';
        el.style.transition = `opacity .7s ${EASE}, transform .7s ${EASE}`;
      }

      let clearTimer: ReturnType<typeof setTimeout> | undefined;
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            io.unobserve(el);
            el.style.transitionDelay = delay + 'ms';
            if (variant === 'mask') {
              el.style.clipPath = 'inset(0 0 0 0)';
            } else {
              el.style.opacity = '1';
              if (variant === 'rise') el.style.transform = '';
            }
            clearTimer = setTimeout(() => {
              el.style.transitionDelay = '';
            }, delay + 1100);
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
    [delay, variant],
  );

  return (
    <Tag ref={attach} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}
