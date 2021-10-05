import { Global, Module } from '@nestjs/common';
import User, { UserRepository } from './User';
import Credential, { CredentialRepository } from './Credential';
import { TypeOrmModule } from '@nestjs/typeorm';

const featureImports = TypeOrmModule.forFeature([User, UserRepository]);

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...require('../../ormconfig'),
      entities: [User],
      migrations: ['migration/**/*{.ts, .js}'],
      subscribers: ['subscriber/**/*{.ts, .js}'],
    }),
    featureImports,
  ],

  exports: [featureImports],
})
export default class EntitiesModule {}
