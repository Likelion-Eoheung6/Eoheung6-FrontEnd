import { useState } from "react";
import { API } from "../api/axios";

const usePost = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const post = async (body) => {
    try {
      setLoading(true);
      setError(null);

      const isFormData = body instanceof FormData;

      const config = isFormData
        ? { headers: { "Content-Type": undefined } }
        : {};

      const response = await API.post(url, body, config);
      return response.data;
    } catch (err) {
      setError(err);
      //console.log(err.response.data.code);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { post, loading, error };
};

export default usePost;
