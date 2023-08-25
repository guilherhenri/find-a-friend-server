import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface FetchPetsByAddressUseCaseRequest {
  address: string
}

interface FetchPetsByAddressUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByAddressUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    address,
  }: FetchPetsByAddressUseCaseRequest): Promise<FetchPetsByAddressUseCaseResponse> {
    const orgs = await this.orgsRepository.findManyByAddress(address)

    const orgsId = orgs.map((org) => {
      return org.id
    })

    const pets = await this.petsRepository.findManyByOrgId(orgsId)

    return { pets }
  }
}
