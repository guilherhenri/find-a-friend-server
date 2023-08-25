import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({ data })

    return org
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: { id },
    })

    return org
  }

  async findByName(name: string) {
    const org = await prisma.org.findUnique({
      where: { name },
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: { email },
    })

    return org
  }

  async findManyByAddress(address: string) {
    const orgs = await prisma.org.findMany({
      where: {
        address: {
          contains: address,
        },
      },
    })

    return orgs
  }
}
