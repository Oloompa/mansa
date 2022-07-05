import { FastifyInstance } from 'fastify';
import { Logger } from '../../../core/ports/library/logger';

export function initOnResponseHook(fastify: FastifyInstance, logger: Logger) {
  fastify.addHook('onResponse', (request, reply, done) => {
    logger.info(`${reply.statusCode} ${request.method} ${request.url}`);
    done();
  });
}
