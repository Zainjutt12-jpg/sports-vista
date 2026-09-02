import { IsNumber, IsOptional, IsPositive } from "class-validator";

export default class getCityRequestDto {

    @IsPositive()
    @IsNumber()
    @IsOptional()
    cityId: number;

    @IsPositive()
    @IsNumber()
    @IsOptional()
    provinceId: number;
}