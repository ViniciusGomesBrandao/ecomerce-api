import { IsString, IsNotEmpty, MinLength, IsEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'client1',
        description: "Nome de usuário exclusivo para autenticação na API"
    })
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @ApiProperty({
        example: '123456',
        description: "Nome de usuário exclusivo para autenticação na API."
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Mauricio',
        description: "Primeiro nome do usuário"
    })
    first_name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: 'Sousa',
        required: false,
        description: "Sobrenome do usuário"
    })
    last_name?: string;
}
