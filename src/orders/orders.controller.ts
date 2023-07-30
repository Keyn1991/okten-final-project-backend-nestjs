import { Controller, Get, Query } from '@nestjs/common';
import { OrderService } from './orders.service';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Order } from '../../mongo/schema/order.schema';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
    @Query('sort') sort?: 'asc' | 'desc', // Update the type of 'sort'
    @Query('filter') filter?: string, // Add a filter parameter for filtering
  ): Promise<{ orders: Order[]; totalOrders: number; totalPages: number }> {
    const { limit = 25, page = 1 } = paginationQuery;
    const query: PaginationQueryDto & {
      sort?: 'asc' | 'desc';
      filter?: string;
    } = {
      ...paginationQuery,
      sort: sort === 'asc' || sort === 'desc' ? sort : undefined,
      filter, // Include the filter in the query object
    };

    const { orders, totalOrders } = await this.orderService.findAll(query);
    const totalPages = Math.ceil(totalOrders / limit);
    return { orders, totalOrders, totalPages };
  }
}
