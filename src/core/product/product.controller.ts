import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpCode, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { AuthGuard } from '@nestjs/passport';
import { GetListFilters } from './dto/get-list-filters.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @ApiOperation({ summary: 'Cria um novo produto na base de dados.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateProductDto
  })
  @ApiResponse({
    status: 200, description: 'Usuario criado com sucesso', schema: {
      type: "object",
      example: {
        success: true,
        message: "Usuário criado com sucesso!",
        data: {
          id: 1,
          firstname: "Mauricio",
          lastname: "Sousa",
          created_at: "2023-10-20T05:02:09.712Z",
          role: "USER",
          status: "ACTIVE"
        }
      }
    }
  })
  @FormDataRequest()
  @ApiTags('Products')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  async create(@Body() createProductDto: CreateProductDto, @Request() req: any) {
    return await this.productService.create(createProductDto, req.user.id);
  }


  @Get()
  @ApiOperation({
    summary: "Lista todos os produtos disponíveis na base de dados."
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
  @ApiTags('Products')
  @ApiBearerAuth('JWT')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  findAll(@Query() getListDto: GetListFilters, @Request() req: any) {
    return this.productService.findAll(getListDto, req.user.id);
  }

  @Get(':id')
  @ApiOperation({
    summary: "Obtém informações de um produto com base no ID fornecido"
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200, description: 'Produto encontrado com sucesso!', schema: {
      type: "object",
      example: {
        success: true,
        message: "Produto encontrado com sucesso!",
        data: {
          id: 1,
          name: "Produto Teste",
          image: null,
          description: "Produto testinado para teste",
          value: 9.9,
          amount: 10,
          origin: "ORIGINAL",
          type: "OTHER",
          creatorId: 2,
          status: "ACTIVE",
          created_at: "2023-11-05T05:46:57.538Z",
          updated_at: "2023-11-05T05:46:57.538Z"
        }
      }
    }
  })
  @ApiTags('Products')
  @ApiBearerAuth('JWT')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza informações de um produto existente na base de dados.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateProductDto
  })
  @ApiResponse({
    status: 200, description: 'Usuario criado com sucesso', schema: {
      type: "object",
      example: {
        success: true,
        message: "Produto atualizado com sucesso!",
        data: {
          id: 1,
          name: "Produto Teste",
          image: null,
          description: "Produto testinado para teste",
          value: 9.9,
          amount: 10,
          origin: "ORIGINAL",
          type: "OTHER",
          creatorId: 2,
          status: "ACTIVE",
          created_at: "2023-11-05T05:46:57.538Z",
          updated_at: "2023-11-05T05:46:57.538Z"
        }
      }
    }
  })
  @FormDataRequest()
  @ApiTags('Products')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Remove um produto da base de dados."
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200, description: 'Usuario criado com sucesso', schema: {
      type: "object",
      example: {
        success: true,
        message: "Produto removido do carrinho com sucesso!",
        data: {
          productId: 1,
          cartId: 1,
          created_at: "2023-11-13T03:47:09.509Z",
          updated_at: "2023-11-13T03:47:09.509Z"
        }
      }
    }
  })
  @ApiTags('Products')
  @ApiBearerAuth('JWT')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
