import { IsNotEmpty, IsEmail, MaxLength, IsInt, IsOptional, IsNumber, ValidateNested, IsString } from 'class-validator';
import { CreateVendorAccountRequestDto } from './vendorAccountRequestDto';
import { Type } from 'class-transformer';

export default class CreateVendorDto {
    @IsNotEmpty()
    @MaxLength(255)
    fullName: string;

    @IsNotEmpty()
    @MaxLength(255)
    userName: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(255)
    email: string;

    @IsNotEmpty()
    @MaxLength(255)
    password: string;

    @IsOptional()
    @IsInt()
    subscriptionId?: number;

    @IsOptional()
    @MaxLength(20)
    phoneNumber?: string;

    @IsOptional()
    address?: string; 

    @IsString()
    @IsNotEmpty()
    secretKey: string; 

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateVendorAccountRequestDto)
    vendorAccount: CreateVendorAccountRequestDto;
}


export class updateVendorDtos{
    @IsInt()
    vendorId: number;

    @IsNotEmpty()
    @MaxLength(255)
    fullName: string;

    @IsNotEmpty()
    @MaxLength(255)
    userName: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(255)
    email: string;

    @IsNotEmpty()
    @MaxLength(255)
    password: string;

    @IsOptional()
    @IsInt()
    subscriptionId?: number;

    @IsOptional()
    @MaxLength(20)
    phoneNumber?: string;

    @IsOptional()
    address?: string; 

}

export class UpdateVendorInfoDto {
    @IsOptional()
    @MaxLength(255)
    fullName: string;

    @IsOptional()
    @MaxLength(255)
    userName: string;

    @IsOptional()
    @IsEmail()
    @MaxLength(255)
    email: string;

    @IsOptional()
    @MaxLength(20)
    phoneNumber?: string;

    @IsOptional()
    address?: string; 
}

export class BankLookupRequestDto {

    @IsNumber()
    @IsOptional()
    bankId: number;

}