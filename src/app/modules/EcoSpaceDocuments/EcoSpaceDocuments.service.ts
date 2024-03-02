import config from "../../config";
import { TEcoSpaceDocument } from "./EcoSpaceDocuments.interface";
import { EcoSpaceDocumentModel } from "./EcoSpaceDocuments.model";
import axios from "axios";

const createEcoSpaceDocumentIntoDB = async (payload: TEcoSpaceDocument) => {
  // validations adding soon

  const result = await EcoSpaceDocumentModel.create(payload);
  return result;
};

const toxicityDetection = async (payload: any) => {
  const prompts = [
    {
      model: "gpt-3.5-turbo-0125",
      system: "You are an expert",

      description: `
          Give me a paragraph aboout my country (Bangladesh) 
     `,
    },
    {
      model: "gpt-3.5-turbo-0125",
      system: "You are an expert",

      description: `
          Give me a paragraph aboout my country (Bangladesh) 
     `,
    },
    {
      model: "gpt-3.5-turbo-0125",
      system: "You are an expert",

      description: `
          Give me a paragraph aboout my country (Bangladesh) 
     `,
    },
    {
      model: "gpt-3.5-turbo-0125",
      system: "You are an expert",

      description: `
          Give me a paragraph aboout my country (Bangladesh) 
     `,
    },
  ];

  console.log("inside service");

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
          messages: [
            {
              role: "system",
              content: prompt.system,
            },
            {
              role: "user",
              content: prompt.description,
            },
          ],
          temperature: 1,
          max_tokens: 1000,
          top_p: 1,
        };

        await axios
          .post("https://api.openai.com/v1/chat/completions", data, {
            headers,
          })
          .then((response) => {
            completion = response.data.choices[0].message.content.trim();
          });

        return {
          response: completion,
        };
      })
    );

    console.log("inside service", completions);

    return completions;
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

export const EcoSpaceDocumentServices = {
  createEcoSpaceDocumentIntoDB,
  toxicityDetection,
};
