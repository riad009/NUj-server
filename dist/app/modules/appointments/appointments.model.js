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
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    requestedBy: {
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
    appointmentLength: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "in-progsess", "approved", "rejected"],
        default: "pending",
        required: true,
    },
    destinationInformation: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
exports.AppointmentModel = (0, mongoose_1.model)("Appointment", appointmentSchema);
