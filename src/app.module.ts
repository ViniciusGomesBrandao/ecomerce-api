import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';
import { UsersModule } from './core/users/users.module';
import { ProductModule } from './core/product/product.module';
import { CartModule } from './core/cart/cart.module';
import { SaleModule } from './core/sale/sale.module';

@Module({
  imports: [AuthModule, UsersModule, ProductModule, CartModule, SaleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
