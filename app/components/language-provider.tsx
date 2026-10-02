'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { I18N, LANG_STORAGE_KEY, type Dict, type Lang } from '@/app/lib/content';

interface LangCtx {
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LangCtx | null>(null);

/**
 * Estado de idioma do design (getLang/setLang, HTML linhas 391–401):
 * default 'pt' no servidor e na primeira pintura (sem ler localStorage em
 * render → zero hydration mismatch); o efeito de hidratação lê
 * localStorage['cc-portfolio-lang'] e troca; cada mudança persiste e seta
 * document.documentElement.lang ('pt-BR' | 'en').
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('pt');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'pt' || saved === 'en') {
        if (saved !== lang) setLangState(saved);
      }
    } catch {
      /* storage indisponível — segue com o default pt */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
    setLangState(l);
  }, []);

  const value = useMemo<LangCtx>(() => ({ lang, t: I18N[lang], setLang }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LangCtx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang deve ser usado dentro de <LanguageProvider>');
  return ctx;
}

export function useT(): Dict {
  return useLang().t;
}
