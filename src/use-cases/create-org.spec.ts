import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { CreateOrgUseCase } from './create-org'
import { NameAlreadyInUseError } from './errors/name-already-in-use-error'
import { EmailAlreadyInUseError } from './errors/email-already-in-use-error'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create a org', async () => {
    const { org } = await sut.execute({
      name: 'Happy Cão',
      address: 'Avenida São João, 89 - Vila Joana, Jundiaí - SP, 13216-000',
      whatsapp_phone: '(11) 98877-5566',
      email: 'happycao@email.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
    expect(org.name).toEqual('Happy Cão')
  })

  it('should not be able to create a org with an name that is already in use', async () => {
    await sut.execute({
      name: 'Happy Cão',
      address: 'Avenida São João, 89 - Vila Joana, Jundiaí - SP, 13216-000',
      whatsapp_phone: '(11) 98877-5566',
      email: 'happycao@email.com',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Happy Cão',
        address: 'Avenida São João, 89 - Vila Joana, Jundiaí - SP, 13216-000',
        whatsapp_phone: '(11) 98877-5566',
        email: 'happycao@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(NameAlreadyInUseError)
  })

  it('should not be able to create a org with a e-mail that is already in use', async () => {
    await sut.execute({
      name: 'Happy Cão',
      address: 'Avenida São João, 89 - Vila Joana, Jundiaí - SP, 13216-000',
      whatsapp_phone: '(11) 98877-5566',
      email: 'happycao@email.com',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Pets Friends',
        address: 'Avenida São João, 89 - Vila Joana, Jundiaí - SP, 13216-000',
        whatsapp_phone: '(11) 98877-5566',
        email: 'happycao@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyInUseError)
  })
})
