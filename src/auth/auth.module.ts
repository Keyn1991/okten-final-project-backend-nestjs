import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from '../../mongo/schema/user.schema';
import { JwtStrategy } from '../strategy/JwtStrategy';
import { LocalStrategy } from '../strategy/local.strategy';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: '123456',
      signOptions: { expiresIn: '7h' },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
