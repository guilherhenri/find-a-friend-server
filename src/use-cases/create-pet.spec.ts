import { beforeEach, describe, expect, it } from 'vitest'

import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create a pet', async () => {
    await orgsRepository.create({
      id: 'org-01',
      name: 'Happy Cão',
      address: 'Avenida São João, 89 - Vila Joana, Jundiaí - SP, 13216-000',
      whatsapp_phone: '(11) 98877-5566',
      email: 'happycao@email.com',
      password_hash: await hash('123456', 6),
    })

    const { pet } = await sut.execute({
      name: 'Vincent',
      gender: 'male',
      breed: null,
      age: 1,
      orgId: 'org-01',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Vincent')
  })

  it('should not be able to create a pet in non-existing org', async () => {
    await expect(() =>
      sut.execute({
        name: 'Vincent',
        gender: 'male',
        breed: null,
        age: 1,
        orgId: 'org-01',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
