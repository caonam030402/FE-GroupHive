"use client";

import React, { useRef, useState } from "react";

import { authRegisterWithEmail } from "@/api/auth";
import VerifyCodeMail from "@/components/business/auth/verifyCodeMail";
import useApi from "@/hooks/useApi";
import type { ISuccessResponse } from "@/types";

import FormSignUp, { type FormType } from "./components/formSignUp";
import IntroSection from "./components/introSection";
import { STEP_SIGN_UP } from "./constant";

export default function SignIn() {
  const [step, setStep] = useState(STEP_SIGN_UP.SIGN_IN);
  const emailRef = useRef<string | null>(null);
  const { fetch, isLoading } = useApi();

  const handleSubmitMail = async (data: FormType) => {
    await fetch<FormType, ISuccessResponse<null>>({
      fn: authRegisterWithEmail,
      body: data,
      onError: () => {
        setStep(STEP_SIGN_UP.SIGN_IN);
      },
      onSuccess: () => {
        setStep(STEP_SIGN_UP.VERIFY_CODE);
      },
    });
    emailRef.current = data.email;
  };
  const renderStep = () => {
    switch (step) {
      case STEP_SIGN_UP.SIGN_IN:
        return (
          <FormSignUp
            isLoading={isLoading}
            handleSubmitMail={handleSubmitMail}
          />
        );
      case STEP_SIGN_UP.VERIFY_CODE:
        return (
          <VerifyCodeMail setStep={setStep} email={emailRef.current || ""} />
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
