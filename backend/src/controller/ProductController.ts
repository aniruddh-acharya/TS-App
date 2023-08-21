import { AppDataSource } from '../data-source'
import { NextFunction, Response } from "express"
import { Product } from '../entity/Product';
import { AuthRequest, User } from '../auth/authentication';

export class ProductController {

    private productRepository = AppDataSource.getRepository(Product)

    async all(request: AuthRequest, response: Response, next: NextFunction) {
        return this.productRepository.find({ where: { status: 'active' } });
    }

    async one(request: AuthRequest, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        

        const product = await this.productRepository.findOne({
            where: { id , status: 'active' }
        })

        if (!product) {
            response.status(400)
            return "This is an unregistered product"
        }
        return product
    }

    async create(request: AuthRequest, response: Response, next: NextFunction) {
        const { name, cost } = request.body;
        const u=request.user
        const product = Object.assign(new Product(), {
            name, 
            cost,
            createdBy: "user",//request.user.username,
            updatedBy: "user",//request.user.username,
            status: "active"
        })

        return this.productRepository.save(product)
    }

    async update(request: AuthRequest, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        
        let productToUpdate = await this.productRepository.findOneBy({ id })

        if (!productToUpdate) {
            response.status(400)
            return "This product does not exist"
        }

        const updatedProductData = {
            ...request.body,
            updatedBy: request.user.username, // Set the updatedBy column to the user's ID
          };

        await this.productRepository.update(id, updatedProductData)

        return "The product has been updated"
    }

    async remove(request: AuthRequest, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let productToRemove = await this.productRepository.findOneBy({ id })

        if (!productToRemove) {
            response.status(400)
            return "This product does not exist"
        }

        productToRemove.status = 'inactive';
        productToRemove.status = request.user.username;   
        await this.productRepository.save(productToRemove);

        return "product has been removed"
    }

}