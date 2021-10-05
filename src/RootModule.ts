import { Module } from '@nestjs/common';
import { AuthModule } from './auth/AuthModule';
import EntitiesModule from '../entities/EntitiesModule';
import { RouterModule } from 'nest-router';
import routes from './routers';

import configDatabase from '../config/database';
import { ConfigModule } from '@nestjs/config';
import BcryptModule from './bcrypt/BcryptModule';
import { ApiModule } from './api/ApiModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlackModule } from 'nestjs-slack-webhook';
import GenerateCodeModule from './gennerate/GenerateCodeModule';

@Module({
  imports: [
    SlackModule.forRoot({
      url: 'https://hooks.slack.com/services/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',
    }),
    RouterModule.forRoutes(routes()),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => configDatabase],
    }),
    AuthModule,
    ApiModule,
    BcryptModule,
    GenerateCodeModule,
    EntitiesModule,
  ],
})
export default class RootModule {}
