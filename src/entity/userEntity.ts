import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany,OneToOne, BeforeInsert, BeforeUpdate } from "typeorm";
import BookingEntity from "./bookingEntity";
import TeamEntity from "./teamEntity";
import * as bcrypt from 'bcrypt';

@Entity('user_info')  
export default class UserEntity {
    @PrimaryGeneratedColumn({ name: 'userId' })
    userId: number;

    @Column({ name: 'password', type: 'varchar', length: 250 })
    password: string;

    @Column({ name: 'username', type: 'varchar', length: 16, nullable: false })  // Username column
    username: string;

    @Column({ name: 'email', type: 'varchar', length: 255, nullable: false })  // Email column
    email: string;

    @CreateDateColumn({ name: 'createTime', type: 'timestamp' })  // Timestamp column
    createTime: Date;

    @Column({ name: 'areaId', type: 'int', nullable: true })  // Area ID column
    areaId: number;

    @Column({ name: 'phone_number', type: 'varchar', length: 20, nullable: true })  // New Phone Number column
    phoneNumber?: string;

    @OneToMany(() => BookingEntity, booking => booking.user)
    bookings: BookingEntity[];

    @OneToOne(() => TeamEntity, team => team.createdByUser,{ eager: true })
    team: TeamEntity;

    get teamId(): number | null {
     return this.team?.teamId || null;
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
      if (this.password) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
      }
    }

}
