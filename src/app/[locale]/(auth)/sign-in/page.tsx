"use client";

import React, { useState } from "react";

import VerifyCodeMail from "@/components/business/auth/verifyCodeMail";

import FormSignUp from "./components/formSignUp";
// import FormSignUp from "./components/formSignUp";
import IntroSection from "./components/introSection";
import { STEP_SIGN_UP } from "./constant";

export default function SignIn() {
  const [step, setStep] = useState(STEP_SIGN_UP.SIGN_IN);

  const handleSubmitMail = (email: string) => {
    setStep(STEP_SIGN_UP.VERIFY_CODE);
    return email;
  };

  const renderStep = () => {
    switch (step) {
      case STEP_SIGN_UP.SIGN_IN:
        return <FormSignUp handleSubmitMail={handleSubmitMail} />;
      case STEP_SIGN_UP.VERIFY_CODE:
        return (
          <div className="flex w-full max-w-[700px] flex-1 flex-col items-center justify-center">
            <VerifyCodeMail email="caonam81@gmail.com" />
          </div>
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
