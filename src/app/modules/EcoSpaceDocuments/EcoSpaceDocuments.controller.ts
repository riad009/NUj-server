import { catchAsync } from "../../middlewares/catchAsync";
import { sendResponse } from "../../middlewares/sendResponse";
import { EcoSpaceDocumentServices } from "./EcoSpaceDocuments.service";

// !Uploading through EcoSpace Routes
const createEcoSpaceDocument = catchAsync(async (req, res, next) => {
  const payload = req?.body;
  const result = await EcoSpaceDocumentServices.createEcoSpaceDocumentIntoDB(
    payload
  );

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Documents Uploaded Successfully",
    data: result,
  });
});

const uploadFiles = catchAsync(async (req, res, next) => {
  const file = req?.file;
  const fieldName = req?.query.fieldName;
  const id = req?.params.id;
  const result = await EcoSpaceDocumentServices.uploadFiles(
    file,
    fieldName as string,
    id
  );

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Uploaded Successfully",
    data: result,
  });
});

const toxicityDetection = catchAsync(async (req, res, next) => {
  const { payload } = req?.body;
  console.log({ payload });
  const result = await EcoSpaceDocumentServices.toxicityDetection(payload);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Generated",
    data: result,
  });
});

export const EcoSpaceDocumentControllers = {
  toxicityDetection,
  createEcoSpaceDocument,
  uploadFiles,
};
