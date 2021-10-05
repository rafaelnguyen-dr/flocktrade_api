import { Global, Module } from '@nestjs/common';
import BCryptHasher from './BCryptHasher';

@Global()
@Module({
  providers: [
    {
      provide: 'Hasher',
      useClass: BCryptHasher,
    },
  ],
  exports: [
    {
      provide: 'Hasher',
      useClass: BCryptHasher,
    },
  ],
})
export default class BcryptModule {}
