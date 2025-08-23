import { useState } from 'react';
import type { AxiosRequestConfig } from 'axios';
import { API } from '../apis/axios';

const usePatch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const patch = async <T,>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      setLoading(true);
      setError(null);

      const response = await API.patch<T>(url, data, config);
      return response.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { patch, loading, error };
};

export default usePatch;
