import { useState } from "react";
import toast from "react-hot-toast";

import { HttpStatusCode } from "@/constants/httpStatusCode";

interface IUseFetch<BodyType, ResponseType> {
  fn: (
    body: BodyType | any,
  ) => Promise<{ status: number; payload: ResponseType | any; ok: boolean }>;
  body: BodyType;
  onSuccess?: () => void;
  onError?: (response: ResponseType) => void;
}

export default function useApi<BodyType, ResponseType>() {
  const [isLoading, setIsLoading] = useState(false);

  const fetch = async ({
    fn,
    body,
    onError,
    onSuccess,
  }: IUseFetch<BodyType, ResponseType>) => {
    setIsLoading(true);
    const response = await fn(body);
    const statusCode = response.status;

    if (!response.ok) {
      statusCode !== HttpStatusCode.UnprocessableEntity &&
        toast.error(response.payload.message);
      setIsLoading(false);
      onError?.(response as ResponseType);
    } else {
      setIsLoading(false);
      onSuccess?.();
    }

    setIsLoading(false);

    return response;
  };

  return { fetch, isLoading };
}
