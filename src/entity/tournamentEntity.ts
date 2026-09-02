import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import ArenaMasterEntity from "./arenaMasterEntity";
import VendorEntity from "./vendorEntity";
import TimeRangeEntity from "./timeRangeEntity";
import SportsCategoryEntity from "./sportsCategoryEntity";

@Entity('tournament')
export default class TournamentEntity {

    @PrimaryGeneratedColumn({ name: 'tournamentId' })
    tournamentId: number;

    @Column({ name: 'vendorId' , type: 'int' })
    vendorId: number;

    @Column({ name: 'arenaId' , type: 'int' })
    arenaId: number;

    @Column({ name: 'tournamentName' , type: 'varchar' })
    tournamentName: string;

    @Column({ name: 'tournamentLogo' , type: 'varchar' })
    tournamentLogo: string;

    @Column({ name: 'tournamentDesc' , type: 'longtext' })
    tournamentDesc: string;

    @Column({ name: 'registrationFee' , type: 'varchar' })
    registrationFee: string;

    @Column({ name: 'date' , type: 'varchar' })
    date: string;

    @Column({ name: 'timeRangeStartId' , type: 'int' })
    timeRangeStartId: number;

    @Column({ name: 'timeRangeEndId' , type: 'int' })
    timeRangeEndId: number;

    @Column({ name: 'isThirdParty' , type: 'boolean' })
    isThirdParty: boolean;

    @Column({ name: 'hostedBy' , type: 'varchar' })
    hostedBy: string;

    @Column({ name: 'hostName' , type: 'varchar' })
    hostName: string;

    @Column({ name: 'hostCnic' , type: 'varchar' })
    hostCnic: string;

    @Column({ name: 'winningPrize' , type: 'varchar' })
    winningPrize: string;

    @Column({ name: 'runnerUpPrize' , type: 'varchar' })
    runnerUpPrize: string;

    @Column({ name: 'noOfTeams' , type: 'int' })
    noOfTeams: number;

    @Column({ name: 'sportsCategoryId' , type: 'int' })
    sportsCategoryId: number;

    @OneToOne(() => ArenaMasterEntity , arena => arena.tournament)
    @JoinColumn({ name: 'arenaId' })
    arena: ArenaMasterEntity;

    @OneToOne(() => VendorEntity , vendor => vendor.tournament)
    @JoinColumn({ name: 'vendorId' })
    vendor: VendorEntity;

    @OneToOne(() => TimeRangeEntity , time => time.tournamentStart)
    @JoinColumn({ name: 'timeRangeStartId' })
    timeStart: TimeRangeEntity;

    @OneToOne(() => TimeRangeEntity , time => time.tournamentEnd)
    @JoinColumn({ name: 'timeRangeEndId' })
    timeEnd: TimeRangeEntity;

    @OneToOne(() => SportsCategoryEntity , sport => sport.tournaments)
    @JoinColumn({ name: 'sportsCategoryId' })
    sportsCategory: SportsCategoryEntity;
}