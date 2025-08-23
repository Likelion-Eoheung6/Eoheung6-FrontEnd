import { useState } from 'react';
import type { AxiosRequestConfig } from 'axios';
import { API } from '../apis/axios';

const usePost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const post = async <T,>(url: string, body: any): Promise<T> => {
    try {
      setLoading(true);
      setError(null);

      const isFormData = body instanceof FormData;

      const config: AxiosRequestConfig = isFormData
        ? { headers: { 'Content-Type': undefined } }
        : {};

      const response = await API.post<T>(url, body, config);
      return response.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { post, loading, error };
};

export default usePost;
