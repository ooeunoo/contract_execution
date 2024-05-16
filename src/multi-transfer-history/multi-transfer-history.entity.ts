import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MultiTransfer } from '../multi-transfer/multi-transfer.entity';

@Entity()
export class MultiTransferHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MultiTransfer, (multiTransfer) => multiTransfer.histories, {
    nullable: true,
  })
  multiTransfer: MultiTransfer;

  @Column({ type: 'varchar', length: 500 })
  from: string;

  @Column({ type: 'varchar', length: 500 })
  to: string;

  @Column({ type: 'decimal', precision: 65, scale: 22, default: 0 })
  amount: string;
}
