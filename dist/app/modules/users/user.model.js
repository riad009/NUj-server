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
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
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
    password: {
        type: String,
        required: false,
        // select: 0,
    },
    phone: {
        type: String,
        required: false,
    },
    photo: {
        type: String,
        required: false,
        default: "https://i.ibb.co/mcHGwPy/dummy.jpg",
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
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // hash password
        if (this.password) {
            this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_rounds));
        }
        next();
    });
});
userSchema.statics.isPasswordMatch = function (givenPass, savedPass) {
    return __awaiter(this, void 0, void 0, function* () {
        const isMatch = yield bcrypt_1.default.compare(givenPass, savedPass);
        return isMatch;
    });
};
userSchema.statics.isUserExist = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.UserModel.findOne({ email }, { email: 1, password: 1, role: 1 }).lean();
        return user;
    });
};
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
