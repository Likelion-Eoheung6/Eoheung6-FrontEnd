import { useEffect, useState } from 'react';
import type { AxiosRequestConfig } from 'axios';
import { API } from '../apis/axios';

const useGet = <T,>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get<T>(url, options);
        setData(res.data);
        console.log(res.data);
      } catch (err) {
        setError(err as Error);
        console.log('err', err);
      } finally {
        setLoading(false);
      }
    };

    if (url) fetchData();
  }, [url, options]);

  return { data, loading, error };
};

export default useGet;
