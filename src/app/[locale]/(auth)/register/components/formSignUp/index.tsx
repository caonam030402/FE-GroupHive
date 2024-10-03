import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { FiEye } from "@react-icons/all-files/fi/FiEye";
import { FiEyeOff } from "@react-icons/all-files/fi/FiEyeOff";
import { FiLock } from "@react-icons/all-files/fi/FiLock";
import { IoMailOutline } from "@react-icons/all-files/io5/IoMailOutline";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import AuthWithProvider from "@/components/business/auth/authWithProvider";
import type { AuthValidation } from "@/validations/authValidation";
import authValidation from "@/validations/authValidation";

interface IProps {
  handleSubmitMail: (data: FormType) => void;
}

export type FormType = Pick<AuthValidation, "email" | "password">;
const rules = authValidation.pick({ email: true, password: true });

export default function FormSignUp({ handleSubmitMail }: IProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(rules),
  });

  const onSubmit = handleSubmit((data) => {
    handleSubmitMail(data);
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
              <IoMailOutline className="pointer-events-none shrink-0 text-xl text-default-400" />
            }
            {...register("email")}
          />
          <Input
            size="md"
            errorMessage={errors.password?.message}
            placeholder="******************"
            isInvalid={!!errors.password?.message}
            startContent={
              <FiLock className="pointer-events-none shrink-0 text-xl text-default-400" />
            }
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <FiEyeOff className="pointer-events-none text-xl text-default-400" />
                ) : (
                  <FiEye className="pointer-events-none text-xl text-default-400" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            {...register("password")}
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
