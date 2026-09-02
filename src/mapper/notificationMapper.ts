import { NotificationResponseDto } from "dto/responce/notificationResponseDto";
import { CreateNotificationDto } from "../dto/request/notificationRequest";
import NotificationEntity from "../entity/notificationEntity";

export default class NotificationMapper {

    public static async addNotification(request: CreateNotificationDto): Promise<NotificationEntity>{
        let data = new NotificationEntity();
        data.message = request?.message;
        data.notificationTypeId = request?.notificationTypeId;
        data.userId = request?.userId;
        data.vendorId = request?.vendorId;
        data.createdBy = request?.createdBy;
        data.createdAt = new Date();
        return data;
    }

    public static async toNotifications(data: NotificationEntity[]): Promise<NotificationResponseDto[]>{
        let notifications: NotificationResponseDto[] = [];
        
        data?.forEach((d: any) => {
            notifications.push({
                notificationId: d?.notificationId,
                message: d?.message,
                notificationTypeId: d?.notificationTypeId,
                notificationType: d?.notificationType?.notificationType,
                createdAt: d?.createdAt
            })
        })

        return notifications;
    }

}