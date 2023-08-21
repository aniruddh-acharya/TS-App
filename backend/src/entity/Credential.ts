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

    @Column()
    role: string;

    @Column({ type: 'jsonb', default: [] })
    tokens: { token: string; signedAt: string }[];

    @OneToOne(type => User) 
    @JoinColumn() 
    user: User;

    // Audit log columns

    @CreateDateColumn()
    createdOn: Date;

    @Column()
    createdBy: string;

    @UpdateDateColumn()
    updatedOn: Date;
    
    @Column()
    updatedBy: string;
    
    @Column()
    status: string;

}
