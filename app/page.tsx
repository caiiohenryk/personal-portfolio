import { About } from '@/app/components/about';
import { BackToTop } from '@/app/components/back-to-top';
import { DotGrid } from '@/app/components/dot-grid';
import { Experience } from '@/app/components/experience';
import { Hero } from '@/app/components/hero';
import { LanguageProvider } from '@/app/components/language-provider';
import { MenuDrawer } from '@/app/components/menu-drawer';
import { ProjectsCarousel } from '@/app/components/projects-carousel';
import { SkillsCarousel } from '@/app/components/skills-carousel';

/**
 * Página única — estrutura do design (HTML linhas 29–277), sem a faixa de
 * stats (removida a pedido): dot-grid fixo → main (hero, sobre, skills,
 * experiência, projetos, espaçador) → drawer + FAB + voltar-ao-topo.
 * Sem contato, sem rodapé — o design não tem (seções = IDS em content.ts).
 */
export default function Page() {
  return (
    <LanguageProvider>
      <DotGrid />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <SkillsCarousel />
        <Experience />
        <ProjectsCarousel />
        <div style={{ height: 'clamp(48px, 8vw, 96px)' }} />
      </main>
      <MenuDrawer />
      <BackToTop />
    </LanguageProvider>
  );
}
