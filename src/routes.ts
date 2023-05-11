import { body, param } from "express-validator"
import { UserController } from "./controller/UserController"
import { ProductController } from "./controller/ProductController"
import { OrderController } from "./controller/OrderController"

//Routes is an array containing the parameters to be passed into the express router in index.ts
export const Routes = [{
    /** 
    * @swagger
    * /:
    * get:
    *   summary: This api will retrieve all the users
    *   description: This will list all the active users along with their first name, last name and age
    *   responses:
    *       200:
    *           description: To test get method
    */
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    validation: [],
}, {
    // This route will retrieve all the users
    method: "post",
    route: "/users",
    controller: UserController,
    action: "create",
    validation: [
        body('firstName').isString(),
        body('lastName').isString(),
        body('age').isInt({ min:0 })
    ]
},
{
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