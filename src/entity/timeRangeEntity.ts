import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import BookingEntity from "./bookingEntity";
import TournamentEntity from "./tournamentEntity";

@Entity('arena_timings')
export default class TimeRangeEntity{

    @PrimaryGeneratedColumn({ name: 'timingId' })
    timingId: number;

    @Column({ name: 'timingRange' , nullable: false })
    timingRange: string;

    @OneToMany(() => BookingEntity, book => book.timeRangeIds)
    @JoinColumn({ name: 'timingId' })
    bookings: TimeRangeEntity;

    @OneToOne(() => TournamentEntity, tournament => tournament.timeStart)
    @JoinColumn({ name: 'timingId' })
    tournamentStart: TournamentEntity;

    @OneToOne(() => TournamentEntity, tournament => tournament.timeEnd)
    @JoinColumn({ name: 'timingId' })
    tournamentEnd: TournamentEntity;
}