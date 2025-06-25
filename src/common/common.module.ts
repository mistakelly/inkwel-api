import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...databaseConfig(config),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class CommonModule {}
