import * as HTTP from 'http-status-codes';
import { ClientController } from "./controller/ClientController"
import { ClientSchema } from "./schemas/client"
import { TransactionsController } from './controller/TransactionsController';

export const Routes = [

    {
        method: "get",
        route: "/clients",
        controller: ClientController,
        action: "all",
        status: HTTP.StatusCodes.OK
    }, {
        method: "post",
        route: "/clients",
        controller: ClientController,
        action: "save",
        schema: ClientSchema,
        status: HTTP.StatusCodes.CREATED
    }, {
        method: "delete",
        route: "/clients/:id",
        controller: ClientController,
        action: "remove",
        status: HTTP.StatusCodes.GONE
    },
    {
        method: "get",
        route: "/clients/:id",
        controller: ClientController,
        action: "one",
        status: HTTP.StatusCodes.OK,
        requiresAuth: true
    },
    {
        method: "post",
        route: "/clients/login",
        controller: ClientController,
        action: "login",
        schema: ClientSchema,
        status: HTTP.StatusCodes.OK
    },
    {
        method: "post",
        route: "/transaction",
        controller: TransactionsController,
        action: "save",
        status: HTTP.StatusCodes.OK,
        requiresAuth: true
    },
]