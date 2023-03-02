import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { INestMicroservice, Logger } from '@nestjs/common';

async function bootstrap() {
  const app: INestMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.GRPC,
      options: {
        url: `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
        package: 'playlist',
        protoPath: join(__dirname, './proto/playlist.proto'),
        loader: {
          keepCase: true,
          enums: String,
          oneofs: true,
          arrays: true,
        },
      },
    });

  return app
    .listen()
    .then(() => new Logger('Main').log('Microservice playlist is listening'));
}

bootstrap();
