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
const ecoSpaces_model_1 = require("../ecoSpaces/ecoSpaces.model");
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
    if (response.secure_url) {
        const updatedDoc = yield ecoSpaces_model_1.EcoSpaceModel.findByIdAndUpdate(id, { $set: { [fieldName]: response.secure_url } }, { new: true });
        console.log({ updatedDoc });
        return updatedDoc;
    }
    return response.secure_url;
});
const toxicityDetection = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const prompts = [
        {
            model: "gpt-4-0125-preview",
            system: "You are an expert",
            description: `Rate the toxicity in order of their importance on a scale of 1-5, Return only number: ${payload}`,
        },
        {
            model: "gpt-4-0125-preview",
            system: "You are an expert",
            description: `This are the comprehensive plan:
      1.Education
      2.Goal setting
      3.Workforce Literacy
      4.Anger management
      5.Computational literacy
      6.Goal setting
      7.Anger management
      
      From this 7 comprehensive plan, give me the best one comprehensive plan for this user need. Just send me the comprehensive plan
      
      User message: ${payload}`,
        },
        {
            model: "gpt-4-0125-preview",
            system: "You are an expert",
            description: `Goal setting
      Workforce Literacy
      Anger management
      Computational literacy
      Goal setting
      Anger management
      Now, provide a Public Safety Assessment (PSA) based on the comprehensive success plan.  User message: ${payload}`,
        },
        {
            model: "gpt-4-0125-preview",
            system: "You are an expert",
            description: `Provide a personalized and effective comprehensive success plan based on the user's education, goal setting, workforce literacy, anger management, and computational literacy. The user's message is: usermsg. Additionally, offer suggestions to further enhance the user's success plan.  User message: ${payload}`,
        },
    ];
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config_1.default.openai_key}`,
    };
    try {
        const completions = yield Promise.all(prompts.map((prompt, index) => __awaiter(void 0, void 0, void 0, function* () {
            let completion;
            const data = {
                model: prompt.model,
                // prompt: prompt.description,
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
                console.log(response.data);
                completion = response.data.choices[0].message.content.trim();
                // completion = response.data.choices[0].text.trim();
            });
            return {
                response: completion,
            };
        })));
        return completions;
    }
    catch (error) {
        console.log("Error: ", error);
    }
});
exports.EcoSpaceDocumentServices = {
    createEcoSpaceDocumentIntoDB,
    toxicityDetection,
    uploadFiles,
};
