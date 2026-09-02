export default class BookingResponse {
    bookingId: number;
    userId: number;
    vendorId: number;
    fullName:string;
    phoneNumber:string;
    arenaId: number;
    arenaName: string;
    pricePerHour: Number;
    nightCharges: Number;
    userName: string;
    userEmail: string;
    courtId:number;
    userPhone: string;
    receivedAmount: number;
    timeRangeIds: number[];
    timeRange: string;
    date: Date;
    court: number;
    statusId:number;
    bookingTypeId: number;
    statusName?:string;
}

