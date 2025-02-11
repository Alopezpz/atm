import * as jwt from 'jsonwebtoken'
import * as express from "express"
import * as bodyParser from "body-parser"
import * as HTTP from 'http-status-codes';
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {

            if (route.requiresAuth) {
                const { authorization: token } = req.headers;

                try {
                    jwt.verify(token, 'atm-test', function (err, decoded) {
                        if (err && !decoded)
                            throw new Error('Unauthorized!')
                    });
                } catch (e) {
                    res.status(HTTP.StatusCodes.UNAUTHORIZED).json(e)
                    return
                }

            }


            if (route.schema) {
                const { error = undefined } = route.schema.validate(req)

                if (error) {
                    res.status(HTTP.StatusCodes.BAD_REQUEST).json(error.message)
                    return
                }
            }

            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(
                    result =>
                        result !== null && result !== undefined ?
                            res.status(route.status || HTTP.StatusCodes.OK).send(result)
                            : undefined
                )
            } else if (result !== null && result !== undefined) {
                res.status(route.status || HTTP.StatusCodes.OK).json(result)
            }
        })
    })

    // start express server
    app.listen(3000)

    console.log("Express server has started on port 3000. Open http://localhost:3000/clients to see results")

}).catch(error => console.log(error))
