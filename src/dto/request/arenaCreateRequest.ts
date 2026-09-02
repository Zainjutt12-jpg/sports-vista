import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export default class ArenaMasterRequestDto {
    @IsNumber()
    @IsOptional()
    vendorId: number;

    @IsBoolean()
    @IsOptional()
    active: boolean;

    @IsNumber()
    @IsOptional()
    areaId: number;

    @IsNumber()
    @IsOptional()
    sportsCategoryId: number;

    @IsNumber()
    @IsOptional()
    arenaId: number;

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
export class ArenaRequestCreate {

    @IsString()
    @IsNotEmpty()
    arenaName: string;

    @IsNumber()
    @IsNotEmpty()
    cityId: number;

    @IsNumber()
    @IsNotEmpty()
    areaId: number;

    @IsNumber()
    @IsNotEmpty()
    vendorId: number;

    @IsString()
    @IsNotEmpty()
    arenaAddress: string;

    @IsArray()
    @IsNotEmpty()
    availableSports: any[];

    @IsString()
    @IsNotEmpty()
    arenaContactNumber: string;

    @IsNumber()
    @IsNotEmpty()
    nightCharges:number;

    @IsNotEmpty()
    @IsNumber()
    weekendAdvance:number;

    @IsNumber()
    @IsNotEmpty()
    noOfCourts: number;

    @IsNumber()
    @IsNotEmpty()
    pricePerHour: number;

    @IsNumber()
    @IsNotEmpty()
    advanceCharges: number;

    @IsString()
    @IsNotEmpty()
    iframeLink: string;

    @IsNumber()
    @IsNotEmpty()
    ruleId: number;

    @IsString()
    primaryPic: string;

    @IsArray()
    images: string[];

}

export class ArenaRequestUpdate {

    @IsString()
    @IsNotEmpty()
    arenaName: string;

    @IsNumber()
    @IsNotEmpty()
    cityId: number;

    @IsNumber()
    @IsNotEmpty()
    areaId: number;

    @IsArray()
    @IsNotEmpty()
    availableSports: any[];

    @IsString()
    @IsNotEmpty()
    arenaContactNumber: string;

    @IsNumber()
    @IsNotEmpty()
    noOfCourts: number;

    @IsNumber()
    @IsNotEmpty()
    pricePerHour: number;

    @IsNumber()
    @IsNotEmpty()
    nightCharges: number;

    @IsNumber()
    @IsNotEmpty()
    advanceCharges: number;

    @IsNumber()
    @IsNotEmpty()
    weekendAdvance: number;

    @IsNumber()
    @IsNotEmpty()
    ruleId: number;

}

export class SearchArenaRequestDto{

    @IsNotEmpty()
    @IsString()
    arenaName: string;

}