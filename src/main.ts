import createApp from './app';
import { logger } from './middleware/LoggerMiddleware';

async function bootstrap() {
  const app = await createApp();
  await app.listen(process.env.PORT || 3000);
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(127);
});
