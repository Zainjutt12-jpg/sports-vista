import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class AddTournamentRequestDto {

    @IsNumber()
    @IsNotEmpty()
    vendorId: number;

    @IsNumber()
    @IsNotEmpty()
    arenaId: number;

    @IsNumber()
    @IsNotEmpty()
    sportsCategoryId: number;

    @IsString()
    @IsNotEmpty()
    tournamentName: string;

    @IsString()
    @IsNotEmpty()
    tournamentLogo: string;

    @IsString()
    @IsNotEmpty()
    tournamentDesc: string;

    @IsString()
    @IsNotEmpty()
    registrationFee: string;

    @IsString()
    @IsNotEmpty()
    date: string;

    @IsNumber()
    @IsNotEmpty()
    timeRangeStartId: number;

    @IsNumber()
    @IsNotEmpty()
    timeRangeEndId: number;

    @IsBoolean()
    @IsNotEmpty()
    isThirdParty: boolean;

    @IsString()
    @IsNotEmpty()
    hostedBy: string;

    @IsString()
    @IsOptional()
    hostName: string;

    @IsString()
    @IsOptional()
    hostCnic: string;

    @IsString()
    @IsNotEmpty()
    winningPrize: string;

    @IsString()
    @IsNotEmpty()
    runnerUpPrize: string;

    @IsNumber()
    @IsNotEmpty()
    noOfTeams: number;
}

export class GetTournamentRequestDto {

    @IsNumber()
    @IsOptional()
    vendorId: number;

    @IsNumber()
    @IsOptional()
    tournamentId: number;

    @IsNumber()
    @IsOptional()
    cityId: number;
    
    @IsString()
    @IsOptional()
    date: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;

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

export class UpdateTournamentRequestDto {

    @IsNumber()
    @IsNotEmpty()
    vendorId: number;

    @IsNumber()
    @IsNotEmpty()
    arenaId: number;

    @IsString()
    @IsNotEmpty()
    tournamentName: string;

    @IsString()
    @IsNotEmpty()
    tournamentDesc: string;

    @IsString()
    @IsNotEmpty()
    registrationFee: string;

    @IsBoolean()
    @IsNotEmpty()
    isThirdParty: boolean;

    @IsString()
    @IsOptional()
    hostName: string;

    @IsString()
    @IsOptional()
    hostCnic: string;

    @IsString()
    @IsNotEmpty()
    winningPrize: string;

    @IsString()
    @IsNotEmpty()
    runnerUpPrize: string;

    @IsNumber()
    @IsNotEmpty()
    noOfTeams: number;
}