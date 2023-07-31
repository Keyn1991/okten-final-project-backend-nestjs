import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from './dto/pagination-query.dto';

import { OrderService } from './orders.service';
import { Order } from '../../mongo/schema/order.schema';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
    @Query('sort') sort?: 'asc' | 'desc',
    @Query('filter') filter?: string,
  ): Promise<{ orders: Order[]; totalOrders: number; totalPages: number }> {
    const { limit = 25, page = 1 } = paginationQuery;
    const query: PaginationQueryDto & {
      sort?: 'asc' | 'desc';
      filter?: string;
    } = {
      ...paginationQuery,
      sort: sort === 'asc' || sort === 'desc' ? sort : undefined,
      filter,
    };

    const { orders, totalOrders } = await this.orderService.findAll(query);
    const totalPages = Math.ceil(totalOrders / limit);
    return { orders, totalOrders, totalPages };
  }
  @Post()
  async create(@Body() orderData: Partial<Order>): Promise<Order> {
    return this.orderService.create(orderData);
  }

  @Post(':id/comment')
  async addComment(
    @Param('id') id: string,
    @Body() commentData: { text: string; author: string },
  ): Promise<Order> {
    return this.orderService.addComment(
      id,
      commentData.text,
      commentData.author,
    );
  }
}
