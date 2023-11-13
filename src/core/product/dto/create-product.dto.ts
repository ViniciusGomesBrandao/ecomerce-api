import { IsString, IsNotEmpty, MinLength, IsEmpty, IsOptional, IsNumber, IsNumberString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { TypeProduct, OriginProduct, Status } from "@prisma/client";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Produto Teste',
        description: "Nome do produto."
    })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: TypeProduct.OTHER,
        description: "Parâmetro obrigatório que especifica a categoria do produto",
        enum: TypeProduct
    })
    type: TypeProduct

    @IsNumberString()
    @IsNotEmpty()
    @ApiProperty({
        example: 9.90,
        description: "Parâmetro obrigatório que representa o valor do produto"
    })
    value: number

    @IsString()
    @IsOptional()
    @ApiProperty({
        required: false,
        example: "Produto destinado para teste",
        description: "Parâmetro opcional que fornece informações adicionais sobre o produto."
    })
    description?: string

    @IsNumberString()
    @IsOptional()
    @ApiProperty({
        required: false,
        example: 10,
        description: "Parâmetro opcional que especifica a quantidade de produtos"
    })
    amount?: number

    @IsOptional()
    @IsString()
    @ApiProperty({
        required: false,
        example: OriginProduct.ORIGINAL,
        description: "Parâmetro opcional que indica a origem do produto",
        enum: OriginProduct
    })
    origin?: OriginProduct


    @IsOptional()
    @IsString()
    @ApiProperty({
        required: false,
        example: Status.ACTIVE,
        description: "Parâmetro obrigatório que indica o status do produto",
        enum: Status
    })
    status?: Status

   
}
