# World Cup Market Probabilities

A Vite + React dashboard for World Cup prediction markets from Kalshi and Polymarket.

The React frontend only calls the local Vercel-compatible API route at `/api/markets`. That serverless function fetches Kalshi and Polymarket independently, filters for specific World Cup markets, normalizes matching markets into one shape, and returns sorted results.

## Local Setup

```bash
npm install
npm run dev
```

Vite will print a local URL, usually `http://localhost:5173`.

## Build

```bash
npm run build
```

## Vercel Deployment

Deploy the repository to Vercel as a Vite project. Vercel will serve the React app and the serverless function in `api/markets.js` at `/api/markets`.

No paid APIs, API keys, or authentication are required.

## Data Notes

These prices are prediction-market implied probabilities, not sportsbook odds. They can differ from sportsbook lines, model forecasts, and true event probabilities because of market liquidity, fees, spreads, and participant behavior.

The API includes World Cup winner, top goalscorer, knockout advancement, Round of 16, quarterfinal, semifinal, final, and group-winner markets. It intentionally excludes unrelated World Cup-adjacent markets such as relocation, squad-selection, replacement-team, and generic continent markets.

Polymarket discovery uses the Gamma `/markets` endpoint plus Gamma `/public-search` so grouped events visible in the Polymarket UI are included without using the CLOB API.

Polymarket data comes from the public Gamma API:

```text
https://gamma-api.polymarket.com/markets?active=true&closed=false&limit=500
```

Kalshi data comes from the public elections API:

```text
https://api.elections.kalshi.com/trade-api/v2/markets?status=open&limit=1000
```
