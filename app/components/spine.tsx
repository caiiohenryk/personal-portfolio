'use client';

import { useT } from '@/app/components/language-provider';
import { useActiveSection } from '@/app/components/use-active-section';
import { IDS } from '@/app/lib/content';

export function Spine() {
  const t = useT();
  const active = useActiveSection(0.35);
  const idx = Math.max(0, (IDS as readonly string[]).indexOf(active));
  const frac = IDS.length > 1 ? idx / (IDS.length - 1) : 0;

  return (
    <nav aria-label={t.nav.join(', ')} className="spine">
      <div aria-hidden="true" className="spine-rail">
        <div className="spine-fill" style={{ height: `${frac * 100}%` }} />
      </div>
      {IDS.map((id, i) => (
        <a key={id} href={'#' + id} className="spine-node" data-active={active === id}>
          <span aria-hidden="true" className="spine-dot" />
          <span className="spine-label">{t.nav[i]}</span>
        </a>
      ))}
    </nav>
  );
}
