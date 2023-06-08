import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

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
