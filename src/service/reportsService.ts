import ReportsMapper from "../mapper/reportsMapper";
import Response from "../common/responce/Responce";
import { MonthlyRevenueReportReesponseDto } from "../dto/responce/reportsResponseDto";
import { BookingInfoRepository } from "../repository/bookingRepository";
import BookingEntity from "../entity/bookingEntity";

export default class ReportsService {
    
    private bookingRepo = BookingInfoRepository;

    async get_Monthly_Revenue_Report(month: any , year: any , vendorId: number): Promise<Response<MonthlyRevenueReportReesponseDto>>{
        const bookingData: BookingEntity[] = await this.bookingRepo.find_Bookings_By_Month_Year(month , year , vendorId);
        let bookMap: MonthlyRevenueReportReesponseDto[] = await ReportsMapper.monthlyRevenueMapper(bookingData , month , year);
        return new Response<any>(bookMap);
    }

}