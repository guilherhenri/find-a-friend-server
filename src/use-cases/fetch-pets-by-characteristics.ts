import { Pet } from '@prisma/client'

import {
  FetchPetsByCharacteristics,
  PetsRepository,
} from '@/repositories/pets-repository'

interface FetchPetsByCharacteristicsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByCharacteristicsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    breed,
    gender,
    age,
    castrated,
  }: FetchPetsByCharacteristics): Promise<FetchPetsByCharacteristicsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCharacteristics({
      breed,
      gender,
      age,
      castrated,
    })

    return { pets }
  }
}
