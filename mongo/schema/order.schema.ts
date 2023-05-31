import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  age: number;

  @Prop()
  course: string;

  @Prop()
  course_format: string;

  @Prop()
  course_type: string;

  @Prop()
  status: string;

  @Prop()
  sum: number;

  @Prop()
  alreadyPaid: number;

  @Prop()
  created_at: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
