import { EcoSpaceModel } from "../ecoSpaces/ecoSpaces.model";
import { UserModel } from "../users/user.model";

const getStatisticsFromDB = async () => {
  const ecoSpacesCount = await EcoSpaceModel.countDocuments({});
  const usersCount = await UserModel.countDocuments({ role: "user" });
  const subscribersCount = await EcoSpaceModel.countDocuments({
    plan: { $exists: true },
  });

  const result = { ecoSpacesCount, usersCount, subscribersCount };
  return result;
};

export const GeneralServices = {
  getStatisticsFromDB,
};
