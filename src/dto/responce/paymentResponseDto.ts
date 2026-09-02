export class InvoiceListResponseDto {
    invoiceId: number;
    invoiceNumber: string;
    date: string;
    amount: string;
    transactionType: string;
    bankId: number;
    bankName: string;
    accountNumber: string;
    status: string;
}