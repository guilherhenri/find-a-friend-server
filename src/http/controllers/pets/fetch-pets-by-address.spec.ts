import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Fetch Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list pets by address', async () => {
    await prisma.org.createMany({
      data: [
        {
          name: 'Org 1',
          address: 'Avenida São João, 89 - Vila Joana, Jundiaí - SP, 13216-000',
          whatsapp_phone: '(11) 98877-5566',
          email: 'happycao@email.com',
          password_hash: await hash('123456', 6),
        },
        {
          name: 'Org 2',
          address: 'Address',
          whatsapp_phone: '(11) 98877-5566',
          email: 'org2@email.com',
          password_hash: await hash('123456', 6),
        },
      ],
    })

    const [org1, org2] = await prisma.org.findMany()

    await prisma.pet.createMany({
      data: [
        {
          name: 'Vincent',
          gender: 'male',
          age: 1,
          org_id: org1.id,
        },
        {
          name: 'Jorge',
          gender: 'male',
          age: 1,
          org_id: org2.id,
        },
      ],
    })

    const response = await request(app.server)
      .get(`/pets/fetch/address`)
      .query({
        address: 'Jundiaí',
      })
      .send()

    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Vincent',
      }),
    ])
  })
})
