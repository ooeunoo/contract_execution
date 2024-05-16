import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AuthProvider } from './user.constant';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  email: string;

  @Column({ length: 500 })
  name: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 500, nullable: false, default: '' })
  image: string;

  @Column({ type: 'enum', enum: AuthProvider, default: AuthProvider.LOCAL })
  provider: AuthProvider;
}
