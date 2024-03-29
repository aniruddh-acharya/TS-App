import { body, param } from "express-validator"
import { UserController } from "./controller/UserController"
import { AuthController } from "./controller/AuthController"
import { ProductController } from "./controller/ProductController"
import { OrderController } from "./controller/OrderController"

//Routes is an array containing the parameters to be passed into the express router in index.ts
export const Routes = [{

//Route Configurations for Credential Table

    // This route will retrieve all the users
    method: "post",
    route: "/users/signup",
    controller: AuthController,
    action: "signup",
    validation: [
        body('firstName').isString(),
        body('lastName').isString(),
        body('age').isInt({ min:18 })
    ]
}, {
    // This route will login the user
    method: "post",
    route: "/users/login",
    controller: AuthController,
    action: "login",
    validation: [
        body('username').isString(),
        body('password').isString().isLength({ min: 8 })
    ]
},
{
    // This route will log the user out
    method: "delete",
    route: "/users/logout",
    controller: AuthController,
    action: "logout",
    validation: []
},

{
    method: "get",
    route: "/home",
    controller: AuthController,
    action: "home",
    validation: [],
},

{
    method: "get",
    route: "/cred",
    controller: AuthController,
    action: "all",
    validation: [],
},

{
    method: "get",
    route: "/cred/:id",
    controller: AuthController,
    action: "all",
    validation: [
        param('id').isInt(),
    ],
},

{
    method: "patch",
    route: "/cred/:id",
    controller: AuthController,
    action: "update",
    validation: [
        body('username').isString(),
        body('password').isString().isLength({ min: 8 })
    ],
},

{
    method: "post",
    route: "/cred",
    controller: AuthController,
    action: "username",
    validation: [
        body('username').isString()
    ],
},

//Route Configurations for User Table
{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    validation: [],
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
    validation: [
        param('id').isInt(),
    ]
}, {
    method: "patch",
    route: "/users/:id",
    controller: UserController,
    action: "update",
    validation: [
        body('firstName').isString(),
        body('lastName').isString(),
        body('age').isInt({ min:0 })
    ]
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
    validation: [
        param('id').isInt(),
    ]
},


//Route Configurations for Product Table
{
    method: "get",
    route: "/products",
    controller: ProductController,
    action: "all",
    validation: [],
}, {
    method: "post",
    route: "/products",
    controller: ProductController,
    action: "create",
    validation: [
        body('name').isString(),
        body('cost').isInt({ min:1 })
    ]
}, {
    method: "get",
    route: "/products/:id",
    controller: ProductController,
    action: "one",
    validation: [
        param('id').isInt(),
    ]
}, {
    method: "patch",
    route: "/products/:id",
    controller: ProductController,
    action: "update",
    validation: [
        body('name').isString(),
        body('cost').isInt({ min:1 })
    ]
}, {
    method: "delete",
    route: "/products/:id",
    controller: ProductController,
    action: "remove",
    validation: [
        param('id').isInt(),
    ]
},


//Route Configurations for Order Table
{
    method: "get",
    route: "/orders",
    controller: OrderController,
    action: "all",
    validation: [],
}, {
    method: "post",
    route: "/orders",
    controller: OrderController,
    action: "create",
    validation: [
        body('userID').isInt({ min:1 }),
        body('productID').isInt({ min:1 }),
        body('quantity').isInt({ min:1 })
    ]
}, {
    method: "get",
    route: "/orders/:id",
    controller: OrderController,
    action: "one",
    validation: [
        param('id').isInt(),
    ]
}, {
    method: "patch",
    route: "/orders/:id",
    controller: OrderController,
    action: "update",
    validation: [
        body('userID').isInt({ min:1 }),
        body('productID').isInt({ min:1 }),
        body('quantity').isInt({ min:1 })
    ]
}, {
    method: "delete",
    route: "/orders/:id",
    controller: OrderController,
    action: "remove",
    validation: [
        param('id').isInt(),
    ]
},

]