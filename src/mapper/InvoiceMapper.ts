import { InvoiceListResponseDto } from "../dto/responce/paymentResponseDto";
import Invoice from "../entity/InvoiceEntity";



export default class InvoiceMapper{

    public static toCreateInvoice(req:any){
        let invoiceData : Invoice = new Invoice();

        invoiceData.arenaId = req?.arenaId;
        invoiceData.createdAt = new Date();
        invoiceData.createdBy = req?.createdBy;
        invoiceData.invoiceAmount = req?.invoiceAmount;
        invoiceData.isAdvance = req?.isAdvance;
        invoiceData.invoiceNumber = req?.invoiceNumber;
        invoiceData.userId = req?.userId;
        invoiceData.isBook = req?.isBook;
        invoiceData.isOnetoOneMatch = req?.isOnetoOneMatch;
        invoiceData.isTeamRegistration = req?.isTeamRegistration;
        invoiceData.isTournament = req?.isTournament;
        invoiceData.vendorId = req?.vendorId;

        return invoiceData;
    }

    public static async toInvoiceList(data: Invoice[]): Promise<InvoiceListResponseDto[]>{
        let invoiceList: InvoiceListResponseDto[] = [];
        data?.forEach((d: any) => {
            invoiceList.push({
                invoiceId: d?.invoiceId,
                invoiceNumber: d?.invoiceNumber,
                date: d?.createdAt,
                transactionType: d?.isAdvance? 'Booking Adavance' : d?.isBook? 'Booking' : d?.isTournament? 'Tournament' : d?.isTeamRegistration? 'Team Registration' : d?.isOnetoOneMatch? 'One-to-One' : '',
                amount: d?.invoiceAmount,
                bankId: d?.vendor?.vendorAccount?.Bank?.bankId,
                bankName: d?.vendor?.vendorAccount?.Bank?.bankName,
                accountNumber: d?.vendor?.vendorAccount?.accountNumber,
                status: 'Paid'
            });
        });
        return invoiceList;
    }
}