import { z } from "zod";

import { messageValidation } from "@/constants/message";

const authValidation = z.object({
  email: z
    .string({ message: messageValidation.emailIsRequired })
    .min(6, { message: messageValidation.sixCharacters })
    .email({ message: messageValidation.emailIsInvalid }),
});

export default authValidation;

export type AuthValidation = z.infer<typeof authValidation>;
