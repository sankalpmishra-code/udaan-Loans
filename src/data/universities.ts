import { usaUniversities } from "./partnerUniversities/usa";
import { canadaUniversities } from "./partnerUniversities/canada";
import { ukUniversities } from "./partnerUniversities/uk";
import { australiaUniversities } from "./partnerUniversities/australia";
import { germanyUniversities } from "./partnerUniversities/germany";
import { irelandUniversities } from "./partnerUniversities/ireland";
import {
  CountryCode,
  PartnerNetwork,
  PortalType,
  UniversityProgram,
  UniversityLenderPolicy,
  UniversityData,
} from "./partnerUniversities/types";

export type {
  CountryCode,
  PartnerNetwork,
  PortalType,
  UniversityProgram,
  UniversityLenderPolicy,
  UniversityData,
};

/**
 * Master Directory of Higher Education Institutions
 * Includes Curated Premier Hubs, ApplyBoard Partner Institutions, and Navitas Pathway Hubs
 * Across USA, Canada, UK, Australia, Germany, and Ireland.
 */
export const universities: UniversityData[] = [
  ...usaUniversities,
  ...canadaUniversities,
  ...ukUniversities,
  ...australiaUniversities,
  ...germanyUniversities,
  ...irelandUniversities,
];

// Helper functions for easy lookup
export function getUniversityBySlug(slug: string): UniversityData | undefined {
  return universities.find((u) => u.slug === slug);
}

export function getUniversitiesByCountry(country: CountryCode): UniversityData[] {
  return universities.filter((u) => u.country === country);
}

export function getUniversitiesByPortal(portal: PortalType): UniversityData[] {
  return universities.filter((u) => u.portalType === portal);
}

export function getUniversitiesByNetwork(network: PartnerNetwork): UniversityData[] {
  return universities.filter((u) => u.partnerNetwork === network);
}
