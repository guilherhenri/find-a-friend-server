import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsByCharacteristicsUseCase } from './fetch-pets-by-characteristics'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsByCharacteristicsUseCase

describe('Fetch Pets By Characteristics Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsByCharacteristicsUseCase(petsRepository)
  })

  it('should be able to fetch pets by all characteristics', async () => {
    await petsRepository.create({
      name: 'Vincent',
      breed: 'vira-lata',
      gender: 'male',
      age: 5,
      org_id: 'org-01',
    })

    await petsRepository.create({
      name: 'Maria',
      breed: 'vira-lata',
      gender: 'female',
      age: 1,
      org_id: 'org-02',
      castrated: true,
    })

    const { pets } = await sut.execute({
      breed: 'vira-lata',
      gender: 'female',
      age: 1,
      castrated: true,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Maria',
      }),
    ])
  })

  it('should be able to fetch pets by breed', async () => {
    await petsRepository.create({
      name: 'Vincent',
      gender: 'male',
      age: 5,
      org_id: 'org-01',
    })

    await petsRepository.create({
      name: 'Maria',
      breed: 'vira-lata',
      gender: 'female',
      age: 1,
      org_id: 'org-02',
      castrated: true,
    })

    const { pets } = await sut.execute({
      breed: 'vira-lata',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Maria',
      }),
    ])
  })

  it('should be able to fetch pets by gender', async () => {
    await petsRepository.create({
      name: 'Vincent',
      gender: 'male',
      age: 5,
      org_id: 'org-01',
    })

    await petsRepository.create({
      name: 'Maria',
      breed: 'vira-lata',
      gender: 'female',
      age: 1,
      org_id: 'org-02',
      castrated: true,
    })

    const { pets } = await sut.execute({
      gender: 'female',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Maria',
      }),
    ])
  })

  it('should be able to fetch pets by max age', async () => {
    await petsRepository.create({
      name: 'Vincent',
      gender: 'male',
      age: 5,
      org_id: 'org-01',
    })

    await petsRepository.create({
      name: 'Maria',
      breed: 'vira-lata',
      gender: 'female',
      age: 1,
      org_id: 'org-02',
      castrated: true,
    })

    const { pets } = await sut.execute({
      age: 4,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Maria',
      }),
    ])
  })

  it('should be able to fetch pets that are castrated or not', async () => {
    await petsRepository.create({
      name: 'Vincent',
      gender: 'male',
      age: 5,
      org_id: 'org-01',
    })

    await petsRepository.create({
      name: 'Maria',
      breed: 'vira-lata',
      gender: 'female',
      age: 1,
      org_id: 'org-02',
      castrated: true,
    })

    const { pets } = await sut.execute({
      castrated: true,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Maria',
      }),
    ])
  })
})
