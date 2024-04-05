"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwtHelper_1 = require("../../helpers/jwtHelper");
const AppError_1 = require("../errors/AppError");
function auth(...requiredRoles) {
    return (req, res, next) => {
        let token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.AppError(402, "You are not authorized");
        }
        try {
            const verifiedUser = jwtHelper_1.jwtHelpers.verifyToken(token);
            if (requiredRoles.includes(verifiedUser.role)) {
                req.user = verifiedUser;
                next();
            }
            else {
                throw new AppError_1.AppError(402, "You are Unauthorized.");
            }
        }
        catch (error) {
            throw new AppError_1.AppError(402, "Invalid Token!");
        }
    };
}
exports.default = auth;
