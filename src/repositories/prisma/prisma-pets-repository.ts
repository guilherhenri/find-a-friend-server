import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

import { FetchPetsByCharacteristics, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
    })

    return pet
  }

  async findManyByOrgId(orgsId: string[]) {
    const pets = await prisma.pet.findMany({
      where: {
        org_id: {
          in: orgsId,
        },
      },
    })

    return pets
  }

  async findManyByCharacteristics(data: FetchPetsByCharacteristics) {
    const where: Prisma.PetWhereInput = {
      adopted: false,
    }

    if (data.breed !== undefined) {
      where.breed = { contains: data.breed }
    }

    if (data.gender !== undefined) {
      where.gender = data.gender
    }

    if (data.age !== undefined) {
      where.age = { lte: data.age }
    }

    if (data.castrated !== undefined) {
      where.castrated = data.castrated
    }

    const pets = await prisma.pet.findMany({ where })

    return pets
  }
}
