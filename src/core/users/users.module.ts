import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../_services/prisma.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
@Module({
  imports: [
    NestjsFormDataModule
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, JwtStrategy],
})
export class UsersModule {}
