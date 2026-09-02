import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('booking_status')
export default class BookingStatusEntity {
    
    @PrimaryGeneratedColumn({ name: 'statusId' })
    statusId: number;

    @Column({ name: 'statusName', type: 'varchar' , length: 255 , nullable: false })
    statusName: string;

}