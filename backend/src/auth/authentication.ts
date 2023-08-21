import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { Credential } from '../entity/Credential';

const credentialRepository = AppDataSource.getRepository(Credential);

interface User {
  id: number;
  username: string;
  role: string;
  tokens: { token: string; signedAt: string }[];
}

interface AuthRequest extends Request {
  params?: any;
  headers: any;
  user?: User;
  body?: any;
}

function generateToken(user: User): string {
  const payload: jwt.JwtPayload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
}


async function verifyToken(token: string): Promise<User | null> {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as jwt.JwtPayload;
    const id = decoded.userId;
    
    const user = await credentialRepository.findOne({
      where: { id, status: 'active' }
      })
  
    if (!user) {
      return null;
    }
    const tokens = user.tokens;

    // Find the token in the tokens array
    const matchedToken = tokens.find(t => t.token === token);
  
    if (!matchedToken) {
      // Token not found, consider token invalid
      return null;
    }

    // Check the expiration time of the token
    
    const timeDiff = (Date.now() - parseInt(matchedToken.signedAt)) / 1000
    if (timeDiff > 3600){
      return null; // Token is considered valid if it's within the last hour
    }

    return user;

  } catch (error) {
    return null;
  }
}


async function authenticateToken(request: AuthRequest, response: Response, next: NextFunction): Promise<void> {
  const authHeader = request.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    const user = await verifyToken(token);

    if (user) {
      request.user = user;
      next();
      return;
    }
  }

  response.sendStatus(401);
}

function requireAdmin(request: AuthRequest, response: Response, next: NextFunction): void {
  const user = request.user;

  if (user && user.role === 'admin') {
    // User is an admin, allow access to the route
    next();
    //return;
  } else {
    // User is not an admin, deny access with a 403 Forbidden status
    response.sendStatus(403);    
    //return;
  }
}


export { generateToken, verifyToken, authenticateToken, User, AuthRequest, requireAdmin };
