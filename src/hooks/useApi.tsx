import { useState } from "react";

interface IUseFetch<BodyType, ResponseType> {
  fn: (
    body: BodyType | any,
  ) => Promise<{ status: number; payload: ResponseType | any }>;
  body: BodyType;
  onSuccess?: () => void;
  onError?: () => void;
}

export default function useApi() {
  const [isLoading, setIsLoading] = useState(false);

  const fetch = async <BodyType, ResponseType>({
    fn,
    body,
    onError,
    onSuccess,
  }: IUseFetch<BodyType, ResponseType>) => {
    setIsLoading(true);
    const response = await fn(body);
    if (response.status !== 200) {
      setIsLoading(false);
      onError?.();
    } else {
      setIsLoading(false);
      onSuccess?.();
    }
    setIsLoading(false);
    return response;
  };

  return { fetch, isLoading };
}
