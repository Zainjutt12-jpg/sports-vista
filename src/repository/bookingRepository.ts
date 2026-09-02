import AppDataSource from "../config/dataSourceConfig";
import BookingEntity from '../entity/bookingEntity';

export const BookingInfoRepository = AppDataSource.getRepository(BookingEntity).extend({
    // Fetch the first booking (based on any sorting or filters applied)
    async fetchFirst(): Promise<BookingEntity | undefined> {
        return this.createQueryBuilder('booking_info').getOne();
    },

    // Fetch all bookings
    async findBookings(vendorId: number): Promise<BookingEntity[]> {
        return this.createQueryBuilder('booking_info')
            .where('(:vendorId IS NULL OR booking_info.vendorId = :vendorId)', { vendorId })
            .leftJoin('booking_info.arena', 'arena')
            .addSelect(['arena.arenaId', 'arena.arenaName', 'arena.pricePerHour' , 'arena.nightCharges'])
            .orderBy('booking_info.bookingId', 'DESC')
            .getMany();
    },

    // Fetch all bookings
    async findTodayBookings(vendorId: number , isMonthly: boolean): Promise<BookingEntity[]> {
        let today = new Date();
        let localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split('T')[0];
        let todayDay = isMonthly? null :Number(localDate.split('-')[2]);
        let todayMonth = Number(localDate.split('-')[1]);
        let currentYear = Number(localDate.split('-')[0]);
        return this.createQueryBuilder('booking_info')
            .where('(booking_info.vendorId = :vendorId)', { vendorId })
            .andWhere('(:todayDay IS NULL OR booking_info.day = :todayDay)', { todayDay })
            .andWhere('(booking_info.month = :todayMonth)', { todayMonth })
            .andWhere('(booking_info.year = :currentYear)', { currentYear })
            .getMany();
    },

    // Fetch bookings by userId (useful if you need to find bookings specific to a user)
    async findBookingsByUserId(userId: number): Promise<BookingEntity[]> {
        return this.createQueryBuilder('booking_info')
            .where('(booking_info.userId = :userId)', { userId })
            .leftJoin('booking_info.arena', 'arena')
            .addSelect(['arena.arenaId', 'arena.arenaName', 'arena.pricePerHour' , 'arena.nightCharges'])
            .leftJoin('booking_info.vendor', 'vendor')
            .addSelect(['vendor.vendorId', 'vendor.fullName', 'vendor.phoneNumber'])
            .leftJoinAndSelect('booking_info.bookingStatus', 'bookingStatus')
            .leftJoinAndSelect('booking_info.bookingType', 'bookingType')
            .orderBy('booking_info.bookingId', 'DESC')
            .getMany();
    },

    // Fetch bookings by arenaId (useful if you need to find bookings specific to an arena)
    async findBookingsByArenaId(arenaId: number , date: string , page: number , pageSize: number): Promise<any> {
        
        let booking = await this.createQueryBuilder('booking_info')
            .leftJoin('booking_info.arena', 'arena')
            .addSelect(['arena.arenaId', 'arena.arenaName', 'arena.pricePerHour' , 'arena.nightCharges'])
            .leftJoin('booking_info.user', 'user')
            .addSelect(['user.userId', 'user.userName', 'user.phoneNumber'])
            .leftJoinAndSelect('booking_info.bookingStatus', 'bookingStatus')
            .leftJoinAndSelect('booking_info.bookingType', 'bookingType')
            .where('(booking_info.arenaId = :arenaId)', { arenaId })
            .andWhere('(:date IS NULL OR booking_info.date = :date)', { date })
            .orderBy('booking_info.bookingId', 'DESC');

        if(page && pageSize){
            await booking.skip((page - 1) * pageSize).take(pageSize);
        }

        return await booking.getManyAndCount();

    },

    async findBookingByArenaandDate(arenaId: number , date: string , courtId: number): Promise<BookingEntity[]>{
        const timeData = await this.createQueryBuilder('booking_info')
            .where('(:arenaId IS NULL OR booking_info.arenaId = :arenaId)', { arenaId })
            .andWhere('(:date IS NULL OR DATE(booking_info.date) = :date)', { date })
            .andWhere('(:courtId IS NULL OR booking_info.courtId = :courtId)', { courtId })
            .andWhere('(:statusId IS NULL OR booking_info.statusId != :statusId)', { statusId: 2 })
            .orderBy('booking_info.bookingId', 'DESC')
            .getMany();
        return timeData;
    },

    async findBookingByBookingId(   bookingId: number  ): Promise<BookingEntity>{
        const bookingData = await this.createQueryBuilder('booking_info')
            .where('(:bookingId IS NULL OR booking_info.bookingId = :bookingId)', { bookingId })
            .getOne();
        return bookingData;
    },

    async find_Bookings_By_Month_Year(month: number , year: number , vendorId: number): Promise<BookingEntity[]>{
        return this.createQueryBuilder('booking_info')
        .leftJoin('booking_info.arena', 'arena')
        .addSelect(['arena.pricePerHour'])
        .where('(booking_info.month = :month)', { month })
        .andWhere('(booking_info.year = :year)', { year })
        .andWhere('(booking_info.vendorId = :vendorId)', { vendorId })
        .orderBy('booking_info.day', 'ASC')
        .getMany();
    }
});
