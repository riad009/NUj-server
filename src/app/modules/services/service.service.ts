import { TService } from "./service.interface";
import { ServiceModel } from "./service.model";

const createServiceIntoDB = async (payload: Partial<TService>) => {
  const result = await ServiceModel.create(payload);
  return result;
};

const getAllServicesFromDB = async () => {
  const result = await ServiceModel.find({});
  return result;
};

export const ServiceServices = {
  createServiceIntoDB,
  getAllServicesFromDB,
};
