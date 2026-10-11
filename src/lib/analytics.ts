/**
 * Analytics, Attribution & Conversion Event Engine
 * Handles GA4 event dispatching, Google Ads conversion triggers, and multi-touch UTM attribution.
 */

export interface AttributionParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  partnerRef?: string;
  landingPage?: string;
  referrer?: string;
  firstTouchTimestamp?: string;
}

const ATTRIBUTION_STORAGE_KEY = "udaan_lead_attribution_v1";

/**
 * Capture URL parameters on page load and store in sessionStorage to ensure
 * multi-page student journeys (e.g. Ad -> Landing -> Matcher -> Apply) retain original campaign source.
 */
export function captureAndPersistAttribution(): AttributionParams {
  if (typeof window === "undefined") return {};

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const existingRaw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    const existing: AttributionParams = existingRaw ? JSON.parse(existingRaw) : {};

    const utm_source = urlParams.get("utm_source") || existing.utm_source;
    const utm_medium = urlParams.get("utm_medium") || existing.utm_medium;
    const utm_campaign = urlParams.get("utm_campaign") || existing.utm_campaign;
    const utm_term = urlParams.get("utm_term") || existing.utm_term;
    const utm_content = urlParams.get("utm_content") || existing.utm_content;
    const gclid = urlParams.get("gclid") || existing.gclid;
    const partnerRef = urlParams.get("ref") || urlParams.get("partner") || existing.partnerRef;

    const attribution: AttributionParams = {
      ...existing,
      ...(utm_source && { utm_source }),
      ...(utm_medium && { utm_medium }),
      ...(utm_campaign && { utm_campaign }),
      ...(utm_term && { utm_term }),
      ...(utm_content && { utm_content }),
      ...(gclid && { gclid }),
      ...(partnerRef && { partnerRef }),
      landingPage: existing.landingPage || window.location.pathname,
      referrer: existing.referrer || document.referrer || "direct",
      firstTouchTimestamp: existing.firstTouchTimestamp || new Date().toISOString(),
    };

    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
    return attribution;
  } catch (e) {
    console.warn("Attribution storage error:", e);
    return {};
  }
}

/**
 * Retrieve current attribution parameters to submit alongside lead forms
 */
export function getStoredAttribution(): AttributionParams {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    // fallback
  }
  return captureAndPersistAttribution();
}

/**
 * Safe gtag wrapper to fire events when GA4 is loaded
 */
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function sendGAEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      ...params,
      event_timestamp: new Date().toISOString(),
    });
  }
}

// High-Value CRO Conversion Events

export function trackMatcherStart(country?: string) {
  sendGAEvent("matcher_start", {
    event_category: "Engagement",
    event_label: country || "Unknown",
    destination_country: country,
  });
}

export function trackMatcherStep(step: number, stepName: string) {
  sendGAEvent("matcher_step_progress", {
    event_category: "Engagement",
    step_number: step,
    step_name: stepName,
  });
}

export function trackMatcherComplete(resultsCount: number, profile: Record<string, any>) {
  sendGAEvent("matcher_complete", {
    event_category: "Conversion",
    results_count: resultsCount,
    destination: profile.country,
    loan_amount: profile.loanAmount,
    has_collateral: profile.hasCollateral,
  });
}

export function trackLeadSubmission(leadType: string, meta: Record<string, any> = {}) {
  sendGAEvent("generate_lead", {
    event_category: "Lead",
    lead_type: leadType,
    currency: "INR",
    value: meta.amount ? Number(meta.amount) : 3500000,
    ...meta,
  });
}

export function trackWhatsAppClick(sourcePage: string, country?: string) {
  sendGAEvent("whatsapp_initiate", {
    event_category: "Contact",
    source_page: sourcePage,
    destination_country: country,
  });
}

export function trackCalculatorUse(amount: number, tenure: number, emi: number) {
  sendGAEvent("calculator_interaction", {
    event_category: "Tool",
    loan_amount: amount,
    tenure_years: tenure,
    calculated_emi: emi,
  });
}
