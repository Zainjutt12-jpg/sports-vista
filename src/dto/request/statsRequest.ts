import { IsNotEmpty, IsNumber } from "class-validator";

export class DashboardStatsRequestDto {

    @IsNotEmpty()
    @IsNumber()
    vendorId: number;

}