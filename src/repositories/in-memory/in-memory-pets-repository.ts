import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { FetchPetsByCharacteristics, PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      breed: data.breed ?? null,
      gender: data.gender,
      age: data.age,
      castrated: data.castrated ?? false,
      org_id: data.org_id,
      adopted: false,
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByOrgId(orgsId: string[]) {
    const pets = this.items.filter(
      (item) => orgsId.includes(item.org_id) && !item.adopted,
    )

    return pets
  }

  async findManyByCharacteristics(data: FetchPetsByCharacteristics) {
    let pets = this.items

    if (data.breed !== undefined) {
      pets = pets.filter(
        (pet) => data.breed !== undefined && pet.breed?.includes(data.breed),
      )
    }

    if (data.gender !== undefined) {
      pets = pets.filter(
        (pet) => data.gender !== undefined && pet.gender.includes(data.gender),
      )
    }

    if (data.age !== undefined) {
      pets = pets.filter((pet) => data.age !== undefined && pet.age <= data.age)
    }

    if (data.castrated !== undefined) {
      pets = pets.filter(
        (pet) =>
          data.castrated !== undefined && pet.castrated === data.castrated,
      )
    }

    return pets
  }
}
