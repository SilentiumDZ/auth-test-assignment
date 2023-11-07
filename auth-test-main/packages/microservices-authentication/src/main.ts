import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthModule, {
    transport: Transport.TCP, options: { port: Number(process.env.PORT) || 3003 },
  });
  await app.listen();
  await console.log('Microservice is listening');
}
bootstrap();
