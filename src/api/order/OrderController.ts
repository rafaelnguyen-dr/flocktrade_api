import {
  Controller,
  Inject,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Put,
  Query,
} from '@nestjs/common';

@Controller('orders')
export class OrderController {
  @Get('/:id')
  async detail(@Param() { id }) {
    return id;
  }

  @Get()
  async search() {
    return 'oder';
  }
}
