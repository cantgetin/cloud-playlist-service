import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'playlist',
        protoPath: join(__dirname, '../proto/playlist.proto'),
      },
    },
  );
}

bootstrap();
