import { PrismaClient } from '@prisma/client'
import grants from '../grants.json'

const prisma = new PrismaClient()

async function main() {
  for (const grant of grants) {
    await prisma.grant.upsert({
      where: { id: grant.id },
      create: {
        id: grant.id,
        name: grant.name,
        summary: grant.summary,
        supports: grant.supports,
        applicantType: grant.applicant_type,
        employeeCountMin: grant.employee_count_min,
        employeeCountMax: grant.employee_count_max,
        revenueBand: grant.revenue_band,
        businessGoals: grant.business_goals,
        requiresLocalEntity: grant.requires_local_entity,
        requiresNewMarket: grant.requires_new_market,
        notes: grant.notes,
      },
      update: {
        name: grant.name,
        summary: grant.summary,
        supports: grant.supports,
        applicantType: grant.applicant_type,
        employeeCountMin: grant.employee_count_min,
        employeeCountMax: grant.employee_count_max,
        revenueBand: grant.revenue_band,
        businessGoals: grant.business_goals,
        requiresLocalEntity: grant.requires_local_entity,
        requiresNewMarket: grant.requires_new_market,
        notes: grant.notes,
      },
    })
  }

  console.log(`Seeded ${grants.length} grants.`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
