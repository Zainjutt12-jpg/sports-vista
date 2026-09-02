import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,OneToOne } from 'typeorm';
import UserEntity from './userEntity';
import RegistrationOfTeamEntity from './registrationOfTeamsEntity';
@Entity('playerTeams')
export default class TeamEntity{

    @PrimaryGeneratedColumn({name:'teamId'})
    teamId:number

    @Column({name:'teamName',type:'varchar',nullable: false})
    teamName:string

    @Column({name:'teamLogo',type:'longtext', nullable: false})
    teamLogo:string

    @Column({name:'teamDesc',type:'varchar', nullable: false})
    teamDesc:string

    @Column({name:'player1',type:'varchar', nullable: false})
    player1:string

    @Column({name:'player2',type:'varchar', nullable: false})
    player2:string

    @Column({name:'player3',type:'varchar', nullable: false})
    player3:string

    @Column({name:'player4',type:'varchar', nullable: false})
    player4:string

    @Column({name:'player5',type:'varchar', nullable: false})
    player5:string

    @Column({name:'player6',type:'varchar', nullable: false})
    player6:string

    @Column({name:'player7',type:'varchar', nullable: false})
    player7:string

    @Column({name:'createdBy',type:'varchar', nullable: false})
    createdBy:string

    @Column({name: 'createdById', nullable: false})
    createdById: number;

    @OneToOne(() => UserEntity, user => user.team, { nullable: false })
    @JoinColumn({ name: 'createdById' })  
    createdByUser: UserEntity;

}