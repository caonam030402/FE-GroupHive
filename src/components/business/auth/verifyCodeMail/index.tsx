"use client";

import { Button } from "@nextui-org/button";
import { IoChevronBackOutline } from "@react-icons/all-files/io5/IoChevronBackOutline";
import React, { useState } from "react";

import { STEP_SIGN_UP } from "@/app/[locale]/(auth)/register/constant";
import InputOTP from "@/components/common/inputOtp";
import { formatEmailHide } from "@/utils/Helpers";

interface IProps {
  email: string;
  setStep?: React.Dispatch<React.SetStateAction<STEP_SIGN_UP>>;
}

export default function VerifyCodeMail({
  email = "caonam81@gmail.com",
  setStep,
}: IProps) {
  const [OTP, setOTP] = useState("");
  const handleSubmit = (pin: string) => {
    setOTP(pin);
  };

  const handleResendCode = () => {
    return null;
  };
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-[600px]">
        <Button
          className="mb-3 min-w-0 gap-1 px-1 py-0 text-sm"
          size="sm"
          variant="light"
          onClick={() => setStep?.(STEP_SIGN_UP.SIGN_IN)}
        >
          <IoChevronBackOutline /> Back
        </Button>
        <h1 className="text-2xl font-bold">Enter verification code</h1>
        <div className="mt-2">
          A 6-digit code was sent to {formatEmailHide(email)}. Enter it within
          10 minutes.
        </div>
        <InputOTP onComplete={handleSubmit} />
        <button
          type="button"
          onClick={() => handleResendCode()}
          className="mt-5 cursor-pointer text-primary"
        >
          Resend code
        </button>
        <Button
          isDisabled
          color={OTP === "" ? "default" : "primary"}
          className="mt-5 w-full"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
