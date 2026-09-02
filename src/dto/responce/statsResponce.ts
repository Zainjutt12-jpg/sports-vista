export default class DashboardStatsResponceDto{
    upfrontBalance: number;
    upfrontLevel: string;
    analysisDate: string;
    numberoOfVisitors: number;
    bankLogo: string;
    bankName: string;
    monthlyBooked: number;
    monthlyCancelled: number;
    monthlyTournament: number;
    monthlyOnetoOne: number;
    todayCancelledBooking: number;
    todayConfirmedBooking: number;
    profitRate: number;
}

export class UpfrontResponseDto {
    upfrontBalance: number;
}