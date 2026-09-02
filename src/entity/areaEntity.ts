import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import CityEntity from "./cityEntity";
import ArenaMasterEntity from "./arenaMasterEntity";

@Entity('areas')
export default class AreaEntity {

    @PrimaryGeneratedColumn({ name: 'areaId' })
    areaId: number;

    @Column()
    areaName: string;

    @Column()
    cityId: number;

    @ManyToOne(() => CityEntity, city => city.areas)
    @JoinColumn({ name: 'cityId' })
    city: CityEntity;

    @ManyToOne(() => ArenaMasterEntity, arena => arena.areas)
    @JoinColumn({ name: 'areaId' })
    arenas: ArenaMasterEntity;
}