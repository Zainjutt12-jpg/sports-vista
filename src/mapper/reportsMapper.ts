import { MonthlyRevenueReportReesponseDto } from "../dto/responce/reportsResponseDto";
import BookingEntity from "../entity/bookingEntity";

export default class ReportsMapper {

    public static monthlyRevenueMapper(bookingData: BookingEntity[] , month: any , year: any): MonthlyRevenueReportReesponseDto[] {
        let report : MonthlyRevenueReportReesponseDto[] = [];
        const loopCount = this.getDaysInMonth(month , year);
        for(let d = 1 ; d <= loopCount ; d++){
            report.push({
                dayNumber: d,
                totalBookings: this.getBookingsCount(bookingData , d),
                cancelledBookings: this.getBookingsCount(bookingData , d , 2),
                confirmedBookings: this.getBookingsCount(bookingData , d , 3),
                totalRevenue: this.getTotalAmount(bookingData , d),
                lossAmount: this.getLossAmount(bookingData , d)
            })
        }
        return report;
    }

    public static getDaysInMonth(month: any, year: any) {
        const todayMonth = new Date();
        if((todayMonth?.getMonth()+1) == month && todayMonth.getFullYear() == year){
            return todayMonth.getDate();
        }
        return new Date(year, month, 0).getDate();
    }

    public static getBookingsCount(bookingData: any , day: any , statusId?: any ): number{
        let count = 0;
        for(let b of bookingData){
            if(day == b?.day){
                if(!statusId){
                    count++;
                }else if(statusId == b?.statusId){
                    count++;
                }
            }else{
                break;
            }
        }
        return count;
    }

    public static getTotalAmount(bookingData: any , day: any): number{
        let amount = 0;
        for(let b of bookingData){
            if(day == b?.day){
                amount += Number(b?.receivedAmount);
            }
        }
        return Number(amount?.toFixed(2));
    }

    public static getLossAmount(bookingData: any , day: any): number{
        let amount = 0;
        for(let b of bookingData){
            if(day == b?.day && [1 , 4].includes(b?.bookingTypeId)){
                amount += ((b?.arena?.pricePerHour) - Number(b?.receivedAmount));
            }
        }
        return Number(amount?.toFixed(2));
    }
}
