export type TUser = {
  name: string;
  role: "admin" | "user";
  phone: string;
  email: string;
  photo: string;
  isNotify: boolean;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  address: string;
  isDeleted: boolean;
};
