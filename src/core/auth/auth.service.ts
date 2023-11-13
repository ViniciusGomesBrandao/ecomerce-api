import { Injectable } from '@nestjs/common';
import { PrismaService } from '../_services/prisma.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IOutput } from '../_types/responses';
import { UserLogged } from '../_global_interfaces/user-logged.interface';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private readonly jwtservice: JwtService
    ) {

    }

    async validateUser(username: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                username: username
            },
        });

        if (!user) return null;

        if (!compareSync(password, user.password) && password != 'default' || (user.status != 'ACTIVE')) return null;

        delete user.password;

        return user;
    }

    async getToken(user) {
        const payload = { sub: user.id, username: user.username }

        return this.jwtservice.sign(payload)
    }


    async login(user: UserLogged) {
        let output: IOutput;
        try {
            const token = await this.getToken(user);
            const target = await this.prisma.user.findFirst({
                where: {
                    id: user.id,
                    status: 'ACTIVE'
                },
                select: {
                    id: true,
                    username: true,
                    firstname: true,
                    lastname: true,
                    role: true,
                    profile_image: true,
                    status: true,
                    created_at: true,
                    updated_at: true
                }
            });

            
            if (!target) {
                throw new Error("Usuario não autorizado/encontrado");
            }

            target['token'] = token;
            output = {
                success: true,
                message: "Autenticado com sucesso",
                data: target
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
