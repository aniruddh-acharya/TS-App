import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { Credential } from '../entity/Credential';
import * as jwt from 'jsonwebtoken'
import { AuthRequest, verifyToken } from '../auth/authentication';
import * as bcrypt from 'bcrypt'

export class AuthController {

private userRepository = AppDataSource.getRepository(User)
private credentialRepository = AppDataSource.getRepository(Credential)

async logout(request: AuthRequest, response: Response, next: NextFunction){
 try {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    const user = await verifyToken(token);
    const tokens = user.tokens;

    const updatedTokens = tokens.filter(t => t.token !== token)

    await this.credentialRepository.update(user.id, {tokens:updatedTokens})
    response.status(200).json({ message:"Signed Out Successfully" });

  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });  
    next(error);
  }
    return;
}

async signup(request: AuthRequest, response: Response, next: NextFunction) {
  try{
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
        tokens:[],
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
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
    return
  }
}


async login(request: AuthRequest, response: Response, next: NextFunction) {
  
  try {
    const { username, password } = request.body;

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

    let oldTokens = credential.tokens || []

    if(oldTokens){
      oldTokens = oldTokens.filter(t=> {
        const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000
        if(timeDiff < 3600){ 
          return t
        }
      })
    }
    const updatedTokens = [ ...oldTokens, {token, signedAt: Date.now().toString()}]; //

    await this.credentialRepository.update(credential.id, {tokens:updatedTokens})

    // Send the token in the response
    response.status(200).json({ token });
    return;

  } catch (error) {
    Response.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

async all(request: AuthRequest, response: Response, next: NextFunction) {
    return this.credentialRepository.find({ where: { status: 'active' } });
}

async username(request: AuthRequest, response: Response, next: NextFunction) {
  const username = request.body.username
  
  const user = await this.credentialRepository.findOne({
      where: { username , status: 'active' }
  })

  if (!user) {
      response.status(404)
      return "This is an unregistered User"
  }

  return user.id
}

async one(request: AuthRequest, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id)
    

    const user = await this.credentialRepository.findOne({
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
    const { username, password, cPassword, age, role } = request.body;
    let userToUpdate = await this.credentialRepository.findOneBy({ id })

    if (!userToUpdate) {
        response.status(404)
        return "This user does not exist"
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUserData = {
      ...request.body,
      password: hashedPassword, // Set the hashed password
      updatedBy: request.user.username, // Set the updatedBy column to the user's ID
    };
  
    await this.credentialRepository.update(id, updatedUserData);
  
    // Remove the hashed password from the response body for security reasons
    delete updatedUserData.password;
  
    return updatedUserData;
}

async home(request: AuthRequest, response: Response, next: NextFunction) {
  return "You have reached the Home Page!";
}

}