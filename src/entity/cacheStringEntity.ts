import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity('cache_string') // Name of the table
export default class CacheString {

  @PrimaryColumn({ name: 'userId', type: 'int' })
  userId: number | null;

  @PrimaryColumn({ name: 'vendorId', type: 'int' })
  vendorId: number | null;

  @Column({ name: 'cacheString', type: 'varchar', length: 1000, nullable: false })
  cacheString: string;
}
