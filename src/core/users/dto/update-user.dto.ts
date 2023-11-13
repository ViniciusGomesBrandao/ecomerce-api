import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: 'client1',
        description: "Nome de usuário exclusivo para autenticação na API",
        required: false
    })
    username?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: '123456',
        description: "Nome de usuário exclusivo para autenticação na API.",
        required: false
    })
    password?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: 'Mauricio',
        description: "Primeiro nome do usuário",
        required: false
    })
    first_name?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: 'Sousa',
        required: false,
        description: "Sobrenome do usuário"
    })
    last_name?: string;
}
