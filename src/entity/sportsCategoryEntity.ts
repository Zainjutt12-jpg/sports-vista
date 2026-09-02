import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import TournamentEntity from "./tournamentEntity";

@Entity('sports_categories')
export default class SportsCategoryEntity {

    @PrimaryGeneratedColumn({ name: 'sportsCategoryId' })
    sportsCategoryId: number;

    @Column({ name: 'sportsCategoryName' , nullable: false })
    sportsCategoryName: string;

    @Column({ name: 'sportsIconName' , nullable: false })
    sportsIconName: string;

    @OneToOne(() => TournamentEntity , (t) => t.sportsCategory)
    @JoinColumn({ name: 'sportsCategoryId' })
    tournaments: TournamentEntity;
}