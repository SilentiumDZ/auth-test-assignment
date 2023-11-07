import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UsersModule, {
    transport: Transport.TCP, options: { port: Number(process.env.PORT) || 3004 },
  });
  await app.listen();
  await console.log('Microservice is listening');
}
bootstrap();
