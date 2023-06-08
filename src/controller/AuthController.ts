import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { Credential } from '../entity/Credential';
import * as jwt from 'jsonwebtoken'
import { AuthRequest } from '../auth/authetication';
import * as bcrypt from 'bcrypt'

export class AuthController {

    private userRepository = AppDataSource.getRepository(User)
    private credentialRepository = AppDataSource.getRepository(Credential)

    async signup(request: AuthRequest, response: Response, next: NextFunction) {
        const { username, password, firstName, lastName, age, role } = request.body;

        const existingUser = await this.credentialRepository.findOne({ where: { username } });
        if (existingUser) {
        response.status(409).json({ message: 'Username already exists' });
        return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = Object.assign(new User(), {
            firstName ,
            lastName ,
            age,
            createdBy: username, 
            updatedBy: username,
            status: "active"
        });

        const credential = Object.assign(new Credential(), {
            username ,
            password: hashedPassword ,
            role,
            user,
            createdBy: username, 
            updatedBy: username,
            status: "active"
        })

        this.credentialRepository.save(credential);
        this.userRepository.save(user);

        response.status(201).json({
            user,
            credential
        });
        return
    }

    
     async login(request: AuthRequest, response: Response, next: NextFunction) {
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

          //Create Secret Key
          const secret = process.env.ACCESS_TOKEN_SECRET;

          if (!secret) {
            response.status(500).json({ error: 'Missing access token secret' });
            return;
          }

          // Create a JWT token
          const token = jwt.sign({ userId: credential.id }, secret, { expiresIn: '1h' });
      
          // Send the token in the response
          response.status(200).json({ token });
          return;

        } catch (error) {
          Response.status(500).json({ "error": "Internal Server Error" });
          return
        }
      };

}