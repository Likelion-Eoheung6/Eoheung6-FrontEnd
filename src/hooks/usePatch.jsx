import { useState } from "react";
import { API } from "../api/axios";

const usePatch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const patch = async (url, data, config = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await API.patch(url, data, config);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { patch, loading, error };
};

export default usePatch;
