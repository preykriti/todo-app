import {body} from "express-validator";

export const userValidationRules = [
    body("name", "Your username should be longer than 3 characters").isLength({min:3}),
    body("email", "Enter a valid email id").isEmail(),
    body("password", "Your password must be at least of 8 characters").isLength({min:8})
];

export const userValidationForLogin = [
    body("email","Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists()
]

export const taskValidationRule = [
    body("title", "Title cant be blank").exists()
]

export const folderValidationRule = [
    body("name", "Name cannot be blank").exists()
]