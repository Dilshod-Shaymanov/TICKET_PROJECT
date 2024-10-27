import { Users } from "../../../users/models/user.model";

export const userStub = (): Partial<Users> => {
  return {
    id: 1,
    name: "user1",
    email: "user1@gmail.com",
    password: "1234567",
    role_value: "ADMIN",
    is_active: true,
  };
};
