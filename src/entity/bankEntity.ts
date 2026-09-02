import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('banks')
export default class BankEntity {
    @PrimaryGeneratedColumn({ name: 'bankId' })
    bankId: number;

    @Column({ name: 'bankName', type: 'varchar', length: 255, nullable: false })
    bankName: string;

    @Column({ name: 'bankLogo', type: 'longtext', nullable: true })
    bankLogo: string;

    @Column({ name: 'active', type: 'boolean', nullable: false })
    active: boolean;

}