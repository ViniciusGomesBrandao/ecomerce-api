import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class PaginationDto {
    @IsNumberString()
    @IsOptional()
    @ApiProperty({
        example: 0,
        description: "Número da página desejada para a listagem de resultados paginados.",
        required: false
    })
    page?: string;

    @IsNumberString()
    @IsOptional()
    @ApiProperty({
        example: 10,
        description: "Número máximo de itens a serem exibidos por página na listagem.",
        required: false
    })
    limit?: string;
}