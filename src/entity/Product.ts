import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn } from "typeorm"

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column()
    cost: number

    @CreateDateColumn()
    createdOn: Date;
    
    @DeleteDateColumn({ type:'timestamp', nullable: true })
    deletedOn?: Date;

}
