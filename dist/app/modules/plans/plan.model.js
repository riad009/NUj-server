"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanModel = void 0;
const mongoose_1 = require("mongoose");
const planSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    description: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
exports.PlanModel = (0, mongoose_1.model)("Plan", planSchema);
