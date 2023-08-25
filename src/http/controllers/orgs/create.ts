import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { EmailAlreadyInUseError } from '@/use-cases/errors/email-already-in-use-error'
import { NameAlreadyInUseError } from '@/use-cases/errors/name-already-in-use-error'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    address: z.string(),
    whatsapp_phone: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, address, whatsapp_phone, email, password } =
    createBodySchema.parse(request.body)

  try {
    const createOrgUseCase = makeCreateOrgUseCase()

    const { org } = await createOrgUseCase.execute({
      name,
      address,
      whatsapp_phone,
      email,
      password,
    })

    return reply.status(201).send({ org })
  } catch (err) {
    if (
      err instanceof NameAlreadyInUseError ||
      err instanceof EmailAlreadyInUseError
    ) {
      return reply.status(409).send({ message: err.message })
    }

    return reply.status(500).send()
  }
}
