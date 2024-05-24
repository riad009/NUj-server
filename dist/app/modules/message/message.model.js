"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    ecoSpaceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "EcoSpace",
        required: true,
    },
    projectId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    userImage: {
        type: String,
        required: false,
        default: "https://i.ibb.co/LCR1TRF/dummy.jpg",
    },
    message: {
        type: String,
        required: false,
    },
    audio: {
        type: String,
        required: false,
    },
    video: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
exports.Message = (0, mongoose_1.model)("Message", messageSchema);
