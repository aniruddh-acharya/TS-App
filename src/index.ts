import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import * as morgan from 'morgan';
import { port } from "./config";
import { validationResult } from "express-validator";
import { swaggerJSDoc } from "swagger-jsdoc";
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerSpec from './swagger.json'
import { AuthRequest, authenticateToken } from "./auth/authetication";

function handleError(err, req, res, next) {
    res.status(err.statusCode || 500).send({message: err.message});
}

AppDataSource.initialize().then(async () => {

    // create express app
const app = express()

const options: swaggerJSDoc.options = {
    
        openapi: '3.0.0',
        info: {
        title: 'My API',
        version: '1.0.0',
        description: 'API documentation for My API',
        },
        servers: [
        {
            url: 'http://localhost:8080',
            description: 'Development server',
        },
        ],
    apis:["./src/routes.ts"]};
  
//const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve ,swaggerUi.setup(swaggerSpec))
app.use(morgan('dev'))
app.use(bodyParser.json())



// register express routes from defined application routes
Routes.forEach(route => {
    const skipAuth = ['/users/login', '/users/signup'].includes(route.route);
  
    const middleware = skipAuth ? [] : [authenticateToken];
  
    app[route.method](route.route, ...middleware, ...route.validation, async (req: AuthRequest, res: Response, next: Function) => {
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



/** 
* @swagger
* /users:
* get:
*   summary: This api will retrieve all the users
*   description: This will list all the active users along with their first name, last name and age
*   responses:
*       200:
*           description: To test get method
*/

app.get('/protected', authenticateToken, async (req: Request, res: Response) => {
    res.send({ message: `Hello, ${req.user.username}! This is a protected route.` });
  });

app.use(handleError);
app.listen(port);

console.log(`Express server has started on port ${port}.`);

}).catch(error => console.log(error))
