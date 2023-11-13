import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IOutput } from '../_types/responses';
import { PrismaService } from '../_services/prisma.service';
import * as bcrypt from 'bcrypt';
import { GetListDto } from './dto/get-list.dto';
import { UserLogged } from '../_global_interfaces/user-logged.interface';
@Injectable()
export class UsersService {

  constructor(
    private prisma: PrismaService
  ) {

  }

  async create(
    createUserDto: CreateUserDto
  ) {
    let output: IOutput;
    try {

      //Check if existing user
      console.log(createUserDto)
      const existingUser = await this.prisma.user.findFirst({
        where: {
          username: createUserDto.username
        }
      });
      if (existingUser) {
        throw new Error('Usuário com login já existente');
      }

      let hash_password = await bcrypt.hash(createUserDto.password, 10);
      const userData = await this.prisma.user.create({
        data: {
          username: createUserDto.username,
          firstname: createUserDto.first_name,
          password: hash_password,
          ...createUserDto.last_name != undefined ? {
            lastname: createUserDto.last_name
          } : undefined,
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          created_at: true,
          role: true,
          status: true,
        }
      });

      output = {
        success: true,
        message: "Usuário criado com sucesso!",
        data: userData
      }

    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
  }

  async findAll(getListDto: GetListDto) {
    let response: IOutput;
    try {
      const userList = await this.prisma.user.findMany({
        skip: getListDto.page ? Number(getListDto.page) * Number(getListDto.limit) : 0,
        take: getListDto.limit ? Number(getListDto.limit) : 10,
        ...getListDto.search != undefined ? {
          where: {
            OR: [
              {
                firstname: {
                  contains: getListDto.search
                }
              },
              {
                lastname: {
                  contains: getListDto.search
                }
              },
            ]
          }
        } : undefined,
        select: {
          id: true,
          firstname: true,
          lastname: true,
          role: true,
          status: true,
          profile_image: true,
          created_at: true,
          updated_at: true,
        }
      });
      response = {
        success: false,
        message: "Usuários encontrados com sucesso!",
        data: userList
      }
    } catch (error) {
      response = {
        success: false,
        message: error.message
      }
    }
    return response;
  }

  async findOne(id: number) {
    let output: IOutput;
    try {
      const userData = await this.prisma.user.findUnique({
        where: {
          id: id
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          role: true,
          status: true,
          profile_image: true,
          created_at: true,
          updated_at: true
        }
      });
      output = {
        success: true,
        message: "Usuário encontrado com sucesso!",
        data: userData
      }
    } catch (error) {
      output = {
        success: true,
        message: error.message,
      }
    }
    return output;
  }

  async update(id: number, updateUserDto: UpdateUserDto, user: UserLogged) {
    let output: IOutput;
    try {

      //Obtain data from the user who made the request
      const userData = await this.prisma.user.findUnique({
        where: {
          id: user.id
        }
      });

      // Check permissions
      if (userData.id != id && userData.role != 'ADMIN') {
        throw new Error("Usuário não autorizado!")
      }

      if (updateUserDto.username) {
        //Check if is unique username
        const existUser = await this.prisma.user.findFirst({
          where: {
            username: updateUserDto.username
          }
        })
        if(existUser){
          throw new Error("Username já esta sendo utilizado")
        }
      }


      const dataUpdate = {
        ...updateUserDto.password ? {
          password: await bcrypt.hash(updateUserDto.password, 10)
        } : undefined,
        ...updateUserDto.first_name ? {
          firstname: updateUserDto.first_name
        } : undefined,
        ...updateUserDto.last_name ? {
          lastname: updateUserDto.last_name
        } : undefined,
        ...updateUserDto.username ? {
          username: updateUserDto.username
        } : undefined,
      }
      const updatedUser = await this.prisma.user.update({
        where: {
          id: id
        },
        data: {
          ...dataUpdate
        },
        select: {
          id: true,
          username: true,
          firstname: true,
          lastname: true,
          role: true,
          status: true,
          profile_image: true,
          created_at: true,
          updated_at: true,
        }
      })
      output = {
        success: true,
        message: "Usuário atualizado com sucesso!",
        data: updatedUser
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
  }

  async remove(id: number, user: UserLogged) {
    let output: IOutput;
    try {
      //Obtain data from the user who made the request
      const userData = await this.prisma.user.findUnique({
        where: {
          id: user.id
        }
      });

      // Check permissions
      if (userData.id != id && userData.role != 'ADMIN') {
        throw new Error("Usuário não autorizado!")
      }

      const updatedUser = await this.prisma.user.update({
        where: {
          id: id
        },
        data: {
          status: 'INACTIVE'
        },
        select: {
          id: true,
          username: true,
          firstname: true,
          lastname: true,
          role: true,
          status: true,
          profile_image: true,
          created_at: true,
          updated_at: true,
        }
      });
      output = {
        success: false,
        message: "Usuário desativado com sucesso!",
        data: updatedUser
      }
    } catch (error) {
      output = {
        success: true,
        message: error.message,
      }
    }
    return output;
  }
}
