import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createTables } from './infra/database/init-db';

async function bootstrap() {
  await createTables();

  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
