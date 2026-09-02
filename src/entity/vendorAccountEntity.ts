import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import BankEntity from "./bankEntity";
import VendorEntity from "./vendorEntity";

@Entity('vendor_account')
export default class VendorAccountEntity {
    @PrimaryGeneratedColumn({ name: 'vendorAccountId' })
    vendorAccountId: number;

    @Column({ name: 'bankId', type: 'int', nullable: false })
    bankId: number;

    @Column({ name: 'accountNumber', type: 'varchar', length: 255, nullable: false })
    accountNumber: string;

    @Column({ name: 'accountHolderName', type: 'varchar', length: 255, nullable: false })
    accountHolderName: string;

    @Column({ name: 'ibanAccountNumber', type: 'varchar', length: 255, nullable: false })
    ibanAccountNumber: string;

    @Column({ name: 'balance', type: 'decimal', nullable: true })
    balance: number;

    @Column({ name: 'createdBy', type: 'varchar', length: 255, nullable: false })
    createdBy: string;

    @Column({ name: 'createdAt', type: 'varchar', length: 255, nullable: false })
    createdAt: string;

    @Column({ name: 'lastModifiedBy', type: 'varchar', length: 255, nullable: false })
    lastModifiedBy: string;

    @Column({ name: 'lastModifiedAt', type: 'varchar', length: 255, nullable: false })
    lastModifiedAt: string;

    @Column({ name: 'active', type: 'boolean', nullable: false })
    active: boolean;

    @OneToOne(() => BankEntity , bank => bank.bankId)
    @JoinColumn({ name: 'bankId',  referencedColumnName: 'bankId'})
    Bank: BankEntity;

    @OneToOne(() => VendorEntity , bank => bank.vendorAccountId)
    @JoinColumn({ name: 'vendorAccountId',  referencedColumnName: 'vendorAccountId'})
    Vendor: VendorEntity;

}