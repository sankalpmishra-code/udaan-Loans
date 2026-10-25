import { usaUniversities } from "./partnerUniversities/usa";
import { canadaUniversities } from "./partnerUniversities/canada";
import { ukUniversities } from "./partnerUniversities/uk";
import { australiaUniversities } from "./partnerUniversities/australia";
import { germanyUniversities } from "./partnerUniversities/germany";
import { irelandUniversities } from "./partnerUniversities/ireland";
import { europeUniversities } from "./partnerUniversities/europe";
import { maltaUniversities, cyprusUniversities } from "./partnerUniversities/maltaAndCyprus";
import { uaeUniversities } from "./partnerUniversities/uae";
import {
  CountryCode,
  Region,
  InstitutionType,
  UniversityProgram,
  UniversityLenderPolicy,
  UniversityData,
} from "./partnerUniversities/types";

export type {
  CountryCode,
  Region,
  InstitutionType,
  UniversityProgram,
  UniversityLenderPolicy,
  UniversityData,
};

/**
 * Master Directory of International Universities & Higher Education Institutions
 * Covers Premier Global Hubs, Russell Group, TU9, Group of Eight, and Leading European Institutions
 * Across UK, Germany, Ireland, Netherlands, France, Sweden, Italy, Switzerland, USA, Canada, and Australia.
 */
export const universities: UniversityData[] = [
  ...ukUniversities,
  ...germanyUniversities,
  ...irelandUniversities,
  ...europeUniversities,
  ...usaUniversities,
  ...canadaUniversities,
  ...australiaUniversities,
  ...maltaUniversities,
  ...cyprusUniversities,
  ...uaeUniversities,
];

// Helper functions for easy lookup
export function getUniversityBySlug(slug: string): UniversityData | undefined {
  return universities.find((u) => u.slug === slug);
}

export function getUniversitiesByCountry(country: CountryCode): UniversityData[] {
  return universities.filter((u) => u.country === country);
}

export function getUniversitiesByRegion(region: Region): UniversityData[] {
  return universities.filter((u) => u.region === region);
}

export function getUniversitiesByType(type: InstitutionType): UniversityData[] {
  return universities.filter((u) => u.institutionType === type);
}
