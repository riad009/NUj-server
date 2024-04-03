"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentModel = void 0;
const mongoose_1 = require("mongoose");
const locationSchema = new mongoose_1.Schema({
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
});
const appointmentSchema = new mongoose_1.Schema({
    participantId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ecoSpaceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "EcoSpace",
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    location: {
        type: locationSchema,
        required: false,
    },
    reason: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    isApproved: {
        type: Boolean,
        required: true,
        default: false,
    },
    status: {
        type: String,
        enum: ["pending", "in-progsess", "completed"],
        default: "pending",
        required: true,
    },
    neighbourhood: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
exports.AppointmentModel = (0, mongoose_1.model)("Appointment", appointmentSchema);
