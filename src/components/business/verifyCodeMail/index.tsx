"use client";

import { Button } from "@nextui-org/button";
import { IoChevronBackOutline } from "@react-icons/all-files/io5/IoChevronBackOutline";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";

import type { IRequestConfirmOtp } from "@/api/auth/type";
import { STEP_SIGN_UP } from "@/app/[locale]/(auth)/register/constant";
import InputOTP from "@/components/business/inputOtp";
import { formatEmailHide } from "@/utils/Helpers";

interface IProps {
  email: string;
  setStep?: React.Dispatch<React.SetStateAction<STEP_SIGN_UP>>;
  handleConfirmOtp: (body: IRequestConfirmOtp) => void;
  isLoadingOtp: boolean;
  userId: React.MutableRefObject<number | null>;
  handleResendOtp: () => void;
}

export default function VerifyCodeMail({
  email = "caonam81@gmail.com",
  setStep,
  handleConfirmOtp,
  handleResendOtp,
  userId,
  isLoadingOtp,
}: IProps) {
  const maxLength = 6;
  const [OTP, setOTP] = useState("");

  const isQualifiedOtp = useMemo(() => {
    return OTP.length === maxLength;
  }, [OTP.length]);

  const handleSubmit = (pin: string) => {
    if (pin.length !== maxLength) {
      toast.error("Invalid OTP");
      return;
    }

    handleConfirmOtp({
      user: {
        id: userId.current || 0,
      },
      code: Number(pin),
    });
    setOTP(pin);
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
        <InputOTP length={maxLength} onComplete={handleSubmit} />
        <button
          type="button"
          onClick={() => handleResendOtp()}
          className="mt-5 cursor-pointer text-primary"
        >
          Resend code
        </button>
        <Button
          isLoading={isLoadingOtp}
          disabled={!isQualifiedOtp}
          color={isQualifiedOtp ? "primary" : "default"}
          className="mt-5 w-full"
          onClick={() => handleSubmit(OTP)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
