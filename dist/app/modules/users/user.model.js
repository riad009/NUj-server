"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        required: false,
        default: "user",
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    photo: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    dateOfBirth: {
        type: String,
        required: false,
    },
    isNotify: {
        type: Boolean,
        default: true,
        required: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: false,
    },
    plan: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
