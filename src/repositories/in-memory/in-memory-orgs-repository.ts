import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      address: data.address,
      whatsapp_phone: data.whatsapp_phone,
      email: data.email,
      password_hash: data.password_hash,
    }

    this.items.push(org)

    return org
  }

  async findByName(name: string) {
    const org = this.items.find((item) => item.name === name)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findManyByAddress(address: string) {
    const orgs = this.items.filter((item) => item.address.includes(address))

    return orgs
  }
}
