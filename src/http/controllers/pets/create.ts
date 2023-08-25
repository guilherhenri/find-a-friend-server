import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    breed: z.string().nullable(),
    gender: z.enum(['male', 'female']),
    age: z.coerce.number(),
    castrated: z.boolean().default(false),
    orgId: z.string(),
  })

  const { name, breed, gender, age, castrated, orgId } = createBodySchema.parse(
    request.body,
  )

  try {
    const createPetUseCase = makeCreatePetUseCase()

    const { pet } = await createPetUseCase.execute({
      name,
      breed,
      gender,
      age,
      castrated,
      orgId,
    })

    return reply.status(201).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    return reply.status(500).send()
  }
}
