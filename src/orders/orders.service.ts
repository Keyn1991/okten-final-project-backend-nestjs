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
    paginationQuery: PaginationQueryDto & {
      sort?: 'asc' | 'desc';
      filter?: string;
    },
  ): Promise<{ orders: Order[]; totalOrders: number }> {
    const { limit = 25, page = 1, sort, filter } = paginationQuery;
    const offset = (page - 1) * limit;

    let query = this.orderModel.find();

    if (sort === 'asc') {
      query = query.sort({ surname: 1 });
    } else if (sort === 'desc') {
      query = query.sort({ surname: -1 });
    }

    // Apply filtering if provided
    if (filter) {
      query = query.find({
        $or: [
          { firstName: { $regex: filter, $options: 'i' } },
          { lastName: { $regex: filter, $options: 'i' } },
        ],
      });
    }

    query = query.skip(offset).limit(limit);

    const [orders, totalOrders] = await Promise.all([
      query.exec(),
      this.orderModel.countDocuments().exec(),
    ]);

    return { orders, totalOrders };
  }
}
