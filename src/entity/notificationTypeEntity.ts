import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('notification_type')
export default class NotificationTypeEntity{

    @PrimaryGeneratedColumn({ name: 'notificationTypeId' })
    notificationTypeId: number;

    @Column({ name: 'notificationType' , nullable: false , type: 'varchar' , length: 255 })
    notificationType: string;

}