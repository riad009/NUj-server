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
exports.getToken = void 0;
const axios_1 = __importDefault(require("axios"));
const query_string_1 = __importDefault(require("query-string"));
const index_1 = __importDefault(require("../app/config/index"));
const getToken = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.post("https://zoom.us/oauth/token", query_string_1.default.stringify({
            grant_type: "account_credentials",
            account_id: index_1.default.zoom_account_id,
        }), {
            headers: {
                Authorization: `Basic ${Buffer.from(`${index_1.default.zoom_client_id}:${index_1.default.zoom_sdk_secret}`).toString("base64")}`,
            },
        });
        const { access_token, expires_in } = yield request.data;
        return access_token;
    }
    catch (error) {
        return { access_token: null, expires_in: null, error };
    }
});
exports.getToken = getToken;
