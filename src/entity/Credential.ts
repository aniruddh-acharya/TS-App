import { timeStamp } from "console"
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, OneToOne, JoinColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User";

@Entity()
export class Credential {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToOne(type => User) 
    @JoinColumn() 
    user: User;

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    updatedOn: Date;

}
