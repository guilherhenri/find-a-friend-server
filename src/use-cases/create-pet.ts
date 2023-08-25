import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  breed: string | null
  gender: 'male' | 'female'
  age: number
  castrated?: boolean
  orgId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    breed,
    gender,
    age,
    castrated = false,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const isOrgExists = await this.orgsRepository.findById(orgId)

    if (!isOrgExists) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      breed,
      gender,
      age,
      castrated,
      org_id: orgId,
    })

    return { pet }
  }
}
