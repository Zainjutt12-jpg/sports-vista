import { Min, IsPositive, IsNumber, IsOptional, IsString } from "class-validator";

export default class BookingByArenaId{

    @IsString()
    @IsOptional()
    date: string;

    @Min(1)
    @IsPositive()
    @IsNumber()
    @IsOptional()
    page: number;

    @Min(1)
    @IsPositive()
    @IsNumber()
    @IsOptional()
    pageSize: number;
}