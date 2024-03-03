import config from "../../config";
import { EcoSpaceModel } from "../ecoSpaces/ecoSpaces.model";
import { TEcoSpaceDocument } from "./EcoSpaceDocuments.interface";
import { EcoSpaceDocumentModel } from "./EcoSpaceDocuments.model";
import axios from "axios";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

const createEcoSpaceDocumentIntoDB = async (payload: TEcoSpaceDocument) => {
  // validations adding soon

  const result = await EcoSpaceDocumentModel.create(payload);
  return result;
};

const uploadFiles = async (file: any, fieldName: string, id: any) => {
  console.log({ file, fieldName, id });

  if (!file) {
    throw new Error("No file uploaded");
  }

  const response = await cloudinary.v2.uploader.upload(file.path, {
    resource_type: "auto",
  });

  if (response.secure_url) {
    const updatedDoc = await EcoSpaceModel.findByIdAndUpdate(
      id,
      { $set: { [fieldName]: response.secure_url } },
      { new: true }
    );
    console.log({ updatedDoc });
    return updatedDoc;
  }

  return response.secure_url;
};

const toxicityDetection = async (payload: any) => {
  const prompts = [
    {
      model: "gpt-3.5-turbo-instruct",
      system: "You are an expert",

      description: `Rate the toxicity in order of their importance on a scale of 1-5, Return only number: ${payload}`,
    },
    {
      model: "gpt-3.5-turbo-instruct",
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
      model: "gpt-3.5-turbo-instruct",
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
      model: "gpt-3.5-turbo-instruct",
      system: "You are an expert",

      description: `Provide a personalized and effective comprehensive success plan based on the user's education, goal setting, workforce literacy, anger management, and computational literacy. The user's message is: usermsg. Additionally, offer suggestions to further enhance the user's success plan.  User message: ${payload}`,
    },
  ];

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${config.openai_key}`,
  };

  try {
    const completions = await Promise.all(
      prompts.map(async (prompt, index) => {
        let completion;

        const data = {
          model: prompt.model,
          prompt: prompt.description,
          // messages: [
          //   {
          //     role: "system",
          //     content: prompt.system,
          //   },
          //   {
          //     role: "user",
          //     content: prompt.description,
          //   },
          // ],
          temperature: 1,
          max_tokens: 1000,
          top_p: 1,
        };

        await axios
          .post("https://api.openai.com/v1/completions", data, {
            headers,
          })
          .then((response) => {
            // completion = response.data.choices[0].message.content.trim();
            completion = response.data.choices[0].text.trim();
          });

        return {
          response: completion,
        };
      })
    );

    return completions;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const EcoSpaceDocumentServices = {
  createEcoSpaceDocumentIntoDB,
  toxicityDetection,
  uploadFiles,
};
