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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (email, id, name, type) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: "Reachoutpro.ai@gmail.com",
            pass: "fhtkcqbdluziedjm",
        },
    });
    const mailOptions = {
        from: "Reachoutpro.ai@gmail.com",
        to: email,
        subject: `Notifications from the ${name}`,
        html: `
    <p>Dear ${email}, You have been invited to join the ${type} <strong>${name}</strong>.</p>
    <p>Click the following link to accept: <a href="https://nuj-six.vercel.app/accept-invitation/${type}/${id}/${email}">Accept Invitation</a></p>
  `,
    };
    try {
        const result = yield transporter.sendMail(mailOptions);
        console.log({ result });
        return result;
    }
    catch (error) {
        console.log("Something went wrong while sending mail", error);
    }
});
exports.sendEmail = sendEmail;
