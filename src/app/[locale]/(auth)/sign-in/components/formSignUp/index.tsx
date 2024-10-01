import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { IoMail } from "@react-icons/all-files/io5/IoMail";
import React from "react";
import { useForm } from "react-hook-form";

import AuthWithProvider from "@/components/business/auth/authWithProvider";
import type { AuthValidation } from "@/validations/authValidation";
import authValidation from "@/validations/authValidation";

interface IProps {
  handleSubmitMail: (email: string) => void;
}

type FormType = Pick<AuthValidation, "email">;
const rules = authValidation.pick({ email: true });

export default function FormSignUp({ handleSubmitMail }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(rules),
  });

  const onSubmit = handleSubmit((data) => {
    handleSubmitMail(data.email);
  });

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-[600px] space-y-6">
        <form onSubmit={onSubmit} className="w-full space-y-6">
          <h1 className="text-2xl font-bold">Enter your work email</h1>
          <Input
            size="md"
            errorMessage={errors.email?.message}
            placeholder="name@work.com"
            isInvalid={!!errors.email?.message}
            type="email"
            startContent={
              <IoMail className="pointer-events-none shrink-0 text-2xl text-default-400" />
            }
            {...register("email")}
          />
          <Button type="submit" size="md" className="w-full" color="primary">
            Sign Up for Free
          </Button>
        </form>
        <AuthWithProvider />
        <div className="text-sm text-default-500">
          <span>If you already have an account, </span>
          <Link size="sm" href="/">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
