import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import NotificationTypeEntity from "./notificationTypeEntity";

@Entity('notification_logs')
export default class NotificationEntity{

    @PrimaryGeneratedColumn({ name: 'notificationId' })
    notificationId: number;

    @Column({ name: 'message' , nullable: false , type: 'varchar' , length: 255 })
    message: string;

    @Column({ name: 'notificationTypeId' , nullable: false , type: 'int' })
    notificationTypeId: number;

    @Column({ name: 'vendorId' , nullable: true , type: 'bigint' })
    vendorId: number;

    @Column({ name: 'userId' , nullable: true , type: 'bigint' })
    userId: number;

    @Column({ name: 'createdBy' , nullable: false , type: 'varchar' , length: 100 })
    createdBy: string;

    @Column({ name: 'createdAt' , nullable: false , type: 'datetime' })
    createdAt: Date;

    @OneToOne(() => NotificationTypeEntity, type => type.notificationTypeId)
    @JoinColumn({ name: 'notificationTypeId' })
    notificationType: NotificationTypeEntity;

}