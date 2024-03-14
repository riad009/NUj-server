import { TPlan } from "./plan.interface";
import { PlanModel } from "./plan.model";

const createPlanIntoDB = async (payload: Partial<TPlan>) => {
  const result = await PlanModel.create(payload);
  return result;
};

const getAllPlanFromDB = async () => {
  const result = await PlanModel.find({}).sort({ price: 1 });
  return result;
};

export const PlanServices = {
  createPlanIntoDB,
  getAllPlanFromDB,
};
