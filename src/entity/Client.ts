import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Transactions } from './Transactions';

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, nullable: false })
    username: string;

    @Column({ nullable: false, width: 4 })
    password: number;

    @Column('decimal', { nullable: false, default: 0, precision: 6, scale: 2 })
    balance: number;

    @OneToMany(() => Transactions, (transactions) => transactions.client)
    transactions: Transactions[]

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}