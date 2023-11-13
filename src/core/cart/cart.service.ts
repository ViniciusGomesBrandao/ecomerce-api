import { Injectable } from '@nestjs/common';

import { UpdateCartDto } from './dto/update-cart.dto';
import { IOutput } from '../_types/responses';
import { AddProductDto } from './dto/add-product.dto';
import { PrismaService } from '../_services/prisma.service';

@Injectable()
export class CartService {
  constructor(
    private prisma: PrismaService
  ) {

  }
  async add(addProduct: AddProductDto, userId: number) {
    let output: IOutput;
    try {
      let idCart: any = await this.prisma.cart.findFirst({
        where: {
          userId: userId
        },
        select: {
          id: true
        }
      });

      //Create new cart
      if (!idCart) {
        idCart = await this.prisma.cart.create({
          data: {
            user: {
              connect: {
                id: userId
              }
            }
          },
          select: {
            id: true
          }
        });
      }


      const newProductInCart = await this.prisma.productOnCarts.create({
        data: {
          cart: {
            connect: {
              id: +idCart.id
            }
          },
          product: {
            connect: {
              id: +addProduct.id
            }
          }
        }
      });
      output = {
        success: true,
        message: "Produto adicionado com sucesso!",
        data: newProductInCart
      }
      return output;
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
  }

  async findAll(userId: number) {
    let output: IOutput;
    try {
      let idCart: any = await this.prisma.cart.findFirst({
        select: {
          id: true
        },
        where: {
          userId: userId
        }
      });

      //Create new cart
      if (!idCart) {
        idCart = await this.prisma.cart.create({
          data: {
            user: {
              connect: {
                id: userId
              }
            }
          },
          select: {
            id: true
          }
        });
      }

      const listProducts = await this.prisma.productOnCarts.findMany({
        where: {
          cartId: idCart.id
        },
        select: {
          amount: true,
          product: {
            select: {
              id: true,
              name: true,
              description: true,
              image: true,
              origin: true,
              status: true,
              type: true,
              value: true,
              creator: {
                select: {
                  firstname: true,
                  lastname: true,
                  profile_image: true,
                  status: true,
                }
              },
              amount: true,
              created_at: true,
              updated_at: true,
            },
          }
        }
      });
      output = {
        success: true,
        message: "Produtos listados com sucesso!",
        data: listProducts
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  async update(id: number, userId: number, updateCartDto: UpdateCartDto) {
    let output: IOutput;
    try {
      const idCart = await this.prisma.cart.findFirst({
        where: {
          userId: userId
        },
        select: {
          id: true
        }
      });
      const updateProduct = await this.prisma.productOnCarts.update({
        where: {
          productId_cartId: {
            cartId: idCart.id,
            productId: id
          }
        },
        data: {
          amount: +updateCartDto.amount
        }
      });
      output = {
        success: true,
        message: "Quatidade de produto atualizada com sucesso!",
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

  async remove(idProduct: number, userId: number) {
    let output: IOutput;
    try {
      const idCart = await this.prisma.cart.findFirst({
        where: {
          userId: userId
        },
        select: {
          id: true
        }
      });
      const removedProduct = await this.prisma.productOnCarts.delete({
        where: {
          productId_cartId: {
            cartId: idCart.id,
            productId: idProduct
          }
        }
      });
      output = {
        success: true,
        message: "Produto removido do carrinho com sucesso!",
        data: removedProduct
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
    // return `This action removes a #${id} cart`;
  }
}
