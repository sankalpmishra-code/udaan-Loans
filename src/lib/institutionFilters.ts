/**
 * Institution Filtering & Validation Utilities
 * Strictly enforces study abroad scope (excluding domestic Indian institutions)
 */

export function isIndianInstitutionQuery(query: string): boolean {
  if (!query) return false;
  const q = query.toLowerCase().trim();

  if (q === "india" || q.includes("in india") || q.startsWith("india ") || q.endsWith(" india")) return true;

  // Indian Premier Institutes & Acronyms
  const indianAcronyms = [
    /\b(iit|iim|nit|iiit|aiims|iisc|tiss|isb|bits|xlri|fms|spjimr|mdi)\b/i,
    /\b(vit|srm|lpu|amity|nmims|thapar|dtu|nsut|coep|vtu|jntu|anna)\b/i,
  ];
  if (indianAcronyms.some((regex) => regex.test(q))) {
    // Preserve foreign institutes like "Illinois Tech"
    if (q.includes("illinois institute") || q.includes("illinois tech")) return false;
    return true;
  }

  // Common Indian university & college names
  const indianKeywords = [
    "delhi university", "mumbai university", "pune university", "anna university",
    "calcutta university", "madras university", "osmania university", "banaras hindu",
    "bhu", "aligarh muslim", "amu", "jawaharlal nehru", "jnu", "manipal university",
    "manipal academy", "symbiosis", "christ university", "ashoka university",
    "jadavpur university", "hyderabad university", "savitribai phule", "gujarat university",
    "punjab university", "panjab university", "rajasthan university", "kerala university",
    "bangalore university", "delhi technological university", "netaji subhas",
    "vellore institute", "birla institute", "indian school of business",
    "indian institute", "shiv nadar", "op jindal", "plaksha", "flame university",
    "woxsen", "bennett university", "parul university", "chandigarh university",
    "chitkara", "sharda", "galgotias", "kiit", "soa university", "sathyabama",
    "sastra", "psg tech", "ssn college", "rvce", "bmsce", "msrit", "pes university"
  ];

  return indianKeywords.some((keyword) => q.includes(keyword));
}

export function isIndianInstitution(name: string, countryName?: string, countryCode?: string): boolean {
  const c = (countryName || "").toLowerCase().trim();
  const code = (countryCode || "").toUpperCase().trim();
  const n = (name || "").toLowerCase().trim();

  if (c === "india" || code === "IN") return true;
  if (isIndianInstitutionQuery(n)) return true;

  const indianStates = [
    "delhi", "maharashtra", "karnataka", "tamil nadu", "telangana", "uttar pradesh",
    "west bengal", "gujarat", "kerala", "rajasthan", "punjab", "haryana", "bihar",
    "odisha", "andhra pradesh", "madhya pradesh", "assam", "goa", "uttarakhand",
    "jharkhand", "chhattisgarh", "himachal pradesh"
  ];
  if (indianStates.some((s) => c.includes(s) || n.includes(s))) return true;

  return false;
}
