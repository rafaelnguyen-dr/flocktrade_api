import { AuthModule } from './auth/AuthModule';
import { ApiModule } from './api/ApiModule';

export default () => {
  return [
    { path: '/auth', module: AuthModule },
    { path: '/api', module: ApiModule },
  ];
};
