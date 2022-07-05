import { FastifyInstance } from 'fastify';

export function pingRoute(fastify: FastifyInstance) {
  fastify.get('/ping', async (_request, reply) => {
    return reply.code(201).send();
  });
}
