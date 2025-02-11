import * as jwt from 'jsonwebtoken'
import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Client } from "../entity/Client"

export class ClientController {

    private clientRepository = AppDataSource.getRepository(Client)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.clientRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const client = await this.clientRepository.findOneBy({ id })

        if (!client) {
            return "unregistered client"
        }
        return client
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { username, password } = request.body;

        const client = await this.clientRepository.findOneBy({ username })

        if (client) {
            return "username in use"
        }

        const newClient = Object.assign(new Client(), {
            username,
            password
        } as Client)

        return this.clientRepository.save(newClient)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let clientToRemove = await this.clientRepository.findOneBy({ id })

        if (!clientToRemove) {
            return "this client does not exist"
        }

        await this.clientRepository.remove(clientToRemove)

        return "client has been removed"
    }

    async login(request: Request, response: Response, next: NextFunction) {
        const { username, password } = request.body

        let client = await this.clientRepository.findOneBy({ username, password })

        if (!client) {
            return "incorrect username or password"
        }

        let token = jwt.sign(client.id, "atm-test");

        return {
            authToken: token,
            clientId: client.id
        }
    }
}