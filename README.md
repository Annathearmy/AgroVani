# 🌾 AgroVani — Smart Agricultural Ecosystem & Sustainable Residue Management
🔗 **Live Production Deployment:** [https://agro-vani.vercel.app](https://agro-vani.vercel.app)

> **Bridging the gap between farmers, machinery sellers, and sustainable agriculture through data-driven advisory, localized insights, and circular residue management.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL%20%26%20Auth-green?style=flat&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/UI-Radix%20%2F%20Shadcn-black?style=flat)](https://ui.shadcn.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📌 Problem Statement

1. **Crop Residue Burning & Environmental Degradation:** In agricultural hubs across South Asia (particularly Northern India), burning crop stubble (paddy residue) generates severe atmospheric pollution, air quality degradation, and loss of essential soil nutrients.
2. **Asymmetric Access to Heavy Farm Machinery:** Small and marginal farmers often lack affordable access to modern machinery (e.g., Happy Seeders, Super Seeders, Balers) necessary for in-situ residue management.
3. **Information & Language Barriers:** Actionable agro-meteorological advisories and crop-selection insights rarely reach farmers in their native tongue or with geospatial context.
4. **Disjointed Supply Chain:** Agricultural equipment suppliers, rental agents, and farmers lack a unified marketplace for bookings, verifications, and logistical coordination.

---

## 💡 Solution: AgroVani

**AgroVani** is an all-in-one digital agri-tech platform engineered to empower farming communities. It unifies:
- **Intelligent Crop & Residue Advisory Engines:** Algorithmic matching for crop decisions and circular residue monetization/management strategies.
- **Machinery Rental Hub:** Direct farmer-to-seller marketplace for booking seeders, harvesters, and balers.
- **Geospatial & Climate Intelligence:** Live Leaflet-based farm boundaries, soil metrics, and localized weather APIs.
- **Vernacular-First Interface:** Complete multi-language support (English, हिन्दी, ਪੰਜਾਬੀ) to eliminate accessibility bottlenecks.

---

## 🚀 Key Features

### 🚜 1. Farmer Portal
- **Guided Onboarding:** Tailored setup capturing land area, soil characteristics, primary crops, and farm location.
- **Real-Time Dashboard:** Overview of local weather trends, field health, upcoming tasks, and rental bookings.
- **Interactive Farm Mapping:** Integrated dynamic Leaflet mapping to pinpoint farm boundaries, track fields, and view nearby machinery providers.
- **Machinery Booking Engine:** Instant discovery and reservation of verified farm implements (tractors, balers, seeders) with transparent pricing.

### 🧠 2. Algorithmic Recommendations
- **Crop Recommendation Engine (`lib/calculations/cropRecommendation.js`):** Suggests optimal crop rotations, expected yields, and sowing schedules based on soil profile, season, and regional data.
- **Residue Management Engine (`lib/calculations/residueRecommendation.js`):** Analyzes crop stubble volume to suggest sustainable disposal or monetization alternatives (in-situ mulching, baling for bio-pellets, compost conversion) to eliminate burning.

### 🏪 3. Seller & Service Provider Hub
- **Inventory & Asset Management:** Register machinery fleets, configure operational availability, and manage hourly/daily rental rates.
- **Booking & Order Fulfillment:** Live tracking of incoming farmer requests, booking status transitions, and dispatch coordination.

### 🛡️ 4. Administration & Verification Console
- **Platform Analytics:** Real-time visibility into active machinery rentals, farmer enrollment, regional distribution, and residue mitigation metrics.
- **User & Seller Validation:** Moderation pipeline ensuring legitimate listings and verified agri-equipment vendors.

### 🌐 5. Multilingual Localization (i18n)
- Seamless real-time context switching across **English**, **Hindi (हिन्दी)**, and **Punjabi (ਪੰਜਾਬੀ)** across all dashboards and modals via custom `LanguageContext`.

---

## 🏗️ System Architecture

```text
┌──────────────────────────────────────────────────────────┐
│                   Next.js 14 App Router                  │
│  ┌───────────────────┐  ┌─────────────────────────────┐  │
│  │   Farmer Portal   │  │   Seller & Admin Portals    │  │
│  │  - Onboarding     │  │  - Machinery Catalog        │  │
│  │  - Interactive Map│  │  - Booking Dispatch Engine  │  │
│  │  - Crop/Residue UI│  │  - Verification Dashboard   │  │
│  └─────────┬─────────┘  └──────────────┬──────────────┘  │
│            └──────────────┬────────────┘                 │
│                           ▼                              │
│       Shared UI System (Radix UI / Shadcn / Tailwind)    │
│       Vernacular Layer (i18n: EN / HI / PA)             │
└───────────────────────────┬──────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
┌───────────────────────────┐ ┌───────────────────────────┐
│     Calculation Engines   │ │     External Adapters     │
│ - cropRecommendation.js   │ │ - Weather API Adapter     │
│ - residueRecommendation.js│ │ - CEHub / Ag-Data Adapters│
└─────────────┬─────────────┘ └─────────────┬─────────────┘
              │                             │
              └─────────────┬───────────────┘
                            ▼
           ┌─────────────────────────────────┐
           │     Supabase / PostgreSQL       │
           │  - Auth (Farmer / Seller / Admin│
           │  - Database Tables & RLS Policies│
           │  - Storage & Geo Queries        │
           └─────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, React Server Components) |
| **Styling & Components** | [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/) (Radix Primitives), Lucide Icons |
| **Database & Auth** | [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security) |
| **Maps & Geospatial** | [Leaflet](https://leafletjs.com/) / React-Leaflet |
| **Internationalization** | Custom Context-driven i18n (`lib/i18n`) supporting EN, HI, PA |
| **Weather & External Data** | Dedicated API adapters (`lib/adapters/weather.js`, `cehub.js`) |
| **Testing & Quality** | Pytest-backed test runs & test ID instrumentation (`lib/constants/testIds`) |
| **Deployment** | [Vercel](https://vercel.com/) |

### Gemini Live voice agent

The Live Voice Advisory card uses the Next.js app for room tokens and the Python worker for the Gemini Live session. Keep both processes running during local development:

```bash
# Terminal 1
npm run dev

# Terminal 2
python -m pip install -r agent/requirements.txt
python agent/agent.py dev
```

Set `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, and `GEMINI_API_KEY` in `.env` or `.env.local`. The worker maps `GEMINI_API_KEY` to `GOOGLE_API_KEY` automatically.

---

## 📂 Project Structure

```bash
AgroVani/
├── app/
│   ├── admin/dashboard/       # Admin analytics & monitoring
│   ├── api/[[...path]]/       # Unified API routing layer
│   ├── farmer/
│   │   ├── dashboard/         # Farmer core dashboard
│   │   └── onboarding/        # Guided profile & field setup
│   ├── seller/dashboard/      # Machinery inventory & bookings
│   ├── login/                 # Role-based authentication
│   ├── layout.js              # Root layout & providers
│   └── page.js                # Landing page
├── components/
│   ├── farmer/                # FarmMapCard, BookMachineryCard, LeafletMap
│   ├── ui/                    # Shadcn/Radix atomic components
│   └── LanguageSwitcher.js    # Multi-language selector
├── lib/
│   ├── adapters/              # Weather and CEHub data integration
│   ├── calculations/          # Crop & stubble residue algorithms
│   ├── constants/             # Test IDs and application constants
│   ├── i18n/                  # Language dictionaries (en, hi, pa)
│   ├── supabase/              # Browser & server Supabase clients
│   └── utils.js               # Common utilities
├── supabase/
│   └── schema.sql             # Relational schemas, indices & RLS policies
├── vercel.json                # Vercel deployment configuration
└── next.config.js             # Next.js build configuration
```

---

## 🏆 Hackathon Impact & Value Proposition

- **Environmental Sustainability (UN SDG 13 & 15):** Direct impact on reducing stubble burning, air quality hazards, and carbon footprint through intelligent residue recycling and rental mechanization.
- **Economic Inclusivity (UN SDG 1 & 8):** Eliminates capital expenditure barriers for small farmers by enabling an on-demand machinery rental economy.
- **Hyper-Local Accessibility (UN SDG 10):** Built from the ground up for rural usability with regional dialects (Hindi and Punjabi) and visual geospatial mappings.
- **Production-Ready Foundation:** Clean Next.js 14 architecture with Supabase authentication, robust data models, and isolated calculation engines.

---

## 👥 Contributors:
Debayan Paul, Annesha Chakraborty, Ayan Chatterjee and Nikita Bose

Built with passion for sustainable agriculture and rural empowerment.

## Random Forest yield percentage service

The repository includes a Codespaces-ready Flask service under `yield_model/` for the trained Random Forest yield model. Add the trusted artifact at `model/rf_yield_model.joblib`; it must expose `predict()` and accept these feature columns in this exact order:

```text
soil_pH, nitrogen_ppm, seasonal_rainfall_mm, avg_temp_c, ndvi_peak
```

Start the service in Codespaces with:

```bash
python -m pip install -r yield_model/requirements.txt
python yield_model/app.py
```

The service is available on port `5000`:

```bash
curl http://localhost:5000/health
curl -X POST http://localhost:5000/predict \
    -H 'Content-Type: application/json' \
    -d '{"soil_pH":6.5,"nitrogen_ppm":120,"seasonal_rainfall_mm":800,"avg_temp_c":25,"ndvi_peak":0.72}'
```

The Next.js API exposes the same contract at `POST /api/yield-predict`. Set `YIELD_MODEL_API_URL=http://localhost:5000/predict` locally or to the deployed model service URL. Without that variable, AgroVani returns a clearly labeled bounded heuristic fallback; it never labels the fallback as Random Forest output.

## Spatial 3D and live location tracking

The farm map combines Leaflet for practical map layers with a lightweight React Three Fiber field surface for spatial context. Driver coordinates update in-place through a WebSocket connection; the page does not reload.

Run the location relay locally in a second terminal:

```bash
npm run location:server
```

Set this in `.env.local` for the browser:

```text
NEXT_PUBLIC_LOCATION_WS_URL=ws://localhost:8787
```

The browser uses a visible simulated stream when the variable is absent, which keeps local demos usable. For production, deploy `server/location-server.js` as a persistent Node service with TLS and set `NEXT_PUBLIC_LOCATION_WS_URL` to its `wss://` URL. Vercel serverless functions are not suitable for holding persistent WebSocket connections; use a managed realtime provider or a separate long-running service for production telemetry.

The telemetry contract is:

```json
{
    "type": "location_update",
    "id": "driver-123",
    "latitude": 30.34,
    "longitude": 76.39,
    "status": "active"
}
```

## Local environment and split deployment

There is no need to commit an environment file. Create one locally from the template:

```bash
cp .env.example .env.local
npm install
npm run dev
```

For the complete local stack, run the location relay and optional services in separate terminals:

```bash
npm run location:server
python -m pip install -r yield_model/requirements.txt
python yield_model/app.py
```

The production topology is:

```text
GitHub Pages (static Next.js frontend)
                | HTTPS API calls / WSS telemetry
                v
Cloud Run: AgroVani Next.js API + Cloud Run: location WebSocket relay
                |
                +-- Supabase, Gemini, LiveKit, optional yield-model service
```

GitHub Pages cannot run the `app/api` route or a persistent WebSocket server. The Pages workflow temporarily excludes that server-only route while exporting the frontend; the browser uses `NEXT_PUBLIC_API_BASE_URL` for API calls and `NEXT_PUBLIC_LOCATION_WS_URL` for the live driver stream. The driver route publishes GPS updates, and farmer maps subscribe to the same `driver-demo` stream with simulated motion when GPS permission is unavailable.

### Deploy the Next backend to Google Cloud Run

Install and authenticate the Google Cloud CLI, then replace the placeholders with the supplied project and region:

```bash
gcloud auth login
gcloud config set project YOUR_GCP_PROJECT_ID
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
gcloud builds submit --tag gcr.io/YOUR_GCP_PROJECT_ID/agrovani-api .
gcloud run deploy agrovani-api \
    --image gcr.io/YOUR_GCP_PROJECT_ID/agrovani-api \
    --region YOUR_REGION --platform managed --allow-unauthenticated \
    --set-env-vars "NEXT_PUBLIC_BASE_URL=https://agrovani-api-YOUR_HASH-YOUR_REGION.a.run.app,CORS_ORIGINS=https://YOUR_GITHUB_USER.github.io,YIELD_MODEL_API_URL=YOUR_YIELD_MODEL_URL" \
    --set-env-vars "NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY" \
    --set-secrets "SUPABASE_SERVICE_ROLE_KEY=SUPABASE_SERVICE_ROLE_KEY:latest,GEMINI_API_KEY=GEMINI_API_KEY:latest,LIVEKIT_API_KEY=LIVEKIT_API_KEY:latest,LIVEKIT_API_SECRET=LIVEKIT_API_SECRET:latest"
```

Create the referenced Secret Manager secrets before deployment. Keep `SUPABASE_SERVICE_ROLE_KEY`, Gemini, and LiveKit secrets only in Secret Manager or Cloud Run environment settings, never in GitHub Pages variables.

### Deploy the live location relay to Cloud Run

```bash
gcloud builds submit --tag gcr.io/YOUR_GCP_PROJECT_ID/agrovani-location --file server/Dockerfile .
gcloud run deploy agrovani-location \
    --image gcr.io/YOUR_GCP_PROJECT_ID/agrovani-location \
    --region YOUR_REGION --platform managed --allow-unauthenticated \
    --timeout 3600 --concurrency 1000
```

Use the resulting `https://...run.app` hostname as `wss://...run.app` for `NEXT_PUBLIC_LOCATION_WS_URL`. Cloud Run supports WebSocket upgrades, but the relay is intentionally stateless across instance restarts; use a managed realtime service or shared store when multiple relay instances are required.

### Configure GitHub Pages

Enable **Settings -> Pages -> GitHub Actions**. Add these repository variables under **Settings -> Secrets and variables -> Actions -> Variables**:

```text
NEXT_PUBLIC_API_BASE_URL=https://agrovani-api-...run.app
NEXT_PUBLIC_LOCATION_WS_URL=wss://agrovani-location-...run.app
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Push to `main`; `.github/workflows/deploy-pages.yml` builds and publishes the frontend at `https://YOUR_GITHUB_USER.github.io/YOUR_REPOSITORY/`.
