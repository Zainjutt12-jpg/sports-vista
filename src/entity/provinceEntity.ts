import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import CityEntity from "./cityEntity";

@Entity('provinces')
export default class ProvinceEntity {
    @PrimaryGeneratedColumn({ name: 'provinceId' })
    provinceId: number;

    @Column()
    provinceName: string;

    @Column()
    isActive: string;

    @OneToMany(() => CityEntity, city => city.province)
    cities: CityEntity[];
}