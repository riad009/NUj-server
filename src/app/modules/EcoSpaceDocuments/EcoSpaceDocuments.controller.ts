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

export const EcoSpaceDocumentControllers = {
  createEcoSpaceDocument,
};
