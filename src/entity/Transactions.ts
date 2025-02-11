import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Client } from './Client'
import { TransactionType } from '../enums/transactions'

@Entity()
export class Transactions {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, name: 'transaction_type' })
    transactionType: TransactionType

    @Column('decimal', { nullable: false, precision: 6, scale: 2 })
    amount: number

    @ManyToOne(() => Client, (client) => client.transactions)
    client: Client

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}