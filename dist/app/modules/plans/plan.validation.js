"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const createPlanValidation = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string(),
        price: zod_1.default.number().min(0).default(0).optional(),
        description: zod_1.default.string().optional(),
    }),
});
exports.PlanValidations = {
    createPlanValidation,
};
