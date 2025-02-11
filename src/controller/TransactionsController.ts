import * as jwt from 'jsonwebtoken'
import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Transactions } from "../entity/Transactions"
import { Client } from '../entity/Client'
import { TransactionType } from '../enums/transactions'

export class TransactionsController {

    private transactionsRepository = AppDataSource.getRepository(Transactions)
    private clientRepository = AppDataSource.getRepository(Client)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.transactionsRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const Transactions = await this.transactionsRepository.findOneBy({ id })

        if (!Transactions) {
            return "unregistered Transactions"
        }
        return Transactions
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { authorization: code } = request.headers;
        const { transactionType, amount } = request.body;
        const decoded = jwt.verify(code, 'atm-test');

        const client = await this.clientRepository.findOneBy({ id: decoded });

        if (transactionType == TransactionType.WITHDRAW) {
            client.balance = +client.balance - +amount;
            if (client.balance < 0)
                return "saldo insuficiente"
        } else {
            client.balance = +client.balance + +amount
        }

        this.clientRepository.save(client)

        const newTransactions = Object.assign(new Transactions(), {
            transactionType,
            amount
        } as Transactions)

        return this.transactionsRepository.save(newTransactions)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let clientToRemove = await this.transactionsRepository.findOneBy({ id })

        if (!clientToRemove) {
            return "this transaction does not exist"
        }

        await this.transactionsRepository.remove(clientToRemove)

        return "transaction has been removed"
    }

}