import { BookingInfoRepository } from "../repository/bookingRepository";
import BookingResponse from "../dto/responce/bookingResponseDto";
import BookingEntity from "../entity/bookingEntity";
import { TimeRangeRepository } from "../repository/timeRangeRepository";

export default class BookingMapper {

    private static bookingRepo = BookingInfoRepository;

    public static toCreateBookings(request:any){
        let booking : BookingEntity = new BookingEntity();

        booking.userId = request?.userId;
        booking.vendorId = request?.vendorId;
        booking.arenaId = request?.arenaId;
        booking.userName = request?.userName;
        booking.userEmail = request?.userEmail;
        booking.userPhone = request?.userPhone;
        booking.courtId = request?.courtId;
        booking.receivedAmount = request?.receivedAmount;
        booking.timeRangeIds = request?.timeRangeId;
        booking.bookingTypeId = request?.bookingTypeId;

        let dateObj = null;
        if(request?.date){
            dateObj = new Date(request?.date); 
        }else{
            dateObj = new Date();
        }

        booking.day = dateObj.getUTCDate(); 
        booking.month = dateObj.getUTCMonth() + 1; 
        booking.year = dateObj.getUTCFullYear(); 
        booking.date = request?.date? request?.date : `${booking.year}-${booking.month}-${booking.day}`; 

        return booking;
    }

    public static async lookupDto(bookings?: BookingEntity[]): Promise<BookingResponse[]> {
        const bookingData: BookingResponse[] = [];
        
        if (!bookings) return bookingData;
    
        for (const booking of bookings) {
            // Split timeRangeIds into an array of numbers
            const timeRangeIdsArray = booking.timeRangeIds
                ? booking.timeRangeIds.split(',').map((id: string) => parseInt(id.trim(), 10))
                : [];
    
            // Fetch time ranges
            const timeRanges = await TimeRangeRepository.getTimings(timeRangeIdsArray);
            
            // Push the formatted booking data
            bookingData.push({
                bookingId: booking?.bookingId,
                userId: booking?.userId,
                vendorId: booking?.vendorId,
                arenaId: booking?.arenaId,
                arenaName: booking?.arena?.arenaName,
                pricePerHour: booking?.arena?.pricePerHour || 0,
                nightCharges: booking?.arena?.nightCharges || 0,
                userName: booking?.userName,
                userEmail: booking?.userEmail,
                courtId: booking?.courtId,
                userPhone: booking?.userPhone,
                receivedAmount: booking.receivedAmount,
                timeRangeIds: booking?.timeRangeIds?.split(',')?.map((e: any) => Number(e)),
                timeRange: (timeRanges[0]?.timingRange?.split('-')[0] + ' - ' + timeRanges[timeRanges?.length - 1]?.timingRange?.split('-')[1]),
                date: booking?.date,
                court: booking?.courtId,
                statusId: booking?.statusId,
                phoneNumber: booking?.vendor?.phoneNumber,
                fullName: booking?.vendor?.fullName,
                bookingTypeId: booking?.bookingTypeId,
                statusName: booking?.bookingStatus?.statusName
            });
        }
    
        return bookingData;
    }
    
}
