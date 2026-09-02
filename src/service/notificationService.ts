import { NotificationResponseDto } from "dto/responce/notificationResponseDto";
import Response from "../common/responce/Responce";
import { CREATED } from "../common/responce/StatusCode";
import { CreateNotificationDto } from "../dto/request/notificationRequest";
import NotificationEntity from "../entity/notificationEntity";
import NotificationMapper from "../mapper/notificationMapper";
import { NotificationRepository } from "../repository/notificationRepository";
import { EntityManager } from "typeorm";

export default class NotificationService {

    private notificationRepo = NotificationRepository;

    async createNotification(request: CreateNotificationDto): Promise<Response<any>>{
        let notification : NotificationEntity;

        await this.notificationRepo.manager.transaction(async (entityManager: EntityManager) => {
            notification = await NotificationMapper.addNotification(request);
            notification = await entityManager.save(notification);
        });
        return new Response<any>(notification);
    }

    async getNotifications(userId: number, vendorId: number, notificationTypeId: number): Promise<Response<any>>{
        const notificationData: NotificationEntity[] = await this.notificationRepo.fetchNotification100(userId , vendorId , notificationTypeId);
        let notificationMap: NotificationResponseDto[] = await NotificationMapper.toNotifications(notificationData);
        return new Response<any>(notificationMap);
    }

}