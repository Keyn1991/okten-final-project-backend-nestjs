import { Injectable, NotFoundException } from '@nestjs/common';
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

    if (filter) {
      query = query.find({
        $or: [
          { name: { $regex: filter, $options: 'i' } },
          { surname: { $regex: filter, $options: 'i' } },
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

  async findById(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      // Якщо замовлення не знайдено, викидаємо помилку NotFoundException
      throw new NotFoundException(`Замовлення з id ${id} не знайдено`);
    }
    return order;
  }

  async create(orderData: Partial<Order>): Promise<Order> {
    const order = new this.orderModel(orderData);
    return order.save();
  }
  async addComment(
    orderId: string,
    commentText: string,
    commentAuthor: string,
  ): Promise<Order> {
    const existingOrder = await this.orderModel.findById(orderId).exec();
    if (!existingOrder) {
      throw new NotFoundException(`Замовлення з id ${orderId} не знайдено`);
    }

    existingOrder.comment.push({
      text: commentText,
      author: commentAuthor,
      date: new Date(),
    });

    return existingOrder.save();
  }
}
