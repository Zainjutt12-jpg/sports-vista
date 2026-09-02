import { BookingInfoRepository } from "../repository/bookingRepository";
import Response from "../common/responce/Responce";
import TimeRangeDto from "../dto/responce/timeRangeDto";
import TimeRangeEntity from "../entity/timeRangeEntity";
import TimeRangeMapper from "../mapper/timeRangeMapper";
import { TimeRangeRepository } from "../repository/timeRangeRepository";

export default class TimeRangeService{

    private timeRepo = TimeRangeRepository;
    private bookingRepo = BookingInfoRepository;

    async getTimeRangeLookup(): Promise<Response<TimeRangeEntity>> {
        let data : any[] = await this.timeRepo.getTimings();
        let timeDto: TimeRangeDto[] = TimeRangeMapper.toLookup(data);
        return new Response<any>(timeDto);
    }

    async getAvaialibleTimeRanges(arenaId: number , date: string , courtId: any): Promise<Response<TimeRangeEntity>>{
        let arenaData : any[] = await this.bookingRepo.findBookingByArenaandDate(arenaId , date , courtId);
        let timeData : any[] = await this.timeRepo.getTimings();
        let availaibleTimeDto: TimeRangeDto[] = TimeRangeMapper.availaibleLookup(arenaData , timeData);
        return new Response<any>(availaibleTimeDto);
    }
}