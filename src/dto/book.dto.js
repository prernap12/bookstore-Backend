import * as z from "zod";

export const BookRegister = z.object({
  name: z.string().max(100),
  price: z.coerce.number().min(0),
  discount: z.coerce.number().optional(),
  description: z.string().max(300).optional(),
  author: z.string().max(50),
  language: z.string().max(20),
});

export const UpdateBook = BookRegister.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field must be provided to update",
  }
);
