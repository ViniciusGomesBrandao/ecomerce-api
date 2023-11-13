import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';

import { UpdateCartDto } from './dto/update-cart.dto';
import { AddProductDto } from './dto/add-product.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { AuthGuard } from '@nestjs/passport';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post('add')
  @ApiOperation({ summary: 'Adiciona um item ao carrinho de compras.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: AddProductDto
  })
  @ApiResponse({
    status: 200, description: 'Produto adicionado com sucesso!', schema: {
      type: "object",
      example: {
        success: true,
        message: "Produto adicionado com sucesso!",
        data: {
          productId: 1,
          cartId: 1,
          created_at: "2023-11-13T03:47:09.509Z",
          updated_at: "2023-11-13T03:47:09.509Z"
        }
      }
    }
  })
  @FormDataRequest()
  @ApiTags('Cart')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  addProduct(@Body() addProduct: AddProductDto, @Request() req: any) {
    return this.cartService.add(addProduct, req.user.id);
  }

  @Get()
  @ApiOperation({
    summary: "Lista os itens no carrinho de compras."
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200, description: 'Produto listados com sucesso!', schema: {
      type: "object",
      example: {
        success: true,
        message: "Produto encontrado com sucesso!",
        data: [
          {
            id: 1,
            name: "Produto Teste",
            image: null,
            description: "Produto destinado para teste",
            value: 9.9,
            amount: 10,
            origin: "ORIGINAL",
            type: "OTHER",
            creatorId: 2,
            status: "ACTIVE",
            created_at: "2023-11-05T05:46:57.538Z",
            updated_at: "2023-11-05T06:27:45.821Z"
          }
        ]
      }
    }
  })
  @ApiTags('Cart')
  @ApiBearerAuth('JWT')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  findAll(@Request() req: any) {
    return this.cartService.findAll(+req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza a quantidade de um item no carrinho de compras com base no ID fornecido.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateCartDto
  })
  @ApiResponse({
    status: 200, description: 'Produto atualizado com sucesso!', schema: {
      type: "object",
      example: {
        success: true,
        message: "Produto adicionado com sucesso!",
        data: {
          productId: 1,
          cartId: 1,
          created_at: "2023-11-13T03:47:09.509Z",
          updated_at: "2023-11-13T03:47:09.509Z"
        }
      }
    }
  })
  @FormDataRequest()
  @ApiTags('Cart')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto, @Request() req: any) {
    return this.cartService.update(+id, req.user.id, updateCartDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Remove itens do carrinho de compras."
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200, description: 'Produto removido do carrinho com sucesso!', schema: {
      type: "object",
      example: {
        success: true,
        message: "Produto encontrado com sucesso!",
        data: [
          {
            id: 1,
            name: "Produto Teste",
            image: null,
            description: "Produto destinado para teste",
            value: 9.9,
            amount: 10,
            origin: "ORIGINAL",
            type: "OTHER",
            creatorId: 2,
            status: "ACTIVE",
            created_at: "2023-11-05T05:46:57.538Z",
            updated_at: "2023-11-05T06:27:45.821Z"
          }
        ]
      }
    }
  })
  @ApiTags('Cart')
  @ApiBearerAuth('JWT')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @Request() req: any) {
    return this.cartService.remove(+id, req.user.id);
  }
}
