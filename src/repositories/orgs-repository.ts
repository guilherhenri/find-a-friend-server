import { Org, Prisma } from '@prisma/client'

export interface OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findById(id: string): Promise<Org | null>
  findByName(name: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  findManyByAddress(address: string): Promise<Org[]>
}
