import Invoice from "../entity/InvoiceEntity";

export default class BookingInvoicesMapper{
    public static toCreateInvoices(request:any){
        let invoices : Invoice = new Invoice();

        invoices.arenaId = request?.arenaId;
        invoices.createdAt = new Date();
        invoices.createdBy = request?.createdBy;
        invoices.invoiceAmount = null;
        // Generate a unique invoice number starting with "AK-"
        const uniqueSuffix = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        invoices.invoiceNumber = `AK-${uniqueSuffix}`;
        invoices.isAdvance = request?.isAdvance;
        invoices.isBook = request?.isBook;
        invoices.isOnetoOneMatch = request?.isOnetoOneMatch;
        invoices.isTeamRegistration = request?.isTeamRegistration;
        invoices.isTournament = request?.isTournament;
        invoices.vendorId = request?.vendorId;
        invoices.userId = request?.userId;

        return invoices;
    }
        
}