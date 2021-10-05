import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OrderController } from './order/OrderController';
import { AuthMiddleware } from '../middleware/AuthMiddleware';

@Module({
  controllers: [OrderController],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/api');
  }
}
