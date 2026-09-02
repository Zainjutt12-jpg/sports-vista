import StatusEntity from "../entity/statusEntity";
import AppDataSource from "../config/dataSourceConfig";

export const BookingStatusRepository = AppDataSource.getRepository(StatusEntity).extend({

    fetchById(statusId: number) {
        return this.createQueryBuilder("booking_status")
            .where("(:statusId IS NULL OR booking_status.statusId = :statusId)", {statusId})
            .getOne()
    },

    fetchAll() {
        return this.createQueryBuilder("booking_status")
            .getMany()
    },


})

