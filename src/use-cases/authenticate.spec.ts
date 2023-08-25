import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate a org', async () => {
    await orgsRepository.create({
      name: 'Happy Cão',
      address: 'Avenida São João, 89 - Vila Joana, Jundiaí - SP, 13216-000',
      whatsapp_phone: '(11) 98877-5566',
      email: 'happycao@email.com',
      password_hash: await hash('123456', 6),
    })

    const { org } = await sut.execute({
      email: 'happycao@email.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate an non-existent org', async () => {
    await expect(() =>
      sut.execute({
        email: 'happycao@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate a org with wrong password', async () => {
    await orgsRepository.create({
      name: 'Happy Cão',
      address: 'Avenida São João, 89 - Vila Joana, Jundiaí - SP, 13216-000',
      whatsapp_phone: '(11) 98877-5566',
      email: 'happycao@email.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'happycao@email.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
