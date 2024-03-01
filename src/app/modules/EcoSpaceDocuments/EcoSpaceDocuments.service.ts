import { TEcoSpaceDocument } from "./EcoSpaceDocuments.interface";
import { EcoSpaceDocumentModel } from "./EcoSpaceDocuments.model";

const createEcoSpaceDocumentIntoDB = async (payload: TEcoSpaceDocument) => {
  // validations adding soon

  const result = await EcoSpaceDocumentModel.create(payload);
  return result;
};

export const EcoSpaceDocumentServices = {
  createEcoSpaceDocumentIntoDB,
};
