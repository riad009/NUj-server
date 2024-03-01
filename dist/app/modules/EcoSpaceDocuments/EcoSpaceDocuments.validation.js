"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcoSpaceDocumentValidations = void 0;
const zod_1 = require("zod");
const createEcoSpaceDocumentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        ecoSpaceId: zod_1.z.string({ required_error: "Must provide a EcoSpace" }),
        generalDocument: zod_1.z.string({}).url().optional(),
        voice: zod_1.z.string().url().optional(),
        video: zod_1.z.string().url().optional(),
    }),
});
exports.EcoSpaceDocumentValidations = {
    createEcoSpaceDocumentValidationSchema,
};
