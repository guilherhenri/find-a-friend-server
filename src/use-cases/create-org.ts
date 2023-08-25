import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'

import { OrgsRepository } from '@/repositories/orgs-repository'
import { NameAlreadyInUseError } from './errors/name-already-in-use-error'
import { EmailAlreadyInUseError } from './errors/email-already-in-use-error'

interface CreateOrgUseCaseRequest {
  name: string
  address: string
  whatsapp_phone: string
  email: string
  password: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    address,
    whatsapp_phone,
    email,
    password,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgWithSameName = await this.orgsRepository.findByName(name)

    if (orgWithSameName) {
      throw new NameAlreadyInUseError()
    }

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new EmailAlreadyInUseError()
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      address,
      whatsapp_phone,
      email,
      password_hash,
    })

    return { org }
  }
}
