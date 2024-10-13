"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { authConfirmOtp, authRegisterWithEmail } from "@/api/auth";
import type { IRequestConfirmOtp } from "@/api/auth/type";
import VerifyCodeMail from "@/components/business/verifyCodeMail";
import useApi from "@/hooks/useApi";
import type { IErrorResponse } from "@/types";
import type { IAuthErrorResponse } from "@/types/auth";
import authValidation, {
  type AuthValidation,
} from "@/validations/authValidation";

import FormSignUp from "./components/formSignUp";
import IntroSection from "./components/introSection";
import { STEP_SIGN_UP } from "./constant";

export type FormType = Pick<AuthValidation, "email" | "password">;
const rules = authValidation.pick({ email: true, password: true });

export default function SignIn() {
  const [step, setStep] = useState(STEP_SIGN_UP.SIGN_IN);
  const emailRef = useRef<string | null>(null);
  const userId = useRef<number | null>(null);
  const { fetch, isLoading } = useApi();

  const form = useForm<FormType>({
    resolver: zodResolver(rules),
  });

  const handleSubmitMail = async (body: FormType) => {
    await fetch({
      fn: authRegisterWithEmail(body),
      onError: (error) => {
        const errorResponse = error.payload as IAuthErrorResponse | null;
        const errors = errorResponse?.errors;
        setStep(STEP_SIGN_UP.SIGN_IN);

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
        toast.success("Successfully toasted!");
        setStep(STEP_SIGN_UP.VERIFY_CODE);
      },
    });
    emailRef.current = body.email;
  };

  const handleConfirmOtp = async (body: IRequestConfirmOtp) => {
    await fetch({
      fn: authConfirmOtp(body),

      onError: (error) => {
        const errorResponse = error.payload as IErrorResponse | null;
        toast.error(errorResponse!.message);
      },

      onSuccess: () => {
        toast.success("Confirm successfully !");
      },
    });
  };

  const renderStep = () => {
    switch (step) {
      case STEP_SIGN_UP.SIGN_IN:
        return (
          <FormSignUp
            form={form}
            isLoading={isLoading}
            handleSubmitMail={handleSubmitMail}
          />
        );
      case STEP_SIGN_UP.VERIFY_CODE:
        return (
          <VerifyCodeMail
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
