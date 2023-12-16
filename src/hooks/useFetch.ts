import { useState, useEffect } from "react";

export type ApiResponse<T> = {
  status: Number;
  statusText: String;
  data: T | undefined;
  error: any | null;
  loading: boolean;
};

const useFetch = <T>(url: string): ApiResponse<T> => {
  const [status, setStatus] = useState<Number>(0);
  const [statusText, setStatusText] = useState<String>("");
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getAPIData = async () => {
    setLoading(true);

    try {
      const apiResponse = await fetch(url);
      const json = await apiResponse.json();

      setStatus(apiResponse.status);
      setStatusText(apiResponse.statusText);
      setData(json);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getAPIData();
  }, []);

  return { status, statusText, data, error, loading };
};

export default useFetch;
