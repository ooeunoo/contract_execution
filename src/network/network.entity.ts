import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Network {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  label: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  currency: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  currencyLogo: string;

  @Column({ type: 'integer', nullable: false })
  chainId: number;

  @Column({ type: 'boolean', nullable: false })
  testnet: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  multicall: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  explorer: string;
}
