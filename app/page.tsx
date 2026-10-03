import { About } from '@/app/components/about';
import { BackToTop } from '@/app/components/back-to-top';
import { Experience } from '@/app/components/experience';
import { Hero } from '@/app/components/hero';
import { LanguageProvider } from '@/app/components/language-provider';
import { MenuDrawer } from '@/app/components/menu-drawer';
import { ProjectsCarousel } from '@/app/components/projects-carousel';
import { Spine } from '@/app/components/spine';
import { StackGrid } from '@/app/components/stack-grid';

export default function Page() {
  return (
    <LanguageProvider>
      <Spine />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <StackGrid />
        <Experience />
        <ProjectsCarousel />
        <div style={{ height: 'clamp(48px, 8vw, 96px)' }} />
      </main>
      <MenuDrawer />
      <BackToTop />
    </LanguageProvider>
  );
}
