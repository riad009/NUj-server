"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcoSpaceDocumentServices = void 0;
const config_1 = __importDefault(require("../../config"));
const EcoSpaceDocuments_model_1 = require("./EcoSpaceDocuments.model");
const axios_1 = __importDefault(require("axios"));
const cloudinary_1 = __importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    cloud_name: config_1.default.cloud_name,
    api_key: config_1.default.api_key,
    api_secret: config_1.default.api_secret,
});
const createEcoSpaceDocumentIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // validations adding soon
    const result = yield EcoSpaceDocuments_model_1.EcoSpaceDocumentModel.create(payload);
    return result;
});
const uploadFiles = (file, fieldName, id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ file, fieldName, id });
    if (!file) {
        throw new Error("No file uploaded");
    }
    const response = yield cloudinary_1.default.v2.uploader.upload(file.path, {
        resource_type: "auto",
    });
    // if (response.secure_url) {
    //   const updatedDoc = await EcoSpaceDocumentModel.findByIdAndUpdate(
    //     id,
    //     { $set: { [fieldName]: response.secure_url } },
    //     { new: true }
    //   );
    //   return updatedDoc;
    // }
    return response.secure_url;
});
const toxicityDetection = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const prompts = [
        {
            model: "gpt-3.5-turbo-0125",
            system: "You are an expert",
            description: `
          Give me a paragraph aboout my country (Bangladesh) 
     `,
        },
        {
            model: "gpt-3.5-turbo-0125",
            system: "You are an expert",
            description: `
          Give me a paragraph aboout my country (Bangladesh) 
     `,
        },
        {
            model: "gpt-3.5-turbo-0125",
            system: "You are an expert",
            description: `
          Give me a paragraph aboout my country (Bangladesh) 
     `,
        },
        {
            model: "gpt-3.5-turbo-0125",
            system: "You are an expert",
            description: `
          Give me a paragraph aboout my country (Bangladesh) 
     `,
        },
    ];
    console.log("inside service");
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config_1.default.openai_key}`,
    };
    try {
        const completions = yield Promise.all(prompts.map((prompt, index) => __awaiter(void 0, void 0, void 0, function* () {
            let completion;
            const data = {
                model: prompt.model,
                messages: [
                    {
                        role: "system",
                        content: prompt.system,
                    },
                    {
                        role: "user",
                        content: prompt.description,
                    },
                ],
                temperature: 1,
                max_tokens: 1000,
                top_p: 1,
            };
            yield axios_1.default
                .post("https://api.openai.com/v1/chat/completions", data, {
                headers,
            })
                .then((response) => {
                completion = response.data.choices[0].message.content.trim();
            });
            return {
                response: completion,
            };
        })));
        console.log("inside service", completions);
        return completions;
    }
    catch (error) {
        console.log("Error: ", error.message);
    }
});
exports.EcoSpaceDocumentServices = {
    createEcoSpaceDocumentIntoDB,
    toxicityDetection,
    uploadFiles,
};
