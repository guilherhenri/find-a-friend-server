import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an pet', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Happy Cão',
      address: 'Avenida São João, 89 - Vila Joana, Jundiaí - SP, 13216-000',
      whatsapp_phone: '(11) 98877-5566',
      email: 'happycao@email.com',
      password: '123456',
    })

    const org = await prisma.org.findFirstOrThrow()

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'happycao@email.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Vincent',
        gender: 'male',
        breed: null,
        age: 1,
        orgId: org.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
