import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Reference-only design export (Google Stitch artifacts) — never linted,
    // never imported. See PLAN.md §1. Glob avoids NFD/NFC accent ambiguity.
    "Portf*lio Caio Chaves/**",
  ]),
]);

export default eslintConfig;
