"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelpers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../app/config/index"));
const createToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, index_1.default.secret);
};
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, index_1.default.secret);
};
exports.jwtHelpers = {
    createToken,
    verifyToken,
};
