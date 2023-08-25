import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchPetsByCharacteristicsUseCase } from '@/use-cases/factories/make-fetch-pets-by-characteristics-use-case'

export async function fetchPetsByCharacteristics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchPetsByCharacteristicsBodySchema = z.object({
    breed: z.string().optional(),
    gender: z.enum(['male', 'female']).optional(),
    age: z.number().optional(),
    castrated: z.boolean().optional(),
  })

  const { breed, gender, age, castrated } =
    fetchPetsByCharacteristicsBodySchema.parse(request.body)

  try {
    const fetchPetsByCharacteristicsUseCase =
      makeFetchPetsByCharacteristicsUseCase()

    const { pets } = await fetchPetsByCharacteristicsUseCase.execute({
      breed,
      gender,
      age,
      castrated,
    })

    return reply.status(200).send({ pets })
  } catch (err) {
    return reply.status(500).send()
  }
}
