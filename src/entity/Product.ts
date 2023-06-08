import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column()
    cost: number

    
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
