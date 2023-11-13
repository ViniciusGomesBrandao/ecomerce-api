import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IOutput } from '../_types/responses';
import { PrismaService } from '../_services/prisma.service';
import { GetListFilters } from './dto/get-list-filters.dto';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService
  ) {

  }

  async create(createProductDto: CreateProductDto, userId: number) {
    let output: IOutput;
    try {
      const newProduct = await this.prisma.product.create({
        data: {
          name: createProductDto.name,
          type: createProductDto.type,
          value: Number(createProductDto.value),
          ...createProductDto.amount ? {
            amount: Number(createProductDto.amount)
          } : undefined,
          ...createProductDto.description ? {
            description: createProductDto.description
          } : undefined,
          ...createProductDto.origin ? {
            origin: createProductDto.origin
          } : undefined,
          creator: {
            connect: {
              id: userId
            }
          }
        },
        select: {
          id: true,
          name: true,
          amount: true,
          type: true,
          value: true,
          description: true,
          origin: true,
        }
      })
      output = {
        success: true,
        message: "Produto criado com sucesso!",
        data: newProduct
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
  }

  async findAll(filters: GetListFilters, userId: number) {
    let output: IOutput;
    try {
      const productList = await this.prisma.product.findMany({
        where: {
          name: {
            contains: filters.name
          },
          amount: filters.amount,
          origin: filters.origin,
          type: filters.type,
          status: filters.status,
          description: {
            contains: filters.description
          }
          
        }
      });
      output = {
        success: true,
        message: "Lista de produtos encontrada com sucesso!",
        data: productList
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
  }

  async findOne(id: number) {

    let output: IOutput;
    try {
      const detail = await this.prisma.product.findFirst({
        where: {
          id: id
        }
      });

      output = {
        success: true,
        message: "Produto encontrado com sucesso!",
        data: detail
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    let output: IOutput;
    try {
      const checkExisting = await this.prisma.product.findFirst({
        where: {
          id: id
        }
      });
      if (!checkExisting) {
        throw new Error("Produto não encontrado!")
      }

      const updateProduct = await this.prisma.product.update({
        where: {
          id: id
        },
        data: {
          ...updateProductDto.name ? {
            name: updateProductDto.name
          } : undefined,
          ...updateProductDto.type ? {
            type: updateProductDto.type
          } : undefined,
          ...updateProductDto.value ? {
            value: Number(updateProductDto.value)
          } : undefined,
          ...updateProductDto.description ? {
            description: updateProductDto.description
          } : undefined,
          ...updateProductDto.amount ? {
            amount: Number(updateProductDto.amount)
          } : undefined,
          ...updateProductDto.origin ? {
            origin: updateProductDto.origin
          } : undefined,
          ...updateProductDto.status ? {
            status: updateProductDto.status
          } : undefined
        }
      });

      output = {
        success: true,
        message: "Produto atualizado com sucesso!",
        data: updateProduct
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
  }

  async remove(id: number) {
    let output: IOutput;
    try {
      const checkExisting = await this.prisma.product.findFirst({
        where: {
          id: id,
          status: "ACTIVE"
        }
      });
      if (!checkExisting) {
        throw new Error("Produto não encontrado")
      }

      const disabled = await this.prisma.product.update({
        where: {
          id: id
        },
        data: {
          status: "INACTIVE"
        }
      });

      output = {
        success: true,
        message: "Produto desativado com sucesso!",
        data: disabled
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
  }
}
