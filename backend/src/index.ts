import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import * as morgan from 'morgan';
import { port } from "./config";
import * as cors from "cors";
import { validationResult } from "express-validator";
import { AuthRequest, authenticateToken, requireAdmin } from "./auth/authentication";

function handleError(err, req, res, next) {
    res.status(err.statusCode || 500).send({message: err.message});
}

AppDataSource.initialize().then(async () => {

    // create express app
const app = express()

const isDockerEnvironment = () => {
  return process.env.DOCKER_ENV === 'true';
};

// Define CORS options based on environment
const corsOptions = {
  origin: isDockerEnvironment() ? 'http://localhost' : 'http://localhost:4200'
};

// Use the CORS middleware with the defined options
app.use(cors(corsOptions));

app.use(morgan('dev'))

app.use(bodyParser.json())


// register express routes from defined application routes
Routes.forEach(route => {
    const skipAuth = ['/users/login', '/users/signup','/products'].includes(route.route);
    const skipAdmin = ['/users/login', '/users/signup', '/users/logout','/users','/products','/products/:id','/orders','/home'].includes(route.route);
  
    const authMiddleware = skipAuth ? [] : [authenticateToken];    
    const adminMiddleware = skipAdmin ? [] : [requireAdmin];

    app[route.method](route.route, ...authMiddleware, ...adminMiddleware, ...route.validation, async (req: AuthRequest, res: Response, next: Function) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const result = await (new (route.controller as any))[route.action](req, res, next)
        res.json(result);
      } catch (error) {
        next(error);
      }
    });
  });

app.get('/protected', authenticateToken, async (req: Request, res: Response) => {
    res.send({ message: `Hello, ${req.user.username}! This is a protected route.` });
  });

app.use(handleError);
app.listen(port);

console.log(`Express server has started on port ${port}.`);

}).catch(error => console.log(error))
