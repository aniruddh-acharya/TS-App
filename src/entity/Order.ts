import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn } from "typeorm"

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

    @DeleteDateColumn({ type:'timestamp', nullable: true })
    deletedOn?: Date;
}
