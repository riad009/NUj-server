import { catchAsync } from "../../middlewares/catchAsync";
import { sendResponse } from "../../middlewares/sendResponse";
import { ChannelService } from "./channel.service";

const createChannel = catchAsync(async (req, res, next) => {
  const result = await ChannelService.createChannel(req.body);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Created Successfully",
    data: result,
  });
});

const getAllChannels = catchAsync(async (req, res, next) => {
  const ecoSpaceId = req.params.ecoSpaceId;

  const result = await ChannelService.getAllChannels(ecoSpaceId);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "retrieved successfully",
    data: result,
  });
});

const getSingleChannel = catchAsync(async (req, res, next) => {
  const channelId = req.params.channelId;

  const result = await ChannelService.getSingleChannel(channelId);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "retrieved successfully",
    data: result,
  });
});

export const ChannelController = {
  createChannel,
  getAllChannels,
  getSingleChannel,
};
