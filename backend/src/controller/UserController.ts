import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { Credential } from '../entity/Credential';
import { AuthRequest } from '../auth/authentication';

export class UserController {

    private userRepository = AppDataSource.getRepository(User)
    private credentialRepository = AppDataSource.getRepository(Credential)

    async all(request: AuthRequest, response: Response, next: NextFunction) {
        return this.userRepository.find({ where: { status: 'active' } });
    }

    async one(request: AuthRequest, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        

        const user = await this.userRepository.findOne({
            where: { id , status: 'active' }
        })

        if (!user) {
            response.status(404)
            return "This is an unregistered User"
        }
        return user
    }

    async update(request: AuthRequest, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        
        let userToUpdate = await this.userRepository.findOneBy({ id })

        if (!userToUpdate) {
            response.status(404)
            return "This user does not exist"
        }

        const updatedUserData = {
            ...request.body,
            updatedBy: request.user.username, // Set the updatedBy column to the user's ID
          };

        await this.userRepository.update(id, updatedUserData)

        return "The User has been updated"
    }

    async delete(request: AuthRequest, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            response.status(404)
            return "This user does not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "User has been deleted"
    }

    async remove(request: AuthRequest, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })
        let credToRemove = await this.credentialRepository.findOneBy({ id })

        if (!userToRemove) {
            response.status(404)
            return "This user does not exist"
        }

        userToRemove.status = 'inactive';
        userToRemove.updatedBy = request.user.username;
        credToRemove.status = 'inactive';
        credToRemove.updatedBy = request.user.username;


        await this.userRepository.save(userToRemove);
        await this.credentialRepository.save(credToRemove);
        //await this.userRepository.softRemove(userToRemove);

        return "User has been removed"
    }

}