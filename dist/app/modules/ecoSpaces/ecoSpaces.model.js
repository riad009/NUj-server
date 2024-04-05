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
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Service",
        required: [true, "Choose one service"],
    },
    // serviceDescription: {
    //   type: String,
    //   required: [true, "Must provide a description for service"],
    // },
    description: {
        type: String,
        required: false,
    },
    staffs: {
        type: [String],
        required: false,
    },
    // projects: {
    //   type: [String],
    //   required: [true, "Add the project name your company is working on."],
    // },
    plan: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Plan",
        required: false,
    },
    planPrice: {
        type: Number,
        required: false,
        min: 0,
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
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    generalDocument: {
        type: String,
        required: false,
    },
    voice: {
        type: String,
        required: false,
    },
    video: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
exports.EcoSpaceModel = (0, mongoose_1.model)("EcoSpace", ecoSpaceSchema);
