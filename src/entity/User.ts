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

    @DeleteDateColumn({ type:'timestamp', nullable: true })
    deletedOn?: Date;

}
