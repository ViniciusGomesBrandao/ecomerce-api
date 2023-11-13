import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, HttpStatus, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { GetListDto } from './dto/get-list.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Endpoint para criar um novo usuário no sistema.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateUserDto
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
  @ApiTags('Users')
  @HttpCode(HttpStatus.OK)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Endpoint para obter uma lista de usuários.' })
  @ApiResponse({
    status: 200, description: 'A listagem foi concluida com sucesso!', schema: {
      type: "object",
      example: {
        success: false,
        message: "Usuários encontrados com sucesso!",
        data: [
          {
            id: 1,
            firstname: "Mauricio",
            lastname: "Sousa",
            role: "USER",
            status: "ACTIVE",
            profile_image: null,
            created_at: "2023-10-20T05:02:09.712Z",
            updated_at: "2023-10-20T05:02:09.712Z"
          },
        ]
      }
    }
  })
  @ApiTags('Users')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  async findAll(@Query() getListDto: GetListDto) {
    return await this.usersService.findAll(getListDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Endpoint para obter um usuário com base no ID fornecido.' })
  @ApiResponse({
    status: 200, description: 'A listagem foi concluida com sucesso!', schema: {
      type: "object",
      example: {
        success: false,
        message: "Usuário encontrado com sucesso!",
        data: {
          id: 1,
          firstname: "Mauricio",
          lastname: "Sousa",
          role: "USER",
          status: "ACTIVE",
          profile_image: null,
          created_at: "2023-10-20T05:02:09.712Z",
          updated_at: "2023-10-20T05:02:09.712Z"
        }
      }
    }
  })
  @ApiTags('Users')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza parcialmente um usuário com base no ID fornecido.' })
  @ApiResponse({
    status: 200, description: 'Usuário atualizado com sucesso!', schema: {
      type: "object",
      example: {
        success: false,
        message: "Usuário atualizado com sucesso!",
        data: {
          id: 1,
          firstname: "Mauricio",
          lastname: "Sousa",
          role: "USER",
          status: "ACTIVE",
          profile_image: null,
          created_at: "2023-10-20T05:02:09.712Z",
          updated_at: "2023-10-20T05:02:09.712Z"
        }
      }
    }
  })
  @ApiBody({
    type: UpdateUserDto
  })
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  @ApiTags('Users')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req: any) {
    console.log(req.user)
    return this.usersService.update(+id, updateUserDto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desativa um usuário com base no ID fornecido.' })
  @ApiResponse({
    status: 200, description: 'Usuário desativado com sucesso!', schema: {
      type: "object",
      example: {
        success: false,
        message: "Usuário desativado com sucesso!",
        data: {
          id: 1,
          firstname: "Mauricio",
          lastname: "Sousa",
          role: "USER",
          status: "INACTIVE",
          profile_image: null,
          created_at: "2023-10-20T05:02:09.712Z",
          updated_at: "2023-10-20T05:02:09.712Z"
        }
      }
    }
  })
  @ApiTags('Users')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.usersService.remove(+id, req.user);
  }

}
