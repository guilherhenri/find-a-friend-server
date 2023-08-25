import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { getPet } from './get-pet'
import { fetchPetsByAddress } from './fetch-pets-by-address'
import { fetchPetsByCharacteristics } from './fetch-pets-by-characteristics'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:petId', getPet)
  app.get('/pets/fetch/address', fetchPetsByAddress)
  app.post('/pets/fetch/characteristics', fetchPetsByCharacteristics)

  app.post('/pets', { onRequest: [verifyJWT] }, create)
}
