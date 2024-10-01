"use client";

import React from "react";

import InputOTP from "@/components/common/inputOtp";
import { formatEmailHide } from "@/utils/Helpers";

interface IProps {
  email: string;
}

export default function VerifyCodeMail({
  email = "caonam81@gmail.com",
}: IProps) {
  const handleSubmit = (pin: string) => {
    return pin;
  };

  const handleResendCode = () => {
    return null;
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">Enter verification code</h1>
      <div className="mt-2">
        A 6-digit code was sent to {formatEmailHide(email)}. Enter it within 10
        minutes.
      </div>
      <InputOTP onComplete={handleSubmit} />
      <button
        type="button"
        onClick={() => handleResendCode()}
        className="mt-5 cursor-pointer text-primary"
      >
        Resend code
      </button>
    </div>
  );
}
