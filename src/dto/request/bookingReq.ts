import { IsNotEmpty, IsInt, IsEmail, MaxLength, IsArray, IsDateString, IsNumber, IsString } from 'class-validator';

export default class CreateBookingDto {
  @IsArray()
  bookings: {
    userId: number;
    vendorId: number;
    arenaId: number;
    userName: string;
    userEmail: string;
    userPhone: string;
    courtId: number;
    receivedAmount: number;
    timeRangeId: number;
    date: string; 
    bookingTypeId: number;
  }[];
}

export class BookingPaymentRequestDto{

  @IsNumber()
  @IsNotEmpty()
  recievedAmount: number;

  @IsArray()
  @IsNotEmpty()
  bookingIds: number[];
}
  
export class StatusUpdateDto{

  @IsArray()
  @IsNotEmpty()
  bookingIds: number[];
}

export class BookingBodyDto {
  bookings: {
    userId: number;
    vendorId: number;
    arenaId: number;
    userName: string;
    userEmail: string;
    userPhone: string;
    courtId: number;
    receivedAmount: number;
    timeRangeId: number;
    date: string; 
  }[];
}


export class UpdateBookingRequestDto {
  @IsString()
  transactionAmount: string;

  @IsString()
  arenaName: string;

  @IsString()
  arenaSku: string;

  @IsString()
  noOfBooking: string;

  @IsEmail()
  customerEmail: string;

  @IsString()
  customerPhone: string;

  @IsString()
  customerName: string;

  @IsString()
  paymentMethodId: number;
}
