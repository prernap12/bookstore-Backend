import * as z from "zod";

export const UserRegister = z.object({
  username: z.string().min(3).max(50),
  email: z.email(),
  address: z.string().max(100),
  contact: z.string().optional(),
  password: z
    .string()
    .min(8, "password must be of minium length 8")
    .max(20, "password must be of maximum length 20"),
});
