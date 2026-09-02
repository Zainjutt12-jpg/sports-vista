export default class  vendorResponse {
    vendorId: number;
    fullName: string;
    userName: string;
    email: string;
    subscriptionId?: number;
    phoneNumber?: string;
    address?: string; 
}

export class BankLookupResponseDto {
    bankId: number;
    bankName: string;
    bankUrl: string;
}