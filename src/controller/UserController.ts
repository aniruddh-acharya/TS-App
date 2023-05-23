import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { Credential } from '../entity/Credential';
import * as jwt from 'jsonwebtoken'
import { AuthRequest } from '../auth/authetication';
import * as bcrypt from 'bcrypt'

export class UserController {

    private userRepository = AppDataSource.getRepository(User)
    private credentialRepository = AppDataSource.getRepository(Credential)

    async all(request: AuthRequest, response: Response, next: NextFunction) {
        return this.userRepository.find({ where: { status: 'active' } });
    }

    async one(request: Request, response: Response, next: NextFunction) {
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

    async signup(request: Request, response: Response, next: NextFunction) {
        const { username, password, firstName, lastName, age, role } = request.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = Object.assign(new User(), {
            firstName ,
            lastName ,
            age,
            status: "active"
        });

        const credential = Object.assign(new Credential(), {
            username ,
            password: hashedPassword ,
            role,
            user
        })

        this.credentialRepository.save(credential);
        this.userRepository.save(user);

        response.status(201).json({
            user,
            credential
        });
        return
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        
        let userToUpdate = await this.userRepository.findOneBy({ id })

        if (!userToUpdate) {
            response.status(404)
            return "This user does not exist"
        }

        await this.userRepository.update(id, request.body)

        return "The User has been updated"
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            response.status(404)
            return "This user does not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "User has been deleted"
    }


     async login(request: Request, response: Response, next: NextFunction) {
        const { username, password } = request.body;
      
        try {
          // Find the user by username
          const credential = await this.credentialRepository.findOne( { where: { username: username } } );
      
          // Check if the user exists
          if (!credential) {
            response.status(401).json({ error: 'Invalid credentials' });
            return;
          }
      
          // Compare the password
          const passwordMatch = await bcrypt.compare(password, credential.password);

          if (!passwordMatch) {
            response.status(401).json({ error: 'Invalid credentials'});
            return;
          }
      
          // Create a JWT token
          const token = jwt.sign({ userId: credential.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      
          // Send the token in the response
          response.status(200).json({ token });
          return;
        } catch (error) {
          Response.status(500).json({ "error": "Internal Server Error" });
          return
        }
      };

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            response.status(404)
            return "This user does not exist"
        }

        
        userToRemove.status = 'inactive';   
        await this.userRepository.save(userToRemove);
        //await this.userRepository.softRemove(userToRemove);

        return "User has been removed"
    }

}