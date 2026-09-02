import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import ArenaMasterEntity from "./arenaMasterEntity";
import VendorEntity from "./vendorEntity";
import * as bcrypt from 'bcrypt';

@Entity('employee')
export default class EmployeeEntity{

    @PrimaryGeneratedColumn({ name: 'employeeId' })
    employeeId: number;

    @Column({ name: 'employeeName' , nullable: false })
    employeeName: string;

    @Column({ name: 'address' , nullable: false })
    address: string;

    @Column({ name: 'phone' , nullable: false })
    phone: string;

    @Column({ name: 'employmentType' , nullable: false })
    employmentType: string;

    @Column({ name: 'salary' , nullable: false })
    salary: number;

    @Column({ name: 'cnic' , nullable: false })
    cnic: string;

    @Column({ name: 'arenaId' , nullable: false })
    arenaId: number;

    @Column({ name: 'vendorId' , nullable: false })
    vendorId: number;

    @Column({ name: 'email' , nullable: false })
    email: string;

    @Column({ name: 'password' , nullable: false })
    password: string;

    @ManyToOne(() => ArenaMasterEntity, arena => arena.employeeArenas)
    @JoinColumn({ name: 'arenaId' })
    arenas: ArenaMasterEntity;

    @ManyToOne(() => VendorEntity, vendor => vendor.employeeVendor)
    @JoinColumn({ name: 'vendorId' })
    vendors: VendorEntity;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
        }
    }
    
}