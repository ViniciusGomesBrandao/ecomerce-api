import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { PrismaService } from '../_services/prisma.service';

@Module({
  imports: [
    NestjsFormDataModule
  ],
  controllers: [SaleController],
  providers: [SaleService, PrismaService],
})
export class SaleModule {}
