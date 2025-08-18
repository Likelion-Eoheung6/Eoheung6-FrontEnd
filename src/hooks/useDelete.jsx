import { useState } from "react";
import { API } from "../api/axios";

const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const remove = async (url, config = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await API.delete(url, config);

      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
};

export default useDelete;
