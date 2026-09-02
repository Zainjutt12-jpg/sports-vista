import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, OneToMany, OneToOne, BeforeUpdate, BeforeInsert } from "typeorm";
import EmployeeEntity from "./employeeEntity";
import BookingEntity from "./bookingEntity";
import TournamentEntity from "./tournamentEntity";
import VendorAccountEntity from "./vendorAccountEntity";
import * as bcrypt from 'bcrypt';

@Entity('vendor')
export default class VendorEntity {
    @PrimaryGeneratedColumn({ name: 'vendorId' })
    vendorId: number;

    @Column({ name: 'fullName', type: 'varchar', length: 255, nullable: false })  // Full Name column
    fullName: string;

    @Column({ name: 'userName', type: 'varchar', length: 255, nullable: false })  // User Name column
    userName: string;

    @Column({ name: 'email', type: 'varchar', length: 255, nullable: false })  // Email column
    email: string;

    @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })  // Password column
    password: string;

    @Column({ name: 'subscriptionId', type: 'int', nullable: true })  // Subscription ID column
    subscriptionId?: number;

    @Column({ name: 'phoneNumber', type: 'varchar', length: 20, nullable: true })  // Phone Number column
    phoneNumber?: string;

    @Column({ name: 'address', type: 'text', nullable: true })  // Address column
    address?: string;

    @CreateDateColumn({ name: 'createdTime', type: 'timestamp' })  // Created Time column
    createdTime: string;

    @CreateDateColumn({ name: 'vendorAccountId', type: 'int' })  // Created Time column
    vendorAccountId: number;
    
    @OneToMany(() => EmployeeEntity, employee => employee.vendors )
    @JoinColumn({ name: 'vendorId' })
    employeeVendor: EmployeeEntity[];

    @OneToMany(() => BookingEntity, booking => booking.vendor)
    bookings: BookingEntity[];

    @OneToOne(() => TournamentEntity , tournament => tournament.vendor)
    @JoinColumn({ name: 'vendorId' })
    tournament: TournamentEntity;

    @OneToOne(() => VendorAccountEntity , account => account.vendorAccountId)
    @JoinColumn({ name: 'vendorAccountId',  referencedColumnName: 'vendorAccountId'})
    vendorAccount: VendorAccountEntity;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
        }
    }

}
