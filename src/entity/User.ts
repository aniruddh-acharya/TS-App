import { timeStamp } from "console"
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @CreateDateColumn()
    createdOn: Date;

    @Column()
    status: string;

}
