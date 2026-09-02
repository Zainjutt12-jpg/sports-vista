import { Body, Get, HttpCode, JsonController, Post, QueryParams } from "routing-controllers";
import Response from "../common/responce/Responce";
import { CreateNotificationDto, GetNotificationRequestDto } from "../dto/request/notificationRequest";
import NotificationService from "../service/notificationService";
import { StatusCodes } from "http-status-codes";
import { OpenAPI } from "routing-controllers-openapi";

@JsonController('/notification')
export default class NotificationsController{

    private notificationService: NotificationService = new NotificationService();

    @OpenAPI({ 
        description: 'Create a New Notification', 
        summary: 'Create a New Notification' 
    })
    @HttpCode(StatusCodes.OK)
    @Post('')
    async createNewNotification(@Body({validate: true}) query: CreateNotificationDto): Promise<Response<any>>{
        return await this.notificationService.createNotification(query);
    }

    @OpenAPI({ 
        description: 'Get Notifications', 
        summary: 'Get Notifications' 
    })
    @HttpCode(StatusCodes.OK)
    @Get('')
    async getNotifications(@QueryParams() query: GetNotificationRequestDto): Promise<Response<any>>{
        return await this.notificationService.getNotifications(
            query?.userId,
            query?.vendorId,
            query?.notificationTypeId
        );
    }

}