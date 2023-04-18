import { body, param } from "express-validator"
import { UserController } from "./controller/UserController"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    validation: [],
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
    validation: [
        body('firstName').isString(),
        body('lastName').isString(),
        body('age').isInt({ min:0 })
    ]
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
}]