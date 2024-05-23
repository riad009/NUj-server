"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModel = void 0;
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    ecoSpaceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "EcoSpace",
        required: true,
    },
    projectName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    clients: {
        type: [String],
        required: false,
    },
}, {
    timestamps: true,
});
exports.ProjectModel = (0, mongoose_1.model)("Project", projectSchema);
