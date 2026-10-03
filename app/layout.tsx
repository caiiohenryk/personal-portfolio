import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { I18N, PROFILE } from '@/app/lib/content';

// Inter via next/font — família e peso limitados pelo Nocturne (headings ≤ 500).
// Sem @import de CDN: as fontes são autolocalizadas no build (precisa de rede
// no primeiro build; se offline, falhe alto aqui, não caia para CDN).
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  // PLACEHOLDER — substituir com dados reais do Caio (domínio definitivo).
  metadataBase: new URL('https://caiiohenryk.com'),
  title: `${PROFILE.name} | ${PROFILE.roleTitle}`,
  description: I18N.pt.heroSub,
  openGraph: {
    title: `${PROFILE.name} | ${PROFILE.roleTitle}`,
    description: I18N.pt.heroSub,
    type: 'profile',
    locale: 'pt_BR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
