import { Type } from 'class-transformer';
import { IsNumber, IsString, IsBoolean, IsDecimal, IsOptional, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { BookingBodyDto } from './bookingReq';
import CreateBookingDto from './bookingReq';
export class InvoiceItemDto {
  @IsString()
  invoiceNumber: string; // Unique invoice number (required)

  @IsDecimal({ decimal_digits: '2' })
  invoiceAmount: number; // Invoice amount with precision (required)

  @IsNumber()
  userId: number; // Foreign key for the user (required)

  @IsNumber()
  vendorId: number; // Foreign key for the vendor (required)

  @IsNumber()
  arenaId: number; // Foreign key for the arena (required)

  @IsBoolean()
  @IsOptional()
  isAdvance?: boolean; // Indicates if the payment is advance (optional)

  @IsBoolean()
  @IsOptional()
  isBook?: boolean; // Indicates if it is a booking (optional)

  @IsBoolean()
  @IsOptional()
  isTournament?: boolean; // Indicates if it is related to a tournament (optional)

  @IsBoolean()
  @IsOptional()
  isTeamRegistration?: boolean; // Indicates if it is a team registration (optional)

  @IsBoolean()
  @IsOptional()
  isOnetoOneMatch?: boolean; // Indicates if it is a one-to-one match (optional)

  @IsNumber()
  @IsOptional()
  createdBy?: number; // ID of the creator (optional)
}


export default class CreateInvoiceDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => InvoiceItemDto)
    invoices: InvoiceItemDto[]; 
  }



export  class BookingAndInvoicesReqDto{
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateBookingDto)
    bookings: CreateBookingDto[]; 

    @Type(() => InvoiceItemDto)
    invoices: InvoiceItemDto; 

}
  