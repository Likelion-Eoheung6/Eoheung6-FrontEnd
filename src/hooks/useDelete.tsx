import { useState } from 'react';
import type { AxiosRequestConfig } from 'axios';
import { API } from '../apis/axios';

const useDelete = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const remove = async (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<any> => {
    try {
      setLoading(true);
      setError(null);

      const response = await API.delete(url, config);

      return response.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
};

export default useDelete;
