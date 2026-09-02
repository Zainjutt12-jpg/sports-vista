import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class Customer_Ip_Request_Dto {

    @IsString()
    @IsNotEmpty()
    customerIp: string;

}

export class Refresh_Token_Request_Dto {

    @IsString()
    @IsNotEmpty()
    refreshToken: string;

    @IsString()
    @IsNotEmpty()
    customerIp: string;

}


export default class paymentTokenRequest{
    @IsNotEmpty()
    @IsString()
    CURRENCY_CODE:string;

    @IsNotEmpty()
    @IsString()
    SECURED_KEY:string;

    @IsNumber()
    MERCHANT_ID:number;

    @IsNotEmpty()
    @IsString()
    BASKET_ID:string;

    @IsNumber()
    TXNAMT:number
}


export  class PaymentTransactionRequest {
    @IsNotEmpty()
    @IsNumber()
    TXNAMT: number;
  
    @IsNotEmpty()
    @IsString()
    CURRENCY_CODE: string;
  
    @IsNotEmpty()
    @IsNumber()
    MERCHANT_ID: number;
  
    @IsNotEmpty()
    @IsString()
    BASKET_ID: string;
  
    @IsNotEmpty()
    @IsString()
    TOKEN: string;
  
    @IsNotEmpty()
    @IsString()
    MERCHANT_NAME: string;
  
    @IsNotEmpty()
    @IsString()
    SUCCESS_URL: string;
  
    @IsNotEmpty()
    @IsString()
    FAILURE_URL: string;
  
    @IsNotEmpty()
    @IsString()
    CHECKOUT_URL: string;
  
    @IsNotEmpty()
    CUSTOMER_EMAIL_ADDRESS: string;
  
    @IsNotEmpty()
    CUSTOMER_MOBILE_NO: string;
  
    @IsNotEmpty()
    @IsString()
    ORDER_DATE: string;
  
    @IsNotEmpty()
    @IsString()
    SIGNATURE: string;
  
    @IsNotEmpty()
    @IsString()
    VERSION: string;
  
    @IsNotEmpty()
    @IsString()
    TXNDESC: string;
  
    @IsNotEmpty()
    @IsNumber()
    PROCCODE: number;
  
    @IsNotEmpty()
    @IsString()
    TRAN_TYPE: string;
}

export class InvoiceListRequestDto{

    @IsNumber()
    @IsOptional()
    vendorId: number;

    @IsNumber()
    @IsOptional()
    userId: number;

    @IsNumber()
    @IsOptional()
    invoiceId: number;

    @IsString()
    @IsOptional()
    invoiceNumber: string;

}
  