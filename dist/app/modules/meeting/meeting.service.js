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
exports.MeetingService = void 0;
const axios_1 = __importDefault(require("axios"));
const getToken_1 = require("../../../helpers/getToken");
const createMeeting = (meetingName) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield (0, getToken_1.getToken)();
    const request = yield axios_1.default.post(`https://api.zoom.us/v2/users/me/meetings`, {
        agenda: meetingName,
        password: "nuj",
        duration: 120,
        pre_schedule: false,
        settings: {
            allow_multiple_devices: true,
            approval_type: 2,
            host_video: false,
            jbh_time: 0,
            join_before_host: true,
            meeting_authentication: false,
            mute_upon_entry: true,
            participant_video: false,
            private_meeting: false,
            registration_type: 1,
            show_share_button: true,
            continuous_meeting_chat: {
                enable: true,
                auto_add_invited_external_users: true,
            },
        },
        topic: meetingName,
        type: 2,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return request.data;
});
exports.MeetingService = {
    createMeeting,
};
