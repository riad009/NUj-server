import { catchAsync } from "../../middlewares/catchAsync";
import { sendResponse } from "../../middlewares/sendResponse";
import { GeneralServices } from "./general.service";

const getStatistics = catchAsync(async (req, res, next) => {
  const result = await GeneralServices.getStatisticsFromDB();

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Statistics Retrieved Successfully",
    data: result,
  });
});

const getMyProfile = catchAsync(async (req, res, next) => {
  const email = req.params.email;
  const result = await GeneralServices.getMyProfileFromDB(email);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "My Profile Retrieved Successfully",
    data: result,
  });
});

export const GeneralControllers = {
  getStatistics,
  getMyProfile,
};
