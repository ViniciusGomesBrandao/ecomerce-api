import { IsString, IsNotEmpty, MinLength, IsEmpty, IsOptional, IsNumber, IsNumberString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCartDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: 2,
        description: "Quantidade de produtos a serem adicionados no carrinho."
    })
    amount?: number;
}
