import AppDataSource from "../config/dataSourceConfig";
import TimeRangeEntity from "../entity/timeRangeEntity";


export const TimeRangeRepository = AppDataSource.getRepository(TimeRangeEntity).extend({
    async getTimings(timeRangeId?: any[]): Promise<any[]> {
        const queryBuilder = this.createQueryBuilder('arena_timings');
        if (timeRangeId && timeRangeId.length > 0) {
            queryBuilder.where('arena_timings.timingId IN (:...timeRangeId)', { timeRangeId });
        }
        return queryBuilder.getMany();
    }
});
