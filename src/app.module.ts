import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './strategy/JwtStrategy';
import { User, UserSchema } from '../mongo/schema/user.schema';
import { config } from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { AuthService } from './auth/auth.service';
import { UserService } from './users/user.service';
import { OrdersModule } from './orders/orders.module';
config();
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    AuthModule,
    UserModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, AuthService, UserService],
})
export class AppModule {}
