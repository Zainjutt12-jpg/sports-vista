import NotificationEntity from "../entity/notificationEntity";
import AppDataSource from "../config/dataSourceConfig";

export const NotificationRepository = AppDataSource.getRepository(NotificationEntity).extend({

    async fetchNotification100(
        userId: number,
        vendorId: number,
        notificationTypeId: number
    ): Promise<NotificationEntity[]>{
        return await this.createQueryBuilder('notification')
            .leftJoinAndSelect('notification.notificationType', 'notificationType') 
            .where("(:userId IS NULL OR notification.userId = :userId)", {userId})
            .andWhere("(:vendorId IS NULL OR notification.vendorId = :vendorId)", {vendorId})
            .andWhere("(:notificationTypeId IS NULL OR notification.notificationTypeId = :notificationTypeId)", {notificationTypeId})
            .orderBy('notification.notificationId', 'DESC')
            .take(100)
            .getMany();
    }

})