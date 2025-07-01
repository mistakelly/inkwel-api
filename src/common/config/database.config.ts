import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { resolve } from 'path';

const entitiesPath = resolve(__dirname, '..', '..', '**', '*.entity.{ts,js}');
console.log('entitiesPath', entitiesPath)
export const databaseConfig = (
  configService: ConfigService,
): DataSourceOptions => {
  let extra = {};
  let databaseName: string;
  if (configService.get<boolean>('DATABASE_DEV_MODE')) {
    extra = {
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }

  if (configService.get<string>('NODE_ENV') === 'test') {
    databaseName = configService.get<string>('DATABASE_NAME') + '_test';
  } else {
    databaseName = configService.get<string>('DATABASE_NAME') ?? 'test';
  }

  const options: DataSourceOptions = {
    type: 'postgres',
    host: configService.get<string>('DATABASE_HOST'),
    port: +(configService.get<number>('DATABASE_PORT') ?? 5432),
    username: configService.get<string>('DATABASE_USERNAME'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: databaseName,
    entities: [entitiesPath],
    synchronize: true,
    logging: true,
    ssl: configService.get<boolean>('DATABASE_SSL_ENABLED') ? true : false,
    extra: extra,
    migrations: ['migration/*.js'],
  };

  return options;
};
