# Caio Henrique Portfolio

Minimalist single-page portfolio built with Next.js App Router.

It includes:

- Bilingual content (English + Portuguese)
- Backend-focused profile and stack
- Pinned repositories fetched from GitHub GraphQL API
- Automatic fallback behavior that hides the Projects section if GitHub data is unavailable

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create local environment file:

```bash
cp .env.example .env.local
```

3. Add your values in `.env.local`.

4. Run development server:

```bash
npm run dev
```

Open http://localhost:3000.

## Environment variables

`GITHUB_USERNAME`

- GitHub username used in the pinned query
- Default in code: `caiiohenryk`

`GITHUB_TOKEN`

- GitHub personal access token used to call GraphQL API
- Required to fetch pinned projects reliably
- If missing or invalid, Projects section is hidden

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Deployment notes

- Configure `GITHUB_USERNAME` and `GITHUB_TOKEN` in your hosting provider.
- Do not expose the token to the client.
- Data is fetched on the server, so the token stays private.
