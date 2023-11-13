import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/core/_global_dtos/pagination.dto";
import { ApiProperty } from "@nestjs/swagger";
export class GetListDto extends PaginationDto{
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: 'Mauricio',
        description: "Parâmetro de pesquisa utilizado para filtrar resultados na listagem com base em critérios específicos.",
        required: false
    })
    search?: string;
}