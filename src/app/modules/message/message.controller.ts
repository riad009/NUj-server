import { catchAsync } from "../../middlewares/catchAsync";
import { sendResponse } from "../../middlewares/sendResponse";
import { MessageService } from "./message.service";

const createMessage = catchAsync(async (req, res, next) => {
  console.log(req.files, req.body);

  const result = await MessageService.createMessage(req.files, req.body);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Message sent Successfully",
    data: result,
  });
});

const getAllMessages = catchAsync(async (req, res, next) => {
  const ecoSpaceId = req.params.ecoSpaceId;

  const result = await MessageService.getAllMessages(ecoSpaceId);

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
};
