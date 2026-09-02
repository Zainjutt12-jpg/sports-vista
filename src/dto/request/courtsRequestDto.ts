import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export default class CourtsRequestDto{

    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    arenaId: number;
    
}