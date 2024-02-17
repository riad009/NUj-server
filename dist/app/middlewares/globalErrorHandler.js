"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.globalErrorHandler = globalErrorHandler;
