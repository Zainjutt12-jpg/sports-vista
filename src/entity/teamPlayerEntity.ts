import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import TeamEntity from './teamEntity';

@Entity('team_players')
@Index('UQ_team_players_roster', ['teamId', 'rosterOrder'], { unique: true })
export default class TeamPlayerEntity {

    @PrimaryGeneratedColumn({ name: 'playerId' })
    playerId: number;

    @Column({ name: 'teamId', type: 'int', nullable: false })
    teamId: number;

    @Column({ name: 'playerName', type: 'varchar', length: 255, nullable: false })
    playerName: string;

    @Column({ name: 'rosterOrder', type: 'int', nullable: false })
    rosterOrder: number;

    @ManyToOne(() => TeamEntity, team => team.players, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'teamId' })
    team: TeamEntity;
}
