import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Order } from "./entity/Order"
import { Product } from "./entity/Product"
import { Credential } from "./entity/Credential"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",          //'postgres' if docker and 'localhost' if npm
    port: 5432,
    username: "postgres",
    password: "root",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User, Product, Order, Credential],
    migrations: [],
    subscribers: [],
})