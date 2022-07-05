import { fastify } from 'fastify';
import { logger } from './config/local_config';
import { pingRoute } from './routes/ping';
// import { signInRoute } from './routes/sign_in';
import { signUpRoute } from './routes/sign_up';

const PORT = 3000;

const server = fastify({});

server.get('/', async (_request: any, _reply: any) => {
  return { hello: 'world' };
});

pingRoute(server);
signUpRoute(server);
// signInRoute(server);

(async () => {
  try {
    const address = await server.listen({ port: PORT });
    logger.info(`server listening on ${address}`);
  } catch (exception) {
    if (exception instanceof Error) {
      logger.fatal(exception.message, exception.stack);
    } else {
      logger.fatal((exception as any).toString());
    }
    process.exit(1);
  }
})();
