"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { authGenerateOtp, authRegisterWithEmail } from "@/api/auth";
import type { IRequestConfirmOtp } from "@/api/auth/type";
import VerifyCodeMail from "@/components/business/VerifyCodeMail";
import { authCredential } from "@/configs/auth/action";
import { ETriggerCredentials } from "@/constants/auth";
import { PATH } from "@/constants/common";
import useApi from "@/hooks/useApi";
import type { IErrorResponse } from "@/types";
import type { IAuthErrorResponse } from "@/types/auth";
import authValidation, {
  type AuthValidation,
} from "@/validations/authValidation";

import FormAuth from "../../../../components/business/FormAuth";
import IntroSection from "./components/IntroSection";
import { STEP_FORM_AUTH } from "./constant";

export type FormType = Pick<AuthValidation, "email" | "password">;
const rules = authValidation.pick({ email: true, password: true });

export default function SignIn() {
  const [step, setStep] = useState(STEP_FORM_AUTH.SIGN_IN);
  const emailRef = useRef<string | null>(null);
  const userId = useRef<number | null>(null);
  const { fetch, isLoading } = useApi();
  const router = useRouter();

  const form = useForm<FormType>({
    resolver: zodResolver(rules),
  });

  const handleSubmitMail = (body: FormType) => {
    fetch({
      fn: authRegisterWithEmail(body),
      onError: (error) => {
        const errorResponse = error.payload as IAuthErrorResponse | null;
        const errors = errorResponse?.errors;
        setStep(STEP_FORM_AUTH.SIGN_IN);

        // Set message error from server
        if (errors) {
          Object.keys(errors || {}).forEach((key) => {
            form.setError(key as keyof FormType, {
              message: errors?.[key],
            });
          });
        }
      },

      onSuccess: (response) => {
        userId.current = Number(response.payload?.id);
        toast.success("Success register please verify your email!");
        setStep(STEP_FORM_AUTH.VERIFY_CODE);
      },
    });
    emailRef.current = body.email;
  };

  const handleConfirmOtp = async (body: IRequestConfirmOtp) => {
    const res = await authCredential({
      trigger: ETriggerCredentials.OTP,
      userId: userId.current || 0,
      code: body.code,
    });

    if (res?.error) return toast.error(res.error);

    toast.success("Verify OTP successfully !");

    setTimeout(() => {
      router.push("/");
    }, 2000);

    return true;
  };

  const handleResendOtp = () => {
    fetch({
      fn: authGenerateOtp({
        user: { id: userId.current || 0 },
        expiresTime: 60,
      }),

      onError: (error) => {
        const errorResponse = error.payload as IErrorResponse | null;
        toast.error(errorResponse!.message);
      },

      onSuccess: () => {
        toast.success("Resend OTP successfully !");
      },
    });
  };

  const renderStep = () => {
    switch (step) {
      case STEP_FORM_AUTH.SIGN_IN:
        return (
          <FormAuth
            labelAction="Sign Up for Free"
            title="Create account"
            form={form}
            isLoading={isLoading}
            handleSubmitMail={handleSubmitMail}
            description={
              <div className="text-sm text-default-500">
                <span>If you already have an account, </span>
                <Link size="sm" href={PATH.LOGIN}>
                  Login
                </Link>
              </div>
            }
          />
        );
      case STEP_FORM_AUTH.VERIFY_CODE:
        return (
          <VerifyCodeMail
            handleResendOtp={handleResendOtp}
            userId={userId}
            isLoadingOtp={isLoading}
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
      <IntroSection />
      {renderStep()}
    </section>
  );
}
