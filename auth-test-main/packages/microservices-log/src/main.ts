import { NestFactory } from '@nestjs/core';
import { LogModule } from './log.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(LogModule, {
    transport: Transport.TCP, options: { port: Number(process.env.PORT) || 3005 },
  });
  await app.listen();
  await console.log('Microservice is listening');
}
bootstrap();
