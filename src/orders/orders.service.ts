import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../../mongo/schema/order.schema';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<{ orders: Order[]; totalOrders: number }> {
    const { limit = 25, page = 1, sort } = paginationQuery;
    const offset = (page - 1) * limit;

    const query = this.orderModel.find().skip(offset).limit(limit);

    if (sort === 'asc') {
      query.sort({ surname: 1 });
    } else if (sort === 'desc') {
      query.sort({ surname: -1 });
    }

    const [orders, totalOrders] = await Promise.all([
      query.exec(),
      this.orderModel.countDocuments().exec(),
    ]);

    return { orders, totalOrders };
  }
}
