import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { FetchPetsByAddressUseCase } from './fetch-pets-by-address'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: FetchPetsByAddressUseCase

describe('Fetch Pets By Address Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FetchPetsByAddressUseCase(petsRepository, orgsRepository)
  })

  it('should be able to fetch pets by address', async () => {
    await orgsRepository.create({
      id: 'org-01',
      name: 'Happy Cão',
      address: 'Avenida São João, 89 - Vila Joana, Jundiaí - SP, 13216-000',
      whatsapp_phone: '(11) 98877-5566',
      email: 'happycao@email.com',
      password_hash: await hash('123456', 6),
    })

    await orgsRepository.create({
      id: 'org-02',
      name: 'Org 2',
      address: 'Address',
      whatsapp_phone: '(11) 98877-5566',
      email: 'org2@email.com',
      password_hash: await hash('123456', 6),
    })

    await petsRepository.create({
      name: 'Vincent',
      gender: 'male',
      age: 1,
      org_id: 'org-01',
    })

    await petsRepository.create({
      name: 'Jorge',
      gender: 'male',
      age: 1,
      org_id: 'org-02',
    })

    const { pets } = await sut.execute({
      address: 'Jundiaí',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Vincent',
      }),
    ])
  })
})
