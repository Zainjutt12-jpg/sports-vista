import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    JoinColumn,
    OneToOne,
  } from 'typeorm';
import VendorEntity from './vendorEntity';
  
  @Entity('invoices') // Table name
  export default class Invoice {
    @PrimaryGeneratedColumn({ name: 'invoiceId' })
    invoiceId: number; // Auto-generated primary key
  
    @Column({ name: 'invoiceNumber', unique: true })
    invoiceNumber: string;
  
    @Column({ name: 'invoiceAmount', type: 'decimal', precision: 10, scale: 2 })
    invoiceAmount: number; // Invoice amount with precision for decimals
  
    @Column({ name: 'userId' })
    userId: number; // Foreign key for the user

    @Column({ name: 'bookingId' })
    bookingId: string; // Foreign key for the user

  
    @Column({ name: 'vendorId' })
    vendorId: number; // Foreign key for the vendor
  
    @Column({ name: 'arenaId' })
    arenaId: number; 
  
    @Column({ name: 'isAdvance', default: false })
    isAdvance: boolean; // Indicates if the payment is advance
  
    @Column({ name: 'isBook', default: false })
    isBook: boolean; // Indicates if it is a booking
  
    @Column({ name: 'isTournament', default: false })
    isTournament: boolean; // Indicates if it is related to a tournament
  
    @Column({ name: 'isTeamRegistration', default: false })
    isTeamRegistration: boolean; // Indicates if it is a team registration
  
    @Column({ name: 'isSettled', default: false })
    isSettled: boolean; // Indicates if it is a team registration
  
    @Column({ name: 'isOnetoOneMatch', default: false })
    isOnetoOneMatch: boolean; // Indicates if it is a one-to-one match
  
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date; // Automatically stores the creation date
  
    @Column({ name: 'createdBy' })
    createdBy: number; // Stores the ID of the creator

    @OneToOne(() => VendorEntity, vendor => vendor.vendorId)
    @JoinColumn({ name: 'vendorId' , referencedColumnName: 'vendorId' })
    vendor: VendorEntity;

  }
  