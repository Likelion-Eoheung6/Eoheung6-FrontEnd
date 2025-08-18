import { useEffect, useState } from "react";
import { API } from "../api/axios";

const useGet = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(url, options);
        setData(res.data);
      } catch (err) {
        setError(err);
        console.log("err", err);
      } finally {
        setLoading(false);
      }
    };

    if (url) fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useGet;
