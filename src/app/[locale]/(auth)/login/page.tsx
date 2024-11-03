"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import FormAuth from "@/components/business/FormAuth";
import VerifyCodeMail from "@/components/business/VerifyCodeMail";
import { authCredential } from "@/configs/auth/action";
import { ETriggerCredentials } from "@/constants/auth";
import { PATH } from "@/constants/common";
import useAuth from "@/hooks/useAuth";
import authValidation, {
  type AuthValidation,
} from "@/validations/authValidation";

import { STEP_FORM_AUTH } from "../register/constant";
import IntroSection from "./components/IntroSection";

export type FormType = Pick<AuthValidation, "email" | "password">;
const rules = authValidation.pick({ email: true, password: true });

export default function Login() {
  const emailRef = useRef<string | null>(null);
  const userId = useRef<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [step, setStep] = useState(STEP_FORM_AUTH.FORM_AUTH);
  const { handleConfirmOtp, handleResendOtp, isLoadingAuth } = useAuth();

  const form = useForm<FormType>({
    resolver: zodResolver(rules),
  });

  const handleLogin = async (body: FormType) => {
    setIsLoading(true);

    const res = await authCredential<FormType>({
      trigger: ETriggerCredentials.LOGIN,
      email: body.email,
      password: body.password,
    });

    const error = JSON.parse(res?.error || "{}");

    if (res?.error) {
      if (error.isVerified) {
        setIsLoading(false);
        setStep(STEP_FORM_AUTH.VERIFY_CODE);
        emailRef.current = body.email;
        userId.current = error.userId;
        return;
      }

      Object.keys(error || {}).forEach((key) => {
        form.setError(key as keyof FormType, {
          message: error?.[key],
        });
      });

      setIsLoading(false);
    } else {
      toast.success("Login successfully !");

      setTimeout(() => {
        setIsLoading(false);
        router.push("/");
      }, 1000);
    }
  };

  const renderStep = () => {
    switch (step) {
      case STEP_FORM_AUTH.FORM_AUTH:
        return (
          <FormAuth
            form={form}
            isLoading={isLoading}
            handleSubmitMail={handleLogin}
            title="Login to your account"
            labelAction="Login"
            description={
              <div className="text-sm text-default-500">
                <span> If you don&apos;t have an account, </span>
                <Link size="sm" href={PATH.REGISTER}>
                  Register
                </Link>
              </div>
            }
          />
        );
      case STEP_FORM_AUTH.VERIFY_CODE:
        return (
          <VerifyCodeMail
            handleResendOtp={handleResendOtp}
            userId={userId.current || 0}
            isLoadingOtp={isLoadingAuth}
            handleConfirmOtp={handleConfirmOtp}
            setStep={setStep}
            email={emailRef.current || ""}
          />
        );
      default:
        return null;
    }
  };
  return (
    <section className="flex h-screen text-sm">
      {renderStep()}
      <IntroSection />
    </section>
  );
}
