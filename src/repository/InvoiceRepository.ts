import { Repository } from 'typeorm';
import AppDataSource from "../config/dataSourceConfig";
import Invoice from '../entity/InvoiceEntity';
export const InvoiceMasterRepository = AppDataSource.getRepository(Invoice).extend({
    fetchById(invoiceId: number) {
        return this.createQueryBuilder("invoice")
            .where("(:invoiceId IS NULL OR invoices.invoiceId = :invoiceId)", {invoiceId})
            .getOne()
    },

    async fetchInvoicesList(vendorId: number , userId: number , invoiceId: number , invoiceNumber: string): Promise<any>{
        return await this.createQueryBuilder("invoice")
            .leftJoin('invoice.vendor', 'vendor')
            .addSelect(['vendor.vendorId', 'vendor.vendorAccount'])
            .leftJoin('vendor.vendorAccount', 'vendorAccount')
            .addSelect(['vendorAccount.vendorAccountId', 'vendorAccount.bankId' , 'vendorAccount.accountNumber'])
            .leftJoin('vendorAccount.Bank', 'Bank')
            .addSelect(['Bank.bankId', 'Bank.bankName' , 'Bank.active'])
            .where("(:vendorId IS NULL OR invoice.vendorId = :vendorId)", {vendorId})
            .andWhere("(:userId IS NULL OR invoice.userId = :userId)", {userId})
            .andWhere("(:invoiceId IS NULL OR invoice.invoiceId = :invoiceId)", {invoiceId})
            .andWhere("(:invoiceNumber IS NULL OR invoice.invoiceNumber = :invoiceNumber)", {invoiceNumber})
            .orderBy('invoice.invoiceId', 'DESC')
            .getMany();
    },

    async fetchInvoicesForUpfront(vendorId: number): Promise<any>{
        return await this.createQueryBuilder("invoice")
            .where("(:vendorId IS NULL OR invoice.vendorId = :vendorId)", {vendorId})
            .andWhere("(:isSettled IS NULL OR invoice.isSettled = :isSettled)", {isSettled: 0})
            .getMany();
    },

    async fetchLastInvoice(vendorId: number): Promise<any>{
        return await this.createQueryBuilder("invoice")
            .where("(:vendorId IS NULL OR invoice.vendorId = :vendorId)", {vendorId})
            .orderBy('invoice.invoiceId', 'DESC')
            .getOne();
    },

});
