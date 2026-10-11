# Udaan Loans - Next.js Multi-Page Portal 🎓✈️

India's premier education loan facilitation platform for students aspiring to study abroad. Built with **Next.js 16 (App Router)**, **React 19**, and **TypeScript**, engineered for peak performance, multi-page user journeys, and maximum **SEO**, **GEO**, and **AEO** visibility.

---

## 🏗️ Multi-Page Architecture

```text
udaan-loans/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Global layout, fonts, Organization & FinancialService Schema
│   │   ├── page.tsx              # / - Home Page (Hero, Calculator, Stats, Trust, FAQ)
│   │   ├── match/
│   │   │   └── page.tsx          # /match - Two-Stage Transparent Bank Matcher Engine
│   │   ├── calculator/
│   │   │   └── page.tsx          # /calculator - Dedicated EMI & Moratorium Calculator + Schedule
│   │   ├── tax-calculator/
│   │   │   └── page.tsx          # /tax-calculator - Section 80E Tax Savings Engine (Old vs New Regime)
│   │   ├── assessment/
│   │   │   └── page.tsx          # /assessment - Printable Preliminary Funding Assessment with QR
│   │   ├── partners/
│   │   │   └── page.tsx          # /partners - Consultant Referral Pilot & Tracking Link Generator
│   │   ├── universities/
│   │   │   ├── page.tsx          # /universities - Curated 20 Universities Directory
│   │   │   └── [country]/[slug]/ # Dynamic high-converting landing pages for 20 US & Germany Hubs
│   │   ├── loans/
│   │   │   └── page.tsx          # /loans - Secured vs Unsecured Loans, Expense Coverage & Matrix
│   │   ├── destinations/
│   │   │   └── page.tsx          # /destinations - 40+ Country Guides, Cost of Study & Visa Rules
│   │   ├── lenders/
│   │   │   └── page.tsx          # /lenders - 30+ Public Banks, Private Banks & NBFCs Compared
│   │   ├── eligibility/
│   │   │   └── page.tsx          # /eligibility - Student & Co-Applicant Criteria, Checklist & Sec 80E
│   │   ├── process/
│   │   │   └── page.tsx          # /process - 5-Step Application to Disbursal Timeline
│   │   ├── apply/
│   │   │   └── page.tsx          # /apply - Multi-field Lead Capture & Callback Application
│   │   ├── about/
│   │   │   └── page.tsx          # /about - Company Mission, Ethical Advisory, Pan-India Hubs
│   │   ├── privacy/ & terms/     # DPDP Act 2025 & RBI Digital Lending Directions compliance
│   │   ├── api/
│   │   │   └── leads/route.ts    # Unified server-side lead ingestion API with Google Sheets sync
│   │   ├── sitemap.ts            # Dynamic Next.js XML Sitemap (45 routes indexed)
│   │   ├── robots.ts             # Dynamic Next.js robots.txt (AI crawler friendly)
│   │   └── globals.css           # Modern design system, typography, light/dark themes, print CSS
│   ├── components/               # Header, Footer, Calculator, TaxCalculator, LeadForm, WhatsAppWidget...
│   ├── data/                     # lenderCatalogue, universities, faqs, lenders, destinations, siteConfig
│   └── lib/
│       └── googleSheets.ts       # Direct Google Cloud Service Account JWT integration
├── google-sheets-script/
│   └── Code.gs                   # Ready-to-paste Google Apps Script with dual-tab lead capture
├── public/                       # Static public assets, icons, OG preview images
├── .env.example                  # Environment configuration template
├── next.config.mjs
├── tsconfig.json
└── package.json
```

---

## 🔍 SEO, GEO & AEO Optimizations

### 1. SEO (Search Engine Optimization)
- **Granular Metadata on Every Route**: Unique, keyword-dense `<title>` and `<meta name="description">` across all 45 routes.
- **Dynamic XML Sitemap (`/sitemap.xml`)**: Automatically indexes all 45 pages with priorities and update frequencies.
- **Dynamic Robots (`/robots.txt`)**: Search engine and AI crawler directives allowing full indexation.
- **Semantic HTML5 Hierarchy**: Proper `<h1>`, `<h2>`, `<article>`, `<section>`, and `<nav>` structure.
- **Canonical URLs & Social Tags**: Complete OpenGraph (1200×630) and Twitter card metadata.

### 2. GEO (Generative Engine Optimization & Local GEO)
- **Local GEO (Indian Metros to Global Study Hubs)**: Targeted pages associating Indian talent hubs (*Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad*) with outbound destinations (*USA, UK, Canada, Germany, Australia, Ireland*).
- **AI Search Citability (BLUF format)**: "Bottom-Line Up Front" direct answers and data-dense comparison tables designed for Google AI Overviews, Perplexity, Gemini, and ChatGPT Search.
- **Entity Linking**: Structured data establishing Udaan Loans as a certified Indian Education Loan Facilitator matching students with RBI-registered lenders.

### 3. AEO (Answer Engine Optimization)
- **Schema.org `FAQPage` Markup on All Key Pages**: Every single page includes comprehensive, contextual FAQs with automatic machine-readable JSON-LD schema injection.
- **Real Student Queries**: Answers formatted to address high-intent conversational voice and search queries (e.g., *"Can I get an education loan for study abroad without collateral?"*, *"How does moratorium simple interest work?"*).
- **Schema.org `BreadcrumbList` & `FinancialService`**: Rich snippets for enhanced SERP CTR.

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

---

## 📊 Live Lead Capture & Google Sheets Integration

The application captures leads across three distinct channels and synchronizes them to Google Sheets in real time:
1. **Student Applications** (`/apply`, `/loans`, `/universities`)
2. **Consultant Partner Signups** (`/partners`)
3. **Partner Tracking Referral Links** (`/apply?ref=PARTNER_CODE`)

### Configuration Options:
Set your preferred configuration in Vercel Environment Variables or `.env.local`:
* **Option A (Google Apps Script Webhook):**
  `GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/.../exec"`
* **Option B (Google Cloud Service Account Private Key):**
  `GOOGLE_SERVICE_ACCOUNT_EMAIL="..."`
  `GOOGLE_PRIVATE_KEY="..."`
  `GOOGLE_SHEET_ID="..."`

