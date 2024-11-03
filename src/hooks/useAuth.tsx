import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { authGenerateOtp } from "@/api/auth";
import type { IRequestConfirmOtp } from "@/api/auth/type";
import { authCredential } from "@/configs/auth/action";
import { ETriggerCredentials } from "@/constants/auth";
import type { IErrorResponse } from "@/types";

import useApi from "./useApi";

export default function useAuth() {
  const router = useRouter();
  const { fetch, isLoading: isLoadingAuth, setIsLoading } = useApi();
  const handleConfirmOtp = async (body: IRequestConfirmOtp, userId: number) => {
    setIsLoading(true);
    const res = await authCredential({
      trigger: ETriggerCredentials.OTP,
      userId,
      code: body.code,
    });

    if (res?.error) return toast.error(res.error);

    toast.success("Verify OTP successfully !");

    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 2000);

    return true;
  };

  const handleResendOtp = (userId: number) => {
    fetch({
      fn: authGenerateOtp({
        user: { id: userId || 0 },
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

  return {
    handleConfirmOtp,
    handleResendOtp,
    isLoadingAuth,
  };
}
