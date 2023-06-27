import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../../mongo/schema/order.schema';
import { Prop } from '@nestjs/mongoose';

export class PaginationQueryDto {
  @ApiProperty({
    required: false,
    default: 25,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit: number;

  surname: string;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  page: number;

  sort?: 'asc' | 'desc';

  @ApiProperty({
    required: false,
    type: Number,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number;
}
export class PaginatedOrdersDto {
  orders: Order[];
  totalOrders: number;
  totalPages: number;
}
