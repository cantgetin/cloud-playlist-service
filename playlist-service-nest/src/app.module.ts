import { Module } from '@nestjs/common';
import { PlaylistModule } from './playlist/playlist.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {SequelizeModule, SequelizeModuleOptions} from '@nestjs/sequelize'
import {LoggerModule, PinoLogger} from 'nestjs-pino'
@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        pinoHttp: {
          safe: true,
          prettyPrint: configService.get<string>('NODE_ENV') !== 'production'
        }
      }),
      inject: [ConfigService]
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule, LoggerModule],
      useFactory: async (configService: ConfigService, logger: PinoLogger): Promise<SequelizeModuleOptions> => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        logging: logger.info.bind(logger),
        typeValidation: true,
        benchmark: true,
        native: true,
        autoLoadModels: true,
        synchronize: configService.get<boolean>('DB_SYNC'),
        define: {
          timestamps: true,
          underscored: true,
          version: true,
          schema: configService.get<string>('DB_SCHEMA')
        }
      }),
      inject: [ConfigService, PinoLogger]
    }),
    PlaylistModule
  ],
})
export class AppModule {}
