import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class LoginDto{
    @ApiProperty({
        example: "client1",
        description: "Nome de usuário utilizado para autenticação ao fazer login na API",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    username: string

    @ApiProperty({
        example: "123456",
        description: "Senha necessária para autenticação ao fazer login na API",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    password: string
}