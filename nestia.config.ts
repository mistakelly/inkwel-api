import { INestiaConfig } from '@nestia/sdk';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './src/app.module';

const NESTIA_CONFIG: INestiaConfig = {
  input: async () => {
    const app = await NestFactory.create(AppModule);
    return app;
  },
  output: 'libs/api',
  clone: true,
  distribute: 'packages/api',
  swagger: {
    output: 'assets/swagger.json',
    beautify: true,
    // security: {
    //   bearer: {
    //     type: 'http',
    //     scheme: 'bearer',
    //   },
    // },
    servers: [
      {
        url: 'http://localhost:3000/api/',
        description: 'Local Server',
      },
    ],
  },
};
export default NESTIA_CONFIG;
