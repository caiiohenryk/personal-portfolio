'use client';

import { useEffect, useRef, useState } from 'react';
import { IDS } from '@/app/lib/content';

export function useActiveSection(refLine = 0.35): string {
  const [active, setActive] = useState<string>(IDS[0]);
  const latest = useRef<string>(IDS[0]);

  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * refLine;
      let current: string = IDS[0];
      for (const id of IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - line <= 0) current = id;
      }
      if (current !== latest.current) {
        latest.current = current;
        setActive(current);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [refLine]);

  return active;
}
