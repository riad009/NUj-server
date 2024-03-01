"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcoSpaceDocumentModel = void 0;
const mongoose_1 = require("mongoose");
const ecoSpaceDocumentSchema = new mongoose_1.Schema({
    ecoSpaceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "EcoSpace",
        required: true,
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
exports.EcoSpaceDocumentModel = (0, mongoose_1.model)("EcoSpaceDocument", ecoSpaceDocumentSchema);
