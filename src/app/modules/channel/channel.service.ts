import { Channel } from "./channel.model";

const createChannel = async (payload: any) => {
  const result = await Channel.create(payload);
  return result;
};

const getAllChannels = async (ecoSpaceId: string) => {
  const result = await Channel.find({ ecoSpaceId }).sort({ createdAt: 1 });
  return result;
};

export const ChannelService = {
  createChannel,
  getAllChannels,
};
