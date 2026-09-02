import { IsNotEmpty, IsNumber, MaxLength } from "class-validator";

export default class CreateAreaRequest {
    @IsNotEmpty()
    @MaxLength(50)
    areaName: string;

    @IsNumber()
    @IsNotEmpty()
    cityId: number;
}