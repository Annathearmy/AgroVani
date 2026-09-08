# 🌾 AgroVani — Smart Agricultural Ecosystem & Sustainable Residue Management
🔗 **Live Production Deployment:** [https://agro-vani-kbr2x1z10-annesha2.vercel.app](https://agro-vani-kbr2x1z10-annesha2.vercel.app)

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
