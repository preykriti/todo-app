"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationForLogin = exports.userValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.userValidationRules = [
    (0, express_validator_1.body)("name", "Your username should be longer than 3 characters").isLength({ min: 3 }),
    (0, express_validator_1.body)("email", "Enter a valid email id").isEmail(),
    (0, express_validator_1.body)("password", "Your password must be at least of 8 characters").isLength({ min: 8 })
];
exports.userValidationForLogin = [
    (0, express_validator_1.body)("email", "Enter a valid email").isEmail(),
    (0, express_validator_1.body)("password", "Password cannot be blank").exists()
];
