import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

interface User {
  id: number;
  username: string;
  role: string;
}

interface AuthRequest extends Request {
  headers: any;
  user?: User;
}

function generateToken(user: User): string {
  const payload: jwt.JwtPayload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
}

function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as jwt.JwtPayload;
    const user: User = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
    };
    return user;
  } catch (error) {
    return null;
  }
}

function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  console.log(req.headers);
  if (token) {
    const user = verifyToken(token);
    if (user) {
      req.user = user;
      return next();
    }
  }

  res.sendStatus(401);
}


export { generateToken, verifyToken, authenticateToken, User, AuthRequest };
