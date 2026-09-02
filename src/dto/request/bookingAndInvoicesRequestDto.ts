import { Type } from 'class-transformer';
import { IsNumber, IsString, IsBoolean, IsDecimal, IsOptional, IsNotEmpty, IsArray, ValidateNested, IsInt } from 'class-validator';
import { BookingBodyDto } from './bookingReq';
import CreateBookingDto from './bookingReq';


export default class BookingAndInvoices{
    @IsInt()
    userId: number;

    @IsInt()
    vendorId: number;

    @IsInt()
    arenaId: number;

    @IsBoolean()
    isVendor:boolean

    @IsString()
    userName: string;

    @IsString()
    userEmail: string;

    @IsString()
    userPhone: string;

    @IsInt()
    courtId: number;

    @IsInt()
    receivedAmount: number;

    @IsString()
    timeRangeId: string;

    @IsInt()
    bookingTypeId: number;

    @IsString()
    invoiceNumber: string; 
  
    @IsInt()
    invoiceAmount: number;
    
    @IsBoolean()
    @IsOptional()
    isAdvance?: boolean; 
  
    @IsBoolean()
    @IsOptional()
    isBook?: boolean; 
  
    @IsBoolean()
    @IsOptional()
    isTournament?: boolean; 
  
    @IsBoolean()
    @IsOptional()
    isTeamRegistration?: boolean; 
  
    @IsBoolean()
    @IsOptional()
    isOnetoOneMatch?: boolean; 
  
    @IsNumber()
    @IsOptional()
    createdBy?: number; 
}

export class finalRequestForbookingInvoices{

    @IsNotEmpty()
    @IsArray()
    bookings: BookingAndInvoices[];
   
}