import { Controller, Get, Param } from '@nestjs/common';

import { OrderService } from './orders.service';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Order } from '../../mongo/schema/order.schema';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Get orders' })
  @ApiParam({ name: 'page', type: Number })
  @ApiResponse({ status: 200, description: 'Returns the list of orders' })
  @Get()
  findFirstPage(): Promise<Order[]> {
    const paginationQuery: PaginationQueryDto = {
      limit: 25,
      page: 1,
    };
    return this.orderService.findAll(paginationQuery);
  }

  @ApiOperation({ summary: 'Get orders by page' })
  @ApiParam({ name: 'page', type: Number })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          default: 25,
        },
        page: {
          type: 'number',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Returns the list of orders' })
  @Get(':page')
  findAll(@Param('page') page: number): Promise<Order[]> {
    const paginationQuery: PaginationQueryDto = {
      limit: 25,
      page,
    };
    return this.orderService.findAll(paginationQuery);
  }

  // ...
}
