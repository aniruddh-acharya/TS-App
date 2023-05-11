import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { IsNull } from 'typeorm';
import { Product } from '../entity/Product';

export class ProductController {

    private productRepository = AppDataSource.getRepository(Product)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.find({ where: { deletedOn: IsNull() } });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        

        const product = await this.productRepository.findOne({
            where: { id , deletedOn: IsNull() }
        })

        if (!product) {
            response.status(400)
            return "This is an unregistered product"
        }
        return product
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const { name, cost } = request.body;

        const product = Object.assign(new Product(), {
            name, 
            cost
        })

        return this.productRepository.save(product)
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        
        let productToUpdate = await this.productRepository.findOneBy({ id })

        if (!productToUpdate) {
            response.status(400)
            return "This product does not exist"
        }

        await this.productRepository.update(id, request.body)

        return "The product has been updated"
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let productToRemove = await this.productRepository.findOneBy({ id })

        if (!productToRemove) {
            response.status(400)
            return "This product does not exist"
        }

        await this.productRepository.remove(productToRemove)

        return "product has been deleted"
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let productToRemove = await this.productRepository.findOneBy({ id })

        if (!productToRemove) {
            response.status(400)
            return "This product does not exist"
        }

        await this.productRepository.softRemove(productToRemove);

        return "product has been removed"
    }

}