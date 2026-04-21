import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  matchesApplicantType,
  matchesName,
  matchesRequirements,
  matchesRevenueBand,
  type ApplicantType,
  type Grant,
  type Requirement,
  type RevenueBand,
} from '@/lib/grants'

// Prisma stores scalar arrays as Json in SQLite, and the column names are
// camelCased. This maps a DB row back to the same shape the client already
// uses, so the shared filter predicates stay unchanged.
type PrismaGrant = Awaited<ReturnType<typeof prisma.grant.findMany>>[number]

const toGrant = (row: PrismaGrant): Grant => ({
  id: row.id,
  name: row.name,
  summary: row.summary,
  supports: row.supports as string[],
  applicant_type: row.applicantType as ApplicantType[],
  employee_count_min: row.employeeCountMin,
  employee_count_max: row.employeeCountMax,
  revenue_band: row.revenueBand as RevenueBand[],
  business_goals: row.businessGoals as string[],
  requires_local_entity: row.requiresLocalEntity,
  requires_new_market: row.requiresNewMarket,
  notes: row.notes as string[],
})

const parseList = <T extends string>(value: string | null): T[] =>
  value
    ? value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean) as T[]
    : []

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const query = searchParams.get('q') ?? ''
  const types = parseList<ApplicantType>(searchParams.get('types'))
  const revenueBands = parseList<RevenueBand>(searchParams.get('revenueBands'))
  const requirements = parseList<Requirement>(searchParams.get('requirements'))

  const rows = await prisma.grant.findMany({ orderBy: { name: 'asc' } })
  const results = rows
    .map(toGrant)
    .filter(
      (grant: Grant): boolean =>
        matchesName(grant, query) &&
        matchesApplicantType(grant, types) &&
        matchesRevenueBand(grant, revenueBands) &&
        matchesRequirements(grant, requirements)
    )

  return NextResponse.json({ results })
}
