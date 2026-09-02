import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import ProvinceEntity from "./provinceEntity";
import AreaEntity from "./areaEntity";
import ArenaMasterEntity from "./arenaMasterEntity";

@Entity('cities')
export default class CityEntity {

    @PrimaryGeneratedColumn({ name: 'cityId' })
    cityId: number;

    @Column()
    cityName: string;

    @Column()
    cityActive: number;

    @ManyToOne(() => ProvinceEntity, province => province.cities)
    @JoinColumn({ name: 'provinceId' })
    province: ProvinceEntity;
    
    @ManyToOne(() => ArenaMasterEntity, arenas => arenas.cities)
    @JoinColumn({ name: 'cityId' })
    area: ArenaMasterEntity;

    @OneToMany(() => AreaEntity, area => area.city)
    areas: AreaEntity[];
}