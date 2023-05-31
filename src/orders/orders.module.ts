import { Module } from '@nestjs/common';

import { OrderService } from './orders.service';
import { OrderController } from './orders.controller';
import { Order, OrderSchema } from '../../mongo/schema/order.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrdersModule {}
