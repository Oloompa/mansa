import { ConflictError } from '../../../core/model/error/conflict_error';
import { FastifyInstance } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import { ValidationErrors } from '../../../core/model/error/validation_error';
import { registerUseCase } from '../config/local_config';

const userSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['name', 'email', 'password'],
} as const;

export function signUpRoute(fastify: FastifyInstance) {
  fastify.post<{ Body: FromSchema<typeof userSchema> }>(
    '/sign-up',
    {
      schema: {
        body: userSchema,
      },
    },
    async (request, reply) => {
      try {
        const { name, email, password } = request.body;
        await registerUseCase.register(name, email, password);
        return await reply.code(201).send();
      } catch (exception) {
        if (exception instanceof ValidationErrors) {
          return reply.code(400).send(exception.getErrors());
        }
        if (exception instanceof ConflictError) {
          return reply.code(409).send(exception.message);
        }
        if (exception instanceof Error) {
          return reply.code(500).send(exception.message);
        }
        return reply.code(500).send((exception as any).toString());
      }
    },
  );
}
