import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Order } from "./entity/Order"
import { Product } from "./entity/Product"
import { Credential } from "./entity/Credential"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost", // Use environment variable or fallback to "localhost"
    port: parseInt(process.env.DB_PORT) || 5432, // Use environment variable or fallback to 5432
    username: process.env.DB_USERNAME || "postgres", // Use environment variable or fallback to "postgres"
    password: process.env.DB_PASSWORD || "root", // Use environment variable or fallback to "root"
    database: process.env.DB_NAME || "postgres", // Use environment variable or fallback to "postgres"
    synchronize: true,
    logging: false,
    entities: [User, Product, Order, Credential],
    migrations: [],
    subscribers: [],
})