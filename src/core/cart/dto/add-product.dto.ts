import { IsString, IsNotEmpty, MinLength, IsEmpty, IsOptional, IsNumber, IsNumberString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 12,
        description: "id do produto."
    })
    id: number;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: 2,
        description: "Quantidade de produtos a serem adicionados no carrinho."
    })
    amount?: number;
}