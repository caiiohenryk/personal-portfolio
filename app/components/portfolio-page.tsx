"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { PinnedProject } from "@/app/lib/github";

type Language = "en" | "pt";
type Theme = "light" | "dark";

type PortfolioPageProps = {
  pinnedProjects: PinnedProject[];
  year: number;
};

const stack = [
  "TypeScript",
  "NestJS",
  "Docker",
  "Kubernetes",
  "Java",
  "Next.js",
  "BullMQ",
];

const copy = {
  en: {
    role: "Backend Engineer",
    intro:
      "I am a developer with a deep passion for technology, and I enjoy thinking about architecture and infrastructure.",
    sectionInterests: "Interests",
    sectionStack: "Stack",
    sectionProjects: "Pinned Projects",
    sectionContact: "Contact",
    interests:
      "I have worked with Java and Spring Boot, React, Python and Django, but TypeScript and its ecosystem are where I feel most at home.",
    repository: "Repository",
    live: "Live",
    languageLabel: "Language",
    themeLabel: "Theme",
    light: "Light",
    dark: "Dark",
    codeFallback: "Code",
  },
  pt: {
    role: "Engenheiro Backend",
    intro:
      "Sou um desenvolvedor com uma paixao profunda por tecnologia e gosto de pensar sobre arquitetura e infraestrutura.",
    sectionInterests: "Interesses",
    sectionStack: "Tecnologias",
    sectionProjects: "Projetos em destaque",
    sectionContact: "Contato",
    interests:
      "Ja trabalhei com Java e Spring Boot, React, Python e Django, mas TypeScript e seu ecossistema sao onde me sinto mais em casa.",
    repository: "Repositorio",
    live: "Ao vivo",
    languageLabel: "Idioma",
    themeLabel: "Tema",
    light: "Claro",
    dark: "Escuro",
    codeFallback: "Codigo",
  },
} as const;

function SectionHeading({ label }: { label: string }) {
  return (
    <h2 className="text-lg font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
      {label}
    </h2>
  );
}

export default function PortfolioPage({
  pinnedProjects,
  year,
}: PortfolioPageProps) {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      return;
    }

    document.documentElement.removeAttribute("data-theme");
  }, [theme]);

  const t = useMemo(() => copy[language], [language]);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[var(--paper)] text-[var(--ink)]">
      <div className="page-aura" aria-hidden="true" />

      <main className="mx-auto w-full max-w-5xl px-6 pb-20 pt-12 sm:px-10 sm:pt-16">
        <div className="reveal mb-10 flex flex-wrap items-center justify-end gap-3">
          <div className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] p-1">
            <span className="px-2 text-xs uppercase tracking-[0.1em] text-[var(--muted)]">
              {t.languageLabel}
            </span>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.1em] transition-colors ${
                language === "en"
                  ? "bg-[var(--ink)] text-[var(--paper)]"
                  : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
              aria-pressed={language === "en"}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("pt")}
              className={`rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.1em] transition-colors ${
                language === "pt"
                  ? "bg-[var(--ink)] text-[var(--paper)]"
                  : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
              aria-pressed={language === "pt"}
            >
              PT
            </button>
          </div>

          <button
            type="button"
            onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
            className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-xs uppercase tracking-[0.1em] text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
          >
            <span>{t.themeLabel}</span>
            <span className="font-semibold text-[var(--ink)]">
              {theme === "light" ? t.light : t.dark}
            </span>
          </button>
        </div>

        <header className="reveal border-b border-[var(--line)] pb-12">
          <div className="flex items-start">
            <div className="shrink-0 pr-6 sm:pr-8">
              <Image
                src="/images/profile.png"
                alt="Portrait illustration of Caio Henrique"
                width={96}
                height={96}
                sizes="(min-width: 640px) 96px, 64px"
                className="h-16 w-16 rounded-full border border-[var(--line)] object-cover sm:h-24 sm:w-24"
                priority
              />
            </div>

            <div className="min-w-0">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                {t.role}
              </p>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
                Caio Henrique
              </h1>

              <div className="mt-8 grid gap-3 text-base leading-relaxed text-[var(--muted)] sm:max-w-3xl">
                <p>{t.intro}</p>
              </div>
            </div>
          </div>
        </header>

        <section className="reveal reveal-delay-1 mt-12 grid gap-4 border-b border-[var(--line)] pb-12">
          <SectionHeading label={t.sectionInterests} />
          <p className="max-w-3xl text-[var(--muted)]">{t.interests}</p>
        </section>

        <section className="reveal reveal-delay-2 mt-12 grid gap-6 border-b border-[var(--line)] pb-12">
          <SectionHeading label={t.sectionStack} />
          <ul className="flex flex-wrap gap-3">
            {stack.map((item) => (
              <li
                key={item}
                className="stack-badge rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        {pinnedProjects.length > 0 ? (
          <section className="reveal reveal-delay-3 mt-12 grid gap-6 border-b border-[var(--line)] pb-12">
            <SectionHeading label={t.sectionProjects} />

            <div className="grid gap-4 sm:grid-cols-2">
              {pinnedProjects.map((project) => (
                <article
                  key={project.id}
                  className="group rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {project.name}
                    </h3>
                    <span className="font-mono text-xs text-[var(--muted)]">
                      * {project.stars}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {project.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
                    <span>{project.language || t.codeFallback}</span>
                    <div className="flex gap-4">
                      {project.homepageUrl ? (
                        <a
                          href={project.homepageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-[var(--ink)]"
                        >
                          {t.live}
                        </a>
                      ) : null}
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-[var(--ink)]"
                      >
                        {t.repository}
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="reveal reveal-delay-4 mt-12 grid gap-6">
          <SectionHeading label={t.sectionContact} />

          <div className="flex flex-wrap gap-3 text-sm font-medium sm:text-base">
            <a
              href="https://www.linkedin.com/in/caiiohenryk/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--line)] px-4 py-2 transition-colors hover:bg-[var(--surface)]"
            >
              LinkedIn
            </a>
            <a
              href="mailto:caiohc.dev@gmail.com"
              className="rounded-full border border-[var(--line)] px-4 py-2 transition-colors hover:bg-[var(--surface)]"
            >
              Email
            </a>
            <a
              href="https://github.com/caiiohenryk"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--line)] px-4 py-2 transition-colors hover:bg-[var(--surface)]"
            >
              GitHub
            </a>
          </div>
        </section>

        <footer className="mt-12 border-t border-[var(--line)] pt-8 font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
          {year} Caio Henrique
        </footer>
      </main>
    </div>
  );
}
