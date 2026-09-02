import { IsNotEmpty, IsNumber } from "class-validator";

export class MonthlyRevenueRequestDo {

    @IsNumber()
    @IsNotEmpty()
    vendorId: number;

    @IsNumber()
    @IsNotEmpty()
    month: number;

    @IsNumber()
    @IsNotEmpty()
    year: number;

}