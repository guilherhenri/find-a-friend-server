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

  it('should be able to list pets by characteristics', async () => {
    await prisma.org.create({
      data: {
        name: 'Org 1',
        address: 'Avenida São João, 89 - Vila Joana, Jundiaí - SP, 13216-000',
        whatsapp_phone: '(11) 98877-5566',
        email: 'happycao@email.com',
        password_hash: await hash('123456', 6),
      },
    })

    const org = await prisma.org.findFirstOrThrow()

    await prisma.pet.createMany({
      data: [
        {
          name: 'Vincent',
          gender: 'male',
          age: 5,
          org_id: org.id,
        },
        {
          name: 'Maria',
          breed: 'vira-lata',
          gender: 'female',
          age: 1,
          org_id: org.id,
          castrated: true,
        },
      ],
    })

    const response = await request(app.server)
      .post(`/pets/fetch/characteristics`)
      .send({
        castrated: true,
      })

    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Maria',
      }),
    ])
  })
})
