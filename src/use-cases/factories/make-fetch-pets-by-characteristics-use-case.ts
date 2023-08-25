import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByCharacteristicsUseCase } from '../fetch-pets-by-characteristics'

export function makeFetchPetsByCharacteristicsUseCase() {
  const petsRepository = new PrismaPetsRepository()

  const useCase = new FetchPetsByCharacteristicsUseCase(petsRepository)

  return useCase
}
