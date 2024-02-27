import { TPlan } from "./plan.interface";
import { PlanModel } from "./plan.model";

const createPlanIntoDB = async (payload: Partial<TPlan>) => {
  const result = await PlanModel.create(payload);
  return result;
};

export const PlanServices = {
  createPlanIntoDB,
};
