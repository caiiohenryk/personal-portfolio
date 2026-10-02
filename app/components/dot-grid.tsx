/**
 * Overlay fixo de ponto-dos-dot-grid do design (HTML linha 30) — CSS puro,
 * server component.
 */
export function DotGrid() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        backgroundImage:
          'radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--color-text) 11%, transparent) 1px, transparent 0)',
        backgroundSize: '28px 28px',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 70% 20%, black, transparent 75%)',
        maskImage: 'radial-gradient(ellipse 80% 70% at 70% 20%, black, transparent 75%)',
      }}
    />
  );
}
