import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByAddressUseCase } from '../fetch-pets-by-address'

export function makeFetchPetsByAddressUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const useCase = new FetchPetsByAddressUseCase(petsRepository, orgsRepository)

  return useCase
}
