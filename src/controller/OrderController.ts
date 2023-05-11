import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { Order } from "../entity/Order"
import { IsNull } from 'typeorm';

export class OrderController {

    private orderRepository = AppDataSource.getRepository(Order)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.orderRepository.find({ where: { deletedOn: IsNull() } });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        

        const order = await this.orderRepository.findOne({
            where: { id , deletedOn: IsNull() }
        })

        if (!order) {
            response.status(400)
            return "This is an unregistered order"
        }
        return order
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const { userID, productID, quantity } = request.body;

        const order = Object.assign(new Order(), {
            userID,
            productID, 
            quantity
        })

        return this.orderRepository.save(order)
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        
        let orderToUpdate = await this.orderRepository.findOneBy({ id })

        if (!orderToUpdate) {
            response.status(400)
            return "This order does not exist"
        }

        await this.orderRepository.update(id, request.body)

        return "The order has been updated"
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let orderToRemove = await this.orderRepository.findOneBy({ id })

        if (!orderToRemove) {
            response.status(400)
            return "This order does not exist"
        }

        await this.orderRepository.remove(orderToRemove)

        return "order has been deleted"
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let orderToRemove = await this.orderRepository.findOneBy({ id })

        if (!orderToRemove) {
            response.status(400)
            return "This order does not exist"
        }

        await this.orderRepository.softRemove(orderToRemove);

        return "order has been removed"
    }

}