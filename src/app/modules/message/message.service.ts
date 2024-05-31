import config from "../../config";
import cloudinary from "cloudinary";
import { Message } from "./message.model";

cloudinary.v2.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

const createMessage = async (files: any, payload: any) => {
  const { email, userImage, ecoSpaceId, message, projectId, userEmail } =
    payload;

  const uploadedFiles = [];

  for (const file of files) {
    console.log("inside loop");

    const response = await cloudinary.v2.uploader.upload(file.path, {
      resource_type: "auto",
    });

    let fileType;
    if (file.mimetype.startsWith("image")) {
      fileType = "image";
    } else if (file.mimetype.startsWith("video")) {
      fileType = "video";
    } else if (file.mimetype.startsWith("audio")) {
      fileType = "audio";
    } else {
      fileType = "other";
    }

    uploadedFiles.push({
      name: fileType,
      url: response.secure_url,
    });
  }

  let messageData: any = {
    email,
    userImage,
    ecoSpaceId,
    message,
  };
  for (const file of uploadedFiles) {
    if (file?.name === "image") {
      messageData.image = file?.url;
    } else if (file?.name === "audio") {
      messageData.audio = file?.url;
    } else if (file?.name === "video") {
      messageData.video = file?.url;
    }
  }

  if (projectId) {
    messageData.projectId = projectId;
  }

  if (userEmail) {
    messageData.userEmail = userEmail;
  }

  const result = await Message.create(messageData);

  return result;
};

const getAllMessages = async (projectId: string) => {
  console.log({ projectId });

  const result = await Message.find({ projectId }).sort({ createdAt: 1 });
  return result;
};

const getAllMessagesEmail = async (userEmail: string, selfEmail: string) => {
  console.log({ userEmail, selfEmail });

  const messagesForSelfEmail = await Message.find({
    email: selfEmail,
    userEmail: userEmail,
  });

  const messagesUserEmail = await Message.find({
    email: userEmail,
    userEmail: selfEmail,
  });

  const filteredMessages: any = [...messagesForSelfEmail, ...messagesUserEmail];
  filteredMessages.sort(
    (a: any, b: any) => new Date(a.createdAt) - new Date(b.createdAt)
  );
  return filteredMessages;
};

export const MessageService = {
  createMessage,
  getAllMessages,
  getAllMessagesEmail,
};
