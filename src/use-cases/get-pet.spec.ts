import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetUseCase } from './get-pet'

let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get pets by id', async () => {
    const { id } = await petsRepository.create({
      name: 'Vincent',
      breed: 'vira-lata',
      gender: 'male',
      age: 5,
      org_id: 'org-01',
    })

    const { pet } = await sut.execute({
      petId: id,
    })

    expect(pet.id).toEqual(id)
  })
})
