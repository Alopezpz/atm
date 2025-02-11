import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [
        `src/entity/{*.ts,**/!(__tests__)/*.ts}`,
        `**/src/entity/{*.ts,**/!(__tests__)/*.ts}`
    ],
    migrations: [],
    subscribers: [],
})
