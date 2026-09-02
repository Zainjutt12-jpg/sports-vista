import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('booking_status')
export default class StatusEntity{

    @PrimaryGeneratedColumn({name:'statusId'})
    statusId: number;

    @Column({ name: 'statusName' , nullable: false })
    statusName: string;
    
}