import BookingEntity from "../entity/bookingEntity";
import TimeRangeDto from "../dto/responce/timeRangeDto";
import TimeRangeEntity from "../entity/timeRangeEntity";

export default class TimeRangeMapper{

    public static toLookup(time: TimeRangeEntity[]): TimeRangeDto[] {
        let timeData: TimeRangeDto[] = [];
        time.forEach((d: any)=>{
            timeData.push({
                timingId: d?.timingId,
                timeRange: d?.timingRange,
            });
        });
        return timeData;
    }

    public static availaibleLookup(bookings: BookingEntity[] , times: TimeRangeEntity[]): TimeRangeDto[] {
        let availableTimes: TimeRangeDto[] = [];
        const mapTimeIds: Set<number> = new Set(times.map((e: any) => e.timingId));
        times.forEach((d: any) => {
            availableTimes.push({
                timingId: d?.timingId,
                timeRange: d?.timingRange
            });
        });
        const bookedTimeIds = new Set<number>();
        bookings.forEach((d: any) => {
            const timeRangeIds = d?.timeRangeIds?.split(',')?.map((p: any) => Number(p));
            timeRangeIds.forEach((id: number) => {
                if (mapTimeIds.has(id)) {
                    bookedTimeIds.add(id);
                }
            });
        });
        availableTimes = availableTimes.filter((time) => !bookedTimeIds.has(time.timingId));
        return availableTimes;

    }
}