import { ConflictError } from '../../../core/model/error/conflict_error';
import { FastifyInstance } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import { ValidationErrors } from '../../../core/model/error/validation_error';
import { loginUseCase } from '../config/local_config';

const userSchema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['name', 'email', 'password'],
} as const;

export function signInRoute(fastify: FastifyInstance) {
  fastify.post<{ Body: FromSchema<typeof userSchema> }>(
    '/sign-up',
    {
      schema: {
        body: userSchema,
        response: {
          200: {
            type: 'string',
          },
          400: {
            type: 'object',
          },
          409: {
            type: 'string',
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { email, password } = request.body;
        const name = await loginUseCase.login(email, password);
        return await reply.code(200).send(name);
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
