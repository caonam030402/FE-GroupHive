import { z } from "zod";

import { messageValidation } from "@/constants/message";

// eslint-disable-next-line prefer-regex-literals
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
);

const authValidation = z.object({
  email: z
    .string({ message: messageValidation.emailIsRequired })
    .min(6, { message: messageValidation.sixCharacters })
    .email({ message: messageValidation.emailIsInvalid }),
  password: z
    .string({ message: messageValidation.passwordIsRequired })
    .max(20)
    .regex(passwordValidation, {
      message:
        "Minimum 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
    }),
});

export default authValidation;

export type AuthValidation = z.infer<typeof authValidation>;
