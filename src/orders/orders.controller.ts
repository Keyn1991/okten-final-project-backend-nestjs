import { Controller, Get, Param, Query } from '@nestjs/common';
import { OrderService } from './orders.service';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Order } from '../../mongo/schema/order.schema';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Get orders' })
  @ApiQuery({
    name: 'limit',
    schema: { default: 25, minimum: 1 },
    required: false,
  })
  @ApiQuery({ name: 'page', schema: { type: 'number' }, required: false })
  @ApiQuery({
    name: 'sort',
    enum: ['asc', 'desc'],
    required: false,
  })
  @ApiResponse({ status: 200, description: 'Returns the list of orders' })
  @Get()
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
    @Query('sort') sort?: 'asc' | 'desc', // Update the type of 'sort'
  ): Promise<{
    orders: Order[];
    totalOrders: number;
    totalPages: number;
  }> {
    const { limit = 25, page = 1 } = paginationQuery;
    const query: PaginationQueryDto & { sort?: 'asc' | 'desc' } = {
      // Update the type of 'query'
      ...paginationQuery,
      sort: sort === 'asc' || sort === 'desc' ? sort : undefined,
    };
    const { orders, totalOrders } = await this.orderService.findAll(query);
    const totalPages = Math.ceil(totalOrders / limit);
    return { orders, totalOrders, totalPages };
  }

  @ApiOperation({ summary: 'Get orders by page' })
  @ApiQuery({
    name: 'limit',
    schema: { default: 25, minimum: 1 },
    required: false,
  })
  @ApiQuery({
    name: 'sort',
    enum: ['asc', 'desc'],
    required: false,
  })
  @ApiResponse({ status: 200, description: 'Returns the list of orders' })
  @Get(':page')
  async findAllByPage(
    @Param('page') page: number,
    @Query() paginationQuery: PaginationQueryDto,
    @Query('sort') sort?: 'asc' | 'desc', // Update the type of 'sort'
  ): Promise<{
    orders: Order[];
    totalOrders: number;
    totalPages: number;
  }> {
    paginationQuery.page = page;
    const { limit = 25 } = paginationQuery;
    const query: PaginationQueryDto & { sort?: 'asc' | 'desc' } = {
      // Update the type of 'query'
      ...paginationQuery,
      sort: sort === 'asc' || sort === 'desc' ? sort : undefined,
    };
    const { orders, totalOrders } = await this.orderService.findAll(query);
    const totalPages = Math.ceil(totalOrders / limit);
    return { orders, totalOrders, totalPages };
  }
}
