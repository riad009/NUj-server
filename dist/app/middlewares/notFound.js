"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        errorSource: "",
    });
};
exports.notFound = notFound;
