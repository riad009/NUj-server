"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcoSpaceModel = void 0;
const mongoose_1 = require("mongoose");
const ecoSpaceSchema = new mongoose_1.Schema({
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Creator must be valid"],
    },
    company: {
        type: String,
        required: [true, "Must provide a valid company name"],
    },
    address: {
        type: String,
        required: [true, "Must provide a valid address"],
    },
    phone: {
        type: String,
        required: [true, "Must provide a valid phone"],
    },
    email: {
        type: String,
        required: [true, "Must provide a valid email"],
    },
    website: {
        type: String,
        required: [true, "Must provide a valid website url"],
    },
    serviceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Service",
        required: [true, "Choose one service"],
    },
    serviceDescription: {
        type: String,
        required: [true, "Must provide a description for service"],
    },
    staffs: {
        type: [String],
        required: false,
    },
    project: {
        type: String,
        required: [true, "Add the project name your company is working on."],
    },
    plan: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    planPurchasedAt: {
        type: String,
        required: false,
        default: new Date(Date.now()).toISOString(),
    },
    ecoSpaceNotify: {
        type: Boolean,
        required: false,
        default: true,
    },
}, {
    timestamps: true,
});
exports.EcoSpaceModel = (0, mongoose_1.model)("EcoSpace", ecoSpaceSchema);
