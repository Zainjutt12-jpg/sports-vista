import { IsNumber } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn,OneToOne, JoinColumn } from "typeorm";
import TeamEntity from "./teamEntity";
@Entity('tournament_registrations')
export default class RegistrationOfTeamEntity{

    @PrimaryGeneratedColumn({ name: 'registrationId' })
    registrationId: number;

    @Column({ name: 'teamId' , nullable: false })
    teamId: number;

    @Column({ name: 'tournamentId' , nullable: false })
    tournamentId: number;

    @Column({ name: 'feesPaid' , nullable: false })
    feesPaid: boolean;

    @OneToOne(() => TeamEntity, (x) => x.teamId, { nullable: false })
    @JoinColumn({ name: "teamId", referencedColumnName: "teamId" })
    teams: TeamEntity;

}

