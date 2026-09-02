import Invoice from "../entity/InvoiceEntity";
import DashboardStatsResponceDto, { UpfrontResponseDto } from "../dto/responce/statsResponce";
import BookingEntity from "../entity/bookingEntity";
import * as moment from 'moment';
import { BankLookupResponseDto } from "dto/responce/vendorResponseDto";

export default class StatsMapper {

    public static async getUpfrontBalance(invoiceData: Invoice[]): Promise<UpfrontResponseDto>{
        let balance: UpfrontResponseDto = new UpfrontResponseDto();
        let upfrontBalance: number = 0;
        for(let e of invoiceData){
            upfrontBalance += (Number(e?.invoiceAmount) || 0);
        }
        balance.upfrontBalance = upfrontBalance;
        return balance;
    }

    public static async getDashboardData(invoiceData: Invoice[] , upfrontData: Invoice[] , todayBookingData: BookingEntity[] , monthlyBookingData: BookingEntity[] , bookingData: BookingEntity[] , bankData: BankLookupResponseDto): Promise<DashboardStatsResponceDto>{
        let statsDashboard: DashboardStatsResponceDto = new DashboardStatsResponceDto();
        statsDashboard.upfrontBalance = (await this.getUpfrontBalance(upfrontData))?.upfrontBalance;
        statsDashboard.upfrontLevel = "2 Days";
        statsDashboard.analysisDate = (moment().format('YYYY-MM-DD'))?.toString();
        statsDashboard.numberoOfVisitors = bookingData?.length;
        statsDashboard.bankLogo = bankData?.bankUrl;
        statsDashboard.bankName = bankData?.bankName;
        statsDashboard.monthlyBooked = (monthlyBookingData?.filter((e: any) => ((e?.bookingTypeId == 1 || e?.bookingTypeId == 2) && (e?.statusId == 3 || e?.statusId == 1))))?.length;
        statsDashboard.monthlyCancelled = (monthlyBookingData?.filter((e: any) => ((e?.bookingTypeId == 1 || e?.bookingTypeId == 2) && e?.statusId == 2)))?.length;
        statsDashboard.monthlyTournament = (monthlyBookingData?.filter((e: any) => (e?.bookingTypeId == 3)))?.length;
        statsDashboard.monthlyOnetoOne = (monthlyBookingData?.filter((e: any) => (e?.bookingTypeId == 4)))?.length;
        statsDashboard.todayConfirmedBooking = (todayBookingData?.filter((e: any) => (e?.statusId == 3 || e?.statusId == 1)))?.length;
        statsDashboard.todayCancelledBooking = (todayBookingData?.filter((e: any) => e?.statusId == 2))?.length;
        statsDashboard.profitRate = ((todayBookingData?.length * 100) / monthlyBookingData?.length);
        return statsDashboard;
    }
}