import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class AvailaibleTimeRangesDto{

    @IsNumber()
    @IsNotEmpty()
    arenaId: number;

    @IsNumber()
    @IsNotEmpty()
    courtId: number;

    @IsString()
    @IsNotEmpty()
    date: string;

}