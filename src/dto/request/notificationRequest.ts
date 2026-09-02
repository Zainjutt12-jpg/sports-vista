import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateNotificationDto {

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsNumber()
    @IsOptional()
    vendorId: number;

    @IsNumber()
    @IsOptional()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    notificationTypeId: number;

    @IsString()
    @IsNotEmpty()
    createdBy: string;

}

export class GetNotificationRequestDto {

    @IsNumber()
    @IsOptional()
    userId: number;

    @IsNumber()
    @IsOptional()
    vendorId: number;

    @IsNumber()
    @IsOptional()
    notificationTypeId: number;

}