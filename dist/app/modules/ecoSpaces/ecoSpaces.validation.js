"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcoSpaceValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const createEcoSpaceValidation = zod_1.default.object({
    body: zod_1.default.object({}),
});
exports.EcoSpaceValidations = {
    createEcoSpaceValidation,
};
