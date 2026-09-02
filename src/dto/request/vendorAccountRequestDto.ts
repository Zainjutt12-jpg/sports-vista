import { IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class CreateVendorAccountRequestDto {

    @IsNumber()
    bankId: number;

    @IsString()
    accountNumber: string;

    @IsString()
    accountHolderName: string;

    @IsString()
    ibanAccountNumber: string;

    @IsString()
    createdBy: string;

}

export class UpdateVendorAccountRequestDto {

    @IsNumber()
    @IsOptional()
    bankId: number;

    @IsString()
    @IsOptional()
    accountNumber: string;

    @IsString()
    @IsOptional()
    ibanAccountNumber: string;

    @IsString()
    @IsOptional()
    accountHolderName: string;

    @IsString()
    createdBy: string;

}

export class GetVendorRequestDto {

    @IsNumber()
    @IsOptional()
    vendorId: number;

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