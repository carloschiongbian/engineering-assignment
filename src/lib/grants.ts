import grants from '../../grants.json'

export type Grant = (typeof grants)[number]
export type ApplicantType = Grant['applicant_type'][number]
export type RevenueBand = Grant['revenue_band'][number]

export const APPLICANT_TYPES: ApplicantType[] = Array.from(
  new Set(grants.flatMap((grant) => grant.applicant_type))
).sort()

export const APPLICANT_TYPE_LABELS: Record<ApplicantType, string> = {
  sme: 'SME',
  non_sme: 'Non-SME',
}

export const REVENUE_BANDS: RevenueBand[] = Array.from(
  new Set(grants.flatMap((grant) => grant.revenue_band))
).sort()

export const REVENUE_BAND_LABELS: Record<RevenueBand, string> = {
  any: 'Any',
  under_100m: 'Under $100M',
}

export const matchesName = (grant: Grant, query: string) => {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return true
  return grant.name.toLowerCase().includes(normalized)
}

export const matchesApplicantType = (
  grant: Grant,
  selected: ApplicantType[]
) => {
  if (selected.length === 0) return true
  return selected.some((type) => grant.applicant_type.includes(type))
}

export const matchesRevenueBand = (grant: Grant, selected: RevenueBand[]) => {
  if (selected.length === 0) return true
  return selected.some((band) => grant.revenue_band.includes(band))
}

export type Requirement = 'local_entity' | 'new_market'

export const REQUIREMENT_LABELS: Record<Requirement, string> = {
  local_entity: 'Requires local entity',
  new_market: 'Requires new market',
}

const hasRequirement = (grant: Grant, requirement: Requirement) => {
  if (requirement === 'local_entity') return grant.requires_local_entity
  return grant.requires_new_market
}

export const matchesRequirements = (
  grant: Grant,
  selected: Requirement[]
) => {
  if (selected.length === 0) return true
  return selected.every((requirement) => hasRequirement(grant, requirement))
}

export { grants }
