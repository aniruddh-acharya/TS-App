import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { Credential } from '../entity/Credential';

const credentialRepository = AppDataSource.getRepository(Credential);

interface User {
  id: number;
  username: string;
  role: string;
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
  
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}


async function identifyUser(req: AuthRequest, res: Response, next: NextFunction): Promise<string> {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    const user = await verifyToken(token);

    if (user) {
      return user.username;
    }
  }

  res.sendStatus(401);
}

async function authenticateToken(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    const user = await verifyToken(token);

    if (user) {
      req.user = user;
      next();
      return;
    }
  }

  res.sendStatus(401);
}

function requireAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
  const user = req.user;

  if (user && user.role === 'admin') {
    // User is an admin, allow access to the route
    next();
    //return;
  } else {
    // User is not an admin, deny access with a 403 Forbidden status
    res.sendStatus(403);    
    //return;
  }
}


export { generateToken, verifyToken, authenticateToken, User, AuthRequest, requireAdmin };
