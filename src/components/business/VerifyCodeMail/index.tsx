"use client";

import { Button } from "@nextui-org/button";
import { IoChevronBackOutline } from "@react-icons/all-files/io5/IoChevronBackOutline";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import type { IRequestConfirmOtp } from "@/api/auth/type";
import { STEP_FORM_AUTH } from "@/app/[locale]/(auth)/register/constant";
import InputOTP from "@/components/business/InputOtp";
import { cn } from "@/libs/utils";
import { formatEmailHide } from "@/utils/helpers";

interface IProps {
  email: string;
  setStep?: React.Dispatch<React.SetStateAction<STEP_FORM_AUTH>>;
  handleConfirmOtp: (body: IRequestConfirmOtp, userId: number) => void;
  isLoadingOtp: boolean;
  userId: number | undefined;
  handleResendOtp: (userId: number) => void;
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
  const secondsRemaining = 60;
  const [timeRemaining, setTimeRemaining] = React.useState(secondsRemaining);

  const isDisabledResend = useMemo(() => {
    return timeRemaining !== 0;
  }, [timeRemaining]);

  const isQualifiedOtp = useMemo(() => {
    return OTP.length === maxLength;
  }, [OTP.length]);

  const handleSubmit = (pin: string) => {
    if (pin.length !== maxLength) {
      toast.error("Invalid OTP");
      return;
    }

    handleConfirmOtp(
      {
        user: {
          id: userId || 0,
        },
        code: Number(pin),
      },
      userId || 0,
    );
    setOTP(pin);
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeRemaining]);

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-[600px]">
        <Button
          className="mb-3 min-w-0 gap-1 px-1 py-0 text-sm"
          size="sm"
          variant="light"
          onClick={() => setStep?.(STEP_FORM_AUTH.FORM_AUTH)}
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
          onClick={() => {
            if (isDisabledResend) return;
            handleResendOtp(userId || 0);
            setTimeRemaining(secondsRemaining);
          }}
          className={cn(
            "mt-5 flex cursor-pointer items-center gap-1 text-primary",
            isDisabledResend && "cursor-not-allowed opacity-50",
          )}
        >
          {!isDisabledResend ? (
            <>Resend code</>
          ) : (
            <>Resend code {`${timeRemaining}s`}</>
          )}
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
