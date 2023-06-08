import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userID: number

    @Column()
    productID: number
    
    @Column()
    quantity: number

    @CreateDateColumn()
    purchasedOn: Date

    
    // Audit log columns

    @Column()
    createdBy: string;

    @UpdateDateColumn()
    updatedOn: Date;
    
    @Column()
    updatedBy: string;

    @Column()
    status: string;
}
