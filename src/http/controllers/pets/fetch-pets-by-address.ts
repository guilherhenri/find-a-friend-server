import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchPetsByAddressUseCase } from '@/use-cases/factories/make-fetch-pets-by-address-use-case'

export async function fetchPetsByAddress(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchPetsByAddressQuerySchema = z.object({
    address: z.string(),
  })

  const { address } = fetchPetsByAddressQuerySchema.parse(request.query)

  try {
    const fetchPetsByAddressUseCase = makeFetchPetsByAddressUseCase()

    const { pets } = await fetchPetsByAddressUseCase.execute({ address })

    return reply.status(200).send({ pets })
  } catch (err) {
    return reply.status(500).send()
  }
}
