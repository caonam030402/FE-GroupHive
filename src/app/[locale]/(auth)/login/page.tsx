"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import type { IRequestConfirmOtp } from "@/api/auth/type";
import FormAuth from "@/components/business/FormAuth";
import VerifyCodeMail from "@/components/business/VerifyCodeMail";
import { authCredential } from "@/configs/auth/action";
import { ETriggerCredentials } from "@/constants/auth";
import useApi from "@/hooks/useApi";
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
  const { isLoading } = useApi();
  const router = useRouter();

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

  const form = useForm<FormType>({
    resolver: zodResolver(rules),
  });

  const handleSubmitMail = () => {};
  const handleResendOtp = () => {};

  const [step, setStep] = useState(STEP_FORM_AUTH.LOGIN);
  const renderStep = () => {
    switch (step) {
      case STEP_FORM_AUTH.LOGIN:
        return (
          <FormAuth
            form={form}
            isLoading={isLoading}
            handleSubmitMail={handleSubmitMail}
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
      {renderStep()}
      <IntroSection />
    </section>
  );
}
