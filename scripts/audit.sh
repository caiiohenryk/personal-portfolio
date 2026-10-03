#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

PORT="${PORT:-3210}"

echo "==> Build de produção"
npm run build

echo "==> Subindo next start na porta $PORT"
PORT="$PORT" npx next start -p "$PORT" &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT

for _ in $(seq 1 30); do
  if curl -sf "http://localhost:$PORT" >/dev/null; then break; fi
  sleep 1
done

echo "==> Rodando Lighthouse (headless, sem extensões)"
npx --yes lighthouse@latest "http://localhost:$PORT" \
  --only-categories=performance,accessibility,best-practices,seo,agentic-browsing \
  --output=json --output-path=.lighthouse-report.json \
  --chrome-flags="--headless=new" --quiet

node -e '
const d = require("./.lighthouse-report.json");
for (const [k, v] of Object.entries(d.categories)) {
  const s = v.score == null ? "n/a" : Math.round(v.score * 100);
  console.log(`  ${k}: ${s}`);
}
const cls = d.audits["cumulative-layout-shift"];
console.log(`  CLS: ${cls.displayValue}`);
'
echo "==> Relatório completo em .lighthouse-report.json"
