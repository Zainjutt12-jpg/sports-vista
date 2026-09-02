import StatsMapper from "../mapper/statsMapper";
import Response from "../common/responce/Responce";
import { BookingInfoRepository } from "../repository/bookingRepository"
import { InvoiceMasterRepository } from "../repository/InvoiceRepository";
import DashboardStatsResponceDto, { UpfrontResponseDto } from "../dto/responce/statsResponce";
import { VendorAccountRepository } from "../repository/vendorAccountRepository";
import VendorAccountEntity from "../entity/vendorAccountEntity";
import BankEntity from "../entity/bankEntity";
import { BankRepository } from "../repository/bankRepository";
import VendorMapper from "../mapper/vendorMapper";
import { BankLookupResponseDto } from "dto/responce/vendorResponseDto";

export default class StatsService{

    private bookingRepo = BookingInfoRepository;
    private paymentRepo = InvoiceMasterRepository;
    private vendorAccountRepo = VendorAccountRepository;
    private bankRepo = BankRepository;
    
    async getUpfrontBalance(vendorId: number): Promise<Response<any>>{
        let invoiceData: any = await this.paymentRepo.fetchInvoicesForUpfront(vendorId);
        let statsData: UpfrontResponseDto = await StatsMapper.getUpfrontBalance(invoiceData);
        return new Response<any>(statsData);
    }
    
    async getDashboardStats(vendorId: number): Promise<Response<any>>{
        let invoiceData: any = await this.paymentRepo.fetchLastInvoice(vendorId);
        let upfrontData: any = await this.paymentRepo.fetchInvoicesForUpfront(vendorId);
        let todayBookingData: any = await this.bookingRepo.findTodayBookings(vendorId , false);
        let monthlyBookingData: any = await this.bookingRepo.findTodayBookings(vendorId , true);
        let bookingData: any = await this.bookingRepo.findBookings(vendorId);
        let [vendorAccount , total] : [VendorAccountEntity[] , any] = await this.vendorAccountRepo.seachAccountBycriteria(1 , 10 , vendorId);
        let bankData : BankLookupResponseDto = (await VendorMapper.lookupBanksDto(await this.bankRepo.fetchBankList(vendorAccount?.[0]?.bankId)))[0];
        let statsData: DashboardStatsResponceDto = await StatsMapper.getDashboardData(invoiceData , upfrontData , todayBookingData , monthlyBookingData , bookingData , bankData) ;
        return new Response<any>(statsData);
    }
}