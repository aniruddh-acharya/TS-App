import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { IsNull } from 'typeorm';

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find({ where: { deletedOn: IsNull() } });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        

        const user = await this.userRepository.findOne({
            where: { id , deletedOn: IsNull() }
        })

        if (!user) {
            response.status(400)
            return "This is an unregistered User"
        }
        return user
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            age
        })

        return this.userRepository.save(user)
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        
        let userToUpdate = await this.userRepository.findOneBy({ id })

        if (!userToUpdate) {
            response.status(400)
            return "This user does not exist"
        }

        await this.userRepository.update(id, request.body)

        return "The User has been updated"
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            response.status(400)
            return "This user does not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "User has been deleted"
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            response.status(400)
            return "This user does not exist"
        }

        await this.userRepository.softRemove(userToRemove);

        return "User has been removed"
    }

}