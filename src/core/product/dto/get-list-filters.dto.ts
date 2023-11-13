import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateProductDto } from "./create-product.dto";
export class GetListFilters extends PartialType(CreateProductDto) {}