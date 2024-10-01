"use client";

import React, { useRef, useState } from "react";

import VerifyCodeMail from "@/components/business/auth/verifyCodeMail";

import FormSignUp from "./components/formSignUp";
import IntroSection from "./components/introSection";
import { STEP_SIGN_UP } from "./constant";

export default function SignIn() {
  const [step, setStep] = useState(STEP_SIGN_UP.SIGN_IN);
  const emailRef = useRef<string | null>(null);

  const handleSubmitMail = (email: string) => {
    setStep(STEP_SIGN_UP.VERIFY_CODE);
    emailRef.current = email;
  };

  const renderStep = () => {
    switch (step) {
      case STEP_SIGN_UP.SIGN_IN:
        return <FormSignUp handleSubmitMail={handleSubmitMail} />;
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
