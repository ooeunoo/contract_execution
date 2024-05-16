import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Network } from '../network/network.entity';
import { User } from '../user/user.entity';

@Entity()
export class ContractExecution {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  user: User;

  @ManyToOne(() => Network, { nullable: false })
  network: Network;

  @Column({ type: 'varchar', length: 500 })
  name: string;

  @Column({ type: 'varchar', length: 500 })
  address: string;

  @Column({ type: 'longtext' })
  abi: string;
}
