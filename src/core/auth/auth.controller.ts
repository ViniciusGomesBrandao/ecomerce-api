import { Controller, Post, HttpStatus, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { PrismaService } from '../_services/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService
  ) { }


  @Post('login')
  @ApiBody({
    description: "Autenticação do usuário.",
    type: LoginDto
  })
  @ApiOperation({ summary: 'Autenticar um usuário e obter um token de acesso' })
  @ApiResponse({
    status: 200, description: 'Autenticação de usuário.', schema: {
      type: "object",
      example: {
        success: true,
        message: "Autenticado com sucesso",
        token: "YOUR_TOKEN",
        data: {
          id: 1,
          username: "client1",
          firstname: "Mauricio",
          lastname: "Sousa",
          role: "USER",
          profile_image: null,
          status: "ACTIVE",
          created_at: "2023-10-20T05:02:09.712Z",
          updated_at: "2023-10-20T05:02:09.712Z"
        }
      }
    }
  })
  @ApiTags('Auth')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }
}
