import { useState } from "react";

interface IUseFetch {
  fn: <body, res>(
    body: body,
  ) => Promise<{
    res: res;
    error: {
      message: string;
      code: number;
    };
  }>;
  body: unknown;
  onSuccess?: () => void;
  onError?: () => void;
}

export default function useApi() {
  const [loading, setLoading] = useState(false);

  const useFetch = async ({ fn, body, onError, onSuccess }: IUseFetch) => {
    setLoading(true);
    const response = await fn(body);
    if (response.error) {
      setLoading(false);
      onError?.();
    } else {
      setLoading(false);
      onSuccess?.();
    }
    setLoading(false);
    return response;
  };

  return { useFetch, loading };
}
