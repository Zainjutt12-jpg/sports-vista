import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class teamPostDto {
    @IsNotEmpty()
    @IsString()
    teamName: string;

    @IsNotEmpty()
    @IsString()
    teamLogo: string;

    @IsNotEmpty()
    @IsString()
    teamDesc: string;

    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(15)
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    players: string[];

    @IsNotEmpty()
    @IsString()
    createdBy: string;

    @IsNotEmpty()
    @IsNumber()
    createdById: number;
}

export class teamPutDto {
    @IsOptional()
    @IsNumber()
    teamId?: number;

    @IsOptional()
    @IsString()
    teamName?: string;

    @IsOptional()
    @IsString()
    teamLogo?: string;

    @IsOptional()
    @IsString()
    teamDesc?: string;

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(15)
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    players?: string[];

    @IsOptional()
    @IsString()
    createdBy?: string;

    @IsOptional()
    @IsNumber()
    createdById?: number;
}
