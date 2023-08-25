import { Pet, Prisma } from '@prisma/client'

export interface FetchPetsByCharacteristics {
  breed?: string
  gender?: 'male' | 'female'
  age?: number
  castrated?: boolean
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyByOrgId(orgsId: string[]): Promise<Pet[]>
  findManyByCharacteristics(data: FetchPetsByCharacteristics): Promise<Pet[]>
}
