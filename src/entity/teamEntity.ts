import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import UserEntity from './userEntity';
import TeamPlayerEntity from './teamPlayerEntity';

@Entity('playerTeams')
export default class TeamEntity {

    @PrimaryGeneratedColumn({ name: 'teamId' })
    teamId: number;

    @Column({ name: 'teamName', type: 'varchar', nullable: false })
    teamName: string;

    @Column({ name: 'teamLogo', type: 'longtext', nullable: false })
    teamLogo: string;

    @Column({ name: 'teamDesc', type: 'varchar', nullable: false })
    teamDesc: string;

    @Column({ name: 'createdBy', type: 'varchar', nullable: false })
    createdBy: string;

    @Column({ name: 'createdById', nullable: false })
    createdById: number;

    @OneToOne(() => UserEntity, user => user.team, { nullable: false })
    @JoinColumn({ name: 'createdById' })
    createdByUser: UserEntity;

    @OneToMany(() => TeamPlayerEntity, player => player.team, {
        cascade: true,
        eager: true,
        orphanedRowAction: 'delete',
    })
    players: TeamPlayerEntity[];
}
