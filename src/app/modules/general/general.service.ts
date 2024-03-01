import { AppError } from "../../errors/AppError";
import { EcoSpaceModel } from "../ecoSpaces/ecoSpaces.model";
import { UserModel } from "../users/user.model";

// Getting my profile
const getMyProfileFromDB = async (email: string) => {
  const result = await UserModel.findOne({ email });
  if (!result?._id) {
    throw new AppError(400, "User does not exists");
  }
  return result;
};

// Getting statistics for admin
const getStatisticsFromDB = async () => {
  const ecoSpacesCount = await EcoSpaceModel.countDocuments({});
  const usersCount = await UserModel.countDocuments({ role: "user" });
  const subscribersCount = await EcoSpaceModel.countDocuments({
    plan: { $exists: true },
  });

  const result = { ecoSpacesCount, usersCount, subscribersCount, revenue: 200 };
  return result;
};

export const GeneralServices = {
  getStatisticsFromDB,
  getMyProfileFromDB,
};
