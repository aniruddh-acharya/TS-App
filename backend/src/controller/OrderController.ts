import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { Order } from "../entity/Order"
import { AuthRequest } from '../auth/authentication';

export class OrderController {

    private orderRepository = AppDataSource.getRepository(Order)

    async all(request: AuthRequest, response: Response, next: NextFunction) {
        return this.orderRepository.find({ where: { status: 'active' } });
    }

    async one(request: AuthRequest, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        

        const order = await this.orderRepository.findOne({
            where: { id , status: 'active' }
        })

        if (!order) {
            response.status(400)
            return "This is an unregistered order"
        }
        return order
    }

    async create(request: AuthRequest, response: Response, next: NextFunction) {
        const { userID, productID, quantity } = request.body;
        const u=request.user
        const order = Object.assign(new Order(), {
            userID,
            productID, 
            quantity,
            createdBy: request.user.username,
            updatedBy: request.user.username,
            status: "active"
        })

        return this.orderRepository.save(order)
    }

    async update(request: AuthRequest, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        
        let orderToUpdate = await this.orderRepository.findOneBy({ id })

        if (!orderToUpdate) {
            response.status(400)
            return "This order does not exist"
        }

        const updatedOrderData = {
            ...request.body,
            updatedBy: request.user.username, // Set the updatedBy column to the Order's ID
        };

        await this.orderRepository.update(id, updatedOrderData)

        return "The order has been updated"
    }

    async delete(request: AuthRequest, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let orderToRemove = await this.orderRepository.findOneBy({ id })

        if (!orderToRemove) {
            response.status(400)
            return "This order does not exist"
        }

        await this.orderRepository.remove(orderToRemove)

        return "order has been deleted"
    }

    async remove(request: AuthRequest, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let orderToRemove = await this.orderRepository.findOneBy({ id })

        if (!orderToRemove) {
            response.status(400)
            return "This order does not exist"
        }

        orderToRemove.status = 'inactive';
        orderToRemove.status = request.user.username;   
        await this.orderRepository.save(orderToRemove);

        return "order has been removed"
    }

}