"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModel = void 0;
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});
exports.ServiceModel = (0, mongoose_1.model)("Service", serviceSchema);
