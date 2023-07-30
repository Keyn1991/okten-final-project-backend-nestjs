import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
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

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop()
  role: string;

  @Prop()
  password: string;

  @Prop([{ text: String, author: String, date: Date }]) // Використайте масив об'єктів для коментарів
  comment: { text: string; author: string; date: Date }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
