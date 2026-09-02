import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import UserEntity from './userEntity';
import VendorEntity from './vendorEntity';
import ArenaMasterEntity from './arenaMasterEntity';
import BookingStatusEntity from './bookinsStatusEntity';
import BookingTypeEntity from './bookingTypeEntity';

@Entity('booking_info')
export default class BookingEntity {
    @PrimaryGeneratedColumn({ name: 'bookingId' })
    bookingId: number;

    @Column({ name: 'userId', type: 'int' })
    userId: number;

    @Column({ name: 'vendorId', type: 'int' })
    vendorId: number;

    @Column({ name: 'arenaId', type: 'int' })
    arenaId: number;

    @Column({ name: 'userName', type: 'varchar', length: 255 })
    userName: string;

    @Column({ name: 'userEmail', type: 'varchar', length: 255 })
    userEmail: string;

    @Column({ name: 'userPhone', type: 'varchar', length: 20 })
    userPhone: string;

    @Column({ name: 'receivedAmount', type: 'decimal', precision: 10, scale: 2 })
    receivedAmount: number;

    @Column({ name: 'timeRangeIds', type: 'varchar',length:255 })
    timeRangeIds: string;

    @Column({ name: 'courtId', type: 'int' })
    courtId: number;

    @Column({ name: 'date', type: 'date' })
    date: Date;

    @Column({ name: 'day', type: 'int' }) 
    day: number;

    @Column({ name: 'month', type: 'int' }) 
    month: number;

    @Column({ name: 'year', type: 'int' }) 
    year: number;

    @Column({ name: 'bookingTypeId', type: 'int' }) 
    bookingTypeId: number;

    @Column({ name: 'statusId', type: 'int', default: 1 })
    statusId: number;
    
    @ManyToOne(() => UserEntity, user => user.bookings)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @ManyToOne(() => VendorEntity, vendor => vendor.bookings)
    @JoinColumn({ name: 'vendorId' })
    vendor: VendorEntity;

    @ManyToOne(() => ArenaMasterEntity, arena => arena.bookings)
    @JoinColumn({ name: 'arenaId' })
    arena: ArenaMasterEntity;

    @OneToOne(() => BookingStatusEntity, status => status.statusId)
    @JoinColumn({ name: 'statusId' , referencedColumnName: 'statusId' })
    bookingStatus: BookingStatusEntity;

    @OneToOne(() => BookingTypeEntity, type => type.bookingTypeId)
    @JoinColumn({ name: 'bookingTypeId' , referencedColumnName: 'bookingTypeId' })
    bookingType: BookingTypeEntity;

}
