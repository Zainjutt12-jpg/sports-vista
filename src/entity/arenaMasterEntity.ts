import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import AreaEntity from "./areaEntity";
import CityEntity from "./cityEntity";
import EmployeeEntity from "./employeeEntity";
import BookingEntity from "./bookingEntity";
import TournamentEntity from "./tournamentEntity";
@Entity('arena_master')
export default class ArenaMasterEntity{
    
    @PrimaryGeneratedColumn({ name: 'arenaId' })
    arenaId: number;

    @Column({ name: 'arenaName' , nullable: false })
    arenaName: string;
    
    @Column({ name: 'arenaAddress' , nullable: false })
    arenaAddress: string;

    @Column({ name: 'arenaPhone' , nullable: false })
    arenaPhone: string;

    @Column({ name: 'noOfCourts' , nullable: false })
    noOfCourts: number;

    @Column({ name: 'availableSports' , nullable: false })
    availableSports: string;
    
    @Column({ name: 'pricePerHour' , nullable: false })
    pricePerHour: number;

    @Column({ name: 'nightCharges' , nullable: false })
    nightCharges: number;

    @Column({ name: 'primaryPic' , nullable: true })
    primaryPic: string;

    @Column({ name: 'advanceCharges' , nullable: false })
    advanceCharges: number;

    @Column({ name: 'weekendAdvance' , nullable: false })
    weekendAdvance: number;

    @Column({ name: 'iframeLink' , nullable: false })
    iframeLink: string;

    @Column({ name: 'areaId' , nullable: false })
    areaId: number;

    @Column({ name: 'vendorId' , nullable: false })
    vendorId: number;

    @Column({ name: 'cityId' , nullable: false })
    cityId: number;

    @Column({ name: 'ruleId' , nullable: false })
    ruleId: number;

    @Column({ name: 'image1' , nullable: true })
    image1: string;

    @Column({ name: 'image2' , nullable: true })
    image2: string;

    @Column({ name: 'image3' , nullable: true })
    image3: string;

    @Column({ name: 'image4' , nullable: true })
    image4: string;

    @Column({ name: 'image5' , nullable: true })
    image5: string;

    @Column({ name: 'active' , type: 'tinyint' , nullable: false })
    active: boolean;

    @OneToMany(() => AreaEntity, area => area.arenas)
    areas: AreaEntity[];

    @OneToMany(() => CityEntity, city => city.area)
    cities: CityEntity[];

    @OneToMany(() => EmployeeEntity, employee => employee.arenas )
    @JoinColumn({ name: 'arenaId' })
    employeeArenas: EmployeeEntity[];
    
    @OneToMany(() => BookingEntity, booking => booking.arena)
    bookings: BookingEntity[];

    @OneToOne(() => TournamentEntity , tournament => tournament.arena)
    @JoinColumn({ name: 'arenaId' })
    tournament: TournamentEntity;
}