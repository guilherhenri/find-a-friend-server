import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Happy Cão',
      address: 'Avenida São João, 89 - Vila Joana, Jundiaí - SP, 13216-000',
      whatsapp_phone: '(11) 98877-5566',
      email: 'happycao@email.com',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'happycao@email.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
