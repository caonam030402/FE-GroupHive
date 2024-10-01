import { z } from "zod";

const authValidation = z.object({
  email: z.string().min(6).email(),
});

export default authValidation;

export type AuthValidation = z.infer<typeof authValidation>;
