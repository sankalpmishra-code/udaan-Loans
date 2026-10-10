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
│   │   ├── calculator/
│   │   │   └── page.tsx          # /calculator - Dedicated EMI & Moratorium Calculator + Schedule
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
│   │   ├── sitemap.ts            # Dynamic Next.js XML Sitemap
│   │   ├── robots.ts             # Dynamic Next.js robots.txt
│   │   └── globals.css           # Modern design system, typography, light/dark themes
│   ├── components/
│   │   ├── Header.tsx            # Responsive desktop & mobile drawer navigation
│   │   ├── Footer.tsx            # Comprehensive footer with GEO hubs & compliance disclaimers
│   │   ├── Calculator.tsx        # Interactive EMI Calculator with amortization table
│   │   ├── FAQSection.tsx        # Accordion FAQ with automatic Schema.org FAQPage injection
│   │   ├── LeadForm.tsx          # Application form with validation & Google Sheets hook
│   │   ├── Breadcrumbs.tsx       # Visual breadcrumbs + BreadcrumbList JSON-LD
│   │   └── JsonLd.tsx            # Schema.org structured data injector
│   └── data/
│       ├── faqs.ts               # Page-specific, AEO-optimized FAQ data
│       ├── lenders.ts            # 30+ Partner banks, rates, limits & processing times
│       ├── destinations.ts       # Cost of study, currency, and visa proof rules
│       └── siteConfig.ts         # Global SEO metadata, keywords, phone, email, and GEO cities
├── public/                       # Static public assets
├── legacy-static/                # Backup of original single-page HTML/CSS/JS
├── next.config.mjs
├── tsconfig.json
└── package.json
```

---

## 🔍 SEO, GEO & AEO Optimizations

### 1. SEO (Search Engine Optimization)
- **Granular Metadata on Every Route**: Unique, keyword-dense `<title>` and `<meta name="description">` on each route.
- **Dynamic XML Sitemap (`/sitemap.xml`)**: Automatically indexes all 8+ subpages with priorities and update frequencies.
- **Dynamic Robots (`/robots.txt`)**: Search engine directives allowing indexation.
- **Semantic HTML5 Hierarchy**: Proper `<h1>`, `<h2>`, `<article>`, `<section>`, and `<nav>` structure.
- **Canonical URLs & Social Tags**: Complete OpenGraph and Twitter card metadata.

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

## 📊 Connecting the Lead Capture Form to Google Sheets

The application form in [LeadForm.tsx](file:///Users/sankalpmishra/.gemini/antigravity/scratch/udaan-loans/src/components/LeadForm.tsx) supports instant webhook lead capture:

1. Create a [Google Sheet](https://sheets.new) with columns:
   `Name | Phone | Email | Country | Course | Amount | LoanType | CoApplicant | Source | Timestamp`
2. In Google Sheets, navigate to **Extensions > Apps Script** and deploy a Web App with `doPost(e)` function.
3. Paste the Web App URL into `SHEET_URL` inside `src/components/LeadForm.tsx`.
