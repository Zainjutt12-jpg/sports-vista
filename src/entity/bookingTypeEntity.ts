import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('booking_type')
export default class BookingTypeEntity {

    @PrimaryGeneratedColumn({ name: 'bookingTypeId' })
    bookingTypeId: number;

    @Column({ name: 'bookingType', type: 'varchar' , length: 255 , nullable: false })
    bookingType: string;

}