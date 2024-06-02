import { catchAsync } from "../../middlewares/catchAsync";
import { sendResponse } from "../../middlewares/sendResponse";
import { MessageService } from "./message.service";

const createMessage = catchAsync(async (req, res, next) => {
  const result = await MessageService.createMessage(
    req.files,
    req.body,
    req.query.type
  );

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Message sent Successfully",
    data: result,
  });
});

const getAllMessages = catchAsync(async (req, res, next) => {
  const projectId = req.params.projectId;
  const result = await MessageService.getAllMessages(projectId);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Messages retrieved successfully",
    data: result,
  });
});

const getAllMessagesEmail = catchAsync(async (req, res, next) => {
  const userEmail = req.query.userEmail;
  const selfEmail = req.params.email;

  const result = await MessageService.getAllMessagesEmail(
    userEmail as string,
    selfEmail
  );

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Messages retrieved successfully",
    data: result,
  });
});

export const MessageController = {
  createMessage,
  getAllMessages,
  getAllMessagesEmail,
};
